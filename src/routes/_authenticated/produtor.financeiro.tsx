import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Zap,
  Percent,
  Receipt,
  Eye,
  ShoppingBag,
  ArrowDownToLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMyFinanceOverview, getMyWallet, listMyTransactions } from "@/lib/finance.functions";
import { FeeBanner, kz } from "@/components/finance/FeeBanner";
import { RevenueChart } from "@/components/finance/RevenueChart";

export const Route = createFileRoute("/_authenticated/produtor/financeiro")({
  head: () => ({
    meta: [{ title: "Financeiro & Carteira — InfroPay" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
});

const methodLabel: Record<string, string> = {
  multicaixa_express: "Multicaixa Express",
  referencia: "Referência",
  transferencia: "Transferência",
};

function Page() {
  const walletFn = useServerFn(getMyWallet);
  const txFn = useServerFn(listMyTransactions);
  const ovFn = useServerFn(getMyFinanceOverview);
  const { data: w } = useQuery({ queryKey: ["producer", "wallet"], queryFn: () => walletFn() });
  const { data: tx } = useQuery({ queryKey: ["producer", "tx"], queryFn: () => txFn() });
  const { data: ov } = useQuery({ queryKey: ["producer", "overview"], queryFn: () => ovFn() });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-semibold">
            Financeiro
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
            Carteira & Faturamento
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Gestão transparente de saldo, comissões de 2% e histórico de transações.
          </p>
        </div>
        <Link to="/produtor/saques">
          <Button className="gradient-brand text-primary-foreground shadow-glow font-semibold">
            <ArrowDownToLine className="h-4 w-4 mr-2" />
            Solicitar Saque (6%)
          </Button>
        </Link>
      </div>

      {/* BANNER 2% VENDA */}
      <FeeBanner variant="sales" />

      {/* CARDS PRINCIPAIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight">
              Faturamento Bruto
            </div>
            <TrendingUp className="h-5 w-5 text-gold shrink-0" />
          </div>
          <div className="my-4">
            <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold tabular-nums break-words">
              {kz(ov?.totalGross ?? 0)}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {ov?.salesCount ?? 0} vendas pagas · Líquido {kz(ov?.totalNet ?? 0)}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight">
              Disponível para Saque
            </div>
            <Wallet className="h-5 w-5 text-primary-glow shrink-0" />
          </div>
          <div className="my-4">
            <div className="font-display text-3xl md:text-4xl font-bold tabular-nums text-foreground break-words">
              {kz(w?.available_cents ?? 0)}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Saque mínimo de 5.000 Kz · Taxa fixa 6%
            </div>
          </div>
          <Link to="/produtor/saques" className="inline-block pt-2">
            <Button
              size="sm"
              variant="outline"
              className="w-full border-primary/40 hover:bg-primary/10"
            >
              Gerir Saques <ArrowUpRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        <div className="rounded-2xl border border-success/40 bg-gradient-to-br from-success/15 via-card to-card p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight">
              Liberação Rápida
            </div>
            <Zap className="h-5 w-5 text-success shrink-0" />
          </div>
          <div className="my-4">
            <div className="font-display text-3xl md:text-4xl font-bold text-success">1 Hora</div>
            <div className="mt-2 text-xs text-muted-foreground">
              Liberação em no mínimo 1 hora após a confirmação do pagamento.
            </div>
          </div>
        </div>
      </div>

      {/* MINI STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat
          icon={Percent}
          label="Taxa de Conversão"
          value={`${((ov?.conversion ?? 0) * 100).toFixed(1)}%`}
          hint={`${ov?.totalViews ?? 0} visualizações`}
        />
        <MiniStat
          icon={Receipt}
          label="Ticket Médio"
          value={kz(ov?.avgTicket ?? 0)}
          hint="Por venda concluída"
        />
        <MiniStat
          icon={ShoppingBag}
          label="Vendas no Mês"
          value={String(ov?.month?.count ?? 0)}
          hint={kz(ov?.month?.gross ?? 0)}
        />
        <MiniStat
          icon={Eye}
          label="Comissões Pagas (2%)"
          value={kz(ov?.totalFees ?? 0)}
          hint="Apenas 2% por venda"
        />
      </div>

      {/* GRÁFICO DE FATURAMENTO */}
      <RevenueChart
        daily={ov?.seriesDaily}
        weekly={ov?.seriesWeekly}
        monthly={ov?.seriesMonthly}
        yearly={ov?.seriesYearly}
      />

      {/* BANNER TRANSPARÊNCIA TOTAL */}
      <FeeBanner variant="default" />

      {/* HISTÓRICO DE TRANSAÇÕES */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg">Histórico de Transações & Vendas</h2>
          <span className="text-xs text-muted-foreground">{tx?.length ?? 0} registos</span>
        </div>
        {!tx?.length ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            Ainda sem transações registadas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/30">
                <tr>
                  <th className="px-6 py-3.5">Data</th>
                  <th className="px-6 py-3.5">Produto</th>
                  <th className="px-6 py-3.5">Comprador</th>
                  <th className="px-6 py-3.5">Método</th>
                  <th className="px-6 py-3.5 text-right">Bruto</th>
                  <th className="px-6 py-3.5 text-right">Taxa (2%)</th>
                  <th className="px-6 py-3.5 text-right">Líquido</th>
                  <th className="px-6 py-3.5">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tx.map((t: any) => (
                  <tr key={t.id} className="hover:bg-muted/10 transition">
                    <td className="px-6 py-3.5 text-muted-foreground whitespace-nowrap">
                      {new Date(t.created_at).toLocaleDateString("pt-AO")}
                    </td>
                    <td className="px-6 py-3.5 font-medium truncate max-w-[200px]">
                      {t.product?.title ?? "—"}
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {t.buyer_name ?? t.buyer_email ?? "—"}
                    </td>
                    <td className="px-6 py-3.5 text-xs">
                      {methodLabel[t.payment_method] ?? t.payment_method}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono font-medium">
                      {kz(t.gross_cents)}
                    </td>
                    <td className="px-6 py-3.5 text-right text-muted-foreground text-xs font-mono">
                      -{kz(t.platform_fee_cents)}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono font-bold text-foreground">
                      {kz(t.net_cents)}
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusPill status={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pago: "bg-success/15 text-success border-success/30",
    pendente: "bg-warning/15 text-warning border-warning/30",
    reembolsado: "bg-destructive/15 text-destructive border-destructive/30",
    cancelado: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${map[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 md:p-5 shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center shrink-0">
          <Icon className="h-4 w-4 text-primary-glow" />
        </div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight">
          {label}
        </div>
      </div>
      <div className="mt-3 font-display text-xl md:text-2xl font-bold tabular-nums break-words">
        {value}
      </div>
      {hint && <div className="text-[11px] text-muted-foreground mt-1 truncate">{hint}</div>}
    </div>
  );
}
