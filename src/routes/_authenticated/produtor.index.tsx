import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Plus,
  TrendingUp,
  Wallet,
  Clock,
  Package,
  DollarSign,
  Receipt,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  getProducerFinanceOverviewFirestore,
  getProducerWalletFirestore,
} from "@/lib/finance.service";
import { getProducerProductMetrics, type ProductMetricRow } from "@/lib/products.service";
import { useAuth } from "@/hooks/useAuth";
import { FeeBanner, kz } from "@/components/finance/FeeBanner";
import { AdminDashboardView } from "@/components/admin/AdminDashboardView";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/produtor/")({
  component: Dashboard,
});

function Dashboard() {
  const { user, isAdmin } = useAuth();
  const isAdminUser =
    isAdmin ||
    user?.uid === "rsKuyZLn7gbRulIKz5WpxpgqJDo2" ||
    user?.email?.toLowerCase() === "infropayao@gmail.com";

  // Admins default to admin view, but can switch to personal view if needed
  const [activeAdminTab, setActiveAdminTab] = useState<"admin" | "producer">("admin");
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);

  const { data: o } = useQuery({
    queryKey: ["producer", "overview", user?.uid],
    queryFn: () => getProducerFinanceOverviewFirestore(user?.uid),
  });
  const { data: w } = useQuery({
    queryKey: ["producer", "wallet", user?.uid],
    queryFn: () => getProducerWalletFirestore(user?.uid),
  });
  const { data: productMetrics } = useQuery({
    queryKey: ["producer", "product-metrics", user?.uid],
    queryFn: () => getProducerProductMetrics(user?.uid),
  });

  const handleOpenPerformance = () => {
    setIsPerformanceModalOpen(true);
    // Smoothly scroll to the section if it exists on page
    const elem = document.getElementById("meus-produtos-desempenho");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If authenticated user is Admin and in Admin View mode, render AdminDashboardView
  if (isAdminUser && activeAdminTab === "admin") {
    return (
      <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-6 min-w-0 max-w-full overflow-hidden">
        {/* Admin Navigation Switcher */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <Badge className="bg-gold text-primary-foreground font-bold tracking-wider uppercase text-[10px] px-2 py-0.5 flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Sessão de Administrador
            </Badge>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Logado como {user?.email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveAdminTab("producer")}
              className="text-xs gap-1.5 border-border"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Ver Meu Painel Pessoal
            </Button>
            <Link to="/produtor/novo">
              <Button size="sm" className="gradient-brand text-primary-foreground text-xs gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Novo Produto
              </Button>
            </Link>
          </div>
        </div>

        {/* The comprehensive Admin Dashboard view with user list, stats, product details & sales */}
        <AdminDashboardView />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-5 sm:space-y-6 md:space-y-8 min-w-0 max-w-full overflow-hidden">
      {/* If Admin is viewing producer mode, allow fast toggle back to Admin View */}
      {isAdminUser && (
        <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-gold">
            <Shield className="h-4 w-4 shrink-0" />
            <span>Está na vista pessoal de produtor.</span>
          </div>
          <Button
            size="sm"
            onClick={() => setActiveAdminTab("admin")}
            className="bg-gold text-primary-foreground hover:bg-gold/90 text-xs h-7 px-3 font-semibold"
          >
            Voltar ao Painel Administrativo
          </Button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] sm:text-xs uppercase tracking-wider text-gold font-bold">
            DASHBOARD FINANCEIRO
          </div>
          <h1 className="font-display text-lg sm:text-2xl md:text-3xl font-bold mt-1 text-foreground leading-snug sm:leading-tight">
            Acompanhe suas vendas, comissões, saldo e crescimento em tempo real.
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-normal">
            Visão consolidada da sua conta e métricas financeiras em Angola (AOA).
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/produtor/saques">
            <Button
              variant="outline"
              size="sm"
              className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
            >
              <Wallet className="h-4 w-4 mr-1.5" />
              Saques
            </Button>
          </Link>
          <Link to="/produtor/novo">
            <Button
              size="sm"
              className="gradient-brand text-primary-foreground shadow-glow h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Novo produto
            </Button>
          </Link>
        </div>
      </div>

      {/* Wallet strip - Cards de Saldo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 min-w-0">
        <WalletCard
          tone="brand"
          icon={Wallet}
          label="SALDO DISPONÍVEL"
          value={kz(w?.available_cents ?? 0)}
          hint="Pronto para saque"
        />
        <WalletCard
          tone="gold"
          icon={Clock}
          label="SALDO BLOQUEADO"
          value={kz(w?.pending_cents ?? 0)}
          hint="Liberação em no mínimo 1h"
        />
        <WalletCard
          tone="muted"
          icon={Receipt}
          label="COMISSÕES PAGAS"
          value={kz(o?.totalFees ?? 0)}
          hint="2% por venda"
        />
      </div>

      {/* BOTÃO PROMINENTE: VER DESEMPENHO DOS MEUS PRODUTOS */}
      <div className="w-full flex justify-center sm:justify-start">
        <button
          id="btn-ver-desempenho-produtos"
          type="button"
          onClick={handleOpenPerformance}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <BarChart3 className="h-5 w-5 shrink-0" />
          <span>VER DESEMPENHO DOS MEUS PRODUTOS</span>
        </button>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 min-w-0">
        <Kpi
          icon={DollarSign}
          label="Hoje"
          value={kz(o?.today.gross ?? 0)}
          sub={`${o?.today.count ?? 0} vendas`}
        />
        <Kpi
          icon={TrendingUp}
          label="Últimos 7 dias"
          value={kz(o?.week.gross ?? 0)}
          sub={`${o?.week.count ?? 0} vendas`}
        />
        <Kpi
          icon={TrendingUp}
          label="Este mês"
          value={kz(o?.month.gross ?? 0)}
          sub={`${o?.month.count ?? 0} vendas`}
        />
        <Kpi
          icon={Package}
          label="Ticket médio"
          value={kz(o?.avgTicket ?? 0)}
          sub={`${o?.salesCount ?? 0} totais`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-4 sm:p-5 min-w-0 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                Faturamento — últimos 14 dias
              </div>
              <div className="font-display text-lg sm:text-xl font-bold mt-1">
                Evolução das vendas
              </div>
            </div>
          </div>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={o?.series ?? []}>
                <defs>
                  <linearGradient id="gGross" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-gold)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeOpacity={0.3} vertical={false} />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} width={45} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                  formatter={(v: any) => new Intl.NumberFormat("pt-AO").format(v) + " AOA"}
                />
                <Area
                  type="monotone"
                  dataKey="gross"
                  stroke="var(--color-primary)"
                  fill="url(#gGross)"
                  strokeWidth={2}
                  name="Faturamento Bruto"
                />
                <Area
                  type="monotone"
                  dataKey="net"
                  stroke="var(--color-gold)"
                  fill="url(#gNet)"
                  strokeWidth={2}
                  name="Faturamento Líquido"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 min-w-0 overflow-hidden shadow-sm">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Volume diário
          </div>
          <div className="font-display text-lg sm:text-xl font-bold mt-1">Nº de vendas</div>
          <div className="h-56 sm:h-64 mt-2 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={o?.series ?? []}>
                <CartesianGrid stroke="var(--color-border)" strokeOpacity={0.3} vertical={false} />
                <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  width={30}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                  name="Vendas"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECÇÃO: DESEMPENHO DOS MEUS PRODUTOS */}
      <div id="meus-produtos-desempenho">
        <ProductMetricsSection rows={productMetrics} />
      </div>

      <FeeBanner />

      {/* MODAL DETALHADO: DESEMPENHO DOS MEUS PRODUTOS */}
      <Dialog open={isPerformanceModalOpen} onOpenChange={setIsPerformanceModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-5 sm:p-6">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-blue-600/15 border border-blue-600/30 grid place-items-center text-blue-500">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="font-display text-xl font-bold">
                  Desempenho dos Meus Produtos
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Métricas individuais, visualizações, conversões e receitas dos produtos
                  cadastrados por si.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {!productMetrics || productMetrics.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-border rounded-xl bg-muted/10">
                <Package className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                <div className="font-semibold text-sm text-foreground">Sem dados disponíveis</div>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Ainda não tem produtos cadastrados. Crie o seu primeiro produto digital para
                  começar a acompanhar o desempenho de vendas e cliques.
                </p>
                <div className="mt-4">
                  <Link to="/produtor/novo">
                    <Button size="sm" className="bg-[#2563EB] hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-1.5" />
                      Cadastrar Produto
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productMetrics.map((prod) => (
                  <div
                    key={prod.id}
                    className="rounded-xl border border-border bg-card p-4 space-y-3.5 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
                        {prod.cover_url ? (
                          <img src={prod.cover_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <Package className="h-6 w-6 text-muted-foreground m-auto" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-foreground truncate">
                          {prod.title}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span className="capitalize">{prod.status}</span>
                          <span>•</span>
                          <span className="font-semibold text-primary-glow">
                            {prod.sales} vendas
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-muted/40 text-center">
                      <div>
                        <div className="text-[10px] uppercase text-muted-foreground font-semibold">
                          Views
                        </div>
                        <div className="font-bold text-sm mt-0.5">{prod.views}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-muted-foreground font-semibold">
                          Conversão
                        </div>
                        <div className="font-bold text-sm mt-0.5 text-emerald-500">
                          {prod.conversion.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-muted-foreground font-semibold">
                          Receita
                        </div>
                        <div className="font-bold text-sm mt-0.5 text-gold">{kz(prod.revenue)}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-border/60">
                      <Link
                        to="/produto/$slug"
                        params={{ slug: prod.slug }}
                        target="_blank"
                        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                      >
                        Ver página <ExternalLink className="h-3 w-3" />
                      </Link>
                      <Link
                        to="/produtor/editar/$id"
                        params={{ id: prod.id }}
                        className="text-xs font-semibold text-primary-glow hover:underline inline-flex items-center gap-1"
                      >
                        Editar produto <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductMetricsSection({ rows }: { rows?: ProductMetricRow[] }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
        <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">
          ─── MEUS PRODUTOS ───
        </div>
        <h2 className="font-display font-bold text-lg text-foreground">
          Desempenho dos Meus Produtos
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
          Sem dados disponíveis. Apenas os produtos cadastrados por si aparecem nesta secção com as
          suas métricas reais.
        </p>
        <div className="mt-4">
          <Link to="/produtor/novo">
            <Button size="sm" className="bg-[#2563EB] hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-1.5" />
              Cadastrar Primeiro Produto
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm min-w-0 max-w-full">
      <div className="px-5 sm:px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold font-bold">
            ─── MEUS PRODUTOS ───
          </div>
          <h2 className="font-display font-bold text-base sm:text-lg text-foreground">
            Desempenho dos Meus Produtos ({rows.length})
          </h2>
        </div>
        <Link to="/produtor/produtos">
          <Button variant="ghost" size="sm" className="text-xs font-semibold text-primary-glow">
            Gerir todos <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto w-full max-w-full">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-muted/40 text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-bold">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Produto</th>
              <th className="px-4 py-3 text-right font-semibold">Views</th>
              <th className="px-4 py-3 text-right font-semibold">Cliques</th>
              <th className="px-4 py-3 text-right font-semibold">Conversão</th>
              <th className="px-4 py-3 text-right font-semibold">Vendas</th>
              <th className="px-4 py-3 text-right font-semibold">Receita</th>
              <th className="px-4 py-3 text-right font-semibold">Afiliados</th>
              <th className="px-4 py-3 text-right font-semibold">Com. paga</th>
              <th className="px-4 py-3 text-right font-semibold">Com. pendente</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <Link
                    to="/produtor/editar/$id"
                    params={{ id: r.id }}
                    className="flex items-center gap-2.5 min-w-0 hover:text-primary-glow"
                  >
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-gold/10 border border-border">
                      {r.cover_url && (
                        <img
                          src={r.cover_url}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <span className="max-w-44 sm:max-w-64 truncate font-medium text-foreground">
                      {r.title}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">{r.views}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{r.clicks}</td>
                <td className="px-4 py-3 text-right font-medium text-emerald-500">
                  {r.conversion.toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right font-bold text-foreground">{r.sales}</td>
                <td className="px-4 py-3 text-right font-bold text-foreground">{kz(r.revenue)}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{r.activeAffiliates}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">
                  {kz(r.commissionPaid)}
                </td>
                <td className="px-4 py-3 text-right text-gold font-medium">
                  {kz(r.commissionPending)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, sub }: any) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 min-w-0 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold truncate">
          {label}
        </div>
        <Icon className="h-4 w-4 text-gold shrink-0" />
      </div>
      <div
        className="mt-2.5 text-xl sm:text-2xl font-bold font-display text-foreground truncate"
        title={value}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-muted-foreground mt-1 truncate">{sub}</div>}
    </div>
  );
}

function WalletCard({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: any;
  label: string;
  value: string;
  hint: string;
  tone: "brand" | "gold" | "muted";
}) {
  const tones = {
    brand: "border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card",
    gold: "border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card",
    muted: "border-border bg-card",
  } as const;

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 md:p-6 min-w-0 overflow-hidden shadow-sm ${tones[tone]}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold truncate">
          {label}
        </div>
        <Icon
          className={`h-5 w-5 shrink-0 ${
            tone === "brand"
              ? "text-primary-glow"
              : tone === "gold"
                ? "text-gold"
                : "text-muted-foreground"
          }`}
        />
      </div>
      <div
        className="mt-2.5 font-display text-2xl sm:text-3xl font-bold text-foreground truncate"
        title={value}
      >
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-1 truncate">{hint}</div>
    </div>
  );
}
