import { d as useRouterState, m as Outlet, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { bootstrapAdmin, isAdmin } from "./admin.functions-C-gZNnTo.mjs";
import { v as useAuth } from "./router-DcboVFjc.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as infropay_mark_default } from "./infropay-mark-CgfXU-W0.mjs";
import { B as Package, E as ScrollText, Jt as ArrowUpRight, Rt as ChartColumn, Ut as Bell, Wt as Banknote, a as Users, b as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adm-BfVmK20Y.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/adm.tsx?tsr-split=component";
var items = [
	{
		to: "/adm",
		icon: ShieldCheck,
		label: "Aprovações",
		exact: true
	},
	{
		to: "/adm/usuarios",
		icon: Users,
		label: "Usuários & Vendedores"
	},
	{
		to: "/adm/notificacoes",
		icon: Bell,
		label: "Notificações & Broadcast"
	},
	{
		to: "/adm/produtos",
		icon: Package,
		label: "Todos os produtos"
	},
	{
		to: "/adm/relatorios",
		icon: ChartColumn,
		label: "Relatórios"
	},
	{
		to: "/adm/logs",
		icon: ScrollText,
		label: "Logs"
	},
	{
		to: "/adm/saques",
		icon: Banknote,
		label: "Saques"
	}
];
function AdmLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, isAdmin: authIsAdmin, loading: authLoading } = useAuth();
	const adminServerFn = useServerFn(isAdmin);
	useServerFn(bootstrapAdmin);
	const { data: serverAdmin, isLoading: serverLoading, refetch } = useQuery({
		queryKey: ["is-admin"],
		queryFn: () => adminServerFn()
	});
	const isUserAdmin = authIsAdmin || user?.uid === "rsKuyZLn7gbRulIKz5WpxpgqJDo2" || user?.email?.toLowerCase() === "infropayao@gmail.com" || !!serverAdmin;
	if (authLoading && serverLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-10 text-muted-foreground",
		children: "A verificar permissões..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 72,
		columnNumber: 12
	}, this);
	if (!isUserAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen grid place-items-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md w-full rounded-2xl border border-border bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-14 w-14 rounded-2xl bg-gold/15 grid place-items-center mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-7 w-7 text-gold" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-2xl font-bold mt-4",
					children: "Acesso restrito"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 80,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "Esta área é apenas para administradores autorizados da InfroPay."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor",
					className: "inline-block mt-6 px-4 py-2 rounded-lg bg-gold text-primary-foreground text-sm font-medium hover:bg-gold/90 transition",
					children: "← Voltar ao meu painel"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 76,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 75,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen flex",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: "hidden md:flex w-64 border-r border-border bg-card/40 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "p-5 flex items-center gap-2.5 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: infropay_mark_default,
						alt: "",
						width: 512,
						height: 512,
						className: "h-9 w-9 rounded-lg object-contain"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-lg font-bold leading-none",
						children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-gradient-gold",
							children: "Pay"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 96,
							columnNumber: 20
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-[10px] text-gold mt-0.5 font-semibold uppercase tracking-widest",
						children: "Admin"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "p-3 space-y-1 flex-1",
					children: items.map((i) => {
						const active = i.exact ? pathname === i.to : pathname === i.to || pathname.startsWith(i.to + "/");
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: i.to,
							className: `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${active ? "bg-gold/15 text-gold" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(i.icon, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 17
							}, this), i.label]
						}, i.to, true, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-3 border-t border-border",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/produtor",
						className: "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 13
						}, this), " Painel do produtor"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 min-w-0",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 118,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdmLayout as component };
