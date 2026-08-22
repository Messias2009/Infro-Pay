import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Shield,
  Search,
  ChevronRight,
  ExternalLink,
  Calendar,
  Mail,
  UserCheck,
  RefreshCw,
  Eye,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import {
  fetchAdminUsersWithStats,
  fetchUserProductsAndSales,
  type AdminUserStats,
  type AdminUserSale,
} from "@/lib/admin.firestore";
import type { UnifiedProduct } from "@/lib/products.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";

function formatKz(amount: number) {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function AdminDashboardView() {
  const [users, setUsers] = useState<AdminUserStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUserStats | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    products: UnifiedProduct[];
    sales: AdminUserSale[];
  }>({ products: [], sales: [] });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminUsersWithStats();
      setUsers(data);
    } catch (err) {
      console.error("Erro ao carregar utilizadores:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenUser = async (user: AdminUserStats) => {
    setSelectedUser(user);
    setModalOpen(true);
    setLoadingDetails(true);
    try {
      const details = await fetchUserProductsAndSales(user.uid);
      setUserDetails(details);
    } catch (err) {
      console.error("Erro ao carregar detalhes do utilizador:", err);
      setUserDetails({ products: [], sales: [] });
    } finally {
      setLoadingDetails(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const q = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.uid.toLowerCase().includes(q),
    );
  }, [users, searchTerm]);

  const globalStats = useMemo(() => {
    const totalUsers = users.length;
    const totalProducts = users.reduce((acc, u) => acc + u.productCount, 0);
    const totalSales = users.reduce((acc, u) => acc + u.salesCount, 0);
    const totalVolume = users.reduce((acc, u) => acc + u.totalGrossAOA, 0);
    return { totalUsers, totalProducts, totalSales, totalVolume };
  }, [users]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Admin Notice & Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-gold/10 via-card to-background border border-gold/30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gold/20 flex items-center justify-center text-gold border border-gold/40">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground font-display">
                Painel Administrativo Global
              </h1>
              <Badge
                id="admin-badge"
                className="bg-gold text-primary-foreground font-bold tracking-wide uppercase text-[10px] px-2 py-0.5"
              >
                Admin
              </Badge>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Supervisão de todos os utilizadores, vendedores, catálogo de produtos e transações da
              InfroPay.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            id="refresh-admin-data"
            variant="outline"
            size="sm"
            onClick={loadData}
            disabled={loading}
            className="gap-2 text-xs border-border"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Atualizar Dados
          </Button>
          <Button
            id="go-to-admin-suite"
            asChild
            size="sm"
            className="bg-gold text-primary-foreground hover:bg-gold/90 font-medium text-xs gap-1.5"
          >
            <Link to="/adm">
              Fila de Aprovação
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Global Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Utilizadores
            </span>
            <Users className="h-4 w-4 text-gold" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-display mt-2">
            {globalStats.totalUsers}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Produtores e compradores ativos</p>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Produtos Criados
            </span>
            <Package className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-display mt-2">
            {globalStats.totalProducts}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">No catálogo de toda a plataforma</p>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total de Vendas
            </span>
            <ShoppingCart className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-display mt-2">
            {globalStats.totalSales}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Pedidos confirmados</p>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Volume Transacionado
            </span>
            <TrendingUp className="h-4 w-4 text-gold" />
          </div>
          <div className="text-xl md:text-2xl font-bold font-display mt-2 text-gold">
            {formatKz(globalStats.totalVolume)}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Faturamento bruto global</p>
        </div>
      </div>

      {/* Users List Section */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold font-display text-foreground flex items-center gap-2">
              <Users className="h-5 w-5 text-gold" />
              Utilizadores e Vendedores Registados
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Clique em qualquer utilizador para inspecionar os seus produtos e histórico de vendas.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-admin-users"
              placeholder="Pesquisar por nome, e-mail ou UID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-xs bg-background/50"
            />
          </div>
        </div>

        {/* Table of Users */}
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2">
            <RefreshCw className="h-6 w-6 animate-spin text-gold" />
            <span>A carregar lista de utilizadores da plataforma...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
            <div className="text-sm font-semibold text-foreground">
              Nenhum utilizador encontrado
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {searchTerm
                ? "Tente ajustar os termos da sua pesquisa."
                : "Ainda não existem utilizadores registados na base de dados."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/30 border-b border-border text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Utilizador / Vendedor</th>
                  <th className="py-3.5 px-4">E-mail</th>
                  <th className="py-3.5 px-4">Data de Criação</th>
                  <th className="py-3.5 px-4 text-center">Produtos</th>
                  <th className="py-3.5 px-4 text-center">Vendas</th>
                  <th className="py-3.5 px-4 text-right">Volume</th>
                  <th className="py-3.5 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredUsers.map((u) => {
                  const isAdminUser =
                    u.role === "admin" ||
                    u.uid === "rsKuyZLn7gbRulIKz5WpxpgqJDo2" ||
                    u.email === "infropayao@gmail.com";

                  return (
                    <tr
                      key={u.uid}
                      onClick={() => handleOpenUser(u)}
                      className="hover:bg-accent/40 cursor-pointer transition group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-muted/80 flex items-center justify-center font-bold text-foreground overflow-hidden shrink-0 border border-border">
                            {u.avatar_url || u.photoURL ? (
                              <img
                                src={u.avatar_url || u.photoURL || ""}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              u.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground flex items-center gap-1.5">
                              {u.name}
                              {isAdminUser && (
                                <Badge className="bg-gold/20 text-gold border-gold/40 text-[9px] px-1.5 py-0">
                                  Admin
                                </Badge>
                              )}
                            </div>
                            <div className="text-[10px] text-muted-foreground font-mono truncate max-w-[140px]">
                              {u.uid}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-muted-foreground font-mono">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-muted-foreground/60 shrink-0" />
                          <span className="truncate max-w-[200px]">{u.email}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-muted-foreground/60 shrink-0" />
                          <span>{formatDate(u.createdAt)}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <Badge
                          variant={u.productCount > 0 ? "secondary" : "outline"}
                          className="text-xs font-semibold px-2 py-0.5"
                        >
                          {u.productCount} {u.productCount === 1 ? "produto" : "produtos"}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="font-semibold text-foreground">{u.salesCount}</span>
                      </td>

                      <td className="py-3.5 px-4 text-right font-medium text-foreground">
                        {formatKz(u.totalGrossAOA)}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Button
                          id={`view-user-${u.uid}`}
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2.5 text-xs text-gold group-hover:bg-gold/10 font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenUser(u);
                          }}
                        >
                          Inspecionar
                          <ChevronRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Inspection Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-bold text-gold shrink-0">
                {selectedUser?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <div>
                <DialogTitle className="text-lg font-bold font-display flex items-center gap-2">
                  {selectedUser?.name}
                  {selectedUser?.role === "admin" && (
                    <Badge className="bg-gold text-primary-foreground text-[10px]">Admin</Badge>
                  )}
                </DialogTitle>
                <DialogDescription className="text-xs flex items-center gap-2 mt-0.5">
                  <span className="font-mono">{selectedUser?.email}</span>
                  <span>•</span>
                  <span>Membro desde {formatDate(selectedUser?.createdAt || "")}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {loadingDetails ? (
            <div className="p-12 text-center flex flex-col items-center justify-center gap-2">
              <RefreshCw className="h-6 w-6 animate-spin text-gold" />
              <span className="text-xs text-muted-foreground">
                A carregar produtos e vendas do utilizador...
              </span>
            </div>
          ) : (
            <Tabs defaultValue="products" className="mt-4">
              <TabsList className="grid grid-cols-2 w-full max-w-sm">
                <TabsTrigger value="products" className="gap-2 text-xs">
                  <Package className="h-3.5 w-3.5" />
                  Produtos ({userDetails.products.length})
                </TabsTrigger>
                <TabsTrigger value="sales" className="gap-2 text-xs">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Vendas ({userDetails.sales.length})
                </TabsTrigger>
              </TabsList>

              {/* Tab: Products */}
              <TabsContent value="products" className="mt-4 space-y-3">
                {userDetails.products.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-border rounded-xl bg-muted/10">
                    <Package className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                    <div className="font-semibold text-sm text-foreground">
                      Sem dados disponíveis
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Este utilizador ainda não cadastrou nenhum produto na plataforma.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {userDetails.products.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3.5 rounded-xl border border-border bg-card/60 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-border">
                            {prod.cover_url ? (
                              <img
                                src={prod.cover_url}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package className="h-5 w-5 text-muted-foreground/60" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-foreground truncate">
                              {prod.title}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                              <span className="font-medium text-gold">
                                {formatKz(prod.price_cents / 100)}
                              </span>
                              <span>•</span>
                              <span className="capitalize">{prod.product_type}</span>
                              <span>•</span>
                              <span>{prod.sales_count} vendas</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Badge
                            variant={
                              prod.status === "publicado"
                                ? "default"
                                : prod.status === "em_analise"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-[10px] capitalize"
                          >
                            {prod.status}
                          </Badge>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          >
                            <Link to="/produto/$slug" params={{ slug: prod.slug }} target="_blank">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Tab: Sales */}
              <TabsContent value="sales" className="mt-4 space-y-3">
                {userDetails.sales.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-border rounded-xl bg-muted/10">
                    <ShoppingCart className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                    <div className="font-semibold text-sm text-foreground">
                      Sem dados disponíveis
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Este utilizador ainda não realizou vendas na plataforma.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted/40 text-muted-foreground font-medium text-[10px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Produto</th>
                          <th className="py-2.5 px-3">Cliente</th>
                          <th className="py-2.5 px-3">Data</th>
                          <th className="py-2.5 px-3 text-right">Valor Bruto</th>
                          <th className="py-2.5 px-3 text-right">Líquido Produtor</th>
                          <th className="py-2.5 px-3 text-center">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/50">
                        {userDetails.sales.map((sale) => (
                          <tr key={sale.id} className="hover:bg-accent/30">
                            <td className="py-2.5 px-3 font-medium text-foreground">
                              {sale.productTitle}
                            </td>
                            <td className="py-2.5 px-3 text-muted-foreground">
                              <div>{sale.customerName}</div>
                              <div className="text-[10px] font-mono">{sale.customerEmail}</div>
                            </td>
                            <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
                              {formatDate(sale.createdAt)}
                            </td>
                            <td className="py-2.5 px-3 text-right font-medium">
                              {formatKz(sale.grossAmount)}
                            </td>
                            <td className="py-2.5 px-3 text-right font-semibold text-emerald-400">
                              {formatKz(sale.netAmount)}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <Badge
                                variant={sale.status === "pago" ? "default" : "outline"}
                                className="text-[10px] capitalize"
                              >
                                {sale.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
