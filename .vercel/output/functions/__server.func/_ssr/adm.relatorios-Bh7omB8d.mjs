import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { exportCsv, getPlatformReport } from "./admin.functions-C-gZNnTo.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { L as Percent, Wt as Banknote, b as ShieldCheck, i as Wallet, st as Handshake, u as TrendingUp, vt as Download, wt as Clock } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, o as CartesianGrid, r as YAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adm.relatorios-Bh7omB8d.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/adm.relatorios.tsx?tsr-split=component";
function kz(cents) {
	return new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 }).format(cents / 100) + " Kz";
}
function Page() {
	const reportFn = useServerFn(getPlatformReport);
	const csvFn = useServerFn(exportCsv);
	const { data, isLoading } = useQuery({
		queryKey: ["adm", "report"],
		queryFn: () => reportFn()
	});
	async function download(kind) {
		try {
			const csv = await csvFn({ data: { kind } });
			const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
			const a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = `infropay-${kind}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
			a.click();
			URL.revokeObjectURL(a.href);
		} catch (e) {
			toast.error(e.message);
		}
	}
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-10 text-sm text-muted-foreground",
		children: "A carregar relatórios financeiros..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 42,
		columnNumber: 34
	}, this);
	const t = data.totals;
	const totalPlatformRevenue = (t.commissions_cents ?? 0) + (t.withdrawal_fees_cents ?? 0);
	const cards = [
		{
			icon: TrendingUp,
			label: "Volume Total Vendido",
			value: kz(t.gross_cents),
			accent: "text-gold"
		},
		{
			icon: Percent,
			label: "Receita Vendas (2%)",
			value: kz(t.commissions_cents),
			accent: "text-primary-glow"
		},
		{
			icon: Banknote,
			label: "Receita Saques (6%)",
			value: kz(t.withdrawal_fees_cents),
			accent: "text-success"
		},
		{
			icon: ShieldCheck,
			label: "Receita Total InfroPay",
			value: kz(totalPlatformRevenue),
			accent: "text-gold font-bold"
		},
		{
			icon: Handshake,
			label: "Comissões Afiliados",
			value: kz(t.affiliate_commissions_cents),
			accent: "text-muted-foreground"
		},
		{
			icon: Wallet,
			label: "Total Já Sacado",
			value: kz(t.withdrawn_cents),
			accent: "text-foreground"
		},
		{
			icon: Clock,
			label: "Saques Pendentes",
			value: kz(t.pending_withdrawals_cents),
			accent: "text-warning"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-6xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs uppercase tracking-widest text-gold font-semibold",
						children: "Administração"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-3xl md:text-4xl font-bold mt-2",
						children: "Relatórios Financeiros"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground mt-2",
						children: [
							t.sales_count,
							" vendas pagas · ",
							t.products_count,
							" produtos cadastrados · ",
							t.users_count,
							" ",
							"utilizadores na plataforma"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 83,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						"pedidos",
						"produtores",
						"produtos"
					].map((k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => download(k),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 97,
								columnNumber: 15
							}, this),
							" Exportar ",
							k,
							" (CSV)"
						]
					}, k, true, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 70
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 95,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 82,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: cards.map((c) => {
					const Icon = c.icon;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card p-5 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `h-5 w-5 ${c.accent}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-3 font-semibold",
								children: c.label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: `font-display text-xl font-bold mt-1 ${c.accent}`,
								children: c.value
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 15
							}, this)
						]
					}, c.label, true, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 16
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 102,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border bg-card p-5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-sm font-semibold mb-4",
					children: "Volume de Vendas nos Últimos 30 Dias"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 116,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AreaChart, {
							data: data.series,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
									id: "admRev",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
										offset: "0%",
										stopColor: "var(--color-gold)",
										stopOpacity: .5
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 122,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
										offset: "100%",
										stopColor: "var(--color-gold)",
										stopOpacity: 0
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 123,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 121,
									columnNumber: 17
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 120,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "var(--color-border)",
									vertical: false
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 126,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
									dataKey: "date",
									tick: { fontSize: 10 },
									tickFormatter: (v) => String(v).slice(5),
									stroke: "var(--color-muted-foreground)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
									tick: { fontSize: 10 },
									tickFormatter: (v) => `${Math.round(Number(v) / 1e5)}k`,
									stroke: "var(--color-muted-foreground)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, {
									contentStyle: {
										background: "var(--color-card)",
										border: "1px solid var(--color-border)",
										borderRadius: 12,
										fontSize: 12
									},
									formatter: (v, n) => n === "total" ? [kz(Number(v)), "Faturamento"] : [v, "Vendas"]
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Area, {
									type: "monotone",
									dataKey: "total",
									stroke: "var(--color-gold)",
									fill: "url(#admRev)",
									strokeWidth: 2
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 139,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 117,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border bg-card p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-sm font-semibold mb-4",
						children: "Top 5 Produtores por Faturamento"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
						className: "space-y-3",
						children: [data.top_producers.map((p, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "h-6 w-6 rounded-lg bg-gold/15 text-gold grid place-items-center text-xs font-bold",
									children: i + 1
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 151,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "truncate font-medium",
									children: p.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 154,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-semibold shrink-0 font-mono",
								children: kz(p.revenue_cents)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 17
							}, this)]
						}, p.id, true, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 47
						}, this)), !data.top_producers.length && /* @__PURE__ */ (void 0)("li", {
							className: "text-sm text-muted-foreground",
							children: "Sem dados ainda."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 44
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 146,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border bg-card p-5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-sm font-semibold mb-4",
						children: "Top 5 Produtos Mais Vendidos"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
						className: "space-y-3",
						children: [data.top_products.map((p, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "h-6 w-6 rounded-lg bg-primary/15 text-primary-glow grid place-items-center text-xs font-bold",
									children: i + 1
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "truncate font-medium",
									children: p.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "shrink-0 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-semibold font-mono",
									children: kz(p.revenue_cents)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "block text-[11px] text-muted-foreground",
									children: [p.sales, " vendas"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 17
							}, this)]
						}, p.id, true, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 46
						}, this)), !data.top_products.length && /* @__PURE__ */ (void 0)("li", {
							className: "text-sm text-muted-foreground",
							children: "Sem dados ainda."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 176,
							columnNumber: 43
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 145,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 81,
		columnNumber: 10
	}, this);
}
//#endregion
export { Page as component };
