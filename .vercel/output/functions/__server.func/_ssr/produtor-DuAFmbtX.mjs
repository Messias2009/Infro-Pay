import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, m as Outlet, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { isAdmin } from "./admin.functions-C-gZNnTo.mjs";
import { v as useAuth } from "./router-DcboVFjc.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as infropay_mark_default } from "./infropay-mark-CgfXU-W0.mjs";
import { B as Package, C as Settings, Dt as CircleUserRound, F as Plus, I as Plug, Jt as ArrowUpRight, Lt as CheckCheck, Q as LayoutDashboard, U as Menu, Ut as Bell, Wt as Banknote, c as Trophy, ct as GraduationCap, d as Trash2, gt as ExternalLink, i as Wallet, rt as Info, st as Handshake, t as Zap, u as TrendingUp, v as ShoppingBag, wt as Clock, x as ShieldAlert, y as Shield } from "../_libs/lucide-react.mjs";
import { r as cn, t as Button } from "./button-2_3vHNWL.mjs";
import { a as markAllNotificationsRead, i as listMyNotifications, n as deleteNotification, o as markNotificationRead, t as countUnread } from "./notifications.functions-Do4Q97fz.mjs";
import { t as supabase } from "./client-DKzLsRIz.mjs";
import { a as SheetTrigger, n as SheetContent, t as Sheet } from "./sheet-DTTtJ7cS.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/radix-ui__react-popover.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor-DuAFmbtX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$2 = "/app/applet/src/components/ui/popover.tsx";
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Portal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 17,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 16,
	columnNumber: 3
}, void 0));
PopoverContent.displayName = Content2.displayName;
var _jsxFileName$1 = "/app/applet/src/components/notifications/NotificationBell.tsx";
function timeAgo(iso) {
	const diff = (Date.now() - new Date(iso).getTime()) / 1e3;
	if (diff < 60) return "Agora";
	if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
	if (diff < 86400) return `${Math.floor(diff / 3600)} h atrás`;
	const days = Math.floor(diff / 86400);
	return `${days} dia${days > 1 ? "s" : ""} atrás`;
}
function getNotificationVisuals(type, title) {
	const lower = (type + " " + title).toLowerCase();
	if (lower.includes("venda") || lower.includes("sale") || lower.includes("vendido")) return {
		icon: ShoppingBag,
		color: "text-success",
		bg: "bg-success/15 border-success/30",
		badge: "Venda",
		badgeClass: "bg-success/20 text-success border-success/30"
	};
	if (lower.includes("saque aprovado") || lower.includes("levantamento aprovado") || lower.includes("pago")) return {
		icon: Banknote,
		color: "text-gold",
		bg: "bg-gold/15 border-gold/30",
		badge: "Saque Aprovado",
		badgeClass: "bg-gold/20 text-gold border-gold/30"
	};
	if (lower.includes("saque recusado") || lower.includes("recusado") || lower.includes("rejeitado")) return {
		icon: ShieldAlert,
		color: "text-destructive",
		bg: "bg-destructive/15 border-destructive/30",
		badge: "Recusado",
		badgeClass: "bg-destructive/20 text-destructive border-destructive/30"
	};
	if (lower.includes("saque") || lower.includes("levantamento") || lower.includes("processamento")) return {
		icon: Clock,
		color: "text-primary-glow",
		bg: "bg-primary/15 border-primary/30",
		badge: "Saque",
		badgeClass: "bg-primary/20 text-primary-glow border-primary/30"
	};
	if (lower.includes("segurança") || lower.includes("security")) return {
		icon: ShieldAlert,
		color: "text-amber-400",
		bg: "bg-amber-400/15 border-amber-400/30",
		badge: "Segurança",
		badgeClass: "bg-amber-400/20 text-amber-400 border-amber-400/30"
	};
	if (lower.includes("atualização") || lower.includes("update") || lower.includes("novidade")) return {
		icon: Zap,
		color: "text-blue-400",
		bg: "bg-blue-400/15 border-blue-400/30",
		badge: "Novidade",
		badgeClass: "bg-blue-400/20 text-blue-400 border-blue-400/30"
	};
	return {
		icon: Info,
		color: "text-muted-foreground",
		bg: "bg-muted border-border",
		badge: "Aviso",
		badgeClass: "bg-muted text-muted-foreground border-border"
	};
}
function NotificationBell() {
	const qc = useQueryClient();
	const listFn = useServerFn(listMyNotifications);
	const countFn = useServerFn(countUnread);
	const markAllFn = useServerFn(markAllNotificationsRead);
	const markOneFn = useServerFn(markNotificationRead);
	const delFn = useServerFn(deleteNotification);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const { data: notifs = [], isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => listFn(),
		refetchInterval: 3e4
	});
	const { data: unread = 0 } = useQuery({
		queryKey: ["notifications", "unread"],
		queryFn: () => countFn(),
		refetchInterval: 3e4
	});
	(0, import_react.useEffect)(() => {
		let isCancelled = false;
		supabase.auth.getUser().then(({ data }) => {
			const uid = data.user?.id;
			if (!uid || isCancelled) return;
			const channel = supabase.channel(`realtime_notifications_${uid}`).on("postgres_changes", {
				event: "INSERT",
				schema: "public",
				table: "notifications",
				filter: `user_id=eq.${uid}`
			}, (payload) => {
				const n = payload.new;
				toast(n.title, {
					description: n.body ?? void 0,
					action: n.link ? {
						label: "Abrir",
						onClick: () => {
							if (typeof window !== "undefined") window.location.href = n.link;
						}
					} : void 0
				});
				qc.invalidateQueries({ queryKey: ["notifications"] });
				qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
			}).on("postgres_changes", {
				event: "*",
				schema: "public",
				table: "notifications",
				filter: `user_id=eq.${uid}`
			}, () => {
				qc.invalidateQueries({ queryKey: ["notifications"] });
				qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
			}).subscribe();
			window.__notifChannel = channel;
		});
		return () => {
			isCancelled = true;
			const ch = window.__notifChannel;
			if (ch) supabase.removeChannel(ch);
		};
	}, [qc]);
	const filteredNotifs = (0, import_react.useMemo)(() => {
		if (filter === "unread") return notifs.filter((n) => !n.read);
		if (filter === "sales") return notifs.filter((n) => n.type === "sale" || n.title.toLowerCase().includes("venda") || n.title.toLowerCase().includes("pedido"));
		if (filter === "withdrawals") return notifs.filter((n) => n.type === "withdrawal" || n.title.toLowerCase().includes("saque") || n.title.toLowerCase().includes("levantamento"));
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
	async function handleClickNotification(n) {
		if (!n.read) {
			await markOneFn({ data: { id: n.id } });
			qc.invalidateQueries({ queryKey: ["notifications"] });
			qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
		}
		setOpen(false);
	}
	async function handleDelete(id, e) {
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				"aria-label": "Central de Notificações",
				className: "relative h-10 w-10 grid place-items-center rounded-xl border border-border bg-card/80 hover:bg-accent/50 hover:border-gold/40 transition active:scale-95 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-5 w-5 text-foreground" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 276,
					columnNumber: 11
				}, this), unread > 0 && /* @__PURE__ */ (void 0)("span", {
					className: "absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-extrabold grid place-items-center animate-pulse shadow-md border-2 border-background",
					children: unread > 99 ? "99+" : unread
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 278,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 272,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 271,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PopoverContent, {
			align: "end",
			sideOffset: 8,
			className: "w-[94vw] max-w-[420px] p-0 bg-card border-border shadow-2xl rounded-2xl overflow-hidden z-50 animate-in fade-in-50 zoom-in-95 duration-150",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-4 py-3.5 border-b border-border bg-card/90 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-7 w-7 rounded-lg gradient-brand grid place-items-center text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 294,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 293,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "font-bold text-sm text-foreground flex items-center gap-1.5",
							children: ["Notificações", unread > 0 && /* @__PURE__ */ (void 0)("span", {
								className: "px-1.5 py-0.2 rounded-full bg-primary/20 text-primary-glow text-[11px] font-semibold border border-primary/30",
								children: [
									unread,
									" nova",
									unread > 1 ? "s" : ""
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 300,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 297,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 296,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 292,
						columnNumber: 11
					}, this), unread > 0 && /* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: handleMarkAll,
						className: "h-7 px-2 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent",
						children: [/* @__PURE__ */ (void 0)(CheckCheck, { className: "h-3.5 w-3.5 mr-1 text-gold" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 315,
							columnNumber: 15
						}, this), " Marcar lidas"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 309,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 291,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-3 py-2 border-b border-border/60 bg-muted/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setFilter("all"),
							className: `px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${filter === "all" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: [
								"Todas (",
								notifs.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 322,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setFilter("unread"),
							className: `px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${filter === "unread" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: [
								"Não lidas (",
								unread,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 332,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setFilter("sales"),
							className: `px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${filter === "sales" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: "Vendas"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 342,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setFilter("withdrawals"),
							className: `px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${filter === "withdrawals" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
							children: "Saques"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 352,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 321,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-h-[380px] sm:max-h-[440px] overflow-y-auto divide-y divide-border/60",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "py-12 text-center text-xs text-muted-foreground",
						children: "A carregar notificações..."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 367,
						columnNumber: 13
					}, this) : filteredNotifs.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "py-12 px-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-12 w-12 rounded-2xl bg-muted grid place-items-center mx-auto text-muted-foreground/60 mb-3",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-6 w-6" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 373,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 372,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold text-sm text-foreground",
								children: "Sem notificações"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 375,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground mt-1 max-w-[240px] mx-auto",
								children: filter === "unread" ? "Todas as suas notificações foram lidas." : "Quando receber vendas ou atualizações de saque, elas surgirão aqui."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 376,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 371,
						columnNumber: 13
					}, this) : filteredNotifs.map((n) => {
						const visual = getNotificationVisuals(n.type, n.title);
						const VisualIcon = visual.icon;
						const content = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `flex items-start gap-3 p-3.5 sm:p-4 hover:bg-accent/40 transition group cursor-pointer ${!n.read ? "bg-primary/[0.04]" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `h-9 w-9 rounded-xl grid place-items-center shrink-0 border ${visual.bg} ${visual.color}`,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VisualIcon, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 396,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 393,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between gap-1.5 mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: `text-[10px] font-bold px-2 py-0.5 rounded-md border ${visual.badgeClass}`,
												children: visual.badge
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 401,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] text-muted-foreground",
												children: timeAgo(n.created_at)
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 406,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 400,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
												className: `text-xs sm:text-sm leading-snug ${!n.read ? "font-bold text-foreground" : "font-medium text-foreground/90"}`,
												children: n.title
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 412,
												columnNumber: 23
											}, this), !n.read && /* @__PURE__ */ (void 0)("span", { className: "h-2 w-2 rounded-full bg-primary shrink-0 mt-1" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 420,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 411,
											columnNumber: 21
										}, this),
										n.body && /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed",
											children: n.body
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 425,
											columnNumber: 23
										}, this),
										n.link && /* @__PURE__ */ (void 0)("div", {
											className: "mt-2 flex items-center text-[11px] font-semibold text-gold group-hover:underline",
											children: ["Ver detalhes ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "h-3 w-3 ml-1" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 432,
												columnNumber: 38
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 431,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 399,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: (e) => handleDelete(n.id, e),
									title: "Eliminar",
									className: "opacity-0 group-hover:opacity-100 text-muted-foreground/60 hover:text-destructive p-1 rounded-md transition",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 442,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 437,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 388,
							columnNumber: 17
						}, this);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: n.link ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: n.link,
							onClick: () => handleClickNotification(n),
							children: content
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 450,
							columnNumber: 21
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							onClick: () => handleClickNotification(n),
							children: content
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 454,
							columnNumber: 21
						}, this) }, n.id, false, {
							fileName: _jsxFileName$1,
							lineNumber: 448,
							columnNumber: 17
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 365,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-2.5 border-t border-border bg-card/90 flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/perfil",
						onClick: () => setOpen(false),
						className: "hover:text-gold transition font-medium",
						children: "Configurar Notificações & Push"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 464,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "InfroPay Live" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 471,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 463,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 285,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 270,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.tsx?tsr-split=component";
var items = [
	{
		to: "/produtor",
		icon: LayoutDashboard,
		label: "Dashboard",
		exact: true
	},
	{
		to: "/produtor/produtos",
		icon: Package,
		label: "Produtos"
	},
	{
		to: "/produtor/novo",
		icon: Plus,
		label: "Novo produto"
	},
	{
		to: "/produtor/funil",
		icon: TrendingUp,
		label: "Funil de vendas"
	},
	{
		to: "/membros",
		icon: GraduationCap,
		label: "Área de membros"
	},
	{
		to: "/produtor/financeiro",
		icon: Wallet,
		label: "Financeiro"
	},
	{
		to: "/produtor/saques",
		icon: Banknote,
		label: "Saques"
	},
	{
		to: "/produtor/conquistas",
		icon: Trophy,
		label: "Conquistas"
	},
	{
		to: "/afiliados",
		icon: Handshake,
		label: "Afiliados"
	},
	{
		to: "/produtor/integracoes",
		icon: Plug,
		label: "Integrações"
	},
	{
		to: "/perfil",
		icon: CircleUserRound,
		label: "Meu perfil"
	}
];
function NavBody({ pathname, admin, onNav }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
		className: "p-3 space-y-1 flex-1 overflow-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-[10px] uppercase tracking-widest text-muted-foreground px-3 py-2",
				children: "Produtor"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 68,
				columnNumber: 9
			}, this),
			items.map((i) => {
				const isActive = i.exact ? pathname === i.to : pathname === i.to || pathname.startsWith(i.to + "/");
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: i.to,
					onClick: onNav,
					className: `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive ? "gradient-brand text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(i.icon, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 15
					}, this), i.label]
				}, i.to, true, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 16
				}, this);
			}),
			admin && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("div", {
				className: "text-[10px] uppercase tracking-widest text-gold px-3 pt-6 pb-2 font-bold flex items-center gap-1.5",
				children: [/* @__PURE__ */ (void 0)(Shield, { className: "h-3.5 w-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 15
				}, this), "Administração"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 13
			}, this), /* @__PURE__ */ (void 0)(Link, {
				to: "/adm/usuarios",
				onClick: onNav,
				className: `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${pathname.startsWith("/adm") ? "bg-gold/15 text-gold font-medium" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"}`,
				children: [/* @__PURE__ */ (void 0)(Shield, { className: "h-4 w-4 text-gold" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 15
				}, this), " Painel Admin Geral"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 19
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 67,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-3 border-t border-border space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/",
			onClick: onNav,
			className: "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "h-4 w-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 11
			}, this), " Ver site"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 90,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/perfil",
			onClick: onNav,
			className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "h-4 w-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 11
			}, this), " Configurações"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 93,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 89,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 66,
		columnNumber: 10
	}, this);
}
function ProdutorLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, isAdmin: authIsAdmin } = useAuth();
	const adminServerFn = useServerFn(isAdmin);
	const { data: serverAdmin } = useQuery({
		queryKey: ["is-admin"],
		queryFn: () => adminServerFn(),
		staleTime: 6e4
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const isUserAdmin = authIsAdmin || user?.uid === "rsKuyZLn7gbRulIKz5WpxpgqJDo2" || user?.email?.toLowerCase() === "infropayao@gmail.com" || !!serverAdmin;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen flex",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: "hidden md:flex w-64 border-r border-border bg-card/40 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/",
				className: "p-5 flex items-center gap-2.5 border-b border-border",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: infropay_mark_default,
					alt: "InfroPay",
					width: 512,
					height: 512,
					className: "h-9 w-9 rounded-lg object-contain"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-lg font-bold leading-none",
					children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-gradient-gold",
						children: "Pay"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 20
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 122,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-[10px] text-muted-foreground mt-0.5",
					children: "painel do produtor"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 125,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavBody, {
				pathname,
				admin: isUserAdmin
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 118,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "sticky top-0 z-30 flex items-center justify-between gap-3 px-4 md:px-6 h-14 border-b border-border bg-background/85 backdrop-blur",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "flex items-center gap-2 md:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: infropay_mark_default,
							alt: "InfroPay",
							className: "h-7 w-7 rounded-md object-contain"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-sm font-bold leading-none",
							children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-gold",
								children: "Pay"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 20
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Painel do produtor" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 13
						}, this), isUserAdmin && /* @__PURE__ */ (void 0)("span", {
							className: "bg-gold/20 text-gold font-bold text-[10px] px-2 py-0.5 rounded-full",
							children: "Admin"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 142,
							columnNumber: 29
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NotificationBell, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 147,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									"aria-label": "Abrir menu",
									className: "md:hidden h-10 w-10 grid place-items-center rounded-lg border border-border bg-card active:scale-95 transition",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 151,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 150,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetContent, {
								side: "right",
								className: "w-[86%] max-w-sm p-0 flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "p-4 border-b border-border flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: infropay_mark_default,
										alt: "",
										className: "h-8 w-8 rounded-md"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 156,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-base font-bold",
										children: "Menu do produtor"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 157,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 155,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavBody, {
									pathname,
									admin: isUserAdmin,
									onNav: () => setOpen(false)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 148,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 133,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 165,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 131,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 117,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProdutorLayout as component };
