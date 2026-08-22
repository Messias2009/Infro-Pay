import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as collection, i as getDocs, o as orderBy, s as query } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { i as firestore } from "./firebase-config-BpvLLNMw.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { A as RefreshCw, B as Package, K as Mail, Pt as ChevronRight, T as Search, _ as ShoppingCart, a as Users, gt as ExternalLink, u as TrendingUp, y as Shield, zt as Calendar } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn, t as Button } from "./button-2_3vHNWL.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-HRHX5L42.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminDashboardView-BidzI2Bq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
/**
* Fetches all registered users/sellers and aggregates their total product count,
* sales count, and volume.
*/
async function fetchAdminUsersWithStats() {
	try {
		const usersRef = collection(firestore, "users");
		const userSnapshots = await getDocs(query(usersRef, orderBy("createdAt", "desc"))).catch(async () => {
			return await getDocs(usersRef);
		});
		const usersMap = /* @__PURE__ */ new Map();
		userSnapshots.forEach((docSnap) => {
			const data = docSnap.data();
			const uid = docSnap.id || data.uid || data.id;
			const createdAt = data.createdAt || (data.created_at ? new Date(data.created_at).toISOString() : (/* @__PURE__ */ new Date()).toISOString());
			usersMap.set(uid, {
				uid,
				id: uid,
				email: data.email || "Sem e-mail",
				name: data.name || data.displayName || data.full_name || "Utilizador",
				avatar_url: data.avatar_url || data.photoURL || null,
				photoURL: data.photoURL || data.avatar_url || null,
				role: data.role || "seller",
				status: data.status || "active",
				createdAt,
				lastLoginAt: data.lastLoginAt,
				productCount: 0,
				salesCount: 0,
				totalGrossAOA: 0,
				totalNetAOA: 0
			});
		});
		const productsRef = collection(firestore, "products");
		(await getDocs(productsRef)).forEach((docSnap) => {
			const p = docSnap.data();
			const ownerId = p.producer_id || p.sellerId || p.userId;
			if (ownerId && usersMap.has(ownerId)) {
				const u = usersMap.get(ownerId);
				u.productCount += 1;
			} else if (ownerId && !usersMap.has(ownerId)) usersMap.set(ownerId, {
				uid: ownerId,
				id: ownerId,
				email: p.sellerEmail || "Utilizador da Loja",
				name: p.sellerName || "Produtor",
				role: "seller",
				status: "active",
				createdAt: p.created_at || p.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
				productCount: 1,
				salesCount: 0,
				totalGrossAOA: 0,
				totalNetAOA: 0
			});
		});
		const salesRef = collection(firestore, "sales");
		(await getDocs(salesRef)).forEach((docSnap) => {
			const s = docSnap.data();
			const sellerId = s.sellerId || s.producer_id || s.seller_id;
			const gross = Number(s.grossAmount ?? s.amount ?? s.gross_cents ? (s.gross_cents ?? 0) / 100 : 0) || 0;
			const net = Number(s.sellerNetAmount ?? s.net_cents ? (s.net_cents ?? 0) / 100 : gross * .98) || 0;
			const isPaid = s.status === "pago" || s.status === "completed" || s.status === "paid";
			if (sellerId && usersMap.has(sellerId)) {
				const u = usersMap.get(sellerId);
				if (isPaid) {
					u.salesCount += 1;
					u.totalGrossAOA += gross;
					u.totalNetAOA += net;
				}
			}
		});
		return Array.from(usersMap.values()).sort((a, b) => {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		});
	} catch (err) {
		console.error("fetchAdminUsersWithStats error:", err);
		return [];
	}
}
/**
* Fetches all products and sales belonging to a specific user.
*/
async function fetchUserProductsAndSales(userId) {
	try {
		const productsRef = collection(firestore, "products");
		const productsSnap = await getDocs(productsRef);
		const userProducts = [];
		productsSnap.forEach((docSnap) => {
			const data = docSnap.data();
			const ownerId = data.producer_id || data.sellerId || data.userId;
			if (ownerId === userId) userProducts.push({
				id: docSnap.id,
				title: data.title || "Produto sem título",
				slug: data.slug || docSnap.id,
				short_description: data.short_description || null,
				description: data.description || null,
				product_type: data.product_type || "ebook",
				cover_url: data.cover_url || null,
				price_cents: Number(data.price_cents ?? (data.price ? data.price * 100 : 0)),
				currency: data.currency || "AOA",
				status: data.status || "rascunho",
				sales_count: Number(data.sales_count || 0),
				views_count: Number(data.views_count || 0),
				producer_id: ownerId,
				sellerId: ownerId,
				created_at: data.created_at || data.createdAt || (/* @__PURE__ */ new Date()).toISOString()
			});
		});
		const salesRef = collection(firestore, "sales");
		const salesSnap = await getDocs(salesRef);
		const userSales = [];
		salesSnap.forEach((docSnap) => {
			const data = docSnap.data();
			if ((data.sellerId || data.producer_id || data.seller_id) === userId) {
				const gross = Number(data.grossAmount ?? (data.gross_cents ? data.gross_cents / 100 : data.amount ?? 0));
				const net = Number(data.sellerNetAmount ?? (data.net_cents ? data.net_cents / 100 : gross * .98));
				userSales.push({
					id: docSnap.id,
					productTitle: data.productTitle || data.product_title || "Produto Digital",
					customerName: data.customerName || data.buyerName || data.buyer_name || "Cliente",
					customerEmail: data.customerEmail || data.buyerEmail || data.buyer_email || "—",
					grossAmount: gross,
					netAmount: net,
					currency: data.currency || "AOA",
					status: data.status || "pendente",
					paymentMethod: data.paymentMethod || data.payment_method || "Multicaixa Express",
					createdAt: data.createdAt || data.created_at || data.paid_at || (/* @__PURE__ */ new Date()).toISOString()
				});
			}
		});
		userProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
		userSales.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
		return {
			products: userProducts,
			sales: userSales
		};
	} catch (err) {
		console.error("fetchUserProductsAndSales error:", err);
		return {
			products: [],
			sales: []
		};
	}
}
var _jsxFileName$2 = "/app/applet/src/components/ui/badge.tsx";
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 29,
		columnNumber: 10
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/ui/tabs.tsx";
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 12,
	columnNumber: 3
}, void 0));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 27,
	columnNumber: 3
}, void 0));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 42,
	columnNumber: 3
}, void 0));
TabsContent.displayName = Content.displayName;
var _jsxFileName = "/app/applet/src/components/admin/AdminDashboardView.tsx";
function formatKz(amount) {
	return new Intl.NumberFormat("pt-AO", {
		style: "currency",
		currency: "AOA",
		maximumFractionDigits: 0
	}).format(amount);
}
function formatDate(dateStr) {
	try {
		const d = new Date(dateStr);
		if (isNaN(d.getTime())) return dateStr;
		return new Intl.DateTimeFormat("pt-PT", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}).format(d);
	} catch {
		return dateStr;
	}
}
function AdminDashboardView() {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [selectedUser, setSelectedUser] = (0, import_react.useState)(null);
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	const [loadingDetails, setLoadingDetails] = (0, import_react.useState)(false);
	const [userDetails, setUserDetails] = (0, import_react.useState)({
		products: [],
		sales: []
	});
	const loadData = async () => {
		setLoading(true);
		try {
			const data = await fetchAdminUsersWithStats();
			setUsers(data);
		} catch (err) {
			console.error("Erro ao carregar utilizadores:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const handleOpenUser = async (user) => {
		setSelectedUser(user);
		setModalOpen(true);
		setLoadingDetails(true);
		try {
			const details = await fetchUserProductsAndSales(user.uid);
			setUserDetails(details);
		} catch (err) {
			console.error("Erro ao carregar detalhes do utilizador:", err);
			setUserDetails({
				products: [],
				sales: []
			});
		} finally {
			setLoadingDetails(false);
		}
	};
	const filteredUsers = (0, import_react.useMemo)(() => {
		if (!searchTerm.trim()) return users;
		const q = searchTerm.toLowerCase();
		return users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.uid.toLowerCase().includes(q));
	}, [users, searchTerm]);
	const globalStats = (0, import_react.useMemo)(() => {
		return {
			totalUsers: users.length,
			totalProducts: users.reduce((acc, u) => acc + u.productCount, 0),
			totalSales: users.reduce((acc, u) => acc + u.salesCount, 0),
			totalVolume: users.reduce((acc, u) => acc + u.totalGrossAOA, 0)
		};
	}, [users]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8 animate-in fade-in duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-gold/10 via-card to-background border border-gold/30 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-11 w-11 rounded-xl bg-gold/20 flex items-center justify-center text-gold border border-gold/40",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "h-6 w-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-xl md:text-2xl font-bold tracking-tight text-foreground font-display",
							children: "Painel Administrativo Global"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							id: "admin-badge",
							className: "bg-gold text-primary-foreground font-bold tracking-wide uppercase text-[10px] px-2 py-0.5",
							children: "Admin"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 136,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs md:text-sm text-muted-foreground mt-0.5",
						children: "Supervisão de todos os utilizadores, vendedores, catálogo de produtos e transações da InfroPay."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 131,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						id: "refresh-admin-data",
						variant: "outline",
						size: "sm",
						onClick: loadData,
						disabled: loading,
						className: "gap-2 text-xs border-border",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `h-3.5 w-3.5 ${loading ? "animate-spin" : ""}` }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 13
						}, this), "Atualizar Dados"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						id: "go-to-admin-suite",
						asChild: true,
						size: "sm",
						className: "bg-gold text-primary-foreground hover:bg-gold/90 font-medium text-xs gap-1.5",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/adm",
							children: ["Fila de Aprovação", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 154,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-5 rounded-2xl bg-card border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Total Utilizadores"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 184,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "h-4 w-4 text-gold" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl md:text-3xl font-bold font-display mt-2",
								children: globalStats.totalUsers
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 189,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "Produtores e compradores ativos"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-5 rounded-2xl bg-card border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Produtos Criados"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "h-4 w-4 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 196,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl md:text-3xl font-bold font-display mt-2",
								children: globalStats.totalProducts
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "No catálogo de toda a plataforma"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 195,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-5 rounded-2xl bg-card border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Total de Vendas"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingCart, { className: "h-4 w-4 text-blue-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl md:text-3xl font-bold font-display mt-2",
								children: globalStats.totalSales
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "Pedidos confirmados"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-5 rounded-2xl bg-card border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
									children: "Volume Transacionado"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 223,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "h-4 w-4 text-gold" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xl md:text-2xl font-bold font-display mt-2 text-gold",
								children: formatKz(globalStats.totalVolume)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "Faturamento bruto global"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 221,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 181,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border bg-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-lg font-bold font-display text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "h-5 w-5 text-gold" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 15
						}, this), "Utilizadores e Vendedores Registados"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Clique em qualquer utilizador para inspecionar os seus produtos e histórico de vendas."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative w-full md:w-80",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 249,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							id: "search-admin-users",
							placeholder: "Pesquisar por nome, e-mail ou UID...",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							className: "pl-9 h-9 text-xs bg-background/50"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 250,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 248,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 237,
					columnNumber: 9
				}, this), loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-12 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-6 w-6 animate-spin text-gold" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "A carregar lista de utilizadores da plataforma..." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 262,
					columnNumber: 11
				}, this) : filteredUsers.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "h-10 w-10 text-muted-foreground/40 mx-auto mb-2" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 268,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-sm font-semibold text-foreground",
							children: "Nenhum utilizador encontrado"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 269,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: searchTerm ? "Tente ajustar os termos da sua pesquisa." : "Ainda não existem utilizadores registados na base de dados."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 272,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 267,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
							className: "bg-muted/30 border-b border-border text-muted-foreground font-medium uppercase tracking-wider text-[10px]",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3.5 px-4",
									children: "Utilizador / Vendedor"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 283,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3.5 px-4",
									children: "E-mail"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3.5 px-4",
									children: "Data de Criação"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 285,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3.5 px-4 text-center",
									children: "Produtos"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 286,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3.5 px-4 text-center",
									children: "Vendas"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 287,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3.5 px-4 text-right",
									children: "Volume"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 288,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-3.5 px-4 text-right",
									children: "Ação"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 289,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 282,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 281,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
							className: "divide-y divide-border/60",
							children: filteredUsers.map((u) => {
								const isAdminUser = u.role === "admin" || u.uid === "rsKuyZLn7gbRulIKz5WpxpgqJDo2" || u.email === "infropayao@gmail.com";
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
									onClick: () => handleOpenUser(u),
									className: "hover:bg-accent/40 cursor-pointer transition group",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "h-8 w-8 rounded-full bg-muted/80 flex items-center justify-center font-bold text-foreground overflow-hidden shrink-0 border border-border",
													children: u.avatar_url || u.photoURL ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
														src: u.avatar_url || u.photoURL || "",
														alt: "",
														className: "h-full w-full object-cover"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 309,
														columnNumber: 31
													}, this) : u.name.charAt(0).toUpperCase()
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 307,
													columnNumber: 27
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "font-semibold text-foreground flex items-center gap-1.5",
													children: [u.name, isAdminUser && /* @__PURE__ */ (void 0)(Badge, {
														className: "bg-gold/20 text-gold border-gold/40 text-[9px] px-1.5 py-0",
														children: "Admin"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 322,
														columnNumber: 33
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 319,
													columnNumber: 29
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "text-[10px] text-muted-foreground font-mono truncate max-w-[140px]",
													children: u.uid
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 327,
													columnNumber: 29
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 318,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 306,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 305,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-muted-foreground font-mono",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-3 w-3 text-muted-foreground/60 shrink-0" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 336,
													columnNumber: 27
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "truncate max-w-[200px]",
													children: u.email
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 337,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 335,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 334,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-muted-foreground whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "h-3 w-3 text-muted-foreground/60 shrink-0" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 343,
													columnNumber: 27
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: formatDate(u.createdAt) }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 344,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 342,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 341,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-center",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: u.productCount > 0 ? "secondary" : "outline",
												className: "text-xs font-semibold px-2 py-0.5",
												children: [
													u.productCount,
													" ",
													u.productCount === 1 ? "produto" : "produtos"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 349,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 348,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-center",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-foreground",
												children: u.salesCount
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 358,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 357,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-right font-medium text-foreground",
											children: formatKz(u.totalGrossAOA)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 361,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-right",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												id: `view-user-${u.uid}`,
												variant: "ghost",
												size: "sm",
												className: "h-8 px-2.5 text-xs text-gold group-hover:bg-gold/10 font-medium",
												onClick: (e) => {
													e.stopPropagation();
													handleOpenUser(u);
												},
												children: ["Inspecionar", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "h-3.5 w-3.5 ml-1" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 377,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 366,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 365,
											columnNumber: 23
										}, this)
									]
								}, u.uid, true, {
									fileName: _jsxFileName,
									lineNumber: 300,
									columnNumber: 21
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 292,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 279,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 236,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: modalOpen,
				onOpenChange: setModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "max-w-4xl max-h-[85vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-10 w-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-bold text-gold shrink-0",
							children: selectedUser?.name?.charAt(0).toUpperCase() ?? "U"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 394,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-lg font-bold font-display flex items-center gap-2",
							children: [selectedUser?.name, selectedUser?.role === "admin" && /* @__PURE__ */ (void 0)(Badge, {
								className: "bg-gold text-primary-foreground text-[10px]",
								children: "Admin"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 401,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 398,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs flex items-center gap-2 mt-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono",
									children: selectedUser?.email
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 405,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 406,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Membro desde ", formatDate(selectedUser?.createdAt || "")] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 407,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 404,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 397,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 393,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 392,
						columnNumber: 11
					}, this), loadingDetails ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-12 text-center flex flex-col items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-6 w-6 animate-spin text-gold" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 415,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-muted-foreground",
							children: "A carregar produtos e vendas do utilizador..."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 416,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 414,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tabs, {
						defaultValue: "products",
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsList, {
								className: "grid grid-cols-2 w-full max-w-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "products",
									className: "gap-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 424,
											columnNumber: 19
										}, this),
										"Produtos (",
										userDetails.products.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 423,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsTrigger, {
									value: "sales",
									className: "gap-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingCart, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 428,
											columnNumber: 19
										}, this),
										"Vendas (",
										userDetails.sales.length,
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 427,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 422,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
								value: "products",
								className: "mt-4 space-y-3",
								children: userDetails.products.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "p-8 text-center border border-dashed border-border rounded-xl bg-muted/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "h-8 w-8 text-muted-foreground/40 mx-auto mb-2" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 437,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-semibold text-sm text-foreground",
											children: "Sem dados disponíveis"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 438,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-muted-foreground mt-1",
											children: "Este utilizador ainda não cadastrou nenhum produto na plataforma."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 441,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 436,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid gap-3",
									children: userDetails.products.map((prod) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "p-3.5 rounded-xl border border-border bg-card/60 flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-3 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-border",
												children: prod.cover_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
													src: prod.cover_url,
													alt: "",
													className: "h-full w-full object-cover"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 455,
													columnNumber: 31
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "h-5 w-5 text-muted-foreground/60" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 461,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 453,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "font-semibold text-sm text-foreground truncate",
													children: prod.title
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 465,
													columnNumber: 29
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "text-xs text-muted-foreground flex items-center gap-2 mt-0.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "font-medium text-gold",
															children: formatKz(prod.price_cents / 100)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 469,
															columnNumber: 31
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 472,
															columnNumber: 31
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "capitalize",
															children: prod.product_type
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 473,
															columnNumber: 31
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 474,
															columnNumber: 31
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [prod.sales_count, " vendas"] }, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 475,
															columnNumber: 31
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 468,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 464,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 452,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: prod.status === "publicado" ? "default" : prod.status === "em_analise" ? "secondary" : "outline",
												className: "text-[10px] capitalize",
												children: prod.status
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 481,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												asChild: true,
												variant: "ghost",
												size: "sm",
												className: "h-8 w-8 p-0 text-muted-foreground hover:text-foreground",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
													to: "/produto/$slug",
													params: { slug: prod.slug },
													target: "_blank",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 500,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 499,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 493,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 480,
											columnNumber: 25
										}, this)]
									}, prod.id, true, {
										fileName: _jsxFileName,
										lineNumber: 448,
										columnNumber: 23
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 446,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 434,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TabsContent, {
								value: "sales",
								className: "mt-4 space-y-3",
								children: userDetails.sales.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "p-8 text-center border border-dashed border-border rounded-xl bg-muted/10",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingCart, { className: "h-8 w-8 text-muted-foreground/40 mx-auto mb-2" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 514,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-semibold text-sm text-foreground",
											children: "Sem dados disponíveis"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 515,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-muted-foreground mt-1",
											children: "Este utilizador ainda não realizou vendas na plataforma."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 518,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 513,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "overflow-x-auto rounded-xl border border-border",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
										className: "w-full text-left text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
											className: "bg-muted/40 text-muted-foreground font-medium text-[10px] uppercase",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
													className: "py-2.5 px-3",
													children: "Produto"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 527,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
													className: "py-2.5 px-3",
													children: "Cliente"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 528,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
													className: "py-2.5 px-3",
													children: "Data"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 529,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
													className: "py-2.5 px-3 text-right",
													children: "Valor Bruto"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 530,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
													className: "py-2.5 px-3 text-right",
													children: "Líquido Produtor"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 531,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
													className: "py-2.5 px-3 text-center",
													children: "Estado"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 532,
													columnNumber: 27
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 526,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 525,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
											className: "divide-y divide-border/50",
											children: userDetails.sales.map((sale) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
												className: "hover:bg-accent/30",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
														className: "py-2.5 px-3 font-medium text-foreground",
														children: sale.productTitle
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 538,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
														className: "py-2.5 px-3 text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: sale.customerName }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 542,
															columnNumber: 31
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
															className: "text-[10px] font-mono",
															children: sale.customerEmail
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 543,
															columnNumber: 31
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 541,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
														className: "py-2.5 px-3 text-muted-foreground whitespace-nowrap",
														children: formatDate(sale.createdAt)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 545,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
														className: "py-2.5 px-3 text-right font-medium",
														children: formatKz(sale.grossAmount)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 548,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
														className: "py-2.5 px-3 text-right font-semibold text-emerald-400",
														children: formatKz(sale.netAmount)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 551,
														columnNumber: 29
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
														className: "py-2.5 px-3 text-center",
														children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
															variant: sale.status === "pago" ? "default" : "outline",
															className: "text-[10px] capitalize",
															children: sale.status
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 555,
															columnNumber: 31
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 554,
														columnNumber: 29
													}, this)
												]
											}, sale.id, true, {
												fileName: _jsxFileName,
												lineNumber: 537,
												columnNumber: 27
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 535,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 524,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 523,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 511,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 421,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 391,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 390,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 128,
		columnNumber: 5
	}, this);
}
//#endregion
export { Badge as n, AdminDashboardView as t };
