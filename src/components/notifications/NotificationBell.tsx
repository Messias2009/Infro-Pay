import { useEffect, useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  ShoppingBag,
  Banknote,
  Info,
  ShieldAlert,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listMyNotifications,
  countUnread,
  markAllNotificationsRead,
  markNotificationRead,
  deleteNotification,
} from "@/lib/notifications.functions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export type NotificationItem = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  created_at: string;
};

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "Agora";
  if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h atrás`;
  const days = Math.floor(diff / 86400);
  return `${days} dia${days > 1 ? "s" : ""} atrás`;
}

function getNotificationVisuals(type: string, title: string) {
  const lower = (type + " " + title).toLowerCase();

  if (lower.includes("venda") || lower.includes("sale") || lower.includes("vendido")) {
    return {
      icon: ShoppingBag,
      color: "text-success",
      bg: "bg-success/15 border-success/30",
      badge: "Venda",
      badgeClass: "bg-success/20 text-success border-success/30",
    };
  }

  if (
    lower.includes("saque aprovado") ||
    lower.includes("levantamento aprovado") ||
    lower.includes("pago")
  ) {
    return {
      icon: Banknote,
      color: "text-gold",
      bg: "bg-gold/15 border-gold/30",
      badge: "Saque Aprovado",
      badgeClass: "bg-gold/20 text-gold border-gold/30",
    };
  }

  if (
    lower.includes("saque recusado") ||
    lower.includes("recusado") ||
    lower.includes("rejeitado")
  ) {
    return {
      icon: ShieldAlert,
      color: "text-destructive",
      bg: "bg-destructive/15 border-destructive/30",
      badge: "Recusado",
      badgeClass: "bg-destructive/20 text-destructive border-destructive/30",
    };
  }

  if (
    lower.includes("saque") ||
    lower.includes("levantamento") ||
    lower.includes("processamento")
  ) {
    return {
      icon: Clock,
      color: "text-primary-glow",
      bg: "bg-primary/15 border-primary/30",
      badge: "Saque",
      badgeClass: "bg-primary/20 text-primary-glow border-primary/30",
    };
  }

  if (lower.includes("segurança") || lower.includes("security")) {
    return {
      icon: ShieldAlert,
      color: "text-amber-400",
      bg: "bg-amber-400/15 border-amber-400/30",
      badge: "Segurança",
      badgeClass: "bg-amber-400/20 text-amber-400 border-amber-400/30",
    };
  }

  if (lower.includes("atualização") || lower.includes("update") || lower.includes("novidade")) {
    return {
      icon: Sparkles,
      color: "text-blue-400",
      bg: "bg-blue-400/15 border-blue-400/30",
      badge: "Novidade",
      badgeClass: "bg-blue-400/20 text-blue-400 border-blue-400/30",
    };
  }

  return {
    icon: Info,
    color: "text-muted-foreground",
    bg: "bg-muted border-border",
    badge: "Aviso",
    badgeClass: "bg-muted text-muted-foreground border-border",
  };
}

export function NotificationBell() {
  const qc = useQueryClient();
  const listFn = useServerFn(listMyNotifications);
  const countFn = useServerFn(countUnread);
  const markAllFn = useServerFn(markAllNotificationsRead);
  const markOneFn = useServerFn(markNotificationRead);
  const delFn = useServerFn(deleteNotification);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "sales" | "withdrawals">("all");

  const { data: notifs = [], isLoading } = useQuery<NotificationItem[]>({
    queryKey: ["notifications"],
    queryFn: () => listFn() as any,
    refetchInterval: 30_000,
  });

  const { data: unread = 0 } = useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: () => countFn() as any,
    refetchInterval: 30_000,
  });

  // Realtime Supabase Subscription
  useEffect(() => {
    let isCancelled = false;

    supabase.auth.getUser().then(({ data }) => {
      const uid = data.user?.id;
      if (!uid || isCancelled) return;

      const channel = supabase
        .channel(`realtime_notifications_${uid}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${uid}`,
          },
          (payload) => {
            const n = payload.new as NotificationItem;
            toast(n.title, {
              description: n.body ?? undefined,
              action: n.link
                ? {
                    label: "Abrir",
                    onClick: () => {
                      if (typeof window !== "undefined") window.location.href = n.link!;
                    },
                  }
                : undefined,
            });
            qc.invalidateQueries({ queryKey: ["notifications"] });
            qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
          },
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${uid}`,
          },
          () => {
            qc.invalidateQueries({ queryKey: ["notifications"] });
            qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
          },
        )
        .subscribe();

      (window as any).__notifChannel = channel;
    });

    return () => {
      isCancelled = true;
      const ch = (window as any).__notifChannel;
      if (ch) supabase.removeChannel(ch);
    };
  }, [qc]);

  // Filtered Notifications List
  const filteredNotifs = useMemo(() => {
    if (filter === "unread") return notifs.filter((n) => !n.read);
    if (filter === "sales")
      return notifs.filter(
        (n) =>
          n.type === "sale" ||
          n.title.toLowerCase().includes("venda") ||
          n.title.toLowerCase().includes("pedido"),
      );
    if (filter === "withdrawals")
      return notifs.filter(
        (n) =>
          n.type === "withdrawal" ||
          n.title.toLowerCase().includes("saque") ||
          n.title.toLowerCase().includes("levantamento"),
      );
    return notifs;
  }, [notifs, filter]);

  async function handleMarkAll() {
    try {
      await markAllFn();
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
      toast.success("Todas as notificações marcadas como lidas.");
    } catch {
      toast.error("Erro ao marcar notificações.");
    }
  }

  async function handleClickNotification(n: NotificationItem) {
    if (!n.read) {
      await markOneFn({ data: { id: n.id } });
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
    }
    setOpen(false);
  }

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await delFn({ data: { id } });
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
    } catch {
      toast.error("Erro ao eliminar notificação.");
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Central de Notificações"
          className="relative h-10 w-10 grid place-items-center rounded-xl border border-border bg-card/80 hover:bg-accent/50 hover:border-gold/40 transition active:scale-95 shadow-sm"
        >
          <Bell className="h-5 w-5 text-foreground" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-extrabold grid place-items-center animate-pulse shadow-md border-2 border-background">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[94vw] max-w-[420px] p-0 bg-card border-border shadow-2xl rounded-2xl overflow-hidden z-50 animate-in fade-in-50 zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-border bg-card/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg gradient-brand grid place-items-center text-primary-foreground">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
                Notificações
                {unread > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary-glow text-[11px] font-semibold border border-primary/30">
                    {unread} nova{unread > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>

          {unread > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAll}
              className="h-7 px-2 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <CheckCheck className="h-3.5 w-3.5 mr-1 text-gold" /> Marcar lidas
            </Button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="px-3 py-2 border-b border-border/60 bg-muted/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filter === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Todas ({notifs.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filter === "unread"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Não lidas ({unread})
          </button>
          <button
            onClick={() => setFilter("sales")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filter === "sales"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Vendas
          </button>
          <button
            onClick={() => setFilter("withdrawals")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filter === "withdrawals"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Saques
          </button>
        </div>

        {/* List */}
        <div className="max-h-[380px] sm:max-h-[440px] overflow-y-auto divide-y divide-border/60">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              A carregar notificações...
            </div>
          ) : filteredNotifs.length === 0 ? (
            <div className="py-12 px-6 text-center">
              <div className="h-12 w-12 rounded-2xl bg-muted grid place-items-center mx-auto text-muted-foreground/60 mb-3">
                <Bell className="h-6 w-6" />
              </div>
              <p className="font-semibold text-sm text-foreground">Sem notificações</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[240px] mx-auto">
                {filter === "unread"
                  ? "Todas as suas notificações foram lidas."
                  : "Quando receber vendas ou atualizações de saque, elas surgirão aqui."}
              </p>
            </div>
          ) : (
            filteredNotifs.map((n) => {
              const visual = getNotificationVisuals(n.type, n.title);
              const VisualIcon = visual.icon;

              const content = (
                <div
                  className={`flex items-start gap-3 p-3.5 sm:p-4 hover:bg-accent/40 transition group cursor-pointer ${
                    !n.read ? "bg-primary/[0.04]" : ""
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-xl grid place-items-center shrink-0 border ${visual.bg} ${visual.color}`}
                  >
                    <VisualIcon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${visual.badgeClass}`}
                      >
                        {visual.badge}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {timeAgo(n.created_at)}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-xs sm:text-sm leading-snug ${
                          !n.read ? "font-bold text-foreground" : "font-medium text-foreground/90"
                        }`}
                      >
                        {n.title}
                      </h4>
                      {!n.read && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                      )}
                    </div>

                    {n.body && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {n.body}
                      </p>
                    )}

                    {n.link && (
                      <div className="mt-2 flex items-center text-[11px] font-semibold text-gold group-hover:underline">
                        Ver detalhes <ExternalLink className="h-3 w-3 ml-1" />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleDelete(n.id, e)}
                    title="Eliminar"
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground/60 hover:text-destructive p-1 rounded-md transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );

              return (
                <div key={n.id}>
                  {n.link ? (
                    <Link to={n.link} onClick={() => handleClickNotification(n)}>
                      {content}
                    </Link>
                  ) : (
                    <div onClick={() => handleClickNotification(n)}>{content}</div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 border-t border-border bg-card/90 flex items-center justify-between text-xs text-muted-foreground">
          <Link
            to="/perfil"
            onClick={() => setOpen(false)}
            className="hover:text-gold transition font-medium"
          >
            Configurar Notificações & Push
          </Link>
          <span>InfroPay Live</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
