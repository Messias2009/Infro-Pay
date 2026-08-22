import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { r as getAllAdminProducts } from "./products.service-DAm7Wd7_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adm.produtos-DqCrHr6Q.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/adm.produtos.tsx?tsr-split=component";
function fmt(cents, currency) {
	try {
		return new Intl.NumberFormat("pt-PT", {
			style: "currency",
			currency
		}).format(cents / 100);
	} catch {
		return `${currency} ${(cents / 100).toFixed(2)}`;
	}
}
var BADGE = {
	publicado: "bg-success/15 text-success",
	em_analise: "bg-gold/15 text-gold",
	rascunho: "bg-muted text-muted-foreground",
	pausado: "bg-warning/15 text-warning"
};
function TodosProdutos() {
	const { data } = useQuery({
		queryKey: ["admin", "all-products"],
		queryFn: () => getAllAdminProducts()
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs uppercase tracking-widest text-gold font-semibold",
				children: "Administração"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 28,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-3xl md:text-4xl font-bold mt-2",
				children: "Todos os produtos"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 rounded-2xl border border-border bg-card overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-[1fr_120px_120px_120px] gap-4 px-5 py-3 border-b border-border text-xs uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Produto" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 33,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Estado" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 34,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Preço" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 35,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Vendas" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 36,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 9
					}, this),
					(data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/produto/$slug",
						params: { slug: p.slug },
						className: "grid grid-cols-[1fr_120px_120px_120px] gap-4 px-5 py-3 border-b border-border last:border-0 items-center hover:bg-accent/30",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-gold/10 overflow-hidden shrink-0",
									children: p.cover_url && /* @__PURE__ */ (void 0)("img", {
										src: p.cover_url,
										alt: "",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 43,
										columnNumber: 33
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 42,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-medium truncate",
										children: p.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 46,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground truncate",
										children: p.producer?.full_name ?? "—"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 47,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 45,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 41,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${BADGE[p.status] ?? BADGE.rascunho}`,
								children: p.status
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 53,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 52,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-sm",
								children: fmt(p.price_cents, p.currency)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 57,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-sm",
								children: p.sales_count
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 58,
								columnNumber: 13
							}, this)
						]
					}, p.id, true, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 39
					}, this)),
					(!data || data.length === 0) && /* @__PURE__ */ (void 0)("div", {
						className: "p-10 text-center text-muted-foreground",
						children: "Sem produtos."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 60,
						columnNumber: 42
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 27,
		columnNumber: 10
	}, this);
}
//#endregion
export { TodosProdutos as component };
