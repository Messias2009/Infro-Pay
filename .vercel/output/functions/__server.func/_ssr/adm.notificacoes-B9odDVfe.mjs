import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { $ as Layers, At as CircleCheck, It as Check, K as Mail, M as Radio, Ut as Bell, b as ShieldCheck, g as Smartphone, t as Zap, w as Send } from "../_libs/lucide-react.mjs";
import { r as cn, t as Button } from "./button-2_3vHNWL.mjs";
import { t as Textarea } from "./textarea-XzxVYTAX.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-1I-ZqIzI.mjs";
import { c as sendTestNotification, s as sendAdminBroadcastFn } from "./notifications.functions-Do4Q97fz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adm.notificacoes-B9odDVfe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ui/checkbox.tsx";
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 20,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 19,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 11,
	columnNumber: 3
}, void 0));
Checkbox.displayName = Checkbox$1.displayName;
var _jsxFileName = "/app/applet/src/routes/_authenticated/adm.notificacoes.tsx?tsr-split=component";
function AdmNotificacoesPage() {
	const qc = useQueryClient();
	const broadcastFn = useServerFn(sendAdminBroadcastFn);
	const testNotifFn = useServerFn(sendTestNotification);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("platform_update");
	const [audience, setAudience] = (0, import_react.useState)("all");
	const [specificUserId, setSpecificUserId] = (0, import_react.useState)("");
	const [channels, setChannels] = (0, import_react.useState)({
		in_app: true,
		push: true,
		email: true
	});
	const [history, setHistory] = (0, import_react.useState)([{
		id: "b-1",
		title: "Lançamento da Nova Central de Notificações & PWA",
		type: "platform_update",
		audience: "Todos os Usuários",
		channels: [
			"in_app",
			"push",
			"email"
		],
		sentCount: 142,
		status: "Entregue",
		createdAt: "Há 2 horas"
	}, {
		id: "b-2",
		title: "Melhoria na velocidade de Saques Multicaixa",
		type: "system_alert",
		audience: "Produtores",
		channels: ["in_app", "email"],
		sentCount: 98,
		status: "Entregue",
		createdAt: "Ontem"
	}]);
	async function handleSendBroadcast(e) {
		e.preventDefault();
		if (!title.trim() || !message.trim()) {
			toast.error("Preencha o título e a mensagem.");
			return;
		}
		const selectedChannels = Object.keys(channels).filter((k) => channels[k]);
		if (selectedChannels.length === 0) {
			toast.error("Selecione pelo menos um canal de envio.");
			return;
		}
		setLoading(true);
		try {
			const res = await broadcastFn({ data: {
				title,
				message,
				type,
				audience,
				specific_user_id: audience === "specific" ? specificUserId || null : null,
				channels: selectedChannels
			} });
			toast.success(`Comunicado enviado com sucesso para ${res.sentCount} utilizadores!`);
			setHistory((prev) => [{
				id: `b-${Date.now()}`,
				title,
				type,
				audience: audience === "all" ? "Todos os Usuários" : audience === "sellers" ? "Produtores" : audience === "buyers" ? "Compradores" : `Usuário ${specificUserId.slice(0, 8)}...`,
				channels: selectedChannels,
				sentCount: res.sentCount,
				status: "Entregue",
				createdAt: "Agora mesmo"
			}, ...prev]);
			setTitle("");
			setMessage("");
			qc.invalidateQueries({ queryKey: ["notifications"] });
		} catch (err) {
			toast.error(err.message || "Erro ao despachar comunicado.");
		} finally {
			setLoading(false);
		}
	}
	async function handleSendTest(t) {
		try {
			await testNotifFn({ data: { type: t } });
			toast.success("Notificação enviada para a sua conta de administrador!");
			qc.invalidateQueries({ queryKey: ["notifications"] });
			qc.invalidateQueries({ queryKey: ["notifications", "unread"] });
		} catch (err) {
			toast.error(err.message || "Erro ao testar notificação.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-widest text-gold font-semibold flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 11
					}, this), " Painel de Controle"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 119,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-3xl md:text-4xl font-bold mt-2 text-foreground",
					children: "Central de Notificações & Broadcast"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 122,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Envie comunicados em massa, push notifications e alertas transacionais para a base de utilizadores da InfroPay."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 125,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 rounded-2xl border border-border bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total Entregues" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-4 w-4 text-gold" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-bold text-foreground mt-2",
								children: "2.480"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[11px] text-success font-medium mt-1",
								children: "99.8% taxa de sucesso"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 139,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 rounded-2xl border border-border bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Web Push Ativos" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "h-4 w-4 text-primary-glow" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 145,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-bold text-foreground mt-2",
								children: "1.120"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "Dispositivos registrados"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 rounded-2xl border border-border bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "E-mails Transacionais" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 153,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-4 w-4 text-blue-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 154,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-bold text-foreground mt-2",
								children: "1.360"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "InfroPay Templates"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 rounded-2xl border border-border bg-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Idempotência & Anti-Spam" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 162,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-success" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 163,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 161,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-bold text-foreground mt-2",
								children: "100%"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[11px] text-muted-foreground mt-1",
								children: "Deduplicação ativa"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 160,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleSendBroadcast,
					className: "rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-5 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 pb-3 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-8 w-8 rounded-lg gradient-brand text-primary-foreground grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 175,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-bold text-base text-foreground",
								children: "Novo Comunicado / Broadcast"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Crie uma mensagem para envio instantâneo multiplataforma."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 179,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs font-semibold",
									children: "Tipo do Aviso *"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: type,
									onValueChange: (v) => setType(v),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 190,
										columnNumber: 19
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 189,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "platform_update",
											children: "🔵 Atualização da Plataforma"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 193,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "system_alert",
											children: "🛠️ Manutenção / Aviso do Sistema"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 194,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "security_alert",
											children: "🔒 Alerta de Segurança"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 195,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "sale_approved",
											children: "🎉 Destaque de Vendas"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 196,
											columnNumber: 19
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 192,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 188,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 186,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs font-semibold",
									children: "Público-Alvo *"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 202,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: audience,
									onValueChange: (v) => setAudience(v),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 19
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 204,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "all",
											children: "👥 Todos os Utilizadores"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "sellers",
											children: "💼 Apenas Produtores"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 209,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "buyers",
											children: "🛒 Apenas Compradores"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 210,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
											value: "specific",
											children: "🎯 Utilizador Específico (ID)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 211,
											columnNumber: 19
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 207,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 185,
							columnNumber: 11
						}, this),
						audience === "specific" && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5 animate-fade-in",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "targetUid",
								className: "text-xs font-semibold",
								children: "ID do Utilizador (UUID) *"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Input, {
								id: "targetUid",
								placeholder: "Ex: 8a4e320f-0c58-45a9-9e12-...",
								value: specificUserId,
								onChange: (e) => setSpecificUserId(e.target.value),
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 217,
							columnNumber: 39
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "btitle",
								className: "text-xs font-semibold",
								children: "Título da Notificação *"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 225,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "btitle",
								placeholder: "Ex: Nova atualização disponível na InfroPay",
								value: title,
								onChange: (e) => setTitle(e.target.value),
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 224,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "bmsg",
								className: "text-xs font-semibold",
								children: "Mensagem do Comunicado *"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								id: "bmsg",
								rows: 4,
								placeholder: "Descreva o comunicado ou novidade detalhadamente...",
								value: message,
								onChange: (e) => setMessage(e.target.value),
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 231,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs font-semibold",
								children: "Canais de Envio Selecionados:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid sm:grid-cols-3 gap-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "flex items-center gap-2.5 p-3 rounded-xl bg-background/60 border border-border/70 cursor-pointer hover:border-gold/40 transition",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, {
											checked: channels.in_app,
											onCheckedChange: (c) => setChannels((p) => ({
												...p,
												in_app: !!c
											}))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 243,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-medium text-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bell, { className: "h-3.5 w-3.5 text-gold" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 248,
												columnNumber: 19
											}, this), " Notificação Interna"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 247,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 242,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "flex items-center gap-2.5 p-3 rounded-xl bg-background/60 border border-border/70 cursor-pointer hover:border-gold/40 transition",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, {
											checked: channels.push,
											onCheckedChange: (c) => setChannels((p) => ({
												...p,
												push: !!c
											}))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 253,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-medium text-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "h-3.5 w-3.5 text-primary-glow" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 258,
												columnNumber: 19
											}, this), " Web Push / FCM"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 257,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 252,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "flex items-center gap-2.5 p-3 rounded-xl bg-background/60 border border-border/70 cursor-pointer hover:border-gold/40 transition",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Checkbox, {
											checked: channels.email,
											onCheckedChange: (c) => setChannels((p) => ({
												...p,
												email: !!c
											}))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 263,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-medium text-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-3.5 w-3.5 text-blue-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 268,
												columnNumber: 19
											}, this), " E-mail"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 267,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 262,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 239,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							disabled: loading,
							className: "w-full gradient-brand text-primary-foreground font-bold shadow-glow h-11 text-sm",
							children: loading ? "A despachar comunicado..." : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Despachar Comunicado em Massa ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "ml-2 h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 276,
								columnNumber: 47
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 275,
								columnNumber: 54
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 274,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 172,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card p-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-bold text-sm text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "h-4 w-4 text-gold" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 286,
									columnNumber: 15
								}, this), " Teste de Notificações em Tempo Real"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 285,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Dispare notificações de teste para a sua conta e valide a entrega interna, push e formatação dos e-mails."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 288,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => handleSendTest("sale_approved"),
										className: "w-full justify-start text-xs h-9",
										children: "🎉 Testar Venda Aprovada (25.000 Kz)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 294,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => handleSendTest("withdrawal_approved"),
										className: "w-full justify-start text-xs h-9",
										children: "💰 Testar Saque Aprovado (50.000 Kz)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 297,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => handleSendTest("platform_update"),
										className: "w-full justify-start text-xs h-9",
										children: "🔵 Testar Comunicado da Plataforma"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 300,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 293,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 284,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border/70 bg-card/60 p-5 space-y-2 text-xs text-muted-foreground leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "font-bold text-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-success" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 309,
								columnNumber: 15
							}, this), " Regras de Segurança & Anti-Spam"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 308,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "list-disc pl-4 space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Credenciais FCM e chaves de envio nunca são expostas ao cliente." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 312,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Chaves de idempotência evitam duplicidade de push e e-mail." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 313,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Usuários com canais desativados não recebem e-mails promocionais." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 314,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 307,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 282,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 171,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border bg-card overflow-hidden shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-5 border-b border-border flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-bold text-base text-foreground flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "h-4 w-4 text-gold" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 325,
							columnNumber: 15
						}, this), " Histórico de Comunicados Enviados"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 324,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Registro de transmissões e status de entrega aos utilizadores."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 327,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 323,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 322,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
							className: "bg-muted/40 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "p-3.5 pl-5",
									children: "Título / Mensagem"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 337,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "p-3.5",
									children: "Público"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 338,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "p-3.5",
									children: "Canais"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 339,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "p-3.5",
									children: "Enviados"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 340,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "p-3.5",
									children: "Status"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 341,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "p-3.5 pr-5",
									children: "Data"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 342,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 336,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 335,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
							className: "divide-y divide-border/60 text-foreground",
							children: history.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "hover:bg-muted/20 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "p-3.5 pl-5 font-semibold text-sm",
										children: item.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 347,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "p-3.5 text-muted-foreground",
										children: item.audience
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 348,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-1",
											children: item.channels.map((ch) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "px-1.5 py-0.5 rounded bg-muted text-[10px] uppercase font-bold text-muted-foreground",
												children: ch
											}, ch, false, {
												fileName: _jsxFileName,
												lineNumber: 351,
												columnNumber: 48
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 350,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 349,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "p-3.5 font-bold text-gold",
										children: item.sentCount
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 356,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "p-3.5",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex items-center gap-1 text-success font-semibold text-[11px]",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3 w-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 359,
													columnNumber: 23
												}, this),
												" ",
												item.status
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 358,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 357,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "p-3.5 pr-5 text-muted-foreground",
										children: item.createdAt
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 362,
										columnNumber: 19
									}, this)
								]
							}, item.id, true, {
								fileName: _jsxFileName,
								lineNumber: 346,
								columnNumber: 36
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 345,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 334,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 333,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 321,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 116,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdmNotificacoesPage as component };
