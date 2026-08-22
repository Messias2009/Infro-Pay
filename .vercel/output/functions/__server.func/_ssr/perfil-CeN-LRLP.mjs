import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { c as setDoc, f as doc, m as serverTimestamp } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { r as db } from "./firebase-config-BpvLLNMw.mjs";
import { n as levelFor, t as LEVELS } from "./legends.functions-CpKyibG2.mjs";
import { v as useAuth } from "./router-DcboVFjc.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { At as CircleCheck, K as Mail, Mt as CircleAlert, Ut as Bell, b as ShieldCheck, c as Trophy, g as Smartphone, o as User } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as Textarea } from "./textarea-XzxVYTAX.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { c as sendTestNotification, l as updateMyNotificationPreferences, r as getMyNotificationPreferences } from "./notifications.functions-Do4Q97fz.mjs";
import { n as kz } from "./FeeBanner-CDC3PD6P.mjs";
import { t as Switch } from "./switch-BglIGq6V.mjs";
import { t as MediaUpload } from "./MediaUpload-B1fhNNi7.mjs";
import { n as getMyProfile, r as updateMyProfile, t as getMyAchievements } from "./profile.functions-B6b-nAia.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perfil-CeN-LRLP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function isPushSupported() {
	return typeof window !== "undefined" && "serviceWorker" in navigator && "Notification" in window;
}
function getNotificationPermission() {
	if (typeof window === "undefined" || !("Notification" in window)) return "denied";
	return Notification.permission;
}
/**
* Register Service Worker for Web Push & FCM
*/
async function registerServiceWorker() {
	if (!isPushSupported()) return null;
	try {
		return await navigator.serviceWorker.register("/firebase-messaging-sw.js", { scope: "/" });
	} catch (err) {
		console.warn("Falha ao registrar Service Worker:", err);
		return null;
	}
}
/**
* Request notification permission and register token
*/
async function requestPushPermission(userId, onTokenSaved) {
	if (!isPushSupported()) return {
		success: false,
		error: "Notificações Push não são suportadas neste navegador."
	};
	try {
		if (await Notification.requestPermission() !== "granted") return {
			success: false,
			error: "Permissão de notificações recusada pelo utilizador."
		};
		if (!await registerServiceWorker()) return {
			success: false,
			error: "Service Worker não disponível."
		};
		let token = "";
		try {
			const deviceId = localStorage.getItem("infropay_device_id") || `dev_${Math.random().toString(36).substring(2)}_${Date.now()}`;
			localStorage.setItem("infropay_device_id", deviceId);
			token = `fcm_${userId}_${deviceId}`;
		} catch {
			token = `fcm_${userId}_${Date.now()}`;
		}
		if (db && userId) try {
			const tokenId = encodeURIComponent(token.slice(0, 60));
			const tokenRef = doc(db, "users", userId, "fcm_tokens", tokenId);
			await setDoc(tokenRef, {
				token,
				userId,
				platform: navigator.platform || "Web",
				userAgent: navigator.userAgent,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: serverTimestamp()
			}, { merge: true });
		} catch (fErr) {
			console.warn("Não foi possível persistir token no Firestore:", fErr);
		}
		onTokenSaved?.(token);
		return {
			success: true,
			token
		};
	} catch (err) {
		console.error("Erro ao solicitar permissão de notificações:", err);
		return {
			success: false,
			error: err.message || "Erro desconhecido"
		};
	}
}
var _jsxFileName = "/app/applet/src/routes/_authenticated/perfil.tsx?tsr-split=component";
function Page() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const getFn = useServerFn(getMyProfile);
	const saveFn = useServerFn(updateMyProfile);
	const achFn = useServerFn(getMyAchievements);
	const getPrefsFn = useServerFn(getMyNotificationPreferences);
	const savePrefsFn = useServerFn(updateMyNotificationPreferences);
	const testNotifFn = useServerFn(sendTestNotification);
	const { data: p } = useQuery({
		queryKey: ["me", "profile"],
		queryFn: () => getFn()
	});
	const { data: ach } = useQuery({
		queryKey: ["me", "achievements"],
		queryFn: () => achFn()
	});
	const { data: prefsData } = useQuery({
		queryKey: ["me", "notification-preferences"],
		queryFn: () => getPrefsFn()
	});
	const [form, setForm] = (0, import_react.useState)({});
	const [pushStatus, setPushStatus] = (0, import_react.useState)("default");
	const [pushLoading, setPushLoading] = (0, import_react.useState)(false);
	const [testLoading, setTestLoading] = (0, import_react.useState)(false);
	const [notifPrefs, setNotifPrefs] = (0, import_react.useState)({
		push_enabled: true,
		email_sales: true,
		email_withdrawals: true,
		email_updates: true,
		security_alerts: true
	});
	(0, import_react.useEffect)(() => {
		if (p) setForm(p);
	}, [p]);
	(0, import_react.useEffect)(() => {
		if (prefsData) setNotifPrefs(prefsData);
		setPushStatus(getNotificationPermission());
	}, [prefsData]);
	const revenue = ach?.revenue_cents ?? 0;
	const level = levelFor(revenue);
	const idx = LEVELS.findIndex((l) => l.key === level.key);
	const next = LEVELS[idx + 1];
	const pct = next ? Math.min(100, Math.round((revenue - level.min_cents) / (next.min_cents - level.min_cents) * 100)) : 100;
	async function save() {
		try {
			await saveFn({ data: {
				full_name: form.full_name ?? null,
				username: form.username?.trim() ? form.username : null,
				bio: form.bio ?? null,
				avatar_url: form.avatar_url ?? null,
				cover_url: form.cover_url ?? null,
				social_instagram: form.social_instagram ?? null,
				social_website: form.social_website ?? null
			} });
			toast.success("Perfil atualizado");
			qc.invalidateQueries({ queryKey: ["me", "profile"] });
		} catch (e) {
			toast.error(e.message ?? "Erro ao guardar");
		}
	}
	async function handleTogglePush(checked) {
		if (checked && pushStatus !== "granted" && user?.id) {
			setPushLoading(true);
			const res = await requestPushPermission(user.id);
			setPushLoading(false);
			setPushStatus(getNotificationPermission());
			if (!res.success) {
				toast.error(res.error || "Não foi possível ativar notificações push.");
				return;
			}
			toast.success("Notificações Push ativadas com sucesso neste navegador!");
		}
		const updated = {
			...notifPrefs,
			push_enabled: checked
		};
		setNotifPrefs(updated);
		await savePrefsFn({ data: updated });
		toast.success("Preferências de notificação salvas.");
	}
	async function handleTogglePref(key, value) {
		const updated = {
			...notifPrefs,
			[key]: value
		};
		setNotifPrefs(updated);
		try {
			await savePrefsFn({ data: updated });
			toast.success("Preferências atualizadas.");
		} catch {
			toast.error("Erro ao guardar preferências.");
		}
	}
	async function handleSendTest(type) {
		setTestLoading(true);
		try {
			await testNotifFn({ data: { type } });
			toast.success("Notificação de teste disparada! Verifique o sino 🔔 no topo.");
			qc.invalidateQueries({ queryKey: ["notifications"] });
			qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
		} catch (err) {
			toast.error(err.message || "Falha ao enviar notificação de teste.");
		} finally {
			setTestLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-4xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs uppercase tracking-widest text-gold font-semibold",
				children: "Conta"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-3xl md:text-4xl font-bold mt-2",
				children: "Meu perfil & Definições"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 150,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border p-5 relative overflow-hidden",
				style: { borderColor: level.color + "60" },
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute inset-0 opacity-20",
					style: { background: level.gradient }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-14 w-14 rounded-2xl grid place-items-center shrink-0",
						style: { background: level.gradient },
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trophy, { className: "h-7 w-7 text-white drop-shadow" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 165,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground",
								children: "Nível atual"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display text-2xl font-bold",
								style: { color: level.color },
								children: level.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: [
									"Faturamento: ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
										className: "text-foreground",
										children: kz(revenue)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 180,
										columnNumber: 28
									}, this),
									" ·",
									" ",
									ach?.sales_count ?? 0,
									" vendas"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 179,
								columnNumber: 13
							}, this),
							next && /* @__PURE__ */ (void 0)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "h-1.5 rounded-full bg-muted overflow-hidden",
									children: /* @__PURE__ */ (void 0)("div", {
										className: "h-full transition-all",
										style: {
											width: `${pct}%`,
											background: next.gradient
										}
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 185,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 184,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "text-[11px] text-muted-foreground mt-1",
									children: [
										"Próximo nível: ",
										/* @__PURE__ */ (void 0)("b", { children: next.name }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 191,
											columnNumber: 34
										}, this),
										" — faltam ",
										kz(next.min_cents - revenue)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 190,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 22
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 164,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 158,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border bg-card p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-lg font-bold text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-5 w-5 text-gold" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 201,
							columnNumber: 11
						}, this), " Dados Públicos do Produtor"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 200,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid md:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Foto de perfil" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 206,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MediaUpload, {
								value: form.avatar_url,
								onChange: (u) => setForm((f) => ({
									...f,
									avatar_url: u
								})),
								label: "",
								hint: "Recomendado 512×512"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 207,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Capa" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MediaUpload, {
								value: form.cover_url,
								onChange: (u) => setForm((f) => ({
									...f,
									cover_url: u
								})),
								label: "",
								hint: "Recomendado 1600×400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid md:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Nome completo" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 227,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: form.full_name ?? "",
							onChange: (e) => setForm({
								...form,
								full_name: e.target.value
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 228,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Nome de utilizador" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 mt-1 h-10 rounded-md border border-input bg-background px-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground text-sm",
								children: "@"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 236,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								className: "bg-transparent outline-none text-sm flex-1",
								value: form.username ?? "",
								onChange: (e) => setForm({
									...form,
									username: e.target.value
								}),
								placeholder: "seunome"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 233,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Bio" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 246,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
							rows: 3,
							maxLength: 400,
							value: form.bio ?? "",
							onChange: (e) => setForm({
								...form,
								bio: e.target.value
							}),
							placeholder: "Fale um pouco sobre si..."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[10px] text-muted-foreground mt-1 text-right",
							children: [(form.bio ?? "").length, "/400"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 251,
							columnNumber: 11
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 245,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid md:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Instagram" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 258,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: form.social_instagram ?? "",
							onChange: (e) => setForm({
								...form,
								social_instagram: e.target.value
							}),
							placeholder: "@handle"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 259,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { children: "Website" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: form.social_website ?? "",
							onChange: (e) => setForm({
								...form,
								social_website: e.target.value
							}),
							placeholder: "https://..."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 266,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 264,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							onClick: save,
							className: "gradient-brand text-primary-foreground shadow-glow",
							children: "Guardar alterações do perfil"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 274,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 273,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 199,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border bg-card p-6 space-y-6 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-lg font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-5 w-5 text-gold" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 285,
								columnNumber: 15
							}, this), " Configurações de Notificações & Canais"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 284,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Escolha quais alertas deseja receber por Web Push, no aplicativo e por e-mail."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 287,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 283,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] font-semibold text-muted-foreground",
								children: "Estado Web Push:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 292,
								columnNumber: 13
							}, this), pushStatus === "granted" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 text-xs font-bold text-success bg-success/15 px-2 py-0.5 rounded-full border border-success/30",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3 w-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 17
								}, this), " Ativo"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 41
							}, this) : pushStatus === "denied" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 text-xs font-bold text-destructive bg-destructive/15 px-2 py-0.5 rounded-full border border-destructive/30",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "h-3 w-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 298,
									columnNumber: 17
								}, this), " Bloqueado no Navegador"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 297,
								columnNumber: 51
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30",
								children: "Pendente"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 25
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 291,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 282,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-4 p-4 rounded-xl bg-background/60 border border-border/70",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-10 w-10 rounded-xl gradient-brand text-primary-foreground grid place-items-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 310,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 309,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-bold text-sm text-foreground",
										children: "Notificações Push (Web / Telemóvel)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 313,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: "Receba alertas instantâneos de vendas e aprovações de saque mesmo com a aba fechada ou aplicativo em segundo plano."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 316,
										columnNumber: 17
									}, this),
									pushStatus !== "granted" && /* @__PURE__ */ (void 0)(Button, {
										size: "sm",
										variant: "outline",
										disabled: pushLoading,
										onClick: () => handleTogglePush(true),
										className: "mt-2.5 h-8 text-xs font-semibold border-gold/40 text-gold hover:bg-gold/10",
										children: [/* @__PURE__ */ (void 0)(Bell, { className: "h-3.5 w-3.5 mr-1.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 321,
											columnNumber: 21
										}, this), pushLoading ? "A solicitar permissão..." : "Permitir Push neste Navegador"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 320,
										columnNumber: 46
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 312,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 308,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
								checked: notifPrefs.push_enabled && pushStatus === "granted",
								onCheckedChange: handleTogglePush
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 326,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 307,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-xs uppercase font-bold text-muted-foreground tracking-wider flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-3.5 w-3.5 text-gold" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 332,
										columnNumber: 15
									}, this), " Notificações por E-mail Transacional"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 331,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between p-3.5 rounded-xl bg-background/40 border border-border/60",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-semibold text-sm text-foreground",
										children: "E-mails de Vendas"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 338,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground",
										children: "Receba o comprovativo detalhado a cada venda confirmada e liquidada."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 339,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 337,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
										checked: notifPrefs.email_sales,
										onCheckedChange: (c) => handleTogglePref("email_sales", c)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 343,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 336,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between p-3.5 rounded-xl bg-background/40 border border-border/60",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-semibold text-sm text-foreground",
										children: "E-mails de Saques / Cashout"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 349,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground",
										children: "Avisos de solicitações, saques em análise bancária e aprovações de transferência."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 352,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 348,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
										checked: notifPrefs.email_withdrawals,
										onCheckedChange: (c) => handleTogglePref("email_withdrawals", c)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 356,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 347,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between p-3.5 rounded-xl bg-background/40 border border-border/60",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-semibold text-sm text-foreground",
										children: "Atualizações da Plataforma"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 362,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground",
										children: "Novos recursos, manutenções programadas e comunicados oficiais da InfroPay."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 365,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 361,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
										checked: notifPrefs.email_updates,
										onCheckedChange: (c) => handleTogglePref("email_updates", c)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 369,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 360,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between p-3.5 rounded-xl bg-background/40 border border-border/60 opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-start gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-success shrink-0 mt-0.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 375,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-semibold text-sm text-foreground",
											children: "Alertas Críticos de Segurança"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 377,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-xs text-muted-foreground",
											children: "Avisos de alterações de senha e atividades suspeitas (obrigatório para proteção)."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 380,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 376,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 374,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-bold text-success bg-success/15 px-2 py-0.5 rounded-md border border-success/30",
										children: "Sempre Ativo"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 386,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 373,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 330,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 306,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "pt-4 border-t border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2",
							children: "Simulador / Testar Notificações em Tempo Real"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 395,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									disabled: testLoading,
									onClick: () => handleSendTest("sale_approved"),
									className: "text-xs h-8",
									children: "Simular Venda Aprovada (🎉)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 399,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									disabled: testLoading,
									onClick: () => handleSendTest("withdrawal_approved"),
									className: "text-xs h-8",
									children: "Simular Saque Aprovado (💰)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 402,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									disabled: testLoading,
									onClick: () => handleSendTest("platform_update"),
									className: "text-xs h-8",
									children: "Simular Comunicado (🔵)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 405,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 398,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 394,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 281,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 149,
		columnNumber: 10
	}, this);
}
//#endregion
export { Page as component };
