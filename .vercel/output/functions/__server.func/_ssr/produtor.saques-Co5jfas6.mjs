import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { F as Plus, Jt as ArrowUpRight, b as ShieldCheck, d as Trash2, et as Landmark } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-HRHX5L42.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { a as listMyWithdrawals, c as upsertBankAccount, i as listMyBankAccounts, n as deleteBankAccount, o as requestWithdrawal, t as WITHDRAWAL_FEE } from "./withdrawals.functions-DcFkCgPW.mjs";
import { n as kz, t as FeeBanner } from "./FeeBanner-CDC3PD6P.mjs";
import { t as Switch } from "./switch-BglIGq6V.mjs";
import { n as getMyWallet } from "./finance.functions-BuB1HXfN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.saques-Co5jfas6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.saques.tsx?tsr-split=component";
function Page() {
	const qc = useQueryClient();
	const walletFn = useServerFn(getMyWallet);
	const banksFn = useServerFn(listMyBankAccounts);
	const wsFn = useServerFn(listMyWithdrawals);
	const upsertFn = useServerFn(upsertBankAccount);
	const deleteFn = useServerFn(deleteBankAccount);
	const requestFn = useServerFn(requestWithdrawal);
	const { data: wallet } = useQuery({
		queryKey: ["producer", "wallet"],
		queryFn: () => walletFn()
	});
	const { data: banks } = useQuery({
		queryKey: ["banks"],
		queryFn: () => banksFn()
	});
	const { data: withdrawals } = useQuery({
		queryKey: ["withdrawals"],
		queryFn: () => wsFn()
	});
	const [bankOpen, setBankOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [amountKz, setAmountKz] = (0, import_react.useState)("");
	const [bankId, setBankId] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	async function saveBank(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		try {
			await upsertFn({ data: {
				id: editing?.id,
				holder_name: String(fd.get("holder_name")),
				bank_name: String(fd.get("bank_name")),
				iban: String(fd.get("iban")),
				phone: String(fd.get("phone") ?? ""),
				is_default: fd.get("is_default") === "on"
			} });
			toast.success("Conta bancária guardada com sucesso");
			setBankOpen(false);
			setEditing(null);
			qc.invalidateQueries({ queryKey: ["banks"] });
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function removeBank(id) {
		if (!confirm("Tem a certeza que deseja remover esta conta bancária?")) return;
		try {
			await deleteFn({ data: { id } });
			qc.invalidateQueries({ queryKey: ["banks"] });
			toast.success("Conta removida");
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function submitWithdrawal(e) {
		e.preventDefault();
		if (isSubmitting) return;
		const rawNum = Number(amountKz.replace(/\D/g, ""));
		const cents = Math.round(rawNum * 100);
		if (!bankId) return toast.error("Por favor, selecione uma conta bancária de destino.");
		if (cents < 5e5) return toast.error("O valor mínimo para saque é 5.000 Kz.");
		if (cents > (wallet?.available_cents ?? 0)) return toast.error("Saldo disponível insuficiente para este saque.");
		setIsSubmitting(true);
		try {
			const idempotencyKey = `wd_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
			await requestFn({ data: {
				gross_cents: cents,
				bank_account_id: bankId,
				idempotency_key: idempotencyKey
			} });
			toast.success("Pedido de saque submetido com sucesso para análise financeira!");
			setAmountKz("");
			qc.invalidateQueries({ queryKey: ["withdrawals"] });
			qc.invalidateQueries({ queryKey: ["producer", "wallet"] });
		} catch (e) {
			toast.error(e.message || "Erro ao solicitar saque.");
		} finally {
			setIsSubmitting(false);
		}
	}
	const parsedCents = Math.round(Number(amountKz.replace(/\D/g, "")) * 100);
	const feePreview = Math.round(parsedCents * WITHDRAWAL_FEE);
	const netPreview = parsedCents - feePreview;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-6xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs uppercase tracking-widest text-gold font-semibold",
						children: "Saques"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-3xl md:text-4xl font-bold mt-2",
						children: "Solicitação e Histórico de Saques"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground mt-1 text-sm",
						children: "Levante os seus rendimentos de forma rápida, segura e com transparência total de taxas."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-primary/40 bg-primary/10 px-5 py-3 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold",
						children: "Saldo Disponível"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-display text-2xl font-bold text-gradient-gold",
						children: kz(wallet?.available_cents ?? 0)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 136,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 122,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FeeBanner, { variant: "withdrawal" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 143,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					id: "bank-accounts-card",
					className: "rounded-2xl border border-border bg-card p-6 flex flex-col justify-between",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display font-semibold text-lg flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Landmark, { className: "h-5 w-5 text-gold" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 151,
								columnNumber: 17
							}, this), "Contas Bancárias Cadastradas"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 150,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								setEditing(null);
								setBankOpen(true);
							},
							className: "hover:border-gold/50",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 158,
								columnNumber: 17
							}, this), "Nova Conta"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 149,
						columnNumber: 13
					}, this), !banks?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-sm text-muted-foreground py-10 text-center border border-dashed border-border rounded-xl",
						children: "Nenhuma conta bancária associada. Adicione uma conta para receber seus saques."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 31
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: banks.map((b) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: `rounded-xl border p-4 flex items-center gap-3 transition ${bankId === b.id ? "border-gold/60 bg-gold/5" : "border-border bg-background"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-semibold text-sm flex items-center gap-2",
										children: [b.holder_name, b.is_default && /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold font-medium border border-gold/30",
											children: "Padrão"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 169,
											columnNumber: 42
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
												className: "text-foreground",
												children: b.bank_name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 174,
												columnNumber: 25
											}, this),
											" · ",
											b.iban
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "icon",
									variant: "ghost",
									title: "Editar",
									onClick: () => {
										setEditing(b);
										setBankOpen(true);
									},
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 181,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 177,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "icon",
									variant: "ghost",
									title: "Remover",
									onClick: () => removeBank(b.id),
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4 text-destructive" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 184,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 183,
									columnNumber: 21
								}, this)
							]
						}, b.id, true, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 40
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 24
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 148,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					id: "withdrawal-request-form",
					onSubmit: submitWithdrawal,
					className: "rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display font-semibold text-lg",
								children: "Solicitar Novo Saque"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs text-muted-foreground",
								children: "Taxa: 6%"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 193,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "bank-select",
							className: "text-xs font-semibold",
							children: "Conta Bancária de Destino"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							id: "bank-select",
							value: bankId,
							onChange: (e) => setBankId(e.target.value),
							className: "mt-1.5 w-full h-11 rounded-lg bg-background border border-input px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40",
							required: true,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "",
								children: "Selecione a conta bancária..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 15
							}, this), banks?.map((b) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: b.id,
								children: [
									b.bank_name,
									" — ",
									b.iban,
									" (",
									b.holder_name,
									")"
								]
							}, b.id, true, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 39
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 202,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "amount-input",
							className: "text-xs font-semibold",
							children: "Valor a Sacar (Kz)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							id: "amount-input",
							inputMode: "numeric",
							value: amountKz,
							onChange: (e) => setAmountKz(e.target.value),
							placeholder: "Ex.: 50000",
							className: "mt-1.5 h-11 text-base font-semibold",
							required: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 210,
							columnNumber: 11
						}, this),
						parsedCents >= 5e5 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl bg-muted/40 border border-border p-4 text-xs space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[11px] uppercase tracking-wider font-semibold text-muted-foreground",
									children: "Resumo com Transparência Total"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Valor Solicitado"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 223,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono font-medium",
										children: kz(parsedCents)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 224,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between items-center text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1",
										children: [
											"Taxa da InfroPay (",
											6,
											"%)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 227,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono",
										children: ["-", kz(feePreview)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 230,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between items-center font-bold text-sm pt-2 border-t border-border text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Valor Líquido a Receber" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 233,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-primary-glow text-base",
										children: kz(netPreview)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 234,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 50
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[11px] text-muted-foreground bg-muted/20 border border-border rounded-xl p-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-gold shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"Saque mínimo de ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "5.000 Kz" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 239,
									columnNumber: 33
								}, this),
								". Taxa fixa de ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "6%" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 239,
									columnNumber: 73
								}, this),
								" ",
								"calculada automaticamente."
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 236,
							columnNumber: 22
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							id: "btn-submit-withdrawal",
							type: "submit",
							disabled: isSubmitting || parsedCents < 5e5,
							className: "w-full h-11 gradient-brand text-primary-foreground font-semibold shadow-glow",
							children: isSubmitting ? "A processar solicitação..." : "Confirmar Solicitação de Saque"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 145,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-border bg-card overflow-hidden shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-6 py-4 border-b border-border flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display font-semibold text-lg",
						children: "Histórico de Solicitações"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 253,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs text-muted-foreground",
						children: [withdrawals?.length ?? 0, " pedidos"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 254,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 252,
					columnNumber: 9
				}, this), !withdrawals?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-12 text-center text-sm text-muted-foreground",
					children: "Ainda não realizou nenhuma solicitação de saque."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 256,
					columnNumber: 33
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
									lineNumber: 262,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Banco de Destino"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 263,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5 text-right",
									children: "Valor Solicitado"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 264,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5 text-right",
									children: "Taxa (6%)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 265,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5 text-right",
									children: "Valor Líquido"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 266,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Estado"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 260,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
							className: "divide-y divide-border",
							children: withdrawals.map((w) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "hover:bg-muted/10 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 text-muted-foreground whitespace-nowrap",
										children: [
											new Date(w.created_at).toLocaleDateString("pt-AO"),
											" ",
											new Date(w.created_at).toLocaleTimeString("pt-AO", {
												hour: "2-digit",
												minute: "2-digit"
											})
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 272,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-semibold text-foreground",
											children: w.bank_account?.bank_name ?? "Conta Bancária"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 280,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-muted-foreground font-mono",
											children: w.bank_account?.iban
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 283,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 279,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 text-right font-mono font-medium",
										children: kz(w.gross_cents)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 285,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 text-right font-mono text-muted-foreground text-xs",
										children: ["-", kz(w.fee_cents || Math.round(w.gross_cents * .06))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 288,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 text-right font-mono font-bold text-foreground",
										children: kz(w.net_cents || Math.round(w.gross_cents * .94))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 291,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WStatus, {
											s: w.status,
											r: w.rejection_reason
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 295,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 294,
										columnNumber: 21
									}, this)
								]
							}, w.id, true, {
								fileName: _jsxFileName,
								lineNumber: 271,
								columnNumber: 46
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 270,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 258,
					columnNumber: 20
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 251,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: bankOpen,
				onOpenChange: (o) => {
					setBankOpen(o);
					if (!o) setEditing(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "sm:max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: editing ? "Editar Conta Bancária" : "Nova Conta Bancária" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 309,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: saveBank,
						className: "space-y-4 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "holder_name",
								children: "Titular da Conta"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 314,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "holder_name",
								name: "holder_name",
								defaultValue: editing?.holder_name,
								required: true,
								placeholder: "Nome completo do titular",
								className: "mt-1"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "bank_name",
								children: "Nome do Banco"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 318,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "bank_name",
								name: "bank_name",
								defaultValue: editing?.bank_name,
								required: true,
								placeholder: "Ex.: BAI, BFA, BIC, SOL, Atlântico",
								className: "mt-1"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 319,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 317,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "iban",
								children: "IBAN (Angola)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 322,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "iban",
								name: "iban",
								defaultValue: editing?.iban,
								required: true,
								placeholder: "AO06 0000 0000 0000 0000 0000 0",
								className: "mt-1 font-mono"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 323,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 321,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "phone",
								children: "Telefone de Contacto (Opcional)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 326,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "phone",
								name: "phone",
								defaultValue: editing?.phone ?? "",
								placeholder: "+244 9...",
								className: "mt-1"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 325,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "is_default",
										className: "text-sm font-medium",
										children: "Definir como conta padrão"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 331,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground",
										children: "Usada automaticamente para novos saques"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 334,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 330,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
									id: "is_default",
									name: "is_default",
									defaultChecked: editing?.is_default
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 338,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 329,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
								className: "pt-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "submit",
									className: "w-full gradient-brand text-primary-foreground font-semibold",
									children: "Guardar Conta Bancária"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 341,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 340,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 312,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 308,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 304,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 121,
		columnNumber: 10
	}, this);
}
function WStatus({ s, r }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: `text-[11px] px-2.5 py-1 rounded-full font-medium border ${{
			em_analise: "bg-warning/15 text-warning border-warning/30",
			aprovado: "bg-primary/15 text-primary-glow border-primary/30",
			pago: "bg-success/15 text-success border-success/30",
			recusado: "bg-destructive/15 text-destructive border-destructive/30"
		}[s] ?? "bg-muted text-muted-foreground"}`,
		children: {
			em_analise: "Em análise",
			aprovado: "Aprovado",
			pago: "Pago",
			recusado: "Recusado"
		}[s] ?? s
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 370,
		columnNumber: 7
	}, this), s === "recusado" && r && /* @__PURE__ */ (void 0)("div", {
		className: "text-[10px] text-destructive mt-1.5 max-w-[220px] leading-tight font-medium",
		children: ["Motivo: ", r]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 373,
		columnNumber: 33
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 369,
		columnNumber: 10
	}, this);
}
//#endregion
export { Page as component };
