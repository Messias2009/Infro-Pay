import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Jt as ArrowUpRight, L as Percent, Zt as ArrowDownToLine, i as Wallet, j as Receipt, mt as Eye, t as Zap, u as TrendingUp, v as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, o as CartesianGrid, r as YAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { n as kz, t as FeeBanner } from "./FeeBanner-CDC3PD6P.mjs";
import { n as getMyWallet, r as listMyTransactions, t as getMyFinanceOverview } from "./finance.functions-BuB1HXfN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.financeiro-N3Hc9YGI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/finance/RevenueChart.tsx";
var RANGES = [
	{
		key: "daily",
		label: "Diário"
	},
	{
		key: "weekly",
		label: "Semanal"
	},
	{
		key: "monthly",
		label: "Mensal"
	},
	{
		key: "yearly",
		label: "Anual"
	}
];
function RevenueChart({ daily, weekly, monthly, yearly }) {
	const [range, setRange] = (0, import_react.useState)("daily");
	const data = {
		daily: daily ?? [],
		weekly: weekly ?? [],
		monthly: monthly ?? [],
		yearly: yearly ?? []
	}[range];
	const total = data.reduce((a, b) => a + b.gross, 0);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-border bg-card overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "px-5 md:px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display font-semibold text-lg leading-tight",
				children: "Evolução do faturamento"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 49,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs text-muted-foreground mt-1",
				children: [
					"Total no período:",
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-gold font-semibold",
						children: kz(Math.round(total * 100))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 54,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 52,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 48,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex rounded-xl border border-border bg-muted/30 p-1",
				children: RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setRange(r.key),
					className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition ${range === r.key ? "gradient-brand text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`,
					children: r.label
				}, r.key, false, {
					fileName: _jsxFileName$1,
					lineNumber: 59,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 57,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 47,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "h-[280px] p-3 md:p-4",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AreaChart, {
					data,
					margin: {
						top: 8,
						right: 8,
						left: 0,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
							id: "revFill",
							x1: "0",
							y1: "0",
							x2: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "0%",
								stopColor: "var(--color-gold)",
								stopOpacity: .45
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 79,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
								offset: "100%",
								stopColor: "var(--color-gold)",
								stopOpacity: 0
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 80,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 78,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 77,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--color-border)",
							vertical: false
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 83,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
							dataKey: "label",
							tick: {
								fontSize: 11,
								fill: "var(--color-muted-foreground)"
							},
							stroke: "var(--color-border)"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 84,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
							tick: {
								fontSize: 11,
								fill: "var(--color-muted-foreground)"
							},
							stroke: "var(--color-border)",
							width: 48
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 89,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, {
							contentStyle: {
								background: "var(--color-card)",
								border: "1px solid var(--color-border)",
								borderRadius: 12,
								fontSize: 12
							},
							formatter: (v, n) => [kz(Math.round(Number(v) * 100)), n === "gross" ? "Bruto" : "Líquido"]
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 94,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Area, {
							type: "monotone",
							dataKey: "gross",
							stroke: "var(--color-gold)",
							strokeWidth: 2,
							fill: "url(#revFill)"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 106,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Area, {
							type: "monotone",
							dataKey: "net",
							stroke: "var(--color-primary)",
							strokeWidth: 2,
							fillOpacity: 0
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 113,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 76,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 75,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 74,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.financeiro.tsx?tsr-split=component";
var methodLabel = {
	multicaixa_express: "Multicaixa Express",
	referencia: "Referência",
	transferencia: "Transferência"
};
function Page() {
	const walletFn = useServerFn(getMyWallet);
	const txFn = useServerFn(listMyTransactions);
	const ovFn = useServerFn(getMyFinanceOverview);
	const { data: w } = useQuery({
		queryKey: ["producer", "wallet"],
		queryFn: () => walletFn()
	});
	const { data: tx } = useQuery({
		queryKey: ["producer", "tx"],
		queryFn: () => txFn()
	});
	const { data: ov } = useQuery({
		queryKey: ["producer", "overview"],
		queryFn: () => ovFn()
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-6xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs uppercase tracking-widest text-gold font-semibold",
						children: "Financeiro"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-3xl md:text-4xl font-bold mt-1",
						children: "Carteira & Faturamento"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground mt-1 text-sm",
						children: "Gestão transparente de saldo, comissões de 2% e histórico de transações."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor/saques",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "gradient-brand text-primary-foreground shadow-glow font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowDownToLine, { className: "h-4 w-4 mr-2" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 13
						}, this), "Solicitar Saque (6%)"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 37,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FeeBanner, { variant: "sales" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 58,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card p-6 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[11px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight",
								children: "Faturamento Bruto"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 64,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "h-5 w-5 text-gold shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 67,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "my-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display text-3xl md:text-4xl font-bold text-gradient-gold tabular-nums break-words",
								children: kz(ov?.totalGross ?? 0)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [
									ov?.salesCount ?? 0,
									" vendas pagas · Líquido ",
									kz(ov?.totalNet ?? 0)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 73,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-6 flex flex-col justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[11px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight",
									children: "Disponível para Saque"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 81,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wallet, { className: "h-5 w-5 text-primary-glow shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 84,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 80,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "my-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-display text-3xl md:text-4xl font-bold tabular-nums text-foreground break-words",
									children: kz(w?.available_cents ?? 0)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 87,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 text-xs text-muted-foreground",
									children: "Saque mínimo de 5.000 Kz · Taxa fixa 6%"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 90,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 86,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/produtor/saques",
								className: "inline-block pt-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "sm",
									variant: "outline",
									className: "w-full border-primary/40 hover:bg-primary/10",
									children: ["Gerir Saques ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "h-4 w-4 ml-1.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 96,
										columnNumber: 28
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 95,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 94,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-success/40 bg-gradient-to-br from-success/15 via-card to-card p-6 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[11px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight",
								children: "Liberação Rápida"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 103,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "h-5 w-5 text-success shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 102,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "my-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display text-3xl md:text-4xl font-bold text-success",
								children: "1 Hora"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 109,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "Liberação em no mínimo 1 hora após a confirmação do pagamento."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 108,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 101,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 61,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MiniStat, {
						icon: Percent,
						label: "Taxa de Conversão",
						value: `${((ov?.conversion ?? 0) * 100).toFixed(1)}%`,
						hint: `${ov?.totalViews ?? 0} visualizações`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MiniStat, {
						icon: Receipt,
						label: "Ticket Médio",
						value: kz(ov?.avgTicket ?? 0),
						hint: "Por venda concluída"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MiniStat, {
						icon: ShoppingBag,
						label: "Vendas no Mês",
						value: String(ov?.month?.count ?? 0),
						hint: kz(ov?.month?.gross ?? 0)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MiniStat, {
						icon: Eye,
						label: "Comissões Pagas (2%)",
						value: kz(ov?.totalFees ?? 0),
						hint: "Apenas 2% por venda"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RevenueChart, {
				daily: ov?.seriesDaily,
				weekly: ov?.seriesWeekly,
				monthly: ov?.seriesMonthly,
				yearly: ov?.seriesYearly
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 126,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FeeBanner, { variant: "default" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 129,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border bg-card overflow-hidden shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-6 py-4 border-b border-border flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display font-semibold text-lg",
						children: "Histórico de Transações & Vendas"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs text-muted-foreground",
						children: [tx?.length ?? 0, " registos"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 9
				}, this), !tx?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-12 text-center text-sm text-muted-foreground",
					children: "Ainda sem transações registadas."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 137,
					columnNumber: 24
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
							className: "text-left text-xs uppercase tracking-wider text-muted-foreground bg-muted/30",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Data"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Produto"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Comprador"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 145,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Método"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 146,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5 text-right",
									children: "Bruto"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5 text-right",
									children: "Taxa (2%)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 148,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5 text-right",
									children: "Líquido"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 149,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Estado"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 150,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
							className: "divide-y divide-border",
							children: tx.map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "hover:bg-muted/10 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 text-muted-foreground whitespace-nowrap",
										children: new Date(t.created_at).toLocaleDateString("pt-AO")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 155,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 font-medium truncate max-w-[200px]",
										children: t.product?.title ?? "—"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 158,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 text-muted-foreground",
										children: t.buyer_name ?? t.buyer_email ?? "—"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 161,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 text-xs",
										children: methodLabel[t.payment_method] ?? t.payment_method
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 164,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 text-right font-mono font-medium",
										children: kz(t.gross_cents)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 text-right text-muted-foreground text-xs font-mono",
										children: ["-", kz(t.platform_fee_cents)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 170,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 text-right font-mono font-bold text-foreground",
										children: kz(t.net_cents)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusPill, { status: t.status }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 177,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 176,
										columnNumber: 21
									}, this)
								]
							}, t.id, true, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 37
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 20
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 10
	}, this);
}
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: `text-[11px] px-2.5 py-1 rounded-full font-medium border ${{
			pago: "bg-success/15 text-success border-success/30",
			pendente: "bg-warning/15 text-warning border-warning/30",
			reembolsado: "bg-destructive/15 text-destructive border-destructive/30",
			cancelado: "bg-muted text-muted-foreground border-border"
		}[status] ?? "bg-muted text-muted-foreground"}`,
		children: status
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 197,
		columnNumber: 10
	}, this);
}
function MiniStat({ icon: Icon, label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-border bg-card p-4 md:p-5 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-4 w-4 text-primary-glow" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 216,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold leading-tight",
					children: label
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 219,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 215,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-3 font-display text-xl md:text-2xl font-bold tabular-nums break-words",
				children: value
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 223,
				columnNumber: 7
			}, this),
			hint && /* @__PURE__ */ (void 0)("div", {
				className: "text-[11px] text-muted-foreground mt-1 truncate",
				children: hint
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 226,
				columnNumber: 16
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 214,
		columnNumber: 10
	}, this);
}
//#endregion
export { Page as component };
