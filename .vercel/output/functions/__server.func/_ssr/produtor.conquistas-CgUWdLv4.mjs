import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { n as levelFor, t as LEVELS } from "./legends.functions-CpKyibG2.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { J as Lock, W as Medal, c as Trophy, dt as Flame, k as Rocket, m as Star, mt as Eye, qt as Award, xt as Crown } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-HRHX5L42.mjs";
import { n as kz } from "./FeeBanner-CDC3PD6P.mjs";
import { t as AwardPlaque } from "./AwardPlaque-BKruEmG-.mjs";
import { t as getMyAchievements } from "./profile.functions-B6b-nAia.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.conquistas-CgUWdLv4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.conquistas.tsx?tsr-split=component";
function Page() {
	const fn = useServerFn(getMyAchievements);
	const { data } = useQuery({
		queryKey: ["me", "achievements"],
		queryFn: () => fn()
	});
	const revenue = data?.revenue_cents ?? 0;
	const current = levelFor(revenue);
	const [selectedLevel, setSelectedLevel] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-4 sm:p-6 md:p-10 max-w-6xl mx-auto space-y-8 min-w-0 break-words",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-widest text-gold font-semibold",
					children: "Premiações Oficiais"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 24,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-1 text-foreground",
					children: "Conquistas & Placas"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs sm:text-sm text-muted-foreground mt-2",
					children: "A cada meta de faturamento alcançada, você desbloqueia uma placa oficial exclusiva InfroPay."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-3xl border border-gold/40 bg-gradient-to-br from-card via-card/90 to-background p-6 sm:p-8 shadow-xl",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid lg:grid-cols-12 gap-8 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-7 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 41,
									columnNumber: 15
								}, this), " Nível Atual Conquistado"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 40,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight",
								children: ["Placa Oficial ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									style: { color: current.color },
									children: current.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 44,
									columnNumber: 29
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 43,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
								children: [
									"Você alcançou o faturamento acumulado de",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
										className: "text-foreground",
										children: kz(revenue)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 50,
										columnNumber: 15
									}, this),
									" com um total de",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
										className: "text-foreground",
										children: [data?.sales_count ?? 0, " vendas aprovadas"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 51,
										columnNumber: 15
									}, this),
									"."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 48,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-2 flex flex-wrap items-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									onClick: () => setSelectedLevel(current),
									className: "gradient-brand text-primary-foreground shadow-glow font-bold text-xs sm:text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 57,
										columnNumber: 17
									}, this), " Ver Placa Digital Completa"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 56,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 55,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-5 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-full max-w-[320px]",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AwardPlaque, {
								level: current,
								sellerName: data?.full_name || data?.username || "Produtor InfroPay",
								milestoneText: `${kz(revenue)} Faturados`,
								showActions: false,
								isUnlocked: true,
								userRevenueCents: revenue
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 64,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 37,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-xl sm:text-2xl font-bold text-foreground",
					children: "Níveis de Premiação"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs sm:text-sm text-muted-foreground mt-1",
					children: "Clique em qualquer nível para inspecionar a placa digital correspondente."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 75,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mt-5",
					children: LEVELS.map((l) => {
						const unlocked = revenue >= l.min_cents;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							onClick: () => setSelectedLevel(l),
							className: `relative rounded-2xl border p-4 sm:p-5 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${unlocked ? "badge-shine bg-card" : "opacity-50 bg-card/40 hover:opacity-80"}`,
							style: { borderColor: l.color + "60" },
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `absolute inset-0 opacity-20 ${unlocked ? "animate-bg-pan" : ""}`,
								style: {
									background: l.gradient,
									backgroundSize: "200% 200%"
								}
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 85,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `h-12 w-12 rounded-2xl grid place-items-center mb-3 ${unlocked ? "animate-floaty" : ""}`,
										style: {
											background: l.gradient,
											boxShadow: unlocked ? `0 8px 24px -8px ${l.color}` : "none"
										},
										children: unlocked ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "h-6 w-6 text-white drop-shadow" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 94,
											columnNumber: 33
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-5 w-5 text-white/80" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 94,
											columnNumber: 89
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 90,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-display text-base sm:text-lg font-bold",
										style: { color: l.color },
										children: l.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 96,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] sm:text-[11px] text-muted-foreground mt-0.5",
										children: ["Meta: ", kz(l.min_cents)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 101,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[9px] sm:text-[10px] mt-2 font-bold uppercase tracking-wider",
										style: { color: unlocked ? "hsl(var(--success))" : "hsl(var(--muted-foreground))" },
										children: unlocked ? "✓ DESBLOQUEADO" : "Bloqueado"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 104,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 17
							}, this)]
						}, l.key, true, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 71,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-xl sm:text-2xl font-bold text-foreground",
					children: "Selos Especiais"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 117,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs sm:text-sm text-muted-foreground mt-1",
					children: "Reconhecimentos extras pelo seu desempenho na InfroPay."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-4",
					children: SEALS.map((sl) => {
						const unlocked = sl.check({
							revenue,
							sales: data?.sales_count ?? 0
						});
						const Icon = sl.icon;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `relative rounded-2xl border p-4 text-center overflow-hidden ${unlocked ? "badge-shine bg-card" : "opacity-40 bg-card/40"}`,
							style: { borderColor: sl.color + "55" },
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `h-11 w-11 mx-auto rounded-full grid place-items-center mb-2.5 ${unlocked ? "animate-floaty" : ""}`,
									style: {
										background: sl.gradient,
										boxShadow: unlocked ? `0 8px 24px -8px ${sl.color}` : "none"
									},
									children: unlocked ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5 text-white drop-shadow" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 31
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-4 w-4 text-white/80" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 85
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-semibold text-xs sm:text-sm text-foreground truncate",
									style: { color: unlocked ? sl.color : void 0 },
									children: sl.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 139,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[10px] text-muted-foreground mt-1 leading-snug",
									children: sl.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 17
								}, this)
							]
						}, sl.key, true, {
							fileName: _jsxFileName,
							lineNumber: 130,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 7
			}, this),
			selectedLevel && /* @__PURE__ */ (void 0)(Dialog, {
				open: !!selectedLevel,
				onOpenChange: () => setSelectedLevel(null),
				children: /* @__PURE__ */ (void 0)(DialogContent, {
					className: "max-w-xl p-4 sm:p-6 bg-card border-border/80",
					children: [/* @__PURE__ */ (void 0)(DialogHeader, {
						className: "text-center pb-2",
						children: [/* @__PURE__ */ (void 0)(DialogTitle, {
							className: "text-xl font-bold text-foreground",
							children: ["Placa Oficial — Nível ", selectedLevel.name]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: [
								"Reconhecimento oficial InfroPay para produtores com faturamento superior a",
								" ",
								kz(selectedLevel.min_cents),
								"."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex justify-center my-2",
						children: /* @__PURE__ */ (void 0)(AwardPlaque, {
							level: selectedLevel,
							sellerName: data?.full_name || data?.username || "Produtor InfroPay",
							milestoneText: `Meta de ${kz(selectedLevel.min_cents)}`,
							showActions: true,
							isUnlocked: revenue >= selectedLevel.min_cents,
							userRevenueCents: revenue
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 25
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 10
	}, this);
}
var SEALS = [
	{
		key: "first",
		name: "Primeira venda",
		desc: "A sua primeira venda paga",
		icon: Star,
		color: "#F9A825",
		gradient: "linear-gradient(135deg,#B8860B,#FFD700)",
		check: (c) => c.sales >= 1
	},
	{
		key: "ten",
		name: "10 vendas",
		desc: "10 vendas concluídas",
		icon: Medal,
		color: "#4FC3F7",
		gradient: "linear-gradient(135deg,#0277BD,#4FC3F7)",
		check: (c) => c.sales >= 10
	},
	{
		key: "hundred",
		name: "100 vendas",
		desc: "100 vendas concluídas",
		icon: Flame,
		color: "#FF7043",
		gradient: "linear-gradient(135deg,#BF360C,#FF8A65)",
		check: (c) => c.sales >= 100
	},
	{
		key: "million",
		name: "Milionário",
		desc: "1M Kz faturados",
		icon: Crown,
		color: "#00BCD4",
		gradient: "linear-gradient(135deg,#006064,#4DD0E1)",
		check: (c) => c.revenue >= 1e8
	},
	{
		key: "top",
		name: "Top vendedor",
		desc: "5M Kz faturados",
		icon: Trophy,
		color: "#AB47BC",
		gradient: "linear-gradient(135deg,#6A1B9A,#CE93D8)",
		check: (c) => c.revenue >= 5e8
	},
	{
		key: "rocket",
		name: "Escala",
		desc: "500 vendas concluídas",
		icon: Rocket,
		color: "#66BB6A",
		gradient: "linear-gradient(135deg,#1B5E20,#81C784)",
		check: (c) => c.sales >= 500
	}
];
//#endregion
export { Page as component };
