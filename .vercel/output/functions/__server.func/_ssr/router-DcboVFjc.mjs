import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { B as notFound, L as redirect, _ as createRootRouteWithContext, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn, o as __exportAll$1 } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { t as dispatchNotification } from "./notifications.server-BlbYki90.mjs";
import { c as setDoc, f as doc, l as updateDoc, n as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { a as sendPasswordResetEmail, c as signOut, i as onAuthStateChanged, l as updateProfile, n as createUserWithEmailAndPassword, o as signInWithEmailAndPassword, s as signInWithPopup, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import { a as handleFirestoreError, i as firestore, n as auth, s as testFirestoreConnection, t as OperationType } from "./firebase-config-BpvLLNMw.mjs";
import { r as listLegends } from "./legends.functions-CpKyibG2.mjs";
import { n as listCategories, r as listPublishedProducts, t as getProductBySlug } from "./catalog.functions-DC0doerl.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as QueryClientProvider, t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { createHmac, timingSafeEqual } from "crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout.functions-CBuezMiQ.js
var createOrderSchema = objectType({
	product_slug: stringType().min(1),
	buyer_name: stringType().trim().min(2).max(120),
	buyer_email: stringType().trim().email().max(180),
	buyer_phone: stringType().trim().min(6).max(40),
	payment_method: enumType([
		"multicaixa_express",
		"referencia",
		"transferencia"
	]),
	ref: stringType().trim().min(4).max(40).optional().nullable(),
	order_bump_offer_id: stringType().uuid().optional().nullable()
});
var createOrder = createServerFn({ method: "POST" }).inputValidator((d) => createOrderSchema.parse(d)).handler(createSsrRpc("06d5162b8305b43f6214c879b78a9e70f49074c90c7b326749aa9214a4924dc5"));
var getOrderByToken = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ token: stringType().min(10) }).parse(d)).handler(createSsrRpc("14888ff19711077aa789fb19a6b7cb05adbc393ec108769c1ff0dd32fc9b1ef2"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DcboVFjc.js
var router_DcboVFjc_exports = /* @__PURE__ */ __exportAll({
	_: () => Route$38,
	a: () => Route$13,
	c: () => Route$23,
	d: () => opt$2,
	f: () => Route$34,
	g: () => FAQS,
	getRouter: () => getRouter,
	h: () => q,
	i: () => Route$4,
	l: () => opt$1,
	m: () => prodsOpt,
	n: () => Route$2,
	o: () => Route$22,
	p: () => catsOpt,
	r: () => Route$3,
	s: () => opt,
	t: () => router_exports,
	u: () => Route$25,
	v: () => useAuth
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-D2jmfBv2.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var _jsxFileName$2 = "/app/applet/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName$1 = "/app/applet/src/contexts/AuthContext.tsx";
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const syncUserProfile = (0, import_react.useCallback)(async (firebaseUser) => {
		try {
			const userRef = doc(firestore, "users", firebaseUser.uid);
			const userSnap = await getDoc(userRef);
			const isSpecialAdmin = firebaseUser.uid === "rsKuyZLn7gbRulIKz5WpxpgqJDo2" || firebaseUser.email?.toLowerCase() === "infropayao@gmail.com";
			const now = (/* @__PURE__ */ new Date()).toISOString();
			if (!userSnap.exists()) {
				const initialProfile = {
					uid: firebaseUser.uid,
					id: firebaseUser.uid,
					name: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split("@")[0] : "Produtor"),
					email: firebaseUser.email || "",
					photoURL: firebaseUser.photoURL || null,
					avatar_url: firebaseUser.photoURL || null,
					role: isSpecialAdmin ? "admin" : "seller",
					status: "active",
					createdAt: now,
					updatedAt: now,
					lastLoginAt: now
				};
				await setDoc(userRef, {
					uid: initialProfile.uid,
					name: initialProfile.name,
					email: initialProfile.email,
					photoURL: initialProfile.photoURL,
					role: initialProfile.role,
					status: initialProfile.status,
					createdAt: initialProfile.createdAt,
					updatedAt: initialProfile.updatedAt,
					lastLoginAt: initialProfile.lastLoginAt
				});
				setProfile(initialProfile);
				return initialProfile;
			} else {
				const existingData = userSnap.data();
				const mergedRole = isSpecialAdmin ? "admin" : existingData.role || "seller";
				const loadedProfile = {
					uid: firebaseUser.uid,
					id: firebaseUser.uid,
					name: existingData.name || firebaseUser.displayName || "Produtor",
					email: existingData.email || firebaseUser.email || "",
					photoURL: existingData.photoURL || firebaseUser.photoURL || null,
					avatar_url: existingData.avatar_url || existingData.photoURL || firebaseUser.photoURL || null,
					role: mergedRole,
					status: existingData.status || "active",
					createdAt: existingData.createdAt || now,
					updatedAt: now,
					lastLoginAt: now,
					username: existingData.username || null,
					bio: existingData.bio || null,
					social_instagram: existingData.social_instagram || null,
					social_website: existingData.social_website || null
				};
				updateDoc(userRef, {
					lastLoginAt: now,
					updatedAt: now
				}).catch((err) => {
					console.warn("Falha ao atualizar timestamp de login no Firestore:", err);
				});
				setProfile(loadedProfile);
				return loadedProfile;
			}
		} catch (error) {
			console.error("Erro ao sincronizar perfil no Firestore:", error);
			handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
			return null;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				setUser(firebaseUser);
				await syncUserProfile(firebaseUser);
			} else {
				setUser(null);
				setProfile(null);
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, [syncUserProfile]);
	const signInWithEmail = (0, import_react.useCallback)(async (email, pass) => {
		setLoading(true);
		try {
			const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
			await syncUserProfile(cred.user);
			return cred;
		} finally {
			setLoading(false);
		}
	}, [syncUserProfile]);
	const signUpWithEmail = (0, import_react.useCallback)(async (email, pass, displayName) => {
		setLoading(true);
		try {
			const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
			if (displayName && cred.user) await updateProfile(cred.user, { displayName });
			await syncUserProfile(cred.user);
			return cred;
		} finally {
			setLoading(false);
		}
	}, [syncUserProfile]);
	const signInWithGoogle = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const provider = new GoogleAuthProvider();
			provider.setCustomParameters({ prompt: "select_account" });
			const cred = await signInWithPopup(auth, provider);
			await syncUserProfile(cred.user);
			return cred;
		} finally {
			setLoading(false);
		}
	}, [syncUserProfile]);
	const resetPassword = (0, import_react.useCallback)(async (email) => {
		await sendPasswordResetEmail(auth, email.trim());
	}, []);
	const signOut$1 = (0, import_react.useCallback)(async () => {
		try {
			await signOut(auth);
			setUser(null);
			setProfile(null);
		} catch (err) {
			console.error("Erro ao terminar sessão:", err);
		}
	}, []);
	const refreshProfile = (0, import_react.useCallback)(async () => {
		if (!auth.currentUser) return null;
		return await syncUserProfile(auth.currentUser);
	}, [syncUserProfile]);
	const refreshSession = (0, import_react.useCallback)(async () => {
		if (auth.currentUser) {
			await auth.currentUser.getIdToken(true);
			await refreshProfile();
		}
	}, [refreshProfile]);
	const isExplicitAdmin = user?.uid === "rsKuyZLn7gbRulIKz5WpxpgqJDo2" || user?.email?.toLowerCase() === "infropayao@gmail.com" || profile?.role === "admin";
	const role = isExplicitAdmin ? "admin" : profile?.role ?? (user ? "seller" : null);
	const value = {
		user,
		profile,
		loading,
		isAuthenticated: !!user,
		isAdmin: isExplicitAdmin,
		isSeller: role === "seller" || role === "admin",
		role,
		signInWithEmail,
		signUpWithEmail,
		signInWithGoogle,
		resetPassword,
		signOut: signOut$1,
		refreshProfile,
		session: user ? { user } : null,
		refreshSession
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthContext.Provider, {
		value,
		children
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 228,
		columnNumber: 10
	}, this);
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth deve ser utilizado dentro de um <AuthProvider />");
	return context;
}
var _jsxFileName = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-gradient-gold",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Página não encontrada"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "A página que procura não existe ou foi movida."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90",
						children: "Voltar ao início"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 29,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 28,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold text-foreground",
					children: "Algo correu mal"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Tente novamente em alguns segundos."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center rounded-md gradient-brand px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Tentar novamente"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm",
						children: "Início"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 70,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 57,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 56,
		columnNumber: 5
	}, this);
}
var Route$41 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "InfroPay — Transformando conhecimento em renda" },
			{
				name: "description",
				content: "Plataforma premium para vender e comprar infoprodutos: cursos, ebooks, templates, mentorias e mais."
			},
			{
				name: "author",
				content: "InfroPay"
			},
			{
				name: "theme-color",
				content: "#0F172A"
			},
			{
				property: "og:title",
				content: "InfroPay — Transformando conhecimento em renda"
			},
			{
				property: "og:description",
				content: "Plataforma premium para vender e comprar infoprodutos: cursos, ebooks, templates, mentorias e mais."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "InfroPay — Transformando conhecimento em renda"
			},
			{
				name: "twitter:description",
				content: "Plataforma premium para vender e comprar infoprodutos: cursos, ebooks, templates, mentorias e mais."
			},
			{
				property: "og:image",
				content: "/infropay-logo.svg"
			},
			{
				name: "twitter:image",
				content: "/infropay-logo.svg"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "pt",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 130,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 129,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 134,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 132,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 128,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$41.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		testFirestoreConnection();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			router.invalidate();
			if (user) queryClient.invalidateQueries();
		});
		return () => unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 158,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, {
			richColors: true,
			position: "top-right"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 159,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 157,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 156,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$38 = () => import("./routes-B6DmChao.mjs");
var Route$40 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "InfroPay — Plataforma de Vendas para Produtores Digitais" },
			{
				name: "description",
				content: "Venda seus produtos digitais com a InfroPay. Crie seu produto, gere seu link de venda e envie diretamente para os seus clientes em Angola."
			},
			{
				property: "og:title",
				content: "InfroPay — Plataforma de Vendas para Produtores Digitais"
			},
			{
				property: "og:description",
				content: "Crie seu produto, gere seu link de venda e receba pagamentos em Kwanza com Multicaixa."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./route-CRRSyPUS.mjs");
var Route$39 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		if (typeof window !== "undefined") {
			await auth.authStateReady();
			const currentUser = auth.currentUser;
			if (!currentUser) throw redirect({ to: "/auth" });
			return { user: currentUser };
		}
		return { user: null };
	},
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./auth-BUofnWll.mjs");
var search$1 = objectType({ mode: enumType([
	"signin",
	"signup",
	"forgot"
]).optional() });
var Route$38 = createFileRoute("/auth")({
	validateSearch: search$1,
	head: () => ({ meta: [{ title: "Entrar — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./contactos-01ZCgOIg.mjs");
var Route$37 = createFileRoute("/contactos")({
	head: () => ({
		meta: [{ title: "Contactos & Suporte — InfroPay" }, {
			name: "description",
			content: "Entre em contacto com a equipa da InfroPay. Suporte técnico, atendimento a produtores e parcerias em Luanda, Angola."
		}],
		links: [{
			rel: "canonical",
			href: "/contactos"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var FAQS = [
	{
		q: "Quanto custa vender na InfroPay?",
		a: "Cobramos 2% por venda e 8% por saque. Sem mensalidade, sem taxa de setup."
	},
	{
		q: "Quando recebo o dinheiro das vendas?",
		a: "O valor fica disponível em no mínimo 1 hora após a aprovação do pagamento."
	},
	{
		q: "Qual é o saque mínimo?",
		a: "O saque mínimo é 5.000 Kz."
	},
	{
		q: "Quais métodos de pagamento aceitam?",
		a: "Multicaixa Express, Referência Multicaixa e Transferência Bancária."
	},
	{
		q: "Como funciona a garantia?",
		a: "Cada produtor define entre 0 e 60 dias. Dentro desse período, o comprador pode pedir reembolso."
	},
	{
		q: "Preciso de conta bancária para vender?",
		a: "Sim, apenas para receber o dinheiro. O cadastro é gratuito na área do produtor."
	},
	{
		q: "Os meus produtos são aprovados automaticamente?",
		a: "Não. Cada produto passa por curadoria para garantir a qualidade da plataforma."
	},
	{
		q: "Posso vender fora de Angola?",
		a: "Sim, a plataforma é acessível globalmente. O foco de pagamentos é Angola (AOA)."
	}
];
var $$splitComponentImporter$34 = () => import("./faq-B_l_zamw.mjs");
var Route$36 = createFileRoute("/faq")({
	head: () => ({
		meta: [{ title: "Perguntas frequentes — InfroPay" }, {
			name: "description",
			content: "Respostas às dúvidas mais comuns sobre a InfroPay: comissões, saques, pagamentos, garantia e mais."
		}],
		links: [{
			rel: "canonical",
			href: "/faq"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: FAQS.map((f) => ({
					"@type": "Question",
					name: f.q,
					acceptedAnswer: {
						"@type": "Answer",
						text: f.a
					}
				}))
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var q = queryOptions({
	queryKey: ["legends"],
	queryFn: () => listLegends()
});
var $$splitComponentImporter$33 = () => import("./legends-DfZ-3YNC.mjs");
var Route$35 = createFileRoute("/legends")({
	head: () => ({ meta: [
		{ title: "InfroPay Legends — Ranking de produtores" },
		{
			name: "description",
			content: "Conheça os produtores que transformam conhecimento em renda na InfroPay. Ranking público, níveis de Bronze a Infinito."
		},
		{
			property: "og:title",
			content: "InfroPay Legends"
		},
		{
			property: "og:description",
			content: "Ranking público dos maiores produtores digitais de Angola."
		}
	] }),
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(q);
	},
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var catsOpt = queryOptions({
	queryKey: ["categories"],
	queryFn: () => listCategories()
});
var prodsOpt = (cat) => queryOptions({
	queryKey: [
		"products",
		"loja",
		cat ?? "all"
	],
	queryFn: () => listPublishedProducts({ data: {
		category: cat,
		limit: 60
	} })
});
var $$splitComponentImporter$32 = () => import("./loja-D2wb7fxU.mjs");
var $$splitNotFoundComponentImporter$3 = () => import("./loja-BioQ146P.mjs");
var $$splitErrorComponentImporter$3 = () => import("./loja-B0iWIVv0.mjs");
var search = objectType({ cat: stringType().optional() });
var Route$34 = createFileRoute("/loja")({
	validateSearch: search,
	head: () => ({ meta: [{ title: "Loja — InfroPay" }, {
		name: "description",
		content: "Explore cursos, ebooks, templates, mentorias e mais na loja InfroPay."
	}] }),
	loaderDeps: ({ search }) => ({ cat: search.cat }),
	loader: async ({ context, deps }) => {
		await Promise.all([context.queryClient.ensureQueryData(catsOpt), context.queryClient.ensureQueryData(prodsOpt(deps.cat))]);
	},
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$3, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$3, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./privacidade-Bp6ZeR7w.mjs");
var Route$33 = createFileRoute("/privacidade")({
	head: () => ({
		meta: [{ title: "Política de Privacidade — InfroPay" }, {
			name: "description",
			content: "Saiba como a InfroPay recolhe, utiliza e protege os seus dados pessoais em conformidade com a legislação de Angola."
		}],
		links: [{
			rel: "canonical",
			href: "/privacidade"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./redefinir-senha-DgXS9nfN.mjs");
var Route$32 = createFileRoute("/redefinir-senha")({
	head: () => ({ meta: [{ title: "Definir Nova Senha — InfroPay" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./sobre-voFvl0oW.mjs");
var Route$31 = createFileRoute("/sobre")({
	head: () => ({
		meta: [
			{ title: "Sobre a InfroPay — A plataforma para produtores digitais em Angola" },
			{
				name: "description",
				content: "A InfroPay é a plataforma premium de infoprodutos criada para o mercado angolano. Conheça a nossa missão, valores e visão."
			},
			{
				property: "og:title",
				content: "Sobre a InfroPay"
			},
			{
				property: "og:description",
				content: "Transformando conhecimento em renda em Angola."
			}
		],
		links: [{
			rel: "canonical",
			href: "/sobre"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./termos-BIWc7vGs.mjs");
var Route$30 = createFileRoute("/termos")({
	head: () => ({
		meta: [{ title: "Termos de Uso — InfroPay" }, {
			name: "description",
			content: "Termos e condições gerais de utilização da plataforma InfroPay para produtores e compradores em Angola."
		}],
		links: [{
			rel: "canonical",
			href: "/termos"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./adm-BfVmK20Y.mjs");
var Route$29 = createFileRoute("/_authenticated/adm")({
	head: () => ({ meta: [{ title: "Administração — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./afiliados-60JkMPC1.mjs");
var Route$28 = createFileRoute("/_authenticated/afiliados")({
	head: () => ({ meta: [
		{ title: "Afiliados — InfroPay" },
		{
			name: "description",
			content: "Promova produtos da InfroPay e ganhe comissão em cada venda."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./perfil-CeN-LRLP.mjs");
var Route$27 = createFileRoute("/_authenticated/perfil")({
	head: () => ({ meta: [{ title: "Meu perfil — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./produtor-DuAFmbtX.mjs");
var Route$26 = createFileRoute("/_authenticated/produtor")({
	head: () => ({ meta: [{ title: "Painel do produtor — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var opt$2 = (slug) => queryOptions({
	queryKey: ["product-checkout", slug],
	queryFn: () => getProductBySlug({ data: { slug } })
});
var $$splitComponentImporter$23 = () => import("./checkout._slug-CGTsc3GK.mjs");
var $$splitNotFoundComponentImporter$2 = () => import("./checkout._slug-C3ScF-7j.mjs");
var $$splitErrorComponentImporter$2 = () => import("./checkout._slug-Df94XXk7.mjs");
var Route$25 = createFileRoute("/checkout/$slug")({
	loader: async ({ context, params }) => {
		if (!await context.queryClient.ensureQueryData(opt$2(params.slug))) throw notFound();
	},
	head: () => ({ meta: [
		{ title: "Checkout Seguro — InfroPay" },
		{
			name: "description",
			content: "Finalize a sua compra com segurança na InfroPay."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./p._slug-DvHbjqDy.mjs");
/** Link curto: /p/slug → /produto/slug (preserva ?ref=) */
var Route$24 = createFileRoute("/p/$slug")({
	beforeLoad: ({ params, search }) => {
		throw redirect({
			to: "/produto/$slug",
			params: { slug: params.slug },
			search
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var opt$1 = (token) => queryOptions({
	queryKey: ["order", token],
	queryFn: () => getOrderByToken({ data: { token } }),
	refetchInterval: 12e3
});
var $$splitComponentImporter$21 = () => import("./pedido._token-DOtHCtzP.mjs");
var $$splitNotFoundComponentImporter$1 = () => import("./pedido._token-CugNlCuz.mjs");
var $$splitErrorComponentImporter$1 = () => import("./pedido._token-CgCJaj8p.mjs");
var Route$23 = createFileRoute("/pedido/$token")({
	loader: async ({ context, params }) => {
		if (!await context.queryClient.ensureQueryData(opt$1(params.token))) throw notFound();
	},
	head: () => ({ meta: [{ title: "Status do Pedido — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var opt = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: () => getProductBySlug({ data: { slug } })
});
var $$splitComponentImporter$20 = () => import("./produto._slug-Cm28PHyC.mjs");
var $$splitNotFoundComponentImporter = () => import("./produto._slug-B8l5DKo5.mjs");
var $$splitErrorComponentImporter = () => import("./produto._slug-Bp49f04r.mjs");
var Route$22 = createFileRoute("/produto/$slug")({
	loader: async ({ context, params }) => {
		if (!await context.queryClient.ensureQueryData(opt(params.slug))) throw notFound();
	},
	head: ({ loaderData: _l, params }) => ({ meta: [{ title: `${params.slug} — InfroPay` }, {
		name: "description",
		content: "Detalhes do produto na InfroPay."
	}] }),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./adm.index-AYUaG91-.mjs");
var Route$21 = createFileRoute("/_authenticated/adm/")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./adm.logs-D3WNVQAJ.mjs");
var Route$20 = createFileRoute("/_authenticated/adm/logs")({
	head: () => ({ meta: [
		{ title: "Logs de auditoria — Admin InfroPay" },
		{
			name: "description",
			content: "Histórico cronológico das ações administrativas da plataforma."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./adm.notificacoes-B9odDVfe.mjs");
var Route$19 = createFileRoute("/_authenticated/adm/notificacoes")({
	head: () => ({ meta: [{ title: "Central de Notificações & Broadcast — Administração" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./adm.produtos-DqCrHr6Q.mjs");
var Route$18 = createFileRoute("/_authenticated/adm/produtos")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./adm.relatorios-Bh7omB8d.mjs");
var Route$17 = createFileRoute("/_authenticated/adm/relatorios")({
	head: () => ({ meta: [
		{ title: "Relatórios — Admin InfroPay" },
		{
			name: "description",
			content: "Faturamento, comissões e desempenho global da plataforma."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./adm.saques-CvbDZtxb.mjs");
var Route$16 = createFileRoute("/_authenticated/adm/saques")({
	head: () => ({ meta: [{ title: "Saques — Admin" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./adm.usuarios-Yr8pVSon.mjs");
var Route$15 = createFileRoute("/_authenticated/adm/usuarios")({
	head: () => ({ meta: [
		{ title: "Usuários e Vendedores — Admin InfroPay" },
		{
			name: "description",
			content: "Gestão de utilizadores, produtos e vendas da plataforma InfroPay."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./membros.index-BWPty7-o.mjs");
var Route$14 = createFileRoute("/_authenticated/membros/")({
	head: () => ({ meta: [
		{ title: "Área de membros — InfroPay" },
		{
			name: "description",
			content: "Acesse os cursos e conteúdos que comprou na InfroPay."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./membros._slug-iJNO9-Z2.mjs");
var Route$13 = createFileRoute("/_authenticated/membros/$slug")({
	head: () => ({ meta: [{ title: "Assistir — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./produtor.index-ClKLU7CA.mjs");
var Route$12 = createFileRoute("/_authenticated/produtor/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./produtor.conquistas-CgUWdLv4.mjs");
var Route$11 = createFileRoute("/_authenticated/produtor/conquistas")({
	head: () => ({ meta: [{ title: "Conquistas & Placas — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./produtor.financeiro-N3Hc9YGI.mjs");
var Route$10 = createFileRoute("/_authenticated/produtor/financeiro")({
	head: () => ({ meta: [{ title: "Financeiro & Carteira — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./produtor.funil-DDxB13IF.mjs");
var Route$9 = createFileRoute("/_authenticated/produtor/funil")({
	head: () => ({ meta: [{ title: "Funil de vendas — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./produtor.integracoes-Cn4a-kER.mjs");
var Route$8 = createFileRoute("/_authenticated/produtor/integracoes")({
	head: () => ({ meta: [{ title: "Integrações — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./produtor.novo-CEMaF4F2.mjs");
var Route$7 = createFileRoute("/_authenticated/produtor/novo")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./produtor.produtos-BWlvmTp8.mjs");
var Route$6 = createFileRoute("/_authenticated/produtor/produtos")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./produtor.saques-Co5jfas6.mjs");
var Route$5 = createFileRoute("/_authenticated/produtor/saques")({
	head: () => ({ meta: [{ title: "Saques — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./produtor.curso._id-Qh415ZU_.mjs");
var Route$4 = createFileRoute("/_authenticated/produtor/curso/$id")({
	head: () => ({ meta: [{ title: "Área de membros — InfroPay" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./produtor.editar._id-DdT1EUMh.mjs");
var Route$3 = createFileRoute("/_authenticated/produtor/editar/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./produtor.sucesso._id-ZAB1i4MS.mjs");
var Route$2 = createFileRoute("/_authenticated/produtor/sucesso/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route$1 = createFileRoute("/api/public/webhooks/multicaixa")({ server: { handlers: { POST: async ({ request }) => {
	const secret = process.env.MULTICAIXA_WEBHOOK_SECRET;
	const raw = await request.text();
	if (secret) {
		const provided = request.headers.get("x-multicaixa-signature") ?? "";
		const expected = createHmac("sha256", secret).update(raw).digest("hex");
		const a = Buffer.from(provided);
		const b = Buffer.from(expected);
		if (a.length !== b.length || !timingSafeEqual(a, b)) return new Response("invalid signature", { status: 401 });
	}
	let event;
	try {
		event = JSON.parse(raw);
	} catch {
		return new Response("invalid json", { status: 400 });
	}
	const eventId = String(event.event_id ?? event.reference ?? crypto.randomUUID());
	const reference = String(event.reference ?? "");
	const status = String(event.status ?? "").toLowerCase();
	if (!reference) return new Response("missing reference", { status: 400 });
	const { supabaseAdmin } = await import("./client.server-ZrdrXq7H.mjs");
	const { error: dupErr } = await supabaseAdmin.from("webhook_events").insert({
		provider: "multicaixa",
		event_id: eventId,
		payload: event
	});
	if (dupErr && !String(dupErr.message).includes("duplicate")) return new Response("db error", { status: 500 });
	if (dupErr) return new Response("ok (duplicate)", { status: 200 });
	if (status === "paid" || status === "success") {
		const { data: updatedSale } = await supabaseAdmin.from("sales").update({
			status: "pago",
			paid_at: (/* @__PURE__ */ new Date()).toISOString(),
			provider: "multicaixa"
		}).eq("access_token", reference).select("*, product:products(title, slug)").maybeSingle();
		if (updatedSale?.producer_id) try {
			const formattedGross = (updatedSale.gross_cents / 100).toLocaleString("pt-AO") + " Kz";
			await dispatchNotification({
				userId: updatedSale.producer_id,
				type: "sale_approved",
				title: "🎉 Venda Aprovada!",
				message: `Você acabou de vender o produto "${updatedSale.product?.title || "Infoproduto"}" por ${formattedGross}.`,
				data: {
					productTitle: updatedSale.product?.title,
					buyerName: updatedSale.buyer_name,
					buyerEmail: updatedSale.buyer_email,
					amountCents: updatedSale.gross_cents,
					netCents: updatedSale.net_cents,
					paymentMethod: "Multicaixa"
				},
				relatedId: updatedSale.id,
				relatedType: "sale",
				link: "/produtor"
			});
		} catch (notifErr) {
			console.warn("Erro ao despachar notificação de venda aprovada:", notifErr);
		}
	} else if (status === "failed" || status === "cancelled") await supabaseAdmin.from("sales").update({
		status: "cancelado",
		provider: "multicaixa"
	}).eq("access_token", reference);
	return new Response("ok", { status: 200 });
} } } });
var Route = createFileRoute("/api/public/webhooks/stripe")({ server: { handlers: { POST: async ({ request }) => {
	const secret = process.env.STRIPE_WEBHOOK_SECRET;
	const sig = request.headers.get("stripe-signature") ?? "";
	const raw = await request.text();
	if (!secret) return new Response(JSON.stringify({
		ok: false,
		reason: "stripe_not_configured"
	}), {
		status: 202,
		headers: { "content-type": "application/json" }
	});
	if (!sig) return new Response("missing signature", { status: 400 });
	let event;
	try {
		event = JSON.parse(raw);
	} catch {
		return new Response("invalid json", { status: 400 });
	}
	const { supabaseAdmin } = await import("./client.server-ZrdrXq7H.mjs");
	if (event.id) {
		const { error: dupErr } = await supabaseAdmin.from("webhook_events").insert({
			provider: "stripe",
			event_id: event.id,
			payload: event
		});
		if (dupErr && !String(dupErr.message).includes("duplicate")) return new Response("db error", { status: 500 });
		if (dupErr) return new Response("ok (duplicate)", { status: 200 });
	}
	if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
		const session = event.data?.object ?? {};
		const token = session.metadata?.access_token;
		const stripeSessionId = session.id;
		const query = supabaseAdmin.from("sales").update({
			status: "pago",
			paid_at: (/* @__PURE__ */ new Date()).toISOString(),
			provider: "stripe",
			...stripeSessionId ? { stripe_session_id: stripeSessionId } : {}
		});
		if (token) await query.eq("access_token", token);
		else if (stripeSessionId) await query.eq("stripe_session_id", stripeSessionId);
	}
	return new Response("ok", { status: 200 });
} } } });
var IndexRoute = Route$40.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$41
});
var AuthenticatedRouteRoute = Route$39.update({
	id: "/_authenticated",
	getParentRoute: () => Route$41
});
var AuthRoute = Route$38.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$41
});
var ContactosRoute = Route$37.update({
	id: "/contactos",
	path: "/contactos",
	getParentRoute: () => Route$41
});
var FaqRoute = Route$36.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$41
});
var LegendsRoute = Route$35.update({
	id: "/legends",
	path: "/legends",
	getParentRoute: () => Route$41
});
var LojaRoute = Route$34.update({
	id: "/loja",
	path: "/loja",
	getParentRoute: () => Route$41
});
var PrivacidadeRoute = Route$33.update({
	id: "/privacidade",
	path: "/privacidade",
	getParentRoute: () => Route$41
});
var RedefinirSenhaRoute = Route$32.update({
	id: "/redefinir-senha",
	path: "/redefinir-senha",
	getParentRoute: () => Route$41
});
var SobreRoute = Route$31.update({
	id: "/sobre",
	path: "/sobre",
	getParentRoute: () => Route$41
});
var TermosRoute = Route$30.update({
	id: "/termos",
	path: "/termos",
	getParentRoute: () => Route$41
});
var AuthenticatedAdmRoute = Route$29.update({
	id: "/adm",
	path: "/adm",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAfiliadosRoute = Route$28.update({
	id: "/afiliados",
	path: "/afiliados",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPerfilRoute = Route$27.update({
	id: "/perfil",
	path: "/perfil",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProdutorRoute = Route$26.update({
	id: "/produtor",
	path: "/produtor",
	getParentRoute: () => AuthenticatedRouteRoute
});
var CheckoutSlugRoute = Route$25.update({
	id: "/checkout/$slug",
	path: "/checkout/$slug",
	getParentRoute: () => Route$41
});
var PSlugRoute = Route$24.update({
	id: "/p/$slug",
	path: "/p/$slug",
	getParentRoute: () => Route$41
});
var PedidoTokenRoute = Route$23.update({
	id: "/pedido/$token",
	path: "/pedido/$token",
	getParentRoute: () => Route$41
});
var ProdutoSlugRoute = Route$22.update({
	id: "/produto/$slug",
	path: "/produto/$slug",
	getParentRoute: () => Route$41
});
var AuthenticatedAdmIndexRoute = Route$21.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdmRoute
});
var AuthenticatedAdmLogsRoute = Route$20.update({
	id: "/logs",
	path: "/logs",
	getParentRoute: () => AuthenticatedAdmRoute
});
var AuthenticatedAdmNotificacoesRoute = Route$19.update({
	id: "/notificacoes",
	path: "/notificacoes",
	getParentRoute: () => AuthenticatedAdmRoute
});
var AuthenticatedAdmProdutosRoute = Route$18.update({
	id: "/produtos",
	path: "/produtos",
	getParentRoute: () => AuthenticatedAdmRoute
});
var AuthenticatedAdmRelatoriosRoute = Route$17.update({
	id: "/relatorios",
	path: "/relatorios",
	getParentRoute: () => AuthenticatedAdmRoute
});
var AuthenticatedAdmSaquesRoute = Route$16.update({
	id: "/saques",
	path: "/saques",
	getParentRoute: () => AuthenticatedAdmRoute
});
var AuthenticatedAdmUsuariosRoute = Route$15.update({
	id: "/usuarios",
	path: "/usuarios",
	getParentRoute: () => AuthenticatedAdmRoute
});
var AuthenticatedMembrosIndexRoute = Route$14.update({
	id: "/membros/",
	path: "/membros/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMembrosSlugRoute = Route$13.update({
	id: "/membros/$slug",
	path: "/membros/$slug",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProdutorIndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorConquistasRoute = Route$11.update({
	id: "/conquistas",
	path: "/conquistas",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorFinanceiroRoute = Route$10.update({
	id: "/financeiro",
	path: "/financeiro",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorFunilRoute = Route$9.update({
	id: "/funil",
	path: "/funil",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorIntegracoesRoute = Route$8.update({
	id: "/integracoes",
	path: "/integracoes",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorNovoRoute = Route$7.update({
	id: "/novo",
	path: "/novo",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorProdutosRoute = Route$6.update({
	id: "/produtos",
	path: "/produtos",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorSaquesRoute = Route$5.update({
	id: "/saques",
	path: "/saques",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorCursoIdRoute = Route$4.update({
	id: "/curso/$id",
	path: "/curso/$id",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorEditarIdRoute = Route$3.update({
	id: "/editar/$id",
	path: "/editar/$id",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var AuthenticatedProdutorSucessoIdRoute = Route$2.update({
	id: "/sucesso/$id",
	path: "/sucesso/$id",
	getParentRoute: () => AuthenticatedProdutorRoute
});
var ApiPublicWebhooksMulticaixaRoute = Route$1.update({
	id: "/api/public/webhooks/multicaixa",
	path: "/api/public/webhooks/multicaixa",
	getParentRoute: () => Route$41
});
var ApiPublicWebhooksStripeRoute = Route.update({
	id: "/api/public/webhooks/stripe",
	path: "/api/public/webhooks/stripe",
	getParentRoute: () => Route$41
});
var AuthenticatedAdmRouteChildren = {
	AuthenticatedAdmLogsRoute,
	AuthenticatedAdmNotificacoesRoute,
	AuthenticatedAdmProdutosRoute,
	AuthenticatedAdmRelatoriosRoute,
	AuthenticatedAdmSaquesRoute,
	AuthenticatedAdmUsuariosRoute,
	AuthenticatedAdmIndexRoute
};
var AuthenticatedAdmRouteWithChildren = AuthenticatedAdmRoute._addFileChildren(AuthenticatedAdmRouteChildren);
var AuthenticatedProdutorRouteChildren = {
	AuthenticatedProdutorConquistasRoute,
	AuthenticatedProdutorFinanceiroRoute,
	AuthenticatedProdutorFunilRoute,
	AuthenticatedProdutorIntegracoesRoute,
	AuthenticatedProdutorNovoRoute,
	AuthenticatedProdutorProdutosRoute,
	AuthenticatedProdutorSaquesRoute,
	AuthenticatedProdutorIndexRoute,
	AuthenticatedProdutorCursoIdRoute,
	AuthenticatedProdutorEditarIdRoute,
	AuthenticatedProdutorSucessoIdRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdmRoute: AuthenticatedAdmRouteWithChildren,
	AuthenticatedAfiliadosRoute,
	AuthenticatedPerfilRoute,
	AuthenticatedProdutorRoute: AuthenticatedProdutorRoute._addFileChildren(AuthenticatedProdutorRouteChildren),
	AuthenticatedMembrosSlugRoute,
	AuthenticatedMembrosIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ContactosRoute,
	FaqRoute,
	LegendsRoute,
	LojaRoute,
	PrivacidadeRoute,
	RedefinirSenhaRoute,
	SobreRoute,
	TermosRoute,
	CheckoutSlugRoute,
	PSlugRoute,
	PedidoTokenRoute,
	ProdutoSlugRoute,
	ApiPublicWebhooksMulticaixaRoute,
	ApiPublicWebhooksStripeRoute
};
var routeTree = Route$41._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll$1({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient({ defaultOptions: { queries: {
		staleTime: 6e4,
		gcTime: 3e5,
		refetchOnWindowFocus: false,
		retry: 1
	} } });
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadDelay: 80,
		defaultPreloadStaleTime: 3e4
	});
};
//#endregion
export { router_DcboVFjc_exports as _, Route$23 as a, Route$34 as c, catsOpt as d, opt as f, q as g, prodsOpt as h, Route$22 as i, Route$38 as l, opt$2 as m, Route$13 as n, Route$25 as o, opt$1 as p, Route$2 as r, Route$3 as s, FAQS as t, Route$4 as u, useAuth as v, createOrder as y };
