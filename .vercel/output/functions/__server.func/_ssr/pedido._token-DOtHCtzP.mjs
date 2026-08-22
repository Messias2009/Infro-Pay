import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$23, p as opt$1 } from "./router-DcboVFjc.mjs";
import { n as useSuspenseQuery, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { At as CircleCheck, Ct as Copy, Ht as BookOpen, Yt as ArrowRight, gt as ExternalLink, lt as Gift, vt as Download, wt as Clock } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as SiteLayout } from "./SiteLayout-BFBAQL8A.mjs";
import { n as getOrderTracking, t as TrackingScripts } from "./TrackingScripts-ChKy1YKm.mjs";
import { t as infropay_logo_default } from "./infropay-logo-ItvwbTCR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pedido._token-DOtHCtzP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var env = {
	"BASE_URL": "/",
	"DEV": true,
	"MODE": "production",
	"PROD": false,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PROJECT_ID": "dbiyvmjtxgholatsonbo",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_NFT-Qg1DBlJ3LBlo9FDM4A_SvxcA8UU",
	"VITE_SUPABASE_URL": "https://dbiyvmjtxgholatsonbo.supabase.co"
};
var PAYPAY_REFERENCE = {
	provider: "Referência PayPay",
	entity: env.VITE_PAYPAY_ENTITY || "10116",
	reference: env.VITE_PAYPAY_REFERENCE || "951946549",
	mode: env.VITE_PAYPAY_MODE || "test",
	instructions: [
		"Abra o Multicaixa Express, ATM ou Internet Banking.",
		"Escolha Pagamentos → Pagamento por referência.",
		"Introduza a Entidade e a Referência indicadas.",
		"Confirme o valor exato do pedido e finalize."
	]
};
/** Referência a apresentar para um dado método de pagamento. */
function referenceForMethod(method) {
	if (method === "referencia" || method === "multicaixa_express") return PAYPAY_REFERENCE;
	return null;
}
var _jsxFileName = "/app/applet/src/routes/pedido.$token.tsx?tsr-split=component";
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
var METHOD_LABEL = {
	multicaixa_express: "Multicaixa Express",
	referencia: "Referência Multicaixa",
	transferencia: "Transferência Bancária"
};
function Pedido() {
	const { token } = Route$23.useParams();
	const { data: o } = useSuspenseQuery(opt$1(token));
	const paid = o?.status === "pago";
	const [firedOnce, setFiredOnce] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		setFiredOnce(window.localStorage.getItem(`ip_purchase_${token}`) === "1");
	}, [token]);
	const shouldTrack = paid && !firedOnce;
	const { data: tracking } = useQuery({
		queryKey: [
			"tracking",
			"order",
			token,
			shouldTrack
		],
		queryFn: () => getOrderTracking({ data: {
			token,
			notify: shouldTrack
		} }),
		enabled: paid,
		staleTime: Infinity
	});
	(0, import_react.useEffect)(() => {
		if (shouldTrack && tracking) {
			window.localStorage.setItem(`ip_purchase_${token}`, "1");
			setFiredOnce(true);
		}
	}, [
		shouldTrack,
		tracking,
		token
	]);
	if (!o) return null;
	const prod = o.product;
	const bumpProd = o.bump_product;
	const payRef = referenceForMethod(o.payment_method);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, {
		variant: "checkout",
		children: [shouldTrack && tracking && /* @__PURE__ */ (void 0)(TrackingScripts, {
			config: tracking,
			event: {
				type: "Purchase",
				id: tracking.content_id,
				name: tracking.content_name,
				value: tracking.value,
				currency: tracking.currency
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 70,
			columnNumber: 35
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto w-full max-w-4xl px-3.5 sm:px-6 py-8 sm:py-10 md:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center mb-6 sm:mb-8",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-block",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: infropay_logo_default,
							alt: "InfroPay",
							className: "h-8 w-auto mx-auto object-contain"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 80,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `rounded-2xl border p-5 sm:p-8 text-center w-full overflow-hidden ${paid ? "border-success/40 bg-success/10 shadow-glow" : "border-gold/40 bg-gold/5 shadow-card"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-full grid place-items-center ${paid ? "gradient-brand text-primary-foreground" : "gradient-gold text-gold-foreground"}`,
							children: paid ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 21
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-7 w-7 sm:h-8 sm:w-8 text-gold-foreground animate-spin-slow" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 98
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 88,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "mt-4 text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground",
							children: paid ? "Pagamento Confirmado!" : "Aguardando Pagamento"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto",
							children: paid ? "O seu acesso foi liberado com sucesso. Você pode acessar seus conteúdos digitais abaixo." : "Assim que confirmarmos o seu pagamento na rede Multicaixa, o seu acesso será liberado automaticamente."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:grid-cols-2 w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card flex flex-col justify-between w-full overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between gap-2 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs sm:text-sm font-bold uppercase tracking-widest text-gold",
									children: "Produto Adquirido"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 105,
									columnNumber: 17
								}, this), paid && /* @__PURE__ */ (void 0)("span", {
									className: "rounded-full bg-success/10 text-success text-xs font-bold px-2.5 py-0.5 border border-success/20",
									children: "Acesso Liberado"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 108,
									columnNumber: 26
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 104,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex gap-3 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-16 w-16 rounded-xl overflow-hidden bg-secondary shrink-0 border border-border/60",
									children: prod?.cover_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: prod.cover_url,
										alt: "",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 115,
										columnNumber: 38
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-full w-full grid place-items-center text-xs text-muted-foreground",
										children: "Produto"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 115,
										columnNumber: 115
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 114,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-semibold text-sm sm:text-base line-clamp-2 text-foreground break-words",
										children: prod?.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 120,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-1 text-base sm:text-lg font-extrabold text-gradient-gold",
										children: fmt(o.gross_cents, o.currency)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 123,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 119,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 113,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 103,
								columnNumber: 13
							}, this), paid && /* @__PURE__ */ (void 0)("div", {
								className: "mt-6 space-y-2.5",
								children: [
									prod?.has_members_area && /* @__PURE__ */ (void 0)(Link, {
										to: "/membros/$slug",
										params: { slug: prod.slug },
										className: "block",
										children: /* @__PURE__ */ (void 0)(Button, {
											className: "w-full gradient-brand text-primary-foreground font-bold text-sm sm:text-base h-11 sm:h-12",
											children: [/* @__PURE__ */ (void 0)(BookOpen, { className: "h-4 w-4 mr-2 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 135,
												columnNumber: 23
											}, this), "Aceder à Área de Membros"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 134,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 131,
										columnNumber: 44
									}, this),
									prod?.file_url && /* @__PURE__ */ (void 0)("a", {
										href: prod.file_url,
										target: "_blank",
										rel: "noreferrer",
										className: "block",
										children: /* @__PURE__ */ (void 0)(Button, {
											className: "w-full gradient-brand text-primary-foreground font-bold text-sm sm:text-base h-11 sm:h-12",
											children: [/* @__PURE__ */ (void 0)(Download, { className: "h-4 w-4 mr-2 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 141,
												columnNumber: 23
											}, this), "Baixar Produto Digital"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 140,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 139,
										columnNumber: 36
									}, this),
									prod?.external_url && /* @__PURE__ */ (void 0)("a", {
										href: prod.external_url,
										target: "_blank",
										rel: "noreferrer",
										className: "block",
										children: /* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											className: "w-full text-sm sm:text-base h-11 sm:h-12",
											children: [/* @__PURE__ */ (void 0)(ExternalLink, { className: "h-4 w-4 mr-2 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 147,
												columnNumber: 23
											}, this), "Aceder ao Conteúdo"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 146,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 145,
										columnNumber: 40
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 22
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 102,
							columnNumber: 11
						}, this),
						bumpProd && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-gold/40 bg-gold/5 p-4 sm:p-6 shadow-card flex flex-col justify-between w-full overflow-hidden",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between gap-2 mb-3",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-xs sm:text-sm font-bold uppercase tracking-widest text-gold flex items-center gap-1",
									children: [/* @__PURE__ */ (void 0)(Gift, { className: "h-3.5 w-3.5 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 159,
										columnNumber: 21
									}, this), " Oferta Especial Incluída"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 19
								}, this), paid && /* @__PURE__ */ (void 0)("span", {
									className: "rounded-full bg-success/10 text-success text-xs font-bold px-2.5 py-0.5 border border-success/20",
									children: "Acesso Liberado"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 161,
									columnNumber: 28
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex gap-3 items-center",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "h-16 w-16 rounded-xl overflow-hidden bg-secondary shrink-0 border border-gold/30",
									children: bumpProd.cover_url ? /* @__PURE__ */ (void 0)("img", {
										src: bumpProd.cover_url,
										alt: "",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 43
									}, this) : /* @__PURE__ */ (void 0)("div", {
										className: "h-full w-full grid place-items-center text-xs text-gold font-bold",
										children: "BUMP"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 124
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 167,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "font-semibold text-sm sm:text-base line-clamp-2 text-foreground break-words",
										children: bumpProd.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "mt-1 text-xs sm:text-sm text-muted-foreground",
										children: "Produto complementar"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 176,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 15
							}, this), paid && /* @__PURE__ */ (void 0)("div", {
								className: "mt-6 space-y-2.5",
								children: [
									bumpProd.has_members_area && /* @__PURE__ */ (void 0)(Link, {
										to: "/membros/$slug",
										params: { slug: bumpProd.slug },
										className: "block",
										children: /* @__PURE__ */ (void 0)(Button, {
											className: "w-full gradient-brand text-primary-foreground font-bold text-sm sm:text-base h-11 sm:h-12",
											children: [/* @__PURE__ */ (void 0)(BookOpen, { className: "h-4 w-4 mr-2 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 188,
												columnNumber: 25
											}, this), "Aceder ao Curso Complementar"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 187,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 184,
										columnNumber: 49
									}, this),
									bumpProd.file_url && /* @__PURE__ */ (void 0)("a", {
										href: bumpProd.file_url,
										target: "_blank",
										rel: "noreferrer",
										className: "block",
										children: /* @__PURE__ */ (void 0)(Button, {
											className: "w-full gradient-brand text-primary-foreground font-bold text-sm sm:text-base h-11 sm:h-12",
											children: [/* @__PURE__ */ (void 0)(Download, { className: "h-4 w-4 mr-2 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 194,
												columnNumber: 25
											}, this), "Baixar Oferta Especial"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 193,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 192,
										columnNumber: 41
									}, this),
									bumpProd.external_url && /* @__PURE__ */ (void 0)("a", {
										href: bumpProd.external_url,
										target: "_blank",
										rel: "noreferrer",
										className: "block",
										children: /* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											className: "w-full text-sm sm:text-base h-11 sm:h-12",
											children: [/* @__PURE__ */ (void 0)(ExternalLink, { className: "h-4 w-4 mr-2 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 200,
												columnNumber: 25
											}, this), "Aceder ao Conteúdo"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 199,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 198,
										columnNumber: 45
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 24
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 24
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-card w-full overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs sm:text-sm font-bold uppercase tracking-widest text-gold mb-4",
									children: "Dados do Pedido"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", {
									className: "space-y-2.5 text-xs sm:text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Row, {
											k: "Estado",
											v: paid ? "Pago / Confirmado" : "Pendente"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 213,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Row, {
											k: "Método",
											v: METHOD_LABEL[o.payment_method] ?? o.payment_method
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 214,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Row, {
											k: "Comprador",
											v: o.buyer_name ?? "-"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 215,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Row, {
											k: "Email",
											v: o.buyer_email ?? "-"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 216,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Row, {
											k: "Data",
											v: new Date(o.created_at).toLocaleString("pt-PT")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 217,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Row, {
											k: "Código do Pedido",
											v: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												onClick: () => {
													navigator.clipboard.writeText(token);
													toast.success("Código copiado para a área de transferência");
												},
												className: "inline-flex items-center gap-1 hover:text-foreground font-mono text-xs sm:text-sm text-primary",
												children: [
													token.slice(0, 14),
													"… ",
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 222,
														columnNumber: 43
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 218,
												columnNumber: 44
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 218,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 212,
									columnNumber: 13
								}, this),
								!paid && /* @__PURE__ */ (void 0)("div", {
									className: "mt-4 rounded-xl bg-secondary/70 p-3 text-xs sm:text-sm text-muted-foreground leading-relaxed",
									children: "Esta página atualiza automaticamente a cada 12 segundos assim que o pagamento for detectado."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 9
				}, this),
				!paid && payRef && /* @__PURE__ */ (void 0)("div", {
					className: "mt-6 sm:mt-8 rounded-2xl border border-gold/40 bg-gold/5 p-4 sm:p-8 shadow-card w-full overflow-hidden",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between gap-3 flex-wrap",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "text-sm sm:text-base font-bold uppercase tracking-wider text-gold",
								children: ["Instruções de Pagamento — ", payRef.provider]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 236,
								columnNumber: 15
							}, this), payRef.mode === "test" && /* @__PURE__ */ (void 0)("span", {
								className: "rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-warning",
								children: "Ambiente de Testes"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 42
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-5 grid gap-3 sm:grid-cols-3 w-full",
							children: [
								/* @__PURE__ */ (void 0)(RefBox, {
									label: "Entidade",
									value: payRef.entity
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(RefBox, {
									label: "Referência",
									value: payRef.reference
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(RefBox, {
									label: "Valor a Pagar",
									value: fmt(o.gross_cents, o.currency)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 247,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-6 pt-4 border-t border-gold/20",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "text-xs sm:text-sm font-semibold text-foreground mb-2",
								children: "Como pagar:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 251,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("ol", {
								className: "space-y-1.5 text-xs sm:text-sm text-muted-foreground list-decimal list-inside leading-relaxed",
								children: payRef.instructions.map((i) => /* @__PURE__ */ (void 0)("li", { children: i }, i, false, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 47
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 254,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 250,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 234,
					columnNumber: 29
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 sm:mt-10 text-center flex items-center justify-center gap-4",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/loja",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							className: "text-sm sm:text-base",
							children: ["Explorar outros produtos ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-4 w-4 ml-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 40
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 263,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 262,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 261,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 78,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 69,
		columnNumber: 10
	}, this);
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-between gap-4 py-1 border-b border-border/40 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
			className: "text-muted-foreground",
			children: k
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 279,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
			className: "font-semibold text-right min-w-0 truncate text-foreground",
			children: v
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 280,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 278,
		columnNumber: 10
	}, this);
}
function RefBox({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: () => {
			navigator.clipboard.writeText(value);
			toast.success(`${label} copiada!`);
		},
		className: "rounded-xl border border-border bg-card p-3.5 text-left hover:border-gold transition cursor-pointer group",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 294,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-1 font-mono font-bold text-base flex items-center justify-between gap-2 text-foreground group-hover:text-gold",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "truncate",
				children: value
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 296,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "h-3.5 w-3.5 opacity-60 shrink-0" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 297,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 295,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 290,
		columnNumber: 10
	}, this);
}
//#endregion
export { Pedido as component };
