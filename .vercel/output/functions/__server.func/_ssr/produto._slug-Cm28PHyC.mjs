import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as opt, i as Route$22 } from "./router-DcboVFjc.mjs";
import { n as useSuspenseQuery, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Xt as ArrowLeft, a as Users, b as ShieldCheck, m as Star, t as Zap, v as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { i as registerAffiliateClick } from "./affiliate.functions-gSyk7-3T.mjs";
import { t as SiteLayout } from "./SiteLayout-BFBAQL8A.mjs";
import { n as saveRef } from "./affiliate-ref-92K7BH3n.mjs";
import { r as getProductTracking, t as TrackingScripts } from "./TrackingScripts-ChKy1YKm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produto._slug-Cm28PHyC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/produto.$slug.tsx?tsr-split=component";
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
function Produto() {
	const { slug } = Route$22.useParams();
	const { data: p } = useSuspenseQuery(opt(slug));
	const { data: tracking } = useQuery({
		queryKey: [
			"tracking",
			"product",
			slug
		],
		queryFn: () => getProductTracking({ data: { slug } }),
		staleTime: 3e5
	});
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const ref = new URLSearchParams(window.location.search).get("ref");
		if (!ref) return;
		saveRef(slug, ref);
		const key = `infropay_ref_click_${slug}_${ref}`;
		if (window.sessionStorage.getItem(key)) return;
		window.sessionStorage.setItem(key, "1");
		registerAffiliateClick({ data: { code: ref } }).catch(() => {});
	}, [slug]);
	if (!p) return null;
	const hasPromo = p.promo_price_cents && p.promo_price_cents < p.price_cents;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, {
		variant: "loja",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrackingScripts, {
			config: tracking,
			event: {
				type: "ViewContent",
				id: p.id,
				name: p.title,
				value: (p.promo_price_cents && p.promo_price_cents < p.price_cents ? p.promo_price_cents : p.price_cents) / 100,
				currency: p.currency
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 61,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto w-full max-w-7xl px-3.5 sm:px-6 py-6 sm:py-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/loja",
				className: "inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4 mr-1.5 shrink-0" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 11
				}, this), " Voltar à loja"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 69,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-10 w-full items-start",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-full min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "aspect-video w-full rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-primary/20 to-gold/10",
						children: p.cover_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: p.cover_url,
							alt: p.title,
							className: "h-full w-full object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 30
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-full w-full grid place-items-center text-muted-foreground/40",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "h-16 w-16" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 77,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 111
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 sm:mt-8 w-full",
						children: [
							p.category && /* @__PURE__ */ (void 0)("div", {
								className: "inline-block rounded-full glass px-3 py-1 text-xs font-semibold mb-3",
								children: p.category.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 30
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-foreground break-words",
								children: p.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 85,
								columnNumber: 15
							}, this),
							p.short_description && /* @__PURE__ */ (void 0)("p", {
								className: "mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed",
								children: p.short_description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 88,
								columnNumber: 39
							}, this),
							p.description && /* @__PURE__ */ (void 0)("div", {
								className: "mt-8 sm:mt-10 prose prose-invert max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed text-sm sm:text-base break-words",
								children: p.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 33
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Benefit, {
										icon: ShieldCheck,
										title: "Garantia",
										desc: `${p.guarantee_days ?? 7} dias`
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 97,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Benefit, {
										icon: Zap,
										title: "Acesso",
										desc: "Entrega imediata"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 98,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Benefit, {
										icon: Users,
										title: "Vendas",
										desc: `${p.sales_count} vendidos`
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 99,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 96,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: "lg:sticky lg:top-24 h-fit w-full",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card w-full overflow-hidden",
						children: [
							hasPromo ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-sm text-muted-foreground line-through",
								children: fmt(p.price_cents, p.currency)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-4xl font-bold text-gradient-gold",
								children: fmt(p.promo_price_cents, p.currency)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 27
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-4xl font-bold",
								children: fmt(p.price_cents, p.currency)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 113,
								columnNumber: 23
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/checkout/$slug",
								params: { slug },
								className: "mt-6 block",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "lg",
									className: "w-full gradient-brand text-primary-foreground shadow-glow h-12 text-base",
									children: "Comprar agora"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 118,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
								className: "mt-6 space-y-2 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-success" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 125,
											columnNumber: 19
										}, this), " Compra protegida"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 124,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "h-4 w-4 text-gold" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 128,
											columnNumber: 19
										}, this), " Download imediato após pagamento"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 127,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-4 w-4 text-gold" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 131,
												columnNumber: 19
											}, this),
											" ",
											(p.rating ?? 0).toFixed(1),
											" (",
											p.reviews_count ?? 0,
											" avaliações)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 130,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 15
							}, this),
							p.producer && /* @__PURE__ */ (void 0)("div", {
								className: "mt-6 pt-6 border-t border-border flex items-center gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "h-10 w-10 rounded-full bg-secondary grid place-items-center overflow-hidden",
									children: p.producer.avatar_url ? /* @__PURE__ */ (void 0)("img", {
										src: p.producer.avatar_url,
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 138,
										columnNumber: 55
									}, this) : /* @__PURE__ */ (void 0)(Users, { className: "h-5 w-5 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 138,
										columnNumber: 141
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 137,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "text-sm",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-xs text-muted-foreground",
										children: "Produtor"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "font-semibold",
										children: p.producer.full_name ?? p.producer.username ?? "Anónimo"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 142,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 30
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 104,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 68,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 10
	}, this);
}
function Benefit({ icon: Icon, title, desc }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-xl border border-border bg-card/50 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5 text-gold" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 165,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-2 font-semibold text-sm",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 166,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs text-muted-foreground",
				children: desc
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 167,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 164,
		columnNumber: 10
	}, this);
}
//#endregion
export { Produto as component };
