import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as LEVELS } from "./legends.functions-CpKyibG2.mjs";
import { g as q } from "./router-DcboVFjc.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Users, c as Trophy, mt as Eye, u as TrendingUp, xt as Crown } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-HRHX5L42.mjs";
import { t as SiteLayout } from "./SiteLayout-BFBAQL8A.mjs";
import { t as AwardPlaque } from "./AwardPlaque-BKruEmG-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legends-DfZ-3YNC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var banner_legends_default = "/assets/banner-legends-ia8S-euN.jpg";
var _jsxFileName = "/app/applet/src/routes/legends.tsx?tsr-split=component";
function fmt(c) {
	try {
		return new Intl.NumberFormat("pt-PT", {
			style: "currency",
			currency: "AOA",
			maximumFractionDigits: 0
		}).format(c / 100);
	} catch {
		return `${(c / 100).toFixed(0)} Kz`;
	}
}
function Legends() {
	const { data: legends } = useSuspenseQuery(q);
	const [inspectLevel, setInspectLevel] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden border-b border-border/60",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: banner_legends_default,
					alt: "",
					width: 1600,
					height: 900,
					className: "absolute inset-0 h-full w-full object-cover opacity-40"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 29,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-28 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "h-3.5 w-3.5 text-gold" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 32,
								columnNumber: 13
							}, this), " Hall da fama"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 31,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "mt-6 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight",
							children: ["InfroPay ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-gold",
								children: "Legends"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 35,
								columnNumber: 22
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 34,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto",
							children: "Os produtores que transformaram conhecimento em renda de verdade. Ranking público baseado em vendas reais e placas oficiais de reconhecimento."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 37,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 27,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-gold",
					children: "Sistema de Níveis & Placas"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-2 text-2xl md:text-3xl font-bold text-foreground",
					children: "10 Níveis · Do Bronze ao Infinito"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Clique em qualquer nível para visualizar a placa oficial de premiação."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5",
					children: LEVELS.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onClick: () => setInspectLevel(l),
						className: "rounded-2xl border border-border/60 bg-card/60 p-4 cursor-pointer hover:border-gold/50 hover:bg-card/90 transition-all hover:scale-[1.02] group",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-10 w-10 rounded-xl grid place-items-center shadow-md",
									style: { background: l.gradient },
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crown, { className: "h-5 w-5 text-white/90" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 62,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 59,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-4 w-4 text-muted-foreground group-hover:text-gold transition" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 64,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 58,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-semibold text-sm text-foreground",
								children: l.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 66,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] text-muted-foreground mt-1",
								children: l.min_cents === 0 ? "Início" : `Desde ${fmt(l.min_cents)}`
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 67,
								columnNumber: 15
							}, this)
						]
					}, l.key, true, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 28
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 45,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-gold",
					children: "Top 100"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-2 text-2xl md:text-3xl font-bold text-foreground",
					children: "Produtores em destaque"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 9
				}, this),
				legends.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "h-10 w-10 text-gold mx-auto mb-3" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-display text-xl font-semibold text-foreground",
							children: "O primeiro lugar ainda está vago"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 83,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Publique o seu produto e faça história na InfroPay."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 86,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 33
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 grid gap-3",
					children: legends.map((r, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border/60 bg-card p-4 hover:border-primary/40 transition sm:flex sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex min-w-0 items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `h-10 w-10 rounded-lg grid place-items-center shrink-0 font-bold text-sm ${i < 3 ? "gradient-gold text-gold-foreground shadow-gold" : "bg-secondary"}`,
									children: ["#", i + 1]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 92,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-11 w-11 rounded-full bg-secondary overflow-hidden shrink-0",
									children: r.avatar_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: r.avatar_url,
										alt: "",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 96,
										columnNumber: 37
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "h-5 w-5 m-3 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 96,
										columnNumber: 112
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 95,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-semibold truncate",
										children: r.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 99,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground flex items-center gap-2 mt-0.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 101,
												columnNumber: 23
											}, this),
											" ",
											r.sales_count,
											" vendas"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 100,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 98,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-4 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-bold text-sm",
									children: fmt(r.revenue_cents)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 107,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[10px] text-muted-foreground uppercase tracking-wide",
									children: "faturamento"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 108,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-full px-3 py-1 text-xs font-bold text-white/95 shadow cursor-pointer hover:opacity-90",
								style: { background: r.level.gradient },
								onClick: () => setInspectLevel(r.level),
								children: r.level.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 112,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 17
						}, this)]
					}, r.id, true, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 36
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 20
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 75,
			columnNumber: 7
		}, this),
		inspectLevel && /* @__PURE__ */ (void 0)(Dialog, {
			open: !!inspectLevel,
			onOpenChange: () => setInspectLevel(null),
			children: /* @__PURE__ */ (void 0)(DialogContent, {
				className: "max-w-lg p-4 sm:p-6 bg-card border-border/80",
				children: [/* @__PURE__ */ (void 0)(DialogHeader, {
					className: "text-center pb-2",
					children: [/* @__PURE__ */ (void 0)(DialogTitle, {
						className: "text-xl font-bold text-foreground",
						children: ["Placa Oficial — Nível ", inspectLevel.name]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: [
							"Reconhecimento oficial InfroPay com faturamento comprovado superior a",
							" ",
							fmt(inspectLevel.min_cents),
							"."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 125,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "flex justify-center my-2",
					children: /* @__PURE__ */ (void 0)(AwardPlaque, {
						level: inspectLevel,
						milestoneText: inspectLevel.min_cents === 0 ? "Iniciação Oficial InfroPay" : `Meta Oficial de ${fmt(inspectLevel.min_cents)}`,
						showActions: true
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 136,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 135,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 124,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 123,
			columnNumber: 24
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 26,
		columnNumber: 10
	}, this);
}
//#endregion
export { Legends as component };
