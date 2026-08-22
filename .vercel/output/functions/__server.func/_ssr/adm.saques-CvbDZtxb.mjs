import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { At as CircleCheck, Et as CircleX, o as User, w as Send } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as Textarea } from "./textarea-XzxVYTAX.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-HRHX5L42.mjs";
import { r as listAllWithdrawals, s as updateWithdrawalStatus } from "./withdrawals.functions-DcFkCgPW.mjs";
import { n as kz } from "./FeeBanner-CDC3PD6P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adm.saques-CvbDZtxb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/adm.saques.tsx?tsr-split=component";
function Page() {
	const qc = useQueryClient();
	const listFn = useServerFn(listAllWithdrawals);
	const updateFn = useServerFn(updateWithdrawalStatus);
	const [filter, setFilter] = (0, import_react.useState)("em_analise");
	const { data } = useQuery({
		queryKey: [
			"adm",
			"withdrawals",
			filter
		],
		queryFn: () => listFn({ data: { status: filter } })
	});
	const [rejecting, setRejecting] = (0, import_react.useState)(null);
	const [reason, setReason] = (0, import_react.useState)("");
	async function act(id, status, rejection_reason) {
		try {
			await updateFn({ data: {
				id,
				status,
				rejection_reason
			} });
			toast.success("Atualizado");
			qc.invalidateQueries({ queryKey: ["adm", "withdrawals"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-6xl mx-auto space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-widest text-gold font-semibold",
					children: "Administração"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-3xl md:text-4xl font-bold mt-2",
					children: "Fila de saques"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground mt-2",
					children: "Aprovar, marcar como pago ou recusar pedidos dos produtores."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 46,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-2 flex-wrap",
				children: [
					["em_analise", "Em análise"],
					["aprovado", "Aprovados"],
					["pago", "Pagos"],
					["recusado", "Recusados"]
				].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setFilter(v),
					className: `px-3 py-1.5 rounded-full text-xs font-medium border transition ${filter === v ? "bg-gold/15 border-gold/40 text-gold" : "border-border text-muted-foreground hover:text-foreground"}`,
					children: l
				}, v, false, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 130
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 56,
				columnNumber: 7
			}, this),
			!data?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-dashed border-border p-16 text-center text-sm text-muted-foreground",
				children: "Nada por aqui."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 24
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-3",
				children: data.map((w) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border bg-card p-5 flex flex-wrap items-center gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-10 w-10 rounded-full bg-primary/15 grid place-items-center overflow-hidden",
								children: w.producer?.avatar_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: w.producer.avatar_url,
									alt: "",
									className: "h-full w-full object-cover"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 68,
									columnNumber: 45
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-5 w-5 text-primary-glow" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 68,
									columnNumber: 129
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 67,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-semibold truncate",
									children: w.producer?.full_name ?? w.producer?.username ?? "Produtor"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 71,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: new Date(w.created_at).toLocaleString("pt-AO")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 74,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 70,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: "Destino"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 80,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-medium",
									children: w.bank_account?.bank_name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 81,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: w.bank_account?.iban
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 82,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 79,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-right",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: "A pagar"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 85,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-display font-bold text-xl",
									children: kz(w.net_cents)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 86,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[10px] text-muted-foreground",
									children: [
										"bruto ",
										kz(w.gross_cents),
										" · taxa ",
										kz(w.fee_cents)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 87,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 84,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-2",
							children: [
								w.status === "em_analise" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => act(w.id, "aprovado"),
									children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "h-4 w-4 mr-1 text-primary-glow" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 94,
										columnNumber: 23
									}, this), "Aprovar"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => {
										setRejecting(w);
										setReason("");
									},
									children: [/* @__PURE__ */ (void 0)(CircleX, { className: "h-4 w-4 mr-1 text-destructive" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 101,
										columnNumber: 23
									}, this), "Recusar"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 97,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 92,
									columnNumber: 47
								}, this),
								w.status === "aprovado" && /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									className: "gradient-brand text-primary-foreground",
									onClick: () => act(w.id, "pago"),
									children: [/* @__PURE__ */ (void 0)(Send, { className: "h-4 w-4 mr-1" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 106,
										columnNumber: 21
									}, this), "Marcar como pago"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 105,
									columnNumber: 45
								}, this),
								w.status === "recusado" && w.rejection_reason && /* @__PURE__ */ (void 0)("div", {
									className: "text-xs text-destructive max-w-[240px]",
									children: w.rejection_reason
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 109,
									columnNumber: 67
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 15
						}, this)
					]
				}, w.id, true, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 33
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 18
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: !!rejecting,
				onOpenChange: (o) => !o && setRejecting(null),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: "Recusar saque" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground",
						children: "O valor volta ao saldo disponível do produtor."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
						value: reason,
						onChange: (e) => setReason(e.target.value),
						placeholder: "Motivo da recusa...",
						rows: 4
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => setRejecting(null),
						children: "Cancelar"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "destructive",
						onClick: async () => {
							if (reason.trim().length < 3) return toast.error("Motivo obrigatório");
							await act(rejecting.id, "recusado", reason.trim());
							setRejecting(null);
						},
						children: "Confirmar recusa"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 114,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 45,
		columnNumber: 10
	}, this);
}
//#endregion
export { Page as component };
