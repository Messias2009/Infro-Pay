import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as opt$2, o as Route$25, y as createOrder } from "./router-DcboVFjc.mjs";
import { n as useSuspenseQuery, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as infropay_mark_default } from "./infropay-mark-CgfXU-W0.mjs";
import { At as CircleCheck, Bt as Building2, J as Lock, Kt as BadgeCheck, St as CreditCard, Xt as ArrowLeft, b as ShieldCheck, g as Smartphone, lt as Gift, t as Zap } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { t as SiteLayout } from "./SiteLayout-BFBAQL8A.mjs";
import { a as getCheckoutOffers } from "./funnel.functions-CzVEF5Dx.mjs";
import { t as getRef } from "./affiliate-ref-92K7BH3n.mjs";
import { r as getProductTracking, t as TrackingScripts } from "./TrackingScripts-ChKy1YKm.mjs";
import { t as infropay_logo_default } from "./infropay-logo-ItvwbTCR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout._slug-CGTsc3GK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/checkout.$slug.tsx?tsr-split=component";
var METHODS = [
	{
		id: "multicaixa_express",
		label: "Multicaixa Express",
		badge: "Recomendado · Instantâneo",
		desc: "Confirmação e liberação automática via app Multicaixa Express",
		icon: Smartphone,
		color: "text-primary"
	},
	{
		id: "referencia",
		label: "Referência Multicaixa",
		badge: "ATM / Multicaixa",
		desc: "Pague em qualquer Caixa Automático (ATM) ou Internet Banking",
		icon: CreditCard,
		color: "text-gold"
	},
	{
		id: "transferencia",
		label: "Transferência Bancária",
		badge: "IBAN Direto",
		desc: "Transferência interbancária com envio simples de comprovativo",
		icon: Building2,
		color: "text-emerald-500"
	}
];
function fmt(c, cur) {
	try {
		return new Intl.NumberFormat("pt-PT", {
			style: "currency",
			currency: cur
		}).format(c / 100);
	} catch {
		return `${cur} ${(c / 100).toFixed(2)}`;
	}
}
function Checkout() {
	const { slug } = Route$25.useParams();
	const router = useRouter();
	const { data: p } = useSuspenseQuery(opt$2(slug));
	const { data: tracking } = useQuery({
		queryKey: [
			"tracking",
			"product",
			slug
		],
		queryFn: () => getProductTracking({ data: { slug } }),
		staleTime: 3e5
	});
	const { data: offers } = useQuery({
		queryKey: ["checkout-offers", p?.id],
		queryFn: () => p?.id ? getCheckoutOffers({ data: { product_id: p.id } }) : Promise.resolve([]),
		enabled: !!p?.id,
		staleTime: 3e5
	});
	const orderBump = (0, import_react.useMemo)(() => {
		if (!offers || !Array.isArray(offers)) return null;
		return offers.find((o) => o.kind === "order_bump") ?? null;
	}, [offers]);
	const [includeBump, setIncludeBump] = (0, import_react.useState)(false);
	const [method, setMethod] = (0, import_react.useState)("multicaixa_express");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	if (!p) return null;
	const basePrice = p.promo_price_cents && p.promo_price_cents < p.price_cents ? p.promo_price_cents : p.price_cents;
	const totalPrice = basePrice + (includeBump && orderBump ? orderBump.offer_price_cents : 0);
	async function submit(e) {
		e.preventDefault();
		if (!name.trim()) {
			toast.error("Por favor, preencha o seu nome completo.");
			return;
		}
		if (!email.trim() || !email.includes("@")) {
			toast.error("Por favor, insira um email válido para receber o produto.");
			return;
		}
		if (!phone.trim()) {
			toast.error("Por favor, insira o seu número de telefone.");
			return;
		}
		setLoading(true);
		try {
			const ref = (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("ref") : null) ?? getRef(slug);
			const res = await createOrder({ data: {
				product_slug: slug,
				buyer_name: name.trim(),
				buyer_email: email.trim(),
				buyer_phone: phone.trim(),
				payment_method: method,
				ref,
				order_bump_offer_id: includeBump && orderBump ? orderBump.id : null
			} });
			toast.success("Pedido criado com sucesso! Prossiga com o pagamento.");
			router.navigate({
				to: "/pedido/$token",
				params: { token: res.token }
			});
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, {
		variant: "checkout",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrackingScripts, {
			config: tracking,
			event: {
				type: "InitiateCheckout",
				id: p.id,
				name: p.title,
				value: totalPrice / 100,
				currency: p.currency
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 142,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto w-full max-w-6xl px-3.5 sm:px-6 py-6 sm:py-8 md:py-12",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between gap-3 pb-5 mb-6 border-b border-border/60 w-full flex-wrap sm:flex-nowrap",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produto/$slug",
					params: { slug },
					className: "inline-flex items-center text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4 mr-1.5 shrink-0" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 156,
						columnNumber: 13
					}, this), " Voltar aos detalhes"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: infropay_logo_default,
							alt: "InfroPay",
							className: "h-7 w-auto object-contain hidden sm:block"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: infropay_mark_default,
							alt: "InfroPay",
							className: "h-7 w-7 object-contain sm:hidden"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 161,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "hidden md:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 pl-2 border-l border-border",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-3.5 w-3.5 text-gold shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 15
							}, this), " Checkout 100% Seguro"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 159,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start w-full min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: submit,
					className: "w-full min-w-0 rounded-2xl border border-border bg-card p-3.5 sm:p-6 md:p-8 space-y-6 sm:space-y-8 shadow-card overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/40 border border-border/60 w-full min-w-0 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-gold/10 shrink-0 border border-border/60",
								children: p.cover_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: p.cover_url,
									alt: p.title,
									className: "h-full w-full object-cover"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 174,
									columnNumber: 32
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-full w-full grid place-items-center text-xs font-semibold text-muted-foreground",
									children: "Produto"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 174,
									columnNumber: 113
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 173,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 flex-1 flex flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BadgeCheck, { className: "h-3.5 w-3.5 text-gold shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 181,
										columnNumber: 21
									}, this), " Produto Digital Oficial"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
									className: "text-base sm:text-lg font-bold line-clamp-2 text-foreground break-words",
									children: p.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 184,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 179,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-baseline gap-2 mt-2 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xl sm:text-2xl font-extrabold text-gradient-gold",
										children: fmt(basePrice, p.currency)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 189,
										columnNumber: 19
									}, this), p.promo_price_cents && p.promo_price_cents < p.price_cents && /* @__PURE__ */ (void 0)("span", {
										className: "text-xs sm:text-sm text-muted-foreground line-through",
										children: fmt(p.price_cents, p.currency)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 192,
										columnNumber: 82
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 188,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "space-y-4 w-full min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 pb-2 border-b border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "h-6 w-6 rounded-full gradient-brand text-primary-foreground text-xs font-bold grid place-items-center shrink-0",
									children: "1"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 202,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "text-sm sm:text-base font-bold uppercase tracking-wider text-foreground",
									children: "Dados do comprador"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-4 w-full min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-full",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-sm font-semibold text-foreground",
										children: "Nome completo *"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										required: true,
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Ex.: António Manuel Silva",
										className: "mt-1.5 h-11 sm:h-12 text-sm sm:text-base bg-background w-full"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 213,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "w-full min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
												className: "text-sm font-semibold text-foreground",
												children: "Email de entrega *"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 218,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
												required: true,
												type: "email",
												value: email,
												onChange: (e) => setEmail(e.target.value),
												placeholder: "seuemail@exemplo.com",
												className: "mt-1.5 h-11 sm:h-12 text-sm sm:text-base bg-background w-full"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 221,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs text-muted-foreground mt-1 block",
												children: "O acesso ao produto será enviado para este email."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 222,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "w-full min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
												className: "text-sm font-semibold text-foreground",
												children: "Telefone / WhatsApp *"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 227,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
												required: true,
												value: phone,
												onChange: (e) => setPhone(e.target.value),
												placeholder: "Ex.: +244 923 000 000",
												className: "mt-1.5 h-11 sm:h-12 text-sm sm:text-base bg-background w-full"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 230,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs text-muted-foreground mt-1 block",
												children: "Para confirmação imediata da compra."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 231,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 226,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 200,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
							className: "space-y-4 w-full min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 pb-2 border-b border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "h-6 w-6 rounded-full gradient-brand text-primary-foreground text-xs font-bold grid place-items-center shrink-0",
									children: "2"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 242,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "text-sm sm:text-base font-bold uppercase tracking-wider text-foreground",
									children: "Método de pagamento"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-3 w-full min-w-0",
								children: METHODS.map((m) => {
									const Icon = m.icon;
									const active = method === m.id;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setMethod(m.id),
										className: `relative flex items-start sm:items-center gap-3 sm:gap-4 rounded-xl border p-3.5 sm:p-4 text-left transition-all w-full cursor-pointer min-w-0 ${active ? "border-primary bg-primary/10 shadow-glow ring-1 ring-primary/40" : "border-border/80 bg-background/50 hover:border-primary/40 hover:bg-secondary/30"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: `h-10 w-10 sm:h-11 sm:w-11 rounded-xl grid place-items-center shrink-0 ${active ? "gradient-brand text-primary-foreground shadow-md" : "bg-secondary text-muted-foreground"}`,
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 256,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 255,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center gap-2 flex-wrap",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "font-bold text-sm sm:text-base text-foreground",
														children: m.label
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 260,
														columnNumber: 27
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-gold border border-gold/20",
														children: m.badge
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 263,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 259,
													columnNumber: 25
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "text-xs sm:text-sm text-muted-foreground mt-1 leading-snug",
													children: m.desc
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 267,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 258,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: `h-5 w-5 rounded-full border-2 grid place-items-center shrink-0 mt-0.5 sm:mt-0 ${active ? "border-primary bg-primary text-primary-foreground" : "border-border"}`,
												children: active && /* @__PURE__ */ (void 0)(CircleCheck, { className: "h-3.5 w-3.5 text-primary-foreground" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 272,
													columnNumber: 36
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 271,
												columnNumber: 23
											}, this)
										]
									}, m.id, true, {
										fileName: _jsxFileName,
										lineNumber: 254,
										columnNumber: 24
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 250,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 13
						}, this),
						orderBump && /* @__PURE__ */ (void 0)("section", {
							className: "animate-fade-in w-full min-w-0",
							children: /* @__PURE__ */ (void 0)("div", {
								onClick: () => setIncludeBump((prev) => !prev),
								className: `cursor-pointer rounded-2xl border-2 transition-all p-3.5 sm:p-5 w-full min-w-0 ${includeBump ? "border-gold bg-gold/10 shadow-glow" : "border-gold/50 bg-gold/5 hover:border-gold hover:bg-gold/10"}`,
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-gold/20 flex-wrap",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)("input", {
											type: "checkbox",
											checked: includeBump,
											onChange: (e) => setIncludeBump(e.target.checked),
											className: "h-5 w-5 rounded border-gold/60 text-gold focus:ring-gold accent-gold shrink-0 cursor-pointer",
											onClick: (e) => e.stopPropagation()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 285,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-xs sm:text-sm font-bold text-foreground",
											children: orderBump.headline || `Adicionar oferta exclusiva complementar`
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 286,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 284,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-gold-foreground flex items-center gap-1 shadow-sm shrink-0",
										children: [/* @__PURE__ */ (void 0)(Gift, { className: "h-3.5 w-3.5 shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 291,
											columnNumber: 23
										}, this), " Oferta Especial"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 290,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 283,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-start gap-3 sm:gap-4 w-full min-w-0",
									children: [orderBump.offer?.cover_url ? /* @__PURE__ */ (void 0)("img", {
										src: orderBump.offer.cover_url,
										alt: orderBump.offer.title,
										className: "h-14 w-14 sm:h-16 sm:w-16 rounded-xl object-cover border border-gold/30 shrink-0"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 296,
										columnNumber: 51
									}, this) : /* @__PURE__ */ (void 0)("div", {
										className: "h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-gold/20 border border-gold/30 grid place-items-center text-xs font-bold text-gold shrink-0",
										children: "BUMP"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 296,
										columnNumber: 214
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "font-bold text-sm sm:text-base text-foreground leading-snug break-words",
												children: orderBump.offer?.title || orderBump.headline
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 301,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "text-sm font-extrabold text-gold mt-1",
												children: ["+ ", fmt(orderBump.offer_price_cents, p.currency)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 304,
												columnNumber: 23
											}, this),
											orderBump.description && /* @__PURE__ */ (void 0)("p", {
												className: "mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed",
												children: orderBump.description
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 308,
												columnNumber: 49
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gold",
												children: [/* @__PURE__ */ (void 0)(Gift, { className: "h-4 w-4 shrink-0" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 313,
													columnNumber: 25
												}, this), includeBump ? "✓ Oferta especial incluída no pedido" : "Clique para adicionar ao seu pedido"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 312,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 300,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 295,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 27
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3 pt-2 w-full min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									disabled: loading,
									size: "lg",
									type: "submit",
									className: "w-full min-h-12 sm:min-h-14 py-3 px-4 gradient-brand text-primary-foreground shadow-glow text-sm sm:text-base md:text-lg font-bold transition-all hover:scale-[1.005] active:scale-[0.99] cursor-pointer whitespace-normal break-words text-center leading-tight flex items-center justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0 inline" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 324,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: loading ? "A processar pedido..." : `Pagar ${fmt(totalPrice, p.currency)} — Finalizar Compra` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 323,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "flex items-center gap-1 text-success font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 332,
												columnNumber: 19
											}, this), " Compra 100% Segura"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 331,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "·" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 334,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Criptografia SSL 256 bits" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 335,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "·" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 336,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Entrega imediata" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 337,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 330,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "pt-2 text-center text-xs text-muted-foreground border-t border-border/40 leading-relaxed",
									children: [
										"Ao clicar em finalizar compra, você declara que leu e concorda com os nossos",
										" ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/termos",
											target: "_blank",
											className: "text-gold underline hover:opacity-80 font-medium",
											children: "Termos de Uso"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 342,
											columnNumber: 17
										}, this),
										" ",
										"e",
										" ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/privacidade",
											target: "_blank",
											className: "text-gold underline hover:opacity-80 font-medium",
											children: "Política de Privacidade"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 346,
											columnNumber: 17
										}, this),
										"."
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 340,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 322,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 170,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: "space-y-6 lg:sticky lg:top-24 w-full min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card w-full min-w-0 overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between mb-4 pb-3 border-b border-border",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs sm:text-sm font-bold uppercase tracking-widest text-gold",
									children: "Resumo do pedido"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 359,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs sm:text-sm text-muted-foreground",
									children: includeBump ? "2 itens" : "1 item"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 362,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 358,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-3 pb-4 border-b border-border/50 items-center w-full min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden bg-secondary shrink-0 border border-border/50",
									children: p.cover_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: p.cover_url,
										alt: "",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 370,
										columnNumber: 34
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-full w-full grid place-items-center text-xs text-muted-foreground",
										children: "Produto"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 370,
										columnNumber: 108
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 369,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-semibold text-sm sm:text-base line-clamp-2 text-foreground break-words",
										children: p.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 375,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-sm font-bold text-foreground mt-1",
										children: fmt(basePrice, p.currency)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 378,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 374,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 368,
								columnNumber: 15
							}, this),
							includeBump && orderBump && /* @__PURE__ */ (void 0)("div", {
								className: "my-3 p-3 rounded-xl border border-gold/30 bg-gold/5 animate-fade-in flex gap-3 items-center w-full min-w-0",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "h-12 w-12 rounded-lg overflow-hidden bg-secondary shrink-0 border border-gold/30",
									children: orderBump.offer?.cover_url ? /* @__PURE__ */ (void 0)("img", {
										src: orderBump.offer.cover_url,
										alt: "",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 387,
										columnNumber: 51
									}, this) : /* @__PURE__ */ (void 0)("div", {
										className: "h-full w-full grid place-items-center text-xs text-gold font-bold",
										children: "BUMP"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 387,
										columnNumber: 139
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 386,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-bold uppercase text-gold block",
											children: "Oferta Especial"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 392,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "font-medium text-xs sm:text-sm truncate text-foreground",
											children: orderBump.offer?.title || orderBump.headline
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 395,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "text-xs sm:text-sm font-bold text-gold mt-0.5",
											children: ["+ ", fmt(orderBump.offer_price_cents, p.currency)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 398,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 391,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 385,
								columnNumber: 44
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 space-y-2.5 text-sm sm:text-base w-full min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-muted-foreground text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Produto principal" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 407,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-medium text-foreground",
											children: fmt(basePrice, p.currency)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 408,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 406,
										columnNumber: 17
									}, this),
									includeBump && orderBump && /* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between text-gold text-sm font-medium",
										children: [/* @__PURE__ */ (void 0)("span", { children: "Oferta adicional" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 412,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", { children: ["+", fmt(orderBump.offer_price_cents, p.currency)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 413,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 411,
										columnNumber: 46
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-muted-foreground text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Taxas de processamento" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 417,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-success font-semibold",
											children: "Grátis (0%)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 418,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 416,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "pt-3 border-t border-border flex justify-between items-baseline",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-sm sm:text-base font-bold text-foreground",
											children: "Valor Total"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 422,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xl sm:text-2xl font-extrabold text-gradient-gold",
											children: fmt(totalPrice, p.currency)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 425,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 421,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 405,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 357,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-4 shadow-card w-full min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground",
							children: "Garantia e Segurança"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 434,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-8 w-8 rounded-lg bg-success/10 grid place-items-center shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-success shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 441,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 440,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs sm:text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-semibold text-foreground",
											children: [
												"Garantia incondicional de ",
												p.guarantee_days ?? 7,
												" dias"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 444,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-muted-foreground mt-0.5 leading-relaxed",
											children: "Satisfação garantida ou seu dinheiro de volta sem complicações."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 447,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 443,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 439,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-8 w-8 rounded-lg bg-gold/10 grid place-items-center shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "h-4 w-4 text-gold shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 455,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 454,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs sm:text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-semibold text-foreground",
											children: "Acesso Imediato"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 458,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-muted-foreground mt-0.5 leading-relaxed",
											children: "Receba o link de download e instruções logo após a confirmação."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 459,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 457,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 453,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-8 w-8 rounded-lg bg-primary/10 grid place-items-center shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-4 w-4 text-primary shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 467,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 466,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs sm:text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-semibold text-foreground",
											children: "Dados 100% Protegidos"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 470,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-muted-foreground mt-0.5 leading-relaxed",
											children: "Processamento encriptado e seguro pela infraestrutura InfroPay."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 471,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 469,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 465,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 438,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 433,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 355,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 168,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 150,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 141,
		columnNumber: 10
	}, this);
}
//#endregion
export { Checkout as component };
