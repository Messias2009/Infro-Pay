import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as collection, f as doc, i as getDocs, n as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { i as firestore, n as auth } from "./firebase-config-BpvLLNMw.mjs";
import { v as useAuth } from "./router-DcboVFjc.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { B as Package, F as Plus, Pt as ChevronRight, Q as LayoutDashboard, Rt as ChartColumn, gt as ExternalLink, i as Wallet, j as Receipt, u as TrendingUp, wt as Clock, y as Shield, yt as DollarSign } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-HRHX5L42.mjs";
import { a as getProducerProducts, i as getProducerProductMetrics } from "./products.service-DAm7Wd7_.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart } from "../_libs/recharts+[...].mjs";
import { n as kz, t as FeeBanner } from "./FeeBanner-CDC3PD6P.mjs";
import { n as Badge, t as AdminDashboardView } from "./AdminDashboardView-BidzI2Bq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.index-ClKLU7CA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
async function getProducerWalletFirestore(userId) {
	const uid = userId || auth.currentUser?.uid;
	if (!uid) return {
		producer_id: "",
		available_cents: 0,
		pending_cents: 0,
		currency: "AOA"
	};
	try {
		const walletRef = doc(firestore, "wallets", uid);
		const snap = await getDoc(walletRef);
		if (snap.exists()) {
			const d = snap.data();
			return {
				producer_id: uid,
				available_cents: Math.round((d.availableBalance ?? d.available_cents ?? 0) * (typeof d.availableBalance === "number" ? 100 : 1)),
				pending_cents: Math.round((d.pendingBalance ?? d.pending_cents ?? 0) * (typeof d.pendingBalance === "number" ? 100 : 1)),
				currency: "AOA"
			};
		}
	} catch (err) {
		console.warn("Erro ao ler carteira no Firestore:", err);
	}
	return {
		producer_id: uid,
		available_cents: 0,
		pending_cents: 0,
		currency: "AOA"
	};
}
async function getProducerFinanceOverviewFirestore(userId) {
	const uid = userId || auth.currentUser?.uid;
	const prods = await getProducerProducts(uid);
	const totalViews = prods.reduce((acc, p) => acc + (p.views_count || 0), 0);
	const salesRows = [];
	if (uid) try {
		const salesRef = collection(firestore, "sales");
		(await getDocs(salesRef)).forEach((docSnap) => {
			const d = docSnap.data();
			if (d.sellerId === uid || d.producer_id === uid || d.userId === uid) salesRows.push({
				id: docSnap.id,
				...d
			});
		});
	} catch (err) {
		console.warn("Erro ao buscar vendas no Firestore:", err);
	}
	const paidSales = salesRows.filter((s) => s.status === "paid" || s.status === "pago");
	const salesCount = paidSales.length;
	let totalGrossCents = 0;
	let totalNetCents = 0;
	let totalFeesCents = 0;
	const now = /* @__PURE__ */ new Date();
	const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
	const startOfWeek = now.getTime() - 6048e5;
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
	let todayGross = 0;
	let todayCount = 0;
	let weekGross = 0;
	let weekCount = 0;
	let monthGross = 0;
	let monthCount = 0;
	paidSales.forEach((s) => {
		const gross = Math.round((s.grossAmount ?? s.gross_cents ?? 0) * (typeof s.grossAmount === "number" ? 100 : 1));
		const net = Math.round(s.sellerNetAmount ?? s.net_cents ?? gross * .98);
		const fee = Math.round(s.platformFeeAmount ?? s.platform_fee_cents ?? gross * .02);
		totalGrossCents += gross;
		totalNetCents += net;
		totalFeesCents += fee;
		const createdAtTime = new Date(s.createdAt || s.created_at || now).getTime();
		if (createdAtTime >= startOfDay) {
			todayGross += gross;
			todayCount += 1;
		}
		if (createdAtTime >= startOfWeek) {
			weekGross += gross;
			weekCount += 1;
		}
		if (createdAtTime >= startOfMonth) {
			monthGross += gross;
			monthCount += 1;
		}
	});
	const avgTicket = salesCount > 0 ? Math.round(totalGrossCents / salesCount) : 0;
	const conversion = totalViews > 0 ? salesCount / totalViews * 100 : 0;
	const series = [];
	for (let i = 13; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - i);
		const label = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}`;
		const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
		const dayEnd = dayStart + 864e5;
		const daySales = paidSales.filter((s) => {
			const t = new Date(s.createdAt || s.created_at || now).getTime();
			return t >= dayStart && t < dayEnd;
		});
		const dayGross = daySales.reduce((acc, s) => acc + Math.round((s.grossAmount ?? s.gross_cents ?? 0) * (typeof s.grossAmount === "number" ? 100 : 1)), 0);
		const dayNet = daySales.reduce((acc, s) => acc + Math.round(s.sellerNetAmount ?? s.net_cents ?? (s.grossAmount ? s.grossAmount * 98 : 0)), 0);
		series.push({
			date: label,
			gross: dayGross,
			net: dayNet,
			count: daySales.length
		});
	}
	const seriesDaily = series.map((s) => ({
		label: s.date,
		...s
	}));
	const prodMap = {};
	prods.forEach((p) => {
		prodMap[p.id] = {
			id: p.id,
			title: p.title,
			cover_url: p.cover_url || void 0,
			count: 0,
			net: 0
		};
	});
	paidSales.forEach((s) => {
		const prodId = s.productId || s.product_id;
		if (prodId && prodMap[prodId]) {
			prodMap[prodId].count += 1;
			const gross = Math.round((s.grossAmount ?? s.gross_cents ?? 0) * (typeof s.grossAmount === "number" ? 100 : 1));
			const net = Math.round(s.sellerNetAmount ?? s.net_cents ?? gross * .98);
			prodMap[prodId].net += net;
		}
	});
	const topProducts = Object.values(prodMap).filter((p) => p.count > 0).sort((a, b) => b.count - a.count || b.net - a.net).slice(0, 5);
	return {
		today: {
			gross: todayGross,
			count: todayCount
		},
		week: {
			gross: weekGross,
			count: weekCount
		},
		month: {
			gross: monthGross,
			count: monthCount
		},
		avgTicket,
		salesCount,
		totalGross: totalGrossCents,
		totalNet: totalNetCents,
		totalFees: totalFeesCents,
		totalViews,
		conversion,
		series,
		seriesDaily,
		seriesWeekly: seriesDaily.slice(-8),
		seriesMonthly: seriesDaily.slice(-12),
		seriesYearly: seriesDaily.slice(-3),
		topProducts
	};
}
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.index.tsx?tsr-split=component";
function Dashboard() {
	const { user, isAdmin } = useAuth();
	const isAdminUser = isAdmin || user?.uid === "rsKuyZLn7gbRulIKz5WpxpgqJDo2" || user?.email?.toLowerCase() === "infropayao@gmail.com";
	const [activeAdminTab, setActiveAdminTab] = (0, import_react.useState)("admin");
	const [isPerformanceModalOpen, setIsPerformanceModalOpen] = (0, import_react.useState)(false);
	const { data: o } = useQuery({
		queryKey: [
			"producer",
			"overview",
			user?.uid
		],
		queryFn: () => getProducerFinanceOverviewFirestore(user?.uid)
	});
	const { data: w } = useQuery({
		queryKey: [
			"producer",
			"wallet",
			user?.uid
		],
		queryFn: () => getProducerWalletFirestore(user?.uid)
	});
	const { data: productMetrics } = useQuery({
		queryKey: [
			"producer",
			"product-metrics",
			user?.uid
		],
		queryFn: () => getProducerProductMetrics(user?.uid)
	});
	const handleOpenPerformance = () => {
		setIsPerformanceModalOpen(true);
		const elem = document.getElementById("meus-produtos-desempenho");
		if (elem) elem.scrollIntoView({ behavior: "smooth" });
	};
	if (isAdminUser && activeAdminTab === "admin") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-6 min-w-0 max-w-full overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
					className: "bg-gold text-primary-foreground font-bold tracking-wider uppercase text-[10px] px-2 py-0.5 flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "h-3 w-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 60,
						columnNumber: 15
					}, this), "Sessão de Administrador"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs text-muted-foreground hidden sm:inline",
					children: ["Logado como ", user?.email]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 58,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => setActiveAdminTab("producer"),
					className: "text-xs gap-1.5 border-border",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutDashboard, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 70,
						columnNumber: 15
					}, this), "Ver Meu Painel Pessoal"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor/novo",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						className: "gradient-brand text-primary-foreground text-xs gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 75,
							columnNumber: 17
						}, this), "Novo Produto"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 68,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 57,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminDashboardView, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 83,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 55,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-5 sm:space-y-6 md:space-y-8 min-w-0 max-w-full overflow-hidden",
		children: [
			isAdminUser && /* @__PURE__ */ (void 0)("div", {
				className: "p-3.5 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2 text-xs font-semibold text-gold",
					children: [/* @__PURE__ */ (void 0)(Shield, { className: "h-4 w-4 shrink-0" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Está na vista pessoal de produtor." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)(Button, {
					size: "sm",
					onClick: () => setActiveAdminTab("admin"),
					className: "bg-gold text-primary-foreground hover:bg-gold/90 text-xs h-7 px-3 font-semibold",
					children: "Voltar ao Painel Administrativo"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 93,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 23
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[11px] sm:text-xs uppercase tracking-wider text-gold font-bold",
							children: "DASHBOARD FINANCEIRO"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "font-display text-lg sm:text-2xl md:text-3xl font-bold mt-1 text-foreground leading-snug sm:leading-tight",
							children: "Acompanhe suas vendas, comissões, saldo e crescimento em tempo real."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 104,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-xs sm:text-sm text-muted-foreground leading-normal",
							children: "Visão consolidada da sua conta e métricas financeiras em Angola (AOA)."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 107,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/produtor/saques",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wallet, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 114,
								columnNumber: 15
							}, this), "Saques"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 113,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/produtor/novo",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							className: "gradient-brand text-primary-foreground shadow-glow h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 120,
								columnNumber: 15
							}, this), "Novo produto"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 111,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WalletCard, {
						tone: "brand",
						icon: Wallet,
						label: "SALDO DISPONÍVEL",
						value: kz(w?.available_cents ?? 0),
						hint: "Pronto para saque"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WalletCard, {
						tone: "gold",
						icon: Clock,
						label: "SALDO BLOQUEADO",
						value: kz(w?.pending_cents ?? 0),
						hint: "Liberação em no mínimo 1h"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WalletCard, {
						tone: "muted",
						icon: Receipt,
						label: "COMISSÕES PAGAS",
						value: kz(o?.totalFees ?? 0),
						hint: "2% por venda"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-full flex justify-center sm:justify-start",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					id: "btn-ver-desempenho-produtos",
					type: "button",
					onClick: handleOpenPerformance,
					className: "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "h-5 w-5 shrink-0" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "VER DESEMPENHO DOS MEUS PRODUTOS" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 136,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 135,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Kpi, {
						icon: DollarSign,
						label: "Hoje",
						value: kz(o?.today.gross ?? 0),
						sub: `${o?.today.count ?? 0} vendas`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 144,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Kpi, {
						icon: TrendingUp,
						label: "Últimos 7 dias",
						value: kz(o?.week.gross ?? 0),
						sub: `${o?.week.count ?? 0} vendas`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Kpi, {
						icon: TrendingUp,
						label: "Este mês",
						value: kz(o?.month.gross ?? 0),
						sub: `${o?.month.count ?? 0} vendas`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Kpi, {
						icon: Package,
						label: "Ticket médio",
						value: kz(o?.avgTicket ?? 0),
						sub: `${o?.salesCount ?? 0} totais`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 143,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-2 rounded-2xl border border-border bg-card p-4 sm:p-5 min-w-0 overflow-hidden shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between mb-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
							children: "Faturamento — últimos 14 dias"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "font-display text-lg sm:text-xl font-bold mt-1",
							children: "Evolução das vendas"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-56 sm:h-64 w-full",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AreaChart, {
								data: o?.series ?? [],
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("defs", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
										id: "gGross",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
											offset: "0%",
											stopColor: "var(--color-primary)",
											stopOpacity: .55
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 168,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
											offset: "100%",
											stopColor: "var(--color-primary)",
											stopOpacity: 0
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 169,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("linearGradient", {
										id: "gNet",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
											offset: "0%",
											stopColor: "var(--color-gold)",
											stopOpacity: .45
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 172,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("stop", {
											offset: "100%",
											stopColor: "var(--color-gold)",
											stopOpacity: 0
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 173,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 171,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 166,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
										stroke: "var(--color-border)",
										strokeOpacity: .3,
										vertical: false
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 176,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
										dataKey: "date",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 177,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										width: 45
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 178,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, {
										contentStyle: {
											background: "var(--color-card)",
											border: "1px solid var(--color-border)",
											borderRadius: 12
										},
										formatter: (v) => new Intl.NumberFormat("pt-AO").format(v) + " AOA"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 179,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Area, {
										type: "monotone",
										dataKey: "gross",
										stroke: "var(--color-primary)",
										fill: "url(#gGross)",
										strokeWidth: 2,
										name: "Faturamento Bruto"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 184,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Area, {
										type: "monotone",
										dataKey: "net",
										stroke: "var(--color-gold)",
										fill: "url(#gNet)",
										strokeWidth: 2,
										name: "Faturamento Líquido"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 185,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border bg-card p-4 sm:p-5 min-w-0 overflow-hidden shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
							children: "Volume diário"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "font-display text-lg sm:text-xl font-bold mt-1",
							children: "Nº de vendas"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-56 sm:h-64 mt-2 w-full",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BarChart, {
									data: o?.series ?? [],
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
											stroke: "var(--color-border)",
											strokeOpacity: .3,
											vertical: false
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 199,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
											dataKey: "date",
											stroke: "var(--color-muted-foreground)",
											fontSize: 11
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 200,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											width: 30,
											allowDecimals: false
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 201,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, { contentStyle: {
											background: "var(--color-card)",
											border: "1px solid var(--color-border)",
											borderRadius: 12
										} }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 202,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, {
											dataKey: "count",
											fill: "var(--color-primary)",
											radius: [
												6,
												6,
												0,
												0
											],
											name: "Vendas"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 207,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 191,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				id: "meus-produtos-desempenho",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductMetricsSection, { rows: productMetrics }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 216,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 215,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FeeBanner, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 219,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: isPerformanceModalOpen,
				onOpenChange: setIsPerformanceModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "max-w-4xl max-h-[90vh] overflow-y-auto p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-9 w-9 rounded-xl bg-blue-600/15 border border-blue-600/30 grid place-items-center text-blue-500",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "font-display text-xl font-bold",
							children: "Desempenho dos Meus Produtos"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Métricas individuais, visualizações, conversões e receitas dos produtos cadastrados por si."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 233,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 space-y-4",
						children: !productMetrics || productMetrics.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-8 text-center border border-dashed border-border rounded-xl bg-muted/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "h-10 w-10 text-muted-foreground/50 mx-auto mb-2" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-semibold text-sm text-foreground",
									children: "Sem dados disponíveis"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 244,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground mt-1 max-w-sm mx-auto",
									children: "Ainda não tem produtos cadastrados. Crie o seu primeiro produto digital para começar a acompanhar o desempenho de vendas e cliques."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/produtor/novo",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "sm",
											className: "bg-[#2563EB] hover:bg-blue-700 text-white",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 252,
												columnNumber: 23
											}, this), "Cadastrar Produto"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 251,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 250,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 242,
							columnNumber: 63
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: productMetrics.map((prod) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl border border-border bg-card p-4 space-y-3.5 shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0 border border-border",
											children: prod.cover_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
												src: prod.cover_url,
												alt: "",
												className: "h-full w-full object-cover"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 261,
												columnNumber: 43
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "h-6 w-6 text-muted-foreground m-auto" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 261,
												columnNumber: 120
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 260,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-bold text-sm text-foreground truncate",
												children: prod.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 264,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "capitalize",
														children: prod.status
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 268,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 269,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "font-semibold text-primary-glow",
														children: [prod.sales, " vendas"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 270,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 267,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 263,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 259,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-muted/40 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-[10px] uppercase text-muted-foreground font-semibold",
												children: "Views"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 279,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-bold text-sm mt-0.5",
												children: prod.views
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 282,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 278,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-[10px] uppercase text-muted-foreground font-semibold",
												children: "Conversão"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 285,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-bold text-sm mt-0.5 text-emerald-500",
												children: [prod.conversion.toFixed(1), "%"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 288,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 284,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-[10px] uppercase text-muted-foreground font-semibold",
												children: "Receita"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 293,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-bold text-sm mt-0.5 text-gold",
												children: kz(prod.revenue)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 296,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 292,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 277,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between pt-1 border-t border-border/60",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/produto/$slug",
											params: { slug: prod.slug },
											target: "_blank",
											className: "text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1",
											children: ["Ver página ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 304,
												columnNumber: 36
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 301,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/produtor/editar/$id",
											params: { id: prod.id },
											className: "text-xs font-semibold text-primary-glow hover:underline inline-flex items-center gap-1",
											children: ["Editar produto ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "h-3 w-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 309,
												columnNumber: 40
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 306,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 300,
										columnNumber: 21
									}, this)
								]
							}, prod.id, true, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 45
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 24
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 241,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 223,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 222,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 86,
		columnNumber: 10
	}, this);
}
function ProductMetricsSection({ rows }) {
	if (!rows || rows.length === 0) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-border bg-card p-6 text-center shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1",
				children: "─── MEUS PRODUTOS ───"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 326,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display font-bold text-lg text-foreground",
				children: "Desempenho dos Meus Produtos"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 329,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs text-muted-foreground mt-1 max-w-md mx-auto",
				children: "Sem dados disponíveis. Apenas os produtos cadastrados por si aparecem nesta secção com as suas métricas reais."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 332,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor/novo",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						className: "bg-[#2563EB] hover:bg-blue-700 text-white",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 339,
							columnNumber: 15
						}, this), "Cadastrar Primeiro Produto"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 338,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 337,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 336,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 325,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-border bg-card overflow-hidden shadow-sm min-w-0 max-w-full",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "px-5 sm:px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs uppercase tracking-widest text-gold font-bold",
				children: "─── MEUS PRODUTOS ───"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 349,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display font-bold text-base sm:text-lg text-foreground",
				children: [
					"Desempenho dos Meus Produtos (",
					rows.length,
					")"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 352,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 348,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/produtor/produtos",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "ghost",
					size: "sm",
					className: "text-xs font-semibold text-primary-glow",
					children: ["Gerir todos ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "h-3 w-3 ml-1" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 358,
						columnNumber: 25
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 357,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 356,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 347,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "overflow-x-auto w-full max-w-full",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
				className: "w-full text-xs sm:text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
					className: "bg-muted/40 text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-bold",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 text-left font-semibold",
							children: "Produto"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 367,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Views"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 368,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Cliques"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 369,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Conversão"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 370,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Vendas"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 371,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Receita"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 372,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Afiliados"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 373,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Com. paga"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 374,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Com. pendente"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 375,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 366,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 365,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
					className: "divide-y divide-border",
					children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
						className: "hover:bg-muted/20 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/produtor/editar/$id",
									params: { id: r.id },
									className: "flex items-center gap-2.5 min-w-0 hover:text-primary-glow",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-gold/10 border border-border",
										children: r.cover_url && /* @__PURE__ */ (void 0)("img", {
											src: r.cover_url,
											alt: "",
											loading: "lazy",
											className: "h-full w-full object-cover"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 385,
											columnNumber: 39
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "max-w-44 sm:max-w-64 truncate font-medium text-foreground",
										children: r.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 387,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 381,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 380,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-3 text-right text-muted-foreground",
								children: r.views
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 392,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-3 text-right text-muted-foreground",
								children: r.clicks
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 393,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-3 text-right font-medium text-emerald-500",
								children: [r.conversion.toFixed(1), "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 394,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-3 text-right font-bold text-foreground",
								children: r.sales
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 397,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-3 text-right font-bold text-foreground",
								children: kz(r.revenue)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 398,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-3 text-right text-muted-foreground",
								children: r.activeAffiliates
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 399,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-3 text-right text-muted-foreground",
								children: kz(r.commissionPaid)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 400,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-4 py-3 text-right text-gold font-medium",
								children: kz(r.commissionPending)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 403,
								columnNumber: 17
							}, this)
						]
					}, r.id, true, {
						fileName: _jsxFileName,
						lineNumber: 379,
						columnNumber: 28
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 378,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 364,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 363,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 346,
		columnNumber: 10
	}, this);
}
function Kpi({ icon: Icon, label, value, sub }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-border bg-card p-4 sm:p-5 min-w-0 overflow-hidden shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold truncate",
					children: label
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 420,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-4 w-4 text-gold shrink-0" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 423,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 419,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-2.5 text-xl sm:text-2xl font-bold font-display text-foreground truncate",
				title: value,
				children: value
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 425,
				columnNumber: 7
			}, this),
			sub && /* @__PURE__ */ (void 0)("div", {
				className: "text-xs text-muted-foreground mt-1 truncate",
				children: sub
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 428,
				columnNumber: 15
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 418,
		columnNumber: 10
	}, this);
}
function WalletCard({ icon: Icon, label, value, hint, tone }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `rounded-2xl border p-4 sm:p-5 md:p-6 min-w-0 overflow-hidden shadow-sm ${{
			brand: "border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card",
			gold: "border-gold/40 bg-gradient-to-br from-gold/15 via-card to-card",
			muted: "border-border bg-card"
		}[tone]}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-widest text-muted-foreground font-bold truncate",
					children: label
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 451,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `h-5 w-5 shrink-0 ${tone === "brand" ? "text-primary-glow" : tone === "gold" ? "text-gold" : "text-muted-foreground"}` }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 454,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 450,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-2.5 font-display text-2xl sm:text-3xl font-bold text-foreground truncate",
				title: value,
				children: value
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 456,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs text-muted-foreground mt-1 truncate",
				children: hint
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 459,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 449,
		columnNumber: 10
	}, this);
}
//#endregion
export { Dashboard as component };
