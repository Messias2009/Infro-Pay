import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Plus, Trash2, Landmark, ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { getMyWallet } from "@/lib/finance.functions";
import {
  deleteBankAccount,
  listMyBankAccounts,
  listMyWithdrawals,
  MIN_WITHDRAWAL_CENTS,
  requestWithdrawal,
  upsertBankAccount,
  WITHDRAWAL_FEE,
  WITHDRAWAL_FEE_PERCENT,
} from "@/lib/withdrawals.functions";
import { FeeBanner, kz } from "@/components/finance/FeeBanner";

export const Route = createFileRoute("/_authenticated/produtor/saques")({
  head: () => ({ meta: [{ title: "Saques — InfroPay" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const qc = useQueryClient();
  const walletFn = useServerFn(getMyWallet);
  const banksFn = useServerFn(listMyBankAccounts);
  const wsFn = useServerFn(listMyWithdrawals);
  const upsertFn = useServerFn(upsertBankAccount);
  const deleteFn = useServerFn(deleteBankAccount);
  const requestFn = useServerFn(requestWithdrawal);

  const { data: wallet } = useQuery({
    queryKey: ["producer", "wallet"],
    queryFn: () => walletFn(),
  });
  const { data: banks } = useQuery({ queryKey: ["banks"], queryFn: () => banksFn() });
  const { data: withdrawals } = useQuery({ queryKey: ["withdrawals"], queryFn: () => wsFn() });

  const [bankOpen, setBankOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [amountKz, setAmountKz] = useState("");
  const [bankId, setBankId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function saveBank(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await upsertFn({
        data: {
          id: editing?.id,
          holder_name: String(fd.get("holder_name")),
          bank_name: String(fd.get("bank_name")),
          iban: String(fd.get("iban")),
          phone: String(fd.get("phone") ?? ""),
          is_default: fd.get("is_default") === "on",
        },
      });
      toast.success("Conta bancária guardada com sucesso");
      setBankOpen(false);
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["banks"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function removeBank(id: string) {
    if (!confirm("Tem a certeza que deseja remover esta conta bancária?")) return;
    try {
      await deleteFn({ data: { id } });
      qc.invalidateQueries({ queryKey: ["banks"] });
      toast.success("Conta removida");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  async function submitWithdrawal(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const rawNum = Number(amountKz.replace(/\D/g, ""));
    const cents = Math.round(rawNum * 100);

    if (!bankId) return toast.error("Por favor, selecione uma conta bancária de destino.");
    if (cents < MIN_WITHDRAWAL_CENTS) return toast.error("O valor mínimo para saque é 5.000 Kz.");
    if (cents > (wallet?.available_cents ?? 0))
      return toast.error("Saldo disponível insuficiente para este saque.");

    setIsSubmitting(true);
    try {
      // Generate client idempotency key to prevent double submission
      const idempotencyKey = `wd_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      await requestFn({
        data: {
          gross_cents: cents,
          bank_account_id: bankId,
          idempotency_key: idempotencyKey,
        },
      });
      toast.success("Pedido de saque submetido com sucesso para análise financeira!");
      setAmountKz("");
      qc.invalidateQueries({ queryKey: ["withdrawals"] });
      qc.invalidateQueries({ queryKey: ["producer", "wallet"] });
    } catch (e: any) {
      toast.error(e.message || "Erro ao solicitar saque.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const parsedCents = Math.round(Number(amountKz.replace(/\D/g, "")) * 100);
  const feePreview = Math.round(parsedCents * WITHDRAWAL_FEE);
  const netPreview = parsedCents - feePreview;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-semibold">Saques</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">
            Solicitação e Histórico de Saques
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Levante os seus rendimentos de forma rápida, segura e com transparência total de taxas.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/40 bg-primary/10 px-5 py-3 shadow-sm">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            Saldo Disponível
          </div>
          <div className="font-display text-2xl font-bold text-gradient-gold">
            {kz(wallet?.available_cents ?? 0)}
          </div>
        </div>
      </div>

      {/* BANNER COM DESTAQUE: TAXA DE SAQUE 6% */}
      <FeeBanner variant="withdrawal" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CONTAS BANCÁRIAS */}
        <div
          id="bank-accounts-card"
          className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                <Landmark className="h-5 w-5 text-gold" />
                Contas Bancárias Cadastradas
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(null);
                  setBankOpen(true);
                }}
                className="hover:border-gold/50"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Nova Conta
              </Button>
            </div>
            {!banks?.length ? (
              <div className="text-sm text-muted-foreground py-10 text-center border border-dashed border-border rounded-xl">
                Nenhuma conta bancária associada. Adicione uma conta para receber seus saques.
              </div>
            ) : (
              <div className="space-y-3">
                {banks.map((b: any) => (
                  <div
                    key={b.id}
                    className={`rounded-xl border p-4 flex items-center gap-3 transition ${bankId === b.id ? "border-gold/60 bg-gold/5" : "border-border bg-background"}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm flex items-center gap-2">
                        {b.holder_name}
                        {b.is_default && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold font-medium border border-gold/30">
                            Padrão
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        <strong className="text-foreground">{b.bank_name}</strong> · {b.iban}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Editar"
                      onClick={() => {
                        setEditing(b);
                        setBankOpen(true);
                      }}
                    >
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Remover"
                      onClick={() => removeBank(b.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FORMULÁRIO DE SOLICITAÇÃO */}
        <form
          id="withdrawal-request-form"
          onSubmit={submitWithdrawal}
          className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-lg">Solicitar Novo Saque</h2>
            <span className="text-xs text-muted-foreground">Taxa: 6%</span>
          </div>

          <div>
            <Label htmlFor="bank-select" className="text-xs font-semibold">
              Conta Bancária de Destino
            </Label>
            <select
              id="bank-select"
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="mt-1.5 w-full h-11 rounded-lg bg-background border border-input px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              required
            >
              <option value="">Selecione a conta bancária...</option>
              {banks?.map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.bank_name} — {b.iban} ({b.holder_name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="amount-input" className="text-xs font-semibold">
              Valor a Sacar (Kz)
            </Label>
            <Input
              id="amount-input"
              inputMode="numeric"
              value={amountKz}
              onChange={(e) => setAmountKz(e.target.value)}
              placeholder="Ex.: 50000"
              className="mt-1.5 h-11 text-base font-semibold"
              required
            />
          </div>

          {/* SIMULAÇÃO E TRANSPARÊNCIA DE TAXA */}
          {parsedCents >= MIN_WITHDRAWAL_CENTS ? (
            <div className="rounded-xl bg-muted/40 border border-border p-4 text-xs space-y-2">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                Resumo com Transparência Total
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Valor Solicitado</span>
                <span className="font-mono font-medium">{kz(parsedCents)}</span>
              </div>
              <div className="flex justify-between items-center text-destructive">
                <span className="flex items-center gap-1">
                  Taxa da InfroPay ({WITHDRAWAL_FEE_PERCENT}%)
                </span>
                <span className="font-mono">-{kz(feePreview)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-sm pt-2 border-t border-border text-foreground">
                <span>Valor Líquido a Receber</span>
                <span className="font-mono text-primary-glow text-base">{kz(netPreview)}</span>
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-muted-foreground bg-muted/20 border border-border rounded-xl p-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
              <span>
                Saque mínimo de <strong>5.000 Kz</strong>. Taxa fixa de <strong>6%</strong>{" "}
                calculada automaticamente.
              </span>
            </div>
          )}

          <Button
            id="btn-submit-withdrawal"
            type="submit"
            disabled={isSubmitting || parsedCents < MIN_WITHDRAWAL_CENTS}
            className="w-full h-11 gradient-brand text-primary-foreground font-semibold shadow-glow"
          >
            {isSubmitting ? "A processar solicitação..." : "Confirmar Solicitação de Saque"}
          </Button>
        </form>
      </div>

      {/* HISTÓRICO DE SAQUES */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg">Histórico de Solicitações</h2>
          <span className="text-xs text-muted-foreground">{withdrawals?.length ?? 0} pedidos</span>
        </div>
        {!withdrawals?.length ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            Ainda não realizou nenhuma solicitação de saque.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/30">
                <tr>
                  <th className="px-6 py-3.5">Data</th>
                  <th className="px-6 py-3.5">Banco de Destino</th>
                  <th className="px-6 py-3.5 text-right">Valor Solicitado</th>
                  <th className="px-6 py-3.5 text-right">Taxa (6%)</th>
                  <th className="px-6 py-3.5 text-right">Valor Líquido</th>
                  <th className="px-6 py-3.5">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {withdrawals.map((w: any) => (
                  <tr key={w.id} className="hover:bg-muted/10 transition">
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {new Date(w.created_at).toLocaleDateString("pt-AO")}{" "}
                      {new Date(w.created_at).toLocaleTimeString("pt-AO", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="font-semibold text-foreground">
                        {w.bank_account?.bank_name ?? "Conta Bancária"}
                      </div>
                      <div className="text-muted-foreground font-mono">{w.bank_account?.iban}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-medium">
                      {kz(w.gross_cents)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-muted-foreground text-xs">
                      -{kz(w.fee_cents || Math.round(w.gross_cents * 0.06))}
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-foreground">
                      {kz(w.net_cents || Math.round(w.gross_cents * 0.94))}
                    </td>
                    <td className="px-6 py-4">
                      <WStatus s={w.status} r={w.rejection_reason} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DIALOG CONTA BANCÁRIA */}
      <Dialog
        open={bankOpen}
        onOpenChange={(o) => {
          setBankOpen(o);
          if (!o) setEditing(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Conta Bancária" : "Nova Conta Bancária"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={saveBank} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="holder_name">Titular da Conta</Label>
              <Input
                id="holder_name"
                name="holder_name"
                defaultValue={editing?.holder_name}
                required
                placeholder="Nome completo do titular"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bank_name">Nome do Banco</Label>
              <Input
                id="bank_name"
                name="bank_name"
                defaultValue={editing?.bank_name}
                required
                placeholder="Ex.: BAI, BFA, BIC, SOL, Atlântico"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="iban">IBAN (Angola)</Label>
              <Input
                id="iban"
                name="iban"
                defaultValue={editing?.iban}
                required
                placeholder="AO06 0000 0000 0000 0000 0000 0"
                className="mt-1 font-mono"
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone de Contacto (Opcional)</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={editing?.phone ?? ""}
                placeholder="+244 9..."
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
              <div className="space-y-0.5">
                <Label htmlFor="is_default" className="text-sm font-medium">
                  Definir como conta padrão
                </Label>
                <div className="text-xs text-muted-foreground">
                  Usada automaticamente para novos saques
                </div>
              </div>
              <Switch id="is_default" name="is_default" defaultChecked={editing?.is_default} />
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="submit"
                className="w-full gradient-brand text-primary-foreground font-semibold"
              >
                Guardar Conta Bancária
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WStatus({ s, r }: { s: string; r?: string | null }) {
  const map: Record<string, string> = {
    em_analise: "bg-warning/15 text-warning border-warning/30",
    aprovado: "bg-primary/15 text-primary-glow border-primary/30",
    pago: "bg-success/15 text-success border-success/30",
    recusado: "bg-destructive/15 text-destructive border-destructive/30",
  };
  const label: Record<string, string> = {
    em_analise: "Em análise",
    aprovado: "Aprovado",
    pago: "Pago",
    recusado: "Recusado",
  };
  return (
    <div>
      <span
        className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${map[s] ?? "bg-muted text-muted-foreground"}`}
      >
        {label[s] ?? s}
      </span>
      {s === "recusado" && r && (
        <div className="text-[10px] text-destructive mt-1.5 max-w-[220px] leading-tight font-medium">
          Motivo: {r}
        </div>
      )}
    </div>
  );
}
