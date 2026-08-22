import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { listAdminLogs } from "./admin.functions-C-gZNnTo.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { At as CircleCheck, E as ScrollText, Et as CircleX, Gt as Ban, Wt as Banknote, b as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adm.logs-D3WNVQAJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/adm.logs.tsx?tsr-split=component";
var FILTERS = [
	{
		value: "",
		label: "Todas"
	},
	{
		value: "product_approved",
		label: "Produtos aprovados"
	},
	{
		value: "product_rejected",
		label: "Produtos rejeitados"
	},
	{
		value: "user_banned",
		label: "Bloqueios"
	},
	{
		value: "user_unbanned",
		label: "Desbloqueios"
	},
	{
		value: "withdrawal_aprovado",
		label: "Saques aprovados"
	},
	{
		value: "withdrawal_pago",
		label: "Saques pagos"
	},
	{
		value: "withdrawal_recusado",
		label: "Saques recusados"
	}
];
function meta(action) {
	if (action === "product_approved") return {
		Icon: CircleCheck,
		color: "text-success",
		label: "Produto aprovado"
	};
	if (action === "product_rejected") return {
		Icon: CircleX,
		color: "text-destructive",
		label: "Produto rejeitado"
	};
	if (action === "user_banned") return {
		Icon: Ban,
		color: "text-destructive",
		label: "Conta bloqueada"
	};
	if (action === "user_unbanned") return {
		Icon: ShieldCheck,
		color: "text-success",
		label: "Conta desbloqueada"
	};
	if (action.startsWith("withdrawal_")) return {
		Icon: Banknote,
		color: "text-gold",
		label: `Saque · ${action.replace("withdrawal_", "")}`
	};
	return {
		Icon: ScrollText,
		color: "text-muted-foreground",
		label: action
	};
}
function Page() {
	const listFn = useServerFn(listAdminLogs);
	const [action, setAction] = (0, import_react.useState)("");
	const { data, isLoading } = useQuery({
		queryKey: [
			"adm",
			"logs",
			action
		],
		queryFn: () => listFn({ data: { action: action || void 0 } })
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-4xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-widest text-gold font-semibold",
					children: "Administração"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-3xl md:text-4xl font-bold mt-2",
					children: "Logs de auditoria"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "Registo automático de todas as decisões administrativas."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 83,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2",
				children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setAction(f.value),
					className: `px-3 py-1.5 rounded-full text-xs font-medium transition ${action === f.value ? "bg-gold/15 text-gold" : "bg-secondary text-muted-foreground hover:text-foreground"}`,
					children: f.label
				}, f.value, false, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 27
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 7
			}, this),
			isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-sm text-muted-foreground",
				children: "A carregar..."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 20
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
				className: "relative border-l border-border ml-3 space-y-4",
				children: [(data ?? []).map((l) => {
					const m = meta(l.action);
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "ml-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "absolute -left-[13px] h-6 w-6 rounded-full bg-card border border-border grid place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(m.Icon, { className: `h-3.5 w-3.5 ${m.color}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border bg-card p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-medium text-sm",
										children: m.label
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 103,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground",
										children: new Date(l.created_at).toLocaleString("pt-PT")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 104,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 102,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground mt-1",
									children: [
										"por ",
										l.admin_name ?? "admin",
										" · ",
										l.target_type,
										" ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono",
											children: String(l.target_id ?? "").slice(0, 8)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 110,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 108,
									columnNumber: 19
								}, this),
								l.details && Object.keys(l.details).length > 0 && /* @__PURE__ */ (void 0)("pre", {
									className: "mt-2 text-[11px] text-muted-foreground bg-secondary/50 rounded-lg p-2 overflow-x-auto",
									children: JSON.stringify(l.details)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 70
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 17
						}, this)]
					}, l.id, true, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 16
					}, this);
				}), !(data ?? []).length && /* @__PURE__ */ (void 0)("li", {
					className: "ml-6 text-sm text-muted-foreground",
					children: "Nenhum registo ainda."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 36
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 89
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 77,
		columnNumber: 10
	}, this);
}
//#endregion
export { Page as component };
