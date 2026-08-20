import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Trophy,
  User,
  Bell,
  Mail,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MediaUpload } from "@/components/MediaUpload";
import { getMyAchievements, getMyProfile, updateMyProfile } from "@/lib/profile.functions";
import {
  getMyNotificationPreferences,
  updateMyNotificationPreferences,
  sendTestNotification,
} from "@/lib/notifications.functions";
import { requestPushPermission, getNotificationPermission } from "@/lib/fcm";
import { LEVELS, levelFor } from "@/lib/legends.functions";
import { kz } from "@/components/finance/FeeBanner";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [{ title: "Meu perfil — InfroPay" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
});

function Page() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const getFn = useServerFn(getMyProfile);
  const saveFn = useServerFn(updateMyProfile);
  const achFn = useServerFn(getMyAchievements);
  const getPrefsFn = useServerFn(getMyNotificationPreferences);
  const savePrefsFn = useServerFn(updateMyNotificationPreferences);
  const testNotifFn = useServerFn(sendTestNotification);

  const { data: p } = useQuery({ queryKey: ["me", "profile"], queryFn: () => getFn() });
  const { data: ach } = useQuery({ queryKey: ["me", "achievements"], queryFn: () => achFn() });
  const { data: prefsData } = useQuery({
    queryKey: ["me", "notification-preferences"],
    queryFn: () => getPrefsFn(),
  });

  const [form, setForm] = useState<any>({});
  const [pushStatus, setPushStatus] = useState<NotificationPermission>("default");
  const [pushLoading, setPushLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  const [notifPrefs, setNotifPrefs] = useState({
    push_enabled: true,
    email_sales: true,
    email_withdrawals: true,
    email_updates: true,
    security_alerts: true,
  });

  useEffect(() => {
    if (p) setForm(p);
  }, [p]);

  useEffect(() => {
    if (prefsData) setNotifPrefs(prefsData);
    setPushStatus(getNotificationPermission());
  }, [prefsData]);

  const revenue = ach?.revenue_cents ?? 0;
  const level = levelFor(revenue);
  const idx = LEVELS.findIndex((l) => l.key === level.key);
  const next = LEVELS[idx + 1];
  const pct = next
    ? Math.min(
        100,
        Math.round(((revenue - level.min_cents) / (next.min_cents - level.min_cents)) * 100),
      )
    : 100;

  async function save() {
    try {
      await saveFn({
        data: {
          full_name: form.full_name ?? null,
          username: form.username?.trim() ? form.username : null,
          bio: form.bio ?? null,
          avatar_url: form.avatar_url ?? null,
          cover_url: form.cover_url ?? null,
          social_instagram: form.social_instagram ?? null,
          social_website: form.social_website ?? null,
        },
      });
      toast.success("Perfil atualizado");
      qc.invalidateQueries({ queryKey: ["me", "profile"] });
    } catch (e: any) {
      toast.error(e.message ?? "Erro ao guardar");
    }
  }

  async function handleTogglePush(checked: boolean) {
    if (checked && pushStatus !== "granted" && user?.id) {
      setPushLoading(true);
      const res = await requestPushPermission(user.id);
      setPushLoading(false);
      setPushStatus(getNotificationPermission());
      if (!res.success) {
        toast.error(res.error || "Não foi possível ativar notificações push.");
        return;
      }
      toast.success("Notificações Push ativadas com sucesso neste navegador!");
    }

    const updated = { ...notifPrefs, push_enabled: checked };
    setNotifPrefs(updated);
    await savePrefsFn({ data: updated });
    toast.success("Preferências de notificação salvas.");
  }

  async function handleTogglePref(key: keyof typeof notifPrefs, value: boolean) {
    const updated = { ...notifPrefs, [key]: value };
    setNotifPrefs(updated);
    try {
      await savePrefsFn({ data: updated });
      toast.success("Preferências atualizadas.");
    } catch {
      toast.error("Erro ao guardar preferências.");
    }
  }

  async function handleSendTest(type: "sale_approved" | "withdrawal_approved" | "platform_update") {
    setTestLoading(true);
    try {
      await testNotifFn({ data: { type } });
      toast.success("Notificação de teste disparada! Verifique o sino 🔔 no topo.");
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
    } catch (err: any) {
      toast.error(err.message || "Falha ao enviar notificação de teste.");
    } finally {
      setTestLoading(false);
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-gold font-semibold">Conta</div>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">
          Meu perfil & Definições
        </h1>
      </div>

      {/* Nível atual */}
      <div
        className="rounded-2xl border p-5 relative overflow-hidden"
        style={{ borderColor: level.color + "60" }}
      >
        <div className="absolute inset-0 opacity-20" style={{ background: level.gradient }} />
        <div className="relative flex items-center gap-4">
          <div
            className="h-14 w-14 rounded-2xl grid place-items-center shrink-0"
            style={{ background: level.gradient }}
          >
            <Trophy className="h-7 w-7 text-white drop-shadow" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Nível atual
            </div>
            <div className="font-display text-2xl font-bold" style={{ color: level.color }}>
              {level.name}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Faturamento: <b className="text-foreground">{kz(revenue)}</b> ·{" "}
              {ach?.sales_count ?? 0} vendas
            </div>
            {next && (
              <div className="mt-3">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{ width: `${pct}%`, background: next.gradient }}
                  />
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Próximo nível: <b>{next.name}</b> — faltam {kz(next.min_cents - revenue)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Formulário de Perfil */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-gold" /> Dados Públicos do Produtor
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Foto de perfil</Label>
            <div className="mt-1">
              <MediaUpload
                value={form.avatar_url}
                onChange={(u) => setForm((f: any) => ({ ...f, avatar_url: u }))}
                label=""
                hint="Recomendado 512×512"
              />
            </div>
          </div>
          <div>
            <Label>Capa</Label>
            <div className="mt-1">
              <MediaUpload
                value={form.cover_url}
                onChange={(u) => setForm((f: any) => ({ ...f, cover_url: u }))}
                label=""
                hint="Recomendado 1600×400"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Nome completo</Label>
            <Input
              value={form.full_name ?? ""}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            />
          </div>
          <div>
            <Label>Nome de utilizador</Label>
            <div className="flex items-center gap-2 mt-1 h-10 rounded-md border border-input bg-background px-3">
              <span className="text-muted-foreground text-sm">@</span>
              <input
                className="bg-transparent outline-none text-sm flex-1"
                value={form.username ?? ""}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="seunome"
              />
            </div>
          </div>
        </div>

        <div>
          <Label>Bio</Label>
          <Textarea
            rows={3}
            maxLength={400}
            value={form.bio ?? ""}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Fale um pouco sobre si..."
          />
          <div className="text-[10px] text-muted-foreground mt-1 text-right">
            {(form.bio ?? "").length}/400
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Instagram</Label>
            <Input
              value={form.social_instagram ?? ""}
              onChange={(e) => setForm({ ...form, social_instagram: e.target.value })}
              placeholder="@handle"
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              value={form.social_website ?? ""}
              onChange={(e) => setForm({ ...form, social_website: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={save} className="gradient-brand text-primary-foreground shadow-glow">
            Guardar alterações do perfil
          </Button>
        </div>
      </div>

      {/* CENTRAL DE PREFERÊNCIAS DE NOTIFICAÇÕES & PUSH */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Bell className="h-5 w-5 text-gold" /> Configurações de Notificações & Canais
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Escolha quais alertas deseja receber por Web Push, no aplicativo e por e-mail.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-muted-foreground">
              Estado Web Push:
            </span>
            {pushStatus === "granted" ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-success bg-success/15 px-2 py-0.5 rounded-full border border-success/30">
                <CheckCircle2 className="h-3 w-3" /> Ativo
              </span>
            ) : pushStatus === "denied" ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-destructive bg-destructive/15 px-2 py-0.5 rounded-full border border-destructive/30">
                <AlertCircle className="h-3 w-3" /> Bloqueado no Navegador
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30">
                Pendente
              </span>
            )}
          </div>
        </div>

        {/* Push Notifications Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-background/60 border border-border/70">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl gradient-brand text-primary-foreground grid place-items-center shrink-0">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-foreground">
                  Notificações Push (Web / Telemóvel)
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Receba alertas instantâneos de vendas e aprovações de saque mesmo com a aba
                  fechada ou aplicativo em segundo plano.
                </div>
                {pushStatus !== "granted" && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={pushLoading}
                    onClick={() => handleTogglePush(true)}
                    className="mt-2.5 h-8 text-xs font-semibold border-gold/40 text-gold hover:bg-gold/10"
                  >
                    <Bell className="h-3.5 w-3.5 mr-1.5" />
                    {pushLoading ? "A solicitar permissão..." : "Permitir Push neste Navegador"}
                  </Button>
                )}
              </div>
            </div>
            <Switch
              checked={notifPrefs.push_enabled && pushStatus === "granted"}
              onCheckedChange={handleTogglePush}
            />
          </div>

          {/* Email Settings */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-gold" /> Notificações por E-mail Transacional
            </h3>

            {/* Email Vendas */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/40 border border-border/60">
              <div>
                <div className="font-semibold text-sm text-foreground">E-mails de Vendas</div>
                <div className="text-xs text-muted-foreground">
                  Receba o comprovativo detalhado a cada venda confirmada e liquidada.
                </div>
              </div>
              <Switch
                checked={notifPrefs.email_sales}
                onCheckedChange={(c) => handleTogglePref("email_sales", c)}
              />
            </div>

            {/* Email Saques */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/40 border border-border/60">
              <div>
                <div className="font-semibold text-sm text-foreground">
                  E-mails de Saques / Cashout
                </div>
                <div className="text-xs text-muted-foreground">
                  Avisos de solicitações, saques em análise bancária e aprovações de transferência.
                </div>
              </div>
              <Switch
                checked={notifPrefs.email_withdrawals}
                onCheckedChange={(c) => handleTogglePref("email_withdrawals", c)}
              />
            </div>

            {/* Email Atualizações */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/40 border border-border/60">
              <div>
                <div className="font-semibold text-sm text-foreground">
                  Atualizações da Plataforma
                </div>
                <div className="text-xs text-muted-foreground">
                  Novos recursos, manutenções programadas e comunicados oficiais da InfroPay.
                </div>
              </div>
              <Switch
                checked={notifPrefs.email_updates}
                onCheckedChange={(c) => handleTogglePref("email_updates", c)}
              />
            </div>

            {/* Alertas de Segurança */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-background/40 border border-border/60 opacity-90">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    Alertas Críticos de Segurança
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Avisos de alterações de senha e atividades suspeitas (obrigatório para
                    proteção).
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-success bg-success/15 px-2 py-0.5 rounded-md border border-success/30">
                Sempre Ativo
              </span>
            </div>
          </div>
        </div>

        {/* Live Test Tools */}
        <div className="pt-4 border-t border-border/60">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            Simulador / Testar Notificações em Tempo Real
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={testLoading}
              onClick={() => handleSendTest("sale_approved")}
              className="text-xs h-8"
            >
              Simular Venda Aprovada (🎉)
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={testLoading}
              onClick={() => handleSendTest("withdrawal_approved")}
              className="text-xs h-8"
            >
              Simular Saque Aprovado (💰)
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={testLoading}
              onClick={() => handleSendTest("platform_update")}
              className="text-xs h-8"
            >
              Simular Comunicado (🔵)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
