import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { F as Plus, P as Power, d as Trash2, p as Tag, u as TrendingUp } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-1I-ZqIzI.mjs";
import { n as kz } from "./FeeBanner-CDC3PD6P.mjs";
import { c as toggleCoupon, i as deleteOffer, l as toggleOffer, n as createOffer, o as listMyCoupons, r as deleteCoupon, s as listMyOffers, t as createCoupon } from "./funnel.functions-CzVEF5Dx.mjs";
import { n as listMyProducts } from "./products.functions-CKBjbvSb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.funil-DDxB13IF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.funil.tsx?tsr-split=component";
var KIND_LABEL = {
	order_bump: "Order bump",
	upsell: "Upsell",
	downsell: "Downsell"
};
function Page() {
	const prodFn = useServerFn(listMyProducts);
	const offersFn = useServerFn(listMyOffers);
	const couponsFn = useServerFn(listMyCoupons);
	const createOfferFn = useServerFn(createOffer);
	const delOfferFn = useServerFn(deleteOffer);
	const togOfferFn = useServerFn(toggleOffer);
	const createCouponFn = useServerFn(createCoupon);
	const delCouponFn = useServerFn(deleteCoupon);
	const togCouponFn = useServerFn(toggleCoupon);
	const { data: products } = useQuery({
		queryKey: ["producer", "products"],
		queryFn: () => prodFn()
	});
	const { data: offers, refetch: refetchOffers } = useQuery({
		queryKey: ["funnel", "offers"],
		queryFn: () => offersFn()
	});
	const { data: coupons, refetch: refetchCoupons } = useQuery({
		queryKey: ["funnel", "coupons"],
		queryFn: () => couponsFn()
	});
	const [offer, setOffer] = (0, import_react.useState)({
		product_id: "",
		offer_product_id: "",
		kind: "order_bump",
		headline: "",
		price: ""
	});
	const [coupon, setCoupon] = (0, import_react.useState)({
		code: "",
		product_id: "",
		discount_kind: "percentagem",
		discount_value: "",
		max_uses: ""
	});
	async function addOffer() {
		try {
			await createOfferFn({ data: {
				product_id: offer.product_id,
				offer_product_id: offer.offer_product_id,
				kind: offer.kind,
				headline: offer.headline || null,
				description: null,
				offer_price_cents: Math.round(Number(offer.price || 0) * 100),
				sort_order: 0
			} });
			toast.success("Oferta criada");
			setOffer({
				product_id: "",
				offer_product_id: "",
				kind: "order_bump",
				headline: "",
				price: ""
			});
			refetchOffers();
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function addCoupon() {
		try {
			await createCouponFn({ data: {
				code: coupon.code,
				product_id: coupon.product_id || null,
				discount_kind: coupon.discount_kind,
				discount_value: Number(coupon.discount_value || 0),
				max_uses: coupon.max_uses ? Number(coupon.max_uses) : null,
				expires_at: null
			} });
			toast.success("Cupão criado");
			setCoupon({
				code: "",
				product_id: "",
				discount_kind: "percentagem",
				discount_value: "",
				max_uses: ""
			});
			refetchCoupons();
		} catch (e) {
			toast.error(e.message);
		}
	}
	const list = products ?? [];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-6xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-widest text-gold font-semibold",
					children: "Conversão"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 116,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-3xl md:text-4xl font-bold mt-2",
					children: "Funil de vendas"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 117,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "Crie order bumps, upsells e cupões para aumentar o valor médio de cada compra."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border bg-card overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-6 py-4 border-b border-border flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "h-4 w-4 text-primary-glow" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display font-semibold text-lg",
							children: "Ofertas do funil"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-6 grid gap-4 md:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "md:col-span-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs",
									children: "Produto principal"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 131,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: offer.product_id,
									onValueChange: (v) => setOffer({
										...offer,
										product_id: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
										className: "mt-1.5",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Escolher" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 137,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: list.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: p.id,
										children: p.title
									}, p.id, false, {
										fileName: _jsxFileName,
										lineNumber: 140,
										columnNumber: 39
									}, this)) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 139,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 132,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "md:col-span-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs",
									children: "Produto ofertado"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: offer.offer_product_id,
									onValueChange: (v) => setOffer({
										...offer,
										offer_product_id: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
										className: "mt-1.5",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Escolher" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 153,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 152,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: list.filter((p) => p.id !== offer.product_id).map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: p.id,
										children: p.title
									}, p.id, false, {
										fileName: _jsxFileName,
										lineNumber: 156,
										columnNumber: 85
									}, this)) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 155,
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
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Tipo"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: offer.kind,
								onValueChange: (v) => setOffer({
									...offer,
									kind: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 169,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 168,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "order_bump",
										children: "Order bump"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 172,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "upsell",
										children: "Upsell"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "downsell",
										children: "Downsell"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 174,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 171,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 13
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 162,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Preço especial (Kz)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 179,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								className: "mt-1.5",
								type: "number",
								min: 0,
								step: "0.01",
								value: offer.price,
								onChange: (e) => setOffer({
									...offer,
									price: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 13
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-end",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									className: "w-full gradient-brand text-primary-foreground shadow-glow",
									disabled: !offer.product_id || !offer.offer_product_id || !offer.price,
									onClick: addOffer,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4 mr-1" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 187,
										columnNumber: 15
									}, this), " Adicionar"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 185,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "md:col-span-5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs",
									children: "Chamada da oferta (opcional)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									className: "mt-1.5",
									value: offer.headline,
									onChange: (e) => setOffer({
										...offer,
										headline: e.target.value
									}),
									placeholder: "Leve também o pack de templates com 60% off"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 9
					}, this),
					!offers?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-6 pb-6 text-sm text-muted-foreground",
						children: "Sem ofertas configuradas."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 28
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "divide-y divide-border border-t border-border",
						children: offers.map((o) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "px-6 py-4 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary-glow uppercase tracking-wider font-semibold",
									children: KIND_LABEL[o.kind]
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 201,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-sm font-medium truncate",
										children: o.offer?.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground truncate",
										children: [
											"no checkout de ",
											o.product?.title,
											" · ",
											o.headline || "sem chamada"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 206,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm font-semibold text-gradient-gold",
									children: kz(o.offer_price_cents)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									variant: "outline",
									onClick: async () => {
										await togOfferFn({ data: {
											id: o.id,
											active: !o.active
										} });
										refetchOffers();
									},
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Power, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 222,
										columnNumber: 19
									}, this), o.active ? "Ativa" : "Inativa"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									variant: "destructive",
									onClick: async () => {
										await delOfferFn({ data: { id: o.id } });
										refetchOffers();
									},
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 233,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 225,
									columnNumber: 17
								}, this)
							]
						}, o.id, true, {
							fileName: _jsxFileName,
							lineNumber: 200,
							columnNumber: 37
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 119
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border bg-card overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-6 py-4 border-b border-border flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { className: "h-4 w-4 text-gold" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 242,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display font-semibold text-lg",
							children: "Cupões de desconto"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 241,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-6 grid gap-4 md:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Código"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								className: "mt-1.5 uppercase",
								value: coupon.code,
								onChange: (e) => setCoupon({
									...coupon,
									code: e.target.value.toUpperCase()
								}),
								placeholder: "LANCAMENTO20"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 13
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Produto (opcional)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 254,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: coupon.product_id,
								onValueChange: (v) => setCoupon({
									...coupon,
									product_id: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Todos" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 260,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: list.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: p.id,
									children: p.title
								}, p.id, false, {
									fileName: _jsxFileName,
									lineNumber: 263,
									columnNumber: 39
								}, this)) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 255,
								columnNumber: 13
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 253,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Tipo"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 270,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
								value: coupon.discount_kind,
								onValueChange: (v) => setCoupon({
									...coupon,
									discount_kind: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 276,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 275,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "percentagem",
									children: "Percentagem (%)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 279,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "valor",
									children: "Valor fixo (Kz)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 280,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 278,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 271,
								columnNumber: 13
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: "Valor"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 285,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								className: "mt-1.5",
								type: "number",
								min: 1,
								value: coupon.discount_value,
								onChange: (e) => setCoupon({
									...coupon,
									discount_value: e.target.value
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 286,
								columnNumber: 13
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 284,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-end",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									className: "w-full gradient-brand text-primary-foreground shadow-glow",
									disabled: coupon.code.length < 3 || !coupon.discount_value,
									onClick: addCoupon,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4 mr-1" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 293,
										columnNumber: 15
									}, this), " Criar cupão"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 292,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 291,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 245,
						columnNumber: 9
					}, this),
					!coupons?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-6 pb-6 text-sm text-muted-foreground",
						children: "Sem cupões criados."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 298,
						columnNumber: 29
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "divide-y divide-border border-t border-border",
						children: coupons.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "px-6 py-4 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-sm font-bold text-gold",
									children: c.code
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 300,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1 text-xs text-muted-foreground truncate",
									children: [
										c.discount_kind === "percentagem" ? `${c.discount_value}% off` : `${kz(c.discount_value * 100)} off`,
										" ",
										"· ",
										c.product?.title ?? "todos os produtos",
										" · ",
										c.uses_count,
										" usos",
										c.max_uses ? ` / ${c.max_uses}` : ""
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 301,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									variant: "outline",
									onClick: async () => {
										await togCouponFn({ data: {
											id: c.id,
											active: !c.active
										} });
										refetchCoupons();
									},
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Power, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 315,
										columnNumber: 19
									}, this), c.active ? "Ativo" : "Inativo"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 306,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									variant: "destructive",
									onClick: async () => {
										await delCouponFn({ data: { id: c.id } });
										refetchCoupons();
									},
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 326,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 318,
									columnNumber: 17
								}, this)
							]
						}, c.id, true, {
							fileName: _jsxFileName,
							lineNumber: 299,
							columnNumber: 38
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 298,
						columnNumber: 114
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 240,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 114,
		columnNumber: 10
	}, this);
}
//#endregion
export { Page as component };
