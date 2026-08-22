import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Route$34, d as catsOpt, h as prodsOpt } from "./router-DcboVFjc.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { dt as Flame, m as Star, v as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as SiteLayout } from "./SiteLayout-BFBAQL8A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loja-D2wb7fxU.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/site/ProductCard.tsx";
function formatPrice(cents, currency) {
	const value = cents / 100;
	try {
		return new Intl.NumberFormat("pt-PT", {
			style: "currency",
			currency
		}).format(value);
	} catch {
		return `${currency} ${value.toFixed(2)}`;
	}
}
function ProductCard({ product }) {
	const hasPromo = product.promo_price_cents && product.promo_price_cents < product.price_cents;
	const off = hasPromo ? Math.round(100 - product.promo_price_cents / product.price_cents * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: "/produto/$slug",
		params: { slug: product.slug },
		className: "group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/20 to-gold/10",
			children: [
				product.cover_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: product.cover_url,
					alt: product.title,
					loading: "lazy",
					className: "h-full w-full object-cover transition duration-700 group-hover:scale-110"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 40,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid h-full w-full place-items-center text-muted-foreground/40",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-12 w-12" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 48,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 47,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-80" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 51,
					columnNumber: 9
				}, this),
				hasPromo && /* @__PURE__ */ (void 0)("div", {
					className: "absolute left-3 top-3 rounded-full gradient-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-foreground shadow-gold",
					children: [
						"-",
						off,
						"%"
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 53,
					columnNumber: 11
				}, this),
				product.category && /* @__PURE__ */ (void 0)("div", {
					className: "absolute right-3 top-3 rounded-full glass px-2.5 py-1 text-[10px] font-medium",
					children: product.category.name
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 58,
					columnNumber: 11
				}, this),
				(product.sales_count ?? 0) > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full glass px-2.5 py-1 text-[10px] font-medium",
					children: [
						/* @__PURE__ */ (void 0)(Flame, { className: "h-3 w-3 text-gold" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 64,
							columnNumber: 13
						}, this),
						" ",
						product.sales_count,
						" vendas"
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 63,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 38,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-1 flex-col gap-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-display font-semibold leading-tight line-clamp-2 transition group-hover:text-primary-glow",
					children: product.title
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 69,
					columnNumber: 9
				}, this),
				product.short_description && /* @__PURE__ */ (void 0)("p", {
					className: "line-clamp-2 text-xs text-muted-foreground",
					children: product.short_description
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 73,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-auto flex items-end justify-between gap-2 pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0",
						children: hasPromo ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs text-muted-foreground line-through",
							children: formatPrice(product.price_cents, product.currency)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 79,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-lg font-bold text-gradient-gold",
							children: formatPrice(product.promo_price_cents, product.currency)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 82,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 78,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-lg font-bold",
							children: formatPrice(product.price_cents, product.currency)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 87,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 76,
						columnNumber: 11
					}, this), (product.rating ?? 0) > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex shrink-0 items-center gap-1 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-3 w-3 fill-gold text-gold" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 94,
								columnNumber: 15
							}, this),
							Number(product.rating).toFixed(1),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "opacity-60",
								children: [
									"(",
									product.reviews_count ?? 0,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 96,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 93,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "shrink-0 rounded-full border border-primary/40 px-2.5 py-1 text-[10px] font-semibold text-primary-glow opacity-0 transition group-hover:opacity-100",
						children: "Ver detalhes"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 99,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 75,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 68,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 33,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/loja.tsx?tsr-split=component";
function Loja() {
	const { cat } = Route$34.useSearch();
	const { data: cats } = useSuspenseQuery(catsOpt);
	const { data: products } = useSuspenseQuery(prodsOpt(cat));
	const current = cats.find((c) => c.slug === cat);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, {
		variant: "loja",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "border-b border-border/60 bg-card/30",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-10",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-gold",
					children: "Loja"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-2 text-3xl md:text-4xl font-bold",
					children: current?.name ?? "Todos os produtos"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 21,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-2 overflow-x-auto pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/loja",
					className: `shrink-0 px-3 py-1.5 rounded-full text-sm border ${!cat ? "gradient-brand text-primary-foreground border-transparent" : "border-border bg-card hover:bg-accent/40"}`,
					children: "Todos"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 11
				}, this), cats.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/loja",
					search: { cat: c.slug },
					className: `shrink-0 px-3 py-1.5 rounded-full text-sm border ${cat === c.slug ? "gradient-brand text-primary-foreground border-transparent" : "border-border bg-card hover:bg-accent/40"}`,
					children: c.name
				}, c.id, false, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 26
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 30,
				columnNumber: 9
			}, this), products.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-10 w-10 text-muted-foreground/60 mx-auto mb-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-xl font-semibold",
						children: "Sem produtos nesta categoria."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 43,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Volte em breve ou explore outras categorias."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 44,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 34
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2",
				children: products.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, { product: p }, p.slug, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 32
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 20
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 29,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 10
	}, this);
}
//#endregion
export { Loja as component };
