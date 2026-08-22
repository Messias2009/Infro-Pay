import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as infropay_mark_default } from "./infropay-mark-CgfXU-W0.mjs";
import { At as CircleCheck, J as Lock, Mt as CircleAlert, Xt as ArrowLeft, Yt as ArrowRight, b as ShieldCheck, ht as EyeOff, mt as Eye, tt as KeyRound } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { t as supabase } from "./client-DKzLsRIz.mjs";
import { t as hero_banner_default } from "./hero-banner-C5O6lyCe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/redefinir-senha-DgXS9nfN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/redefinir-senha.tsx?tsr-split=component";
function RedefinirSenhaPage() {
	const router = useRouter();
	const [checking, setChecking] = (0, import_react.useState)(true);
	const [hasValidSession, setHasValidSession] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		async function initSession() {
			try {
				if (typeof window !== "undefined") {
					const urlParams = new URLSearchParams(window.location.search);
					const code = urlParams.get("code");
					const errorParam = urlParams.get("error");
					const errorDesc = urlParams.get("error_description");
					if (errorParam || errorDesc) {
						if (isMounted) {
							setErrorMessage(errorDesc || "O link de recuperação é inválido ou já foi utilizado.");
							setHasValidSession(false);
							setChecking(false);
						}
						return;
					}
					if (code) {
						const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
						if (exchangeError) console.warn("Falha na troca do código de recuperação:", exchangeError);
					}
				}
				const { data: { session } } = await supabase.auth.getSession();
				if (isMounted) {
					if (session) {
						setHasValidSession(true);
						setErrorMessage(null);
					} else {
						const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
							if ((event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || event === "USER_UPDATED") && currentSession) {
								if (isMounted) {
									setHasValidSession(true);
									setErrorMessage(null);
									setChecking(false);
								}
							}
						});
						setTimeout(() => {
							if (isMounted) setChecking(false);
						}, 1500);
						return () => {
							authListener.subscription.unsubscribe();
						};
					}
				}
			} catch (err) {
				if (isMounted) {
					setErrorMessage("Ocorreu um erro ao verificar o seu link de recuperação.");
					setHasValidSession(false);
				}
			} finally {
				if (isMounted) setChecking(false);
			}
		}
		initSession();
		return () => {
			isMounted = false;
		};
	}, []);
	async function handleResetPassword(e) {
		e.preventDefault();
		if (!password) {
			toast.error("Por favor, introduza a nova palavra-passe.");
			return;
		}
		if (password.length < 8) {
			toast.error("A palavra-passe deve ter pelo menos 8 caracteres.");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("A confirmação de palavra-passe não coincide.");
			return;
		}
		setLoading(true);
		try {
			const { error } = await supabase.auth.updateUser({ password });
			if (error) throw error;
			await supabase.auth.signOut();
			setSuccess(true);
			toast.success("Senha alterada com sucesso!");
		} catch (err) {
			const msg = err?.message || "Não foi possível alterar a sua palavra-passe.";
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen relative grid lg:grid-cols-2 bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative hidden lg:block overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: hero_banner_default,
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 138,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-br from-background/90 via-background/75 to-background/95" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -top-20 -right-20 h-96 w-96 rounded-full gradient-gold opacity-20 blur-3xl" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 140,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative h-full p-12 flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							className: "inline-flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: infropay_mark_default,
								alt: "InfroPay",
								width: 512,
								height: 512,
								className: "h-10 w-10 rounded-lg object-contain"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xl font-bold",
								children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-gradient-gold",
									children: "Pay"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 145,
									columnNumber: 20
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 144,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 142,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-4 font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 150,
									columnNumber: 15
								}, this), "Recuperação Segura de Conta"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-4xl font-bold leading-tight max-w-md",
								children: [
									"A sua segurança e a do seu negócio são a nossa",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-gradient-gold",
										children: "prioridade"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 155,
										columnNumber: 15
									}, this),
									"."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 text-muted-foreground max-w-md text-sm leading-relaxed",
								children: "Crie uma palavra-passe forte com letras e números para garantir a máxima proteção das suas vendas e saldos."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 148,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" InfroPay"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 141,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 137,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center justify-center p-6 sm:p-12",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "lg:hidden inline-flex items-center gap-2 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: infropay_mark_default,
						alt: "InfroPay",
						width: 512,
						height: 512,
						className: "h-8 w-8 rounded-lg object-contain"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-lg font-bold",
						children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-gradient-gold",
							children: "Pay"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 20
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 171,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 169,
					columnNumber: 11
				}, this), checking ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-8 text-center space-y-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 177,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground",
						children: "A validar ligação segura de recuperação..."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 178,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 176,
					columnNumber: 23
				}, this) : success ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-8 w-8" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 182,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-2xl font-bold tracking-tight text-foreground",
							children: "Senha alterada com sucesso!"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-sm text-muted-foreground leading-relaxed",
							children: "A sua nova palavra-passe foi atualizada com sucesso e as sessões anteriores foram encerradas por motivos de segurança."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 186,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								onClick: () => router.navigate({
									to: "/auth",
									search: { mode: "signin" }
								}),
								className: "w-full h-11 gradient-brand text-primary-foreground shadow-glow font-medium",
								children: ["Entrar na plataforma", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-2 h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 181,
					columnNumber: 32
				}, this) : !hasValidSession ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "h-8 w-8" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-2xl font-bold tracking-tight text-foreground",
							children: "Link de recuperação inválido ou expirado"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-sm text-muted-foreground leading-relaxed",
							children: errorMessage || "Por motivos de segurança, os links de redefinição de palavra-passe são de uso único e expiram rapidamente. Solicite um novo link para continuar."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 212,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-2 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								onClick: () => router.navigate({
									to: "/auth",
									search: { mode: "forgot" }
								}),
								className: "w-full h-11 gradient-brand text-primary-foreground shadow-glow font-medium",
								children: ["Solicitar novo link", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-2 h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								onClick: () => router.navigate({
									to: "/auth",
									search: { mode: "signin" }
								}),
								className: "w-full text-muted-foreground hover:text-foreground text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "mr-2 h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 19
								}, this), "Voltar para o login"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 221,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 207,
					columnNumber: 41
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-medium mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 19
								}, this), "Redefinição de Acesso"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "text-3xl font-bold tracking-tight",
								children: "Definir nova senha"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Introduza a sua nova palavra-passe para aceder à sua conta InfroPay."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 249,
								columnNumber: 17
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							onSubmit: handleResetPassword,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "new-password",
									children: "Nova palavra-passe"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 256,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative mt-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 258,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											id: "new-password",
											type: showPassword ? "text" : "password",
											required: true,
											minLength: 8,
											value: password,
											onChange: (e) => setPassword(e.target.value),
											placeholder: "Mínimo 8 caracteres",
											className: "pl-9 pr-10"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 259,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: () => setShowPassword(!showPassword),
											className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
											tabIndex: -1,
											children: showPassword ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 261,
												columnNumber: 39
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-4 w-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 261,
												columnNumber: 72
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 260,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 257,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "confirm-password",
										children: "Confirmar nova palavra-passe"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 267,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "relative mt-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 269,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
												id: "confirm-password",
												type: showConfirm ? "text" : "password",
												required: true,
												minLength: 8,
												value: confirmPassword,
												onChange: (e) => setConfirmPassword(e.target.value),
												placeholder: "Repita a nova palavra-passe",
												className: "pl-9 pr-10"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 270,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => setShowConfirm(!showConfirm),
												className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
												tabIndex: -1,
												children: showConfirm ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "h-4 w-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 272,
													columnNumber: 38
												}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-4 w-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 272,
													columnNumber: 71
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 271,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 268,
										columnNumber: 19
									}, this),
									confirmPassword && password !== confirmPassword && /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-rose-400 mt-1.5 flex items-center gap-1",
										children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 276,
											columnNumber: 23
										}, this), "As palavras-passe não coincidem."]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 275,
										columnNumber: 71
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 266,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-lg bg-secondary/40 border border-border/50 p-3 text-xs text-muted-foreground space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-medium text-foreground",
										children: "Recomendações de segurança:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 282,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
										className: "list-disc list-inside space-y-0.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
												className: password.length >= 8 ? "text-emerald-400 font-medium" : "",
												children: "Pelo menos 8 caracteres"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 284,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
												className: /[0-9]/.test(password) ? "text-emerald-400 font-medium" : "",
												children: "Pelo menos um número"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 287,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
												className: /[a-zA-Z]/.test(password) ? "text-emerald-400 font-medium" : "",
												children: "Pelo menos uma letra"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 290,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 283,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 281,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "submit",
									disabled: loading || !password || password !== confirmPassword,
									className: "w-full h-11 gradient-brand text-primary-foreground shadow-glow font-medium",
									children: [loading ? "A atualizar palavra-passe..." : "Alterar senha", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-1.5 h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 298,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 254,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-center",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/auth",
								search: { mode: "signin" },
								className: "inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "mr-1.5 h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 306,
									columnNumber: 19
								}, this), "Voltar para o login"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 302,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 242,
					columnNumber: 22
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 168,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 167,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 135,
		columnNumber: 10
	}, this);
}
//#endregion
export { RedefinirSenhaPage as component };
