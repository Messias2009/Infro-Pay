import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Ct as Copy, V as MousePointerClick, Z as Link2, _ as ShoppingCart, i as Wallet, ot as Hourglass, st as Handshake } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { n as getAffiliateOverview, r as listAffiliateOffers, t as createAffiliateLink } from "./affiliate.functions-gSyk7-3T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/afiliados-60JkMPC1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/afiliados.tsx?tsr-split=component";
function kz(cents, currency = "AOA") {
	try {
		return new Intl.NumberFormat("pt-PT", {
			style: "currency",
			currency
		}).format(cents / 100);
	} catch {
		return `${currency} ${(cents / 100).toFixed(2)}`;
	}
}
function linkFor(slug, code) {
	return `${typeof window !== "undefined" ? window.location.origin : "https://infropay.lovable.app"}/produto/${slug}?ref=${code}`;
}
function Page() {
	const qc = useQueryClient();
	const offersFn = useServerFn(listAffiliateOffers);
	const overviewFn = useServerFn(getAffiliateOverview);
	const createFn = useServerFn(createAffiliateLink);
	const [tab, setTab] = (0, import_react.useState)("ofertas");
	const [busy, setBusy] = (0, import_react.useState)(null);
	const { data: offers } = useQuery({
		queryKey: ["affiliate", "offers"],
		queryFn: () => offersFn()
	});
	const { data: ov } = useQuery({
		queryKey: ["affiliate", "overview"],
		queryFn: () => overviewFn()
	});
	async function generate(productId) {
		setBusy(productId);
		try {
			const res = await createFn({ data: { product_id: productId } });
			await navigator.clipboard.writeText(linkFor(res.slug, res.code)).catch(() => {});
			toast.success("Link de afiliado gerado e copiado!");
			qc.invalidateQueries({ queryKey: ["affiliate", "overview"] });
			setTab("meus");
		} catch (e) {
			toast.error(e.message);
		} finally {
			setBusy(null);
		}
	}
	async function copy(text) {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Link copiado");
		} catch {
			toast.error("Não foi possível copiar");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-6xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-widest text-gold font-semibold",
					children: "Programa de afiliados"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-3xl md:text-4xl font-bold mt-2",
					children: "Ganhe comissão a divulgar"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 75,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "Gere o seu link único, partilhe, e receba a sua comissão na carteira assim que a venda for paga."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 78,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 71,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Kpi, {
						icon: MousePointerClick,
						label: "Cliques",
						value: String(ov?.clicks ?? 0)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Kpi, {
						icon: ShoppingCart,
						label: "Vendas geradas",
						value: String(ov?.salesCount ?? 0)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Kpi, {
						icon: Wallet,
						label: "Comissão ganha",
						value: kz(ov?.earnedCents ?? 0),
						highlight: true
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Kpi, {
						icon: Hourglass,
						label: "Comissão pendente",
						value: kz(ov?.pendingCents ?? 0)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-2",
					children: ["ofertas", "meus"].map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setTab(t),
						className: `px-3 py-1.5 rounded-full text-xs font-medium transition ${tab === t ? "bg-gold/15 text-gold" : "bg-secondary text-muted-foreground hover:text-foreground"}`,
						children: t === "ofertas" ? "Produtos disponíveis" : "Meus links"
					}, t, false, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 52
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor/saques",
					className: "text-xs text-muted-foreground hover:text-foreground underline",
					children: "Sacar comissões (taxa 8%)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 97,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 7
			}, this),
			tab === "ofertas" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
				children: [(offers ?? []).map((p) => {
					const price = p.promo_price_cents && p.promo_price_cents < p.price_cents ? p.promo_price_cents : p.price_cents;
					const commission = Math.round(price * Number(p.affiliate_commission_percent ?? 0) / 100);
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card overflow-hidden flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "aspect-video bg-gradient-to-br from-primary/20 to-gold/10",
							children: p.cover_url && /* @__PURE__ */ (void 0)("img", {
								src: p.cover_url,
								alt: p.title,
								className: "h-full w-full object-cover",
								loading: "lazy"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 108,
								columnNumber: 35
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-4 flex-1 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-semibold line-clamp-2",
									children: p.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: ["por ", p.producer?.full_name ?? p.producer?.username ?? "Produtor"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Preço "
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 116,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: kz(price, p.currency) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 117,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 115,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm text-gold font-semibold",
									children: [
										Number(p.affiliate_commission_percent),
										"% · ganha ",
										kz(commission, p.currency),
										" ",
										"por venda"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 119,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									className: "mt-auto gradient-brand text-primary-foreground",
									disabled: busy === p.id,
									onClick: () => generate(p.id),
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link2, { className: "h-4 w-4 mr-1" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 124,
											columnNumber: 21
										}, this),
										" ",
										busy === p.id ? "A gerar..." : "Gerar meu link"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 123,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 110,
							columnNumber: 17
						}, this)]
					}, p.id, true, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 16
					}, this);
				}), !(offers ?? []).length && /* @__PURE__ */ (void 0)("div", {
					className: "col-span-full rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center",
					children: [
						/* @__PURE__ */ (void 0)(Handshake, { className: "h-12 w-12 text-gold mx-auto mb-3" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("h3", {
							className: "font-display text-xl font-semibold",
							children: "Sem ofertas por agora"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 132,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "Nenhum produtor abriu afiliação neste momento."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 38
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 102,
				columnNumber: 28
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-3",
				children: [
					(ov?.links ?? []).map((l) => {
						const url = linkFor(l.product?.slug ?? "", l.code);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-border bg-card p-4 flex flex-col md:flex-row md:items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-14 w-14 rounded-xl overflow-hidden bg-secondary shrink-0",
									children: l.product?.cover_url && /* @__PURE__ */ (void 0)("img", {
										src: l.product.cover_url,
										alt: "",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 142,
										columnNumber: 44
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 141,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-medium truncate",
											children: l.product?.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 145,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-xs text-muted-foreground truncate font-mono",
											children: url
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 146,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-xs text-muted-foreground mt-1",
											children: [
												l.clicks,
												" cliques · ",
												l.stats.sales,
												" vendas ·",
												" ",
												kz(l.stats.earned, l.product?.currency ?? "AOA"),
												" ganhos"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 147,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => copy(url),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "h-4 w-4 mr-1" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 153,
										columnNumber: 19
									}, this), " Copiar link"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 152,
									columnNumber: 17
								}, this)
							]
						}, l.id, true, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 16
						}, this);
					}),
					!(ov?.links ?? []).length && /* @__PURE__ */ (void 0)("div", {
						className: "rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center text-sm text-muted-foreground",
						children: "Ainda não gerou nenhum link. Escolha um produto em “Produtos disponíveis”."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 157,
						columnNumber: 41
					}, this),
					!!(ov?.recent ?? []).length && /* @__PURE__ */ (void 0)("div", {
						className: "rounded-2xl border border-border bg-card overflow-x-auto mt-6",
						children: /* @__PURE__ */ (void 0)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (void 0)("thead", {
								className: "text-xs uppercase tracking-wide text-muted-foreground border-b border-border",
								children: /* @__PURE__ */ (void 0)("tr", { children: [
									/* @__PURE__ */ (void 0)("th", {
										className: "text-left p-3",
										children: "Produto"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 165,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "text-left p-3",
										children: "Estado"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 166,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "text-right p-3",
										children: "Comissão"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("th", {
										className: "text-left p-3",
										children: "Data"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 21
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("tbody", { children: (ov?.recent ?? []).map((s) => /* @__PURE__ */ (void 0)("tr", {
								className: "border-b border-border/60 last:border-0",
								children: [
									/* @__PURE__ */ (void 0)("td", {
										className: "p-3",
										children: s.product?.title ?? "—"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "p-3 text-xs uppercase tracking-wide text-muted-foreground",
										children: s.status
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 174,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "p-3 text-right font-medium",
										children: kz(s.affiliate_commission_cents ?? 0, s.currency)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 177,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "p-3 text-xs text-muted-foreground",
										children: new Date(s.created_at).toLocaleDateString("pt-PT")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 180,
										columnNumber: 23
									}, this)
								]
							}, s.id, true, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 55
							}, this)) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 43
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 137,
				columnNumber: 18
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 70,
		columnNumber: 10
	}, this);
}
function Kpi({ icon: Icon, label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `rounded-2xl border p-5 ${highlight ? "border-gold/40 bg-gold/5" : "border-border bg-card"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `h-4 w-4 ${highlight ? "text-gold" : "text-muted-foreground"}` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 204,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs uppercase tracking-wider text-muted-foreground mt-2",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 205,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: `mt-1 text-2xl font-display font-bold ${highlight ? "text-gold" : ""}`,
				children: value
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 206,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 203,
		columnNumber: 10
	}, this);
}
//#endregion
export { Page as component };
