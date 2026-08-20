import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Bell,
  Send,
  Zap,
  Users,
  Smartphone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Radio,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { sendAdminBroadcastFn, sendTestNotification } from "@/lib/notifications.functions";

export const Route = createFileRoute("/_authenticated/adm/notificacoes")({
  head: () => ({
    meta: [
      { title: "Central de Notificações & Broadcast — Administração" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdmNotificacoesPage,
});

function AdmNotificacoesPage() {
  const qc = useQueryClient();
  const broadcastFn = useServerFn(sendAdminBroadcastFn);
  const testNotifFn = useServerFn(sendTestNotification);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<
    "platform_update" | "system_alert" | "security_alert" | "sale_approved"
  >("platform_update");
  const [audience, setAudience] = useState<"all" | "sellers" | "buyers" | "specific">("all");
  const [specificUserId, setSpecificUserId] = useState("");
  const [channels, setChannels] = useState<{ in_app: boolean; push: boolean; email: boolean }>({
    in_app: true,
    push: true,
    email: true,
  });

  const [history, setHistory] = useState([
    {
      id: "b-1",
      title: "Lançamento da Nova Central de Notificações & PWA",
      type: "platform_update",
      audience: "Todos os Usuários",
      channels: ["in_app", "push", "email"],
      sentCount: 142,
      status: "Entregue",
      createdAt: "Há 2 horas",
    },
    {
      id: "b-2",
      title: "Melhoria na velocidade de Saques Multicaixa",
      type: "system_alert",
      audience: "Produtores",
      channels: ["in_app", "email"],
      sentCount: 98,
      status: "Entregue",
      createdAt: "Ontem",
    },
  ]);

  async function handleSendBroadcast(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Preencha o título e a mensagem.");
      return;
    }

    const selectedChannels = (Object.keys(channels) as (keyof typeof channels)[]).filter(
      (k) => channels[k],
    );

    if (selectedChannels.length === 0) {
      toast.error("Selecione pelo menos um canal de envio.");
      return;
    }

    setLoading(true);
    try {
      const res = await broadcastFn({
        data: {
          title,
          message,
          type,
          audience,
          specific_user_id: audience === "specific" ? specificUserId || null : null,
          channels: selectedChannels as any,
        },
      });

      toast.success(`Comunicado enviado com sucesso para ${res.sentCount} utilizadores!`);

      // Add to local history
      setHistory((prev) => [
        {
          id: `b-${Date.now()}`,
          title,
          type,
          audience:
            audience === "all"
              ? "Todos os Usuários"
              : audience === "sellers"
                ? "Produtores"
                : audience === "buyers"
                  ? "Compradores"
                  : `Usuário ${specificUserId.slice(0, 8)}...`,
          channels: selectedChannels,
          sentCount: res.sentCount,
          status: "Entregue",
          createdAt: "Agora mesmo",
        },
        ...prev,
      ]);

      setTitle("");
      setMessage("");
      qc.invalidateQueries({ queryKey: ["notifications"] });
    } catch (err: any) {
      toast.error(err.message || "Erro ao despachar comunicado.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendTest(t: any) {
    try {
      await testNotifFn({ data: { type: t } });
      toast.success("Notificação enviada para a sua conta de administrador!");
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
    } catch (err: any) {
      toast.error(err.message || "Erro ao testar notificação.");
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-semibold flex items-center gap-1.5">
          <Radio className="h-3.5 w-3.5" /> Painel de Controle
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 text-foreground">
          Central de Notificações & Broadcast
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Envie comunicados em massa, push notifications e alertas transacionais para a base de
          utilizadores da InfroPay.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Total Entregues</span>
            <Bell className="h-4 w-4 text-gold" />
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">2.480</div>
          <div className="text-[11px] text-success font-medium mt-1">99.8% taxa de sucesso</div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Web Push Ativos</span>
            <Smartphone className="h-4 w-4 text-primary-glow" />
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">1.120</div>
          <div className="text-[11px] text-muted-foreground mt-1">Dispositivos registrados</div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>E-mails Transacionais</span>
            <Mail className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">1.360</div>
          <div className="text-[11px] text-muted-foreground mt-1">InfroPay Templates</div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Idempotência & Anti-Spam</span>
            <ShieldCheck className="h-4 w-4 text-success" />
          </div>
          <div className="text-2xl font-bold text-foreground mt-2">100%</div>
          <div className="text-[11px] text-muted-foreground mt-1">Deduplicação ativa</div>
        </div>
      </div>

      {/* Form: Create Broadcast */}
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
        <form
          onSubmit={handleSendBroadcast}
          className="rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-5 shadow-card"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <div className="h-8 w-8 rounded-lg gradient-brand text-primary-foreground grid place-items-center">
              <Send className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-foreground">Novo Comunicado / Broadcast</h2>
              <p className="text-xs text-muted-foreground">
                Crie uma mensagem para envio instantâneo multiplataforma.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Tipo do Aviso *</Label>
              <Select value={type} onValueChange={(v: any) => setType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="platform_update">🔵 Atualização da Plataforma</SelectItem>
                  <SelectItem value="system_alert">🛠️ Manutenção / Aviso do Sistema</SelectItem>
                  <SelectItem value="security_alert">🔒 Alerta de Segurança</SelectItem>
                  <SelectItem value="sale_approved">🎉 Destaque de Vendas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Público-Alvo *</Label>
              <Select value={audience} onValueChange={(v: any) => setAudience(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">👥 Todos os Utilizadores</SelectItem>
                  <SelectItem value="sellers">💼 Apenas Produtores</SelectItem>
                  <SelectItem value="buyers">🛒 Apenas Compradores</SelectItem>
                  <SelectItem value="specific">🎯 Utilizador Específico (ID)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {audience === "specific" && (
            <div className="space-y-1.5 animate-fade-in">
              <Label htmlFor="targetUid" className="text-xs font-semibold">
                ID do Utilizador (UUID) *
              </Label>
              <Input
                id="targetUid"
                placeholder="Ex: 8a4e320f-0c58-45a9-9e12-..."
                value={specificUserId}
                onChange={(e) => setSpecificUserId(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="btitle" className="text-xs font-semibold">
              Título da Notificação *
            </Label>
            <Input
              id="btitle"
              placeholder="Ex: Nova atualização disponível na InfroPay"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bmsg" className="text-xs font-semibold">
              Mensagem do Comunicado *
            </Label>
            <Textarea
              id="bmsg"
              rows={4}
              placeholder="Descreva o comunicado ou novidade detalhadamente..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {/* Delivery Channels */}
          <div className="space-y-2 pt-2">
            <Label className="text-xs font-semibold">Canais de Envio Selecionados:</Label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-background/60 border border-border/70 cursor-pointer hover:border-gold/40 transition">
                <Checkbox
                  checked={channels.in_app}
                  onCheckedChange={(c) => setChannels((p) => ({ ...p, in_app: !!c }))}
                />
                <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Bell className="h-3.5 w-3.5 text-gold" /> Notificação Interna
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-background/60 border border-border/70 cursor-pointer hover:border-gold/40 transition">
                <Checkbox
                  checked={channels.push}
                  onCheckedChange={(c) => setChannels((p) => ({ ...p, push: !!c }))}
                />
                <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-primary-glow" /> Web Push / FCM
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-background/60 border border-border/70 cursor-pointer hover:border-gold/40 transition">
                <Checkbox
                  checked={channels.email}
                  onCheckedChange={(c) => setChannels((p) => ({ ...p, email: !!c }))}
                />
                <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-blue-400" /> E-mail
                </span>
              </label>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full gradient-brand text-primary-foreground font-bold shadow-glow h-11 text-sm"
          >
            {loading ? (
              "A despachar comunicado..."
            ) : (
              <>
                Despachar Comunicado em Massa <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Right Column: Live Testing & Guidelines */}
        <div className="space-y-6">
          {/* Quick Simulation Box */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-gold" /> Teste de Notificações em Tempo Real
            </h3>
            <p className="text-xs text-muted-foreground">
              Dispare notificações de teste para a sua conta e valide a entrega interna, push e
              formatação dos e-mails.
            </p>

            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendTest("sale_approved")}
                className="w-full justify-start text-xs h-9"
              >
                🎉 Testar Venda Aprovada (25.000 Kz)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendTest("withdrawal_approved")}
                className="w-full justify-start text-xs h-9"
              >
                💰 Testar Saque Aprovado (50.000 Kz)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSendTest("platform_update")}
                className="w-full justify-start text-xs h-9"
              >
                🔵 Testar Comunicado da Plataforma
              </Button>
            </div>
          </div>

          {/* Security & Idempotency Note */}
          <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-2 text-xs text-muted-foreground leading-relaxed">
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-success" /> Regras de Segurança & Anti-Spam
            </div>
            <ul className="list-disc pl-4 space-y-1">
              <li>Credenciais FCM e chaves de envio nunca são expostas ao cliente.</li>
              <li>Chaves de idempotência evitam duplicidade de push e e-mail.</li>
              <li>Usuários com canais desativados não recebem e-mails promocionais.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Broadcast History Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-gold" /> Histórico de Comunicados Enviados
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Registro de transmissões e status de entrega aos utilizadores.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="p-3.5 pl-5">Título / Mensagem</th>
                <th className="p-3.5">Público</th>
                <th className="p-3.5">Canais</th>
                <th className="p-3.5">Enviados</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition">
                  <td className="p-3.5 pl-5 font-semibold text-sm">{item.title}</td>
                  <td className="p-3.5 text-muted-foreground">{item.audience}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1">
                      {item.channels.map((ch) => (
                        <span
                          key={ch}
                          className="px-1.5 py-0.5 rounded bg-muted text-[10px] uppercase font-bold text-muted-foreground"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-gold">{item.sentCount}</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-success font-semibold text-[11px]">
                      <CheckCircle2 className="h-3 w-3" /> {item.status}
                    </span>
                  </td>
                  <td className="p-3.5 pr-5 text-muted-foreground">{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
