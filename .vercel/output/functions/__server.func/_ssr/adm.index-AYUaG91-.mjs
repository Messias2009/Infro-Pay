import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { approveProduct, getAdminStats, listPendingProducts, rejectProduct } from "./admin.functions-C-gZNnTo.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { It as Check, gt as ExternalLink, it as Inbox, n as X } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as Textarea } from "./textarea-XzxVYTAX.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-HRHX5L42.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adm.index-AYUaG91-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/adm.index.tsx?tsr-split=component";
function fmt(cents, currency) {
	try {
		return new Intl.NumberFormat("pt-PT", {
			style: "currency",
			currency
		}).format(cents / 100);
	} catch {
		return `${currency} ${(cents / 100).toFixed(2)}`;
	}
}
function Aprovacoes() {
	const listFn = useServerFn(listPendingProducts);
	const statsFn = useServerFn(getAdminStats);
	const approveFn = useServerFn(approveProduct);
	const rejectFn = useServerFn(rejectProduct);
	const { data: pending, refetch } = useQuery({
		queryKey: ["admin", "pending"],
		queryFn: () => listFn()
	});
	const { data: stats, refetch: refetchStats } = useQuery({
		queryKey: ["admin", "stats"],
		queryFn: () => statsFn()
	});
	async function approve(id) {
		try {
			await approveFn({ data: { id } });
			toast.success("Produto aprovado e publicado");
			refetch();
			refetchStats();
		} catch (e) {
			toast.error(e.message);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs uppercase tracking-widest text-gold font-semibold",
				children: "Administração"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-3xl md:text-4xl font-bold mt-2",
				children: "Fila de aprovação"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground mt-2",
				children: "Reveja os produtos enviados pelos produtores antes de irem para a loja."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 56,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						label: "Aguardando revisão",
						value: stats?.pending ?? 0,
						highlight: true
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						label: "Publicados",
						value: stats?.published ?? 0
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						label: "Rascunhos",
						value: stats?.drafts ?? 0
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 63,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatCard, {
						label: "Total no sistema",
						value: stats?.total ?? 0
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 60,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8",
				children: !pending || pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Inbox, { className: "h-12 w-12 text-gold mx-auto mb-3" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-display text-xl font-semibold",
							children: "Fila vazia"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 70,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "Nenhum produto aguarda aprovação neste momento."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 71,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 45
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4",
					children: pending.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card overflow-hidden flex flex-col md:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "md:w-56 aspect-video md:aspect-square bg-gradient-to-br from-primary/20 to-gold/10 shrink-0",
							children: p.cover_url && /* @__PURE__ */ (void 0)("img", {
								src: p.cover_url,
								alt: "",
								className: "h-full w-full object-cover"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 77,
								columnNumber: 35
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-5 flex-1 flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "font-display font-semibold text-lg",
											children: p.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 82,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary-glow uppercase tracking-wider font-semibold",
											children: p.product_type
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 83,
											columnNumber: 23
										}, this),
										p.category && /* @__PURE__ */ (void 0)("span", {
											className: "text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground uppercase tracking-wider",
											children: p.category.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 86,
											columnNumber: 38
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 81,
									columnNumber: 21
								}, this), p.short_description && /* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-muted-foreground mt-1 line-clamp-2",
									children: p.short_description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 90,
									columnNumber: 45
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 80,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Por ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", {
											className: "text-foreground",
											children: p.producer?.full_name ?? "Produtor"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 96,
											columnNumber: 27
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 95,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "·" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 98,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-semibold text-gradient-gold",
											children: fmt(p.price_cents, p.currency)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 99,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "·" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 102,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: new Date(p.created_at).toLocaleDateString("pt-PT") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 103,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-2 mt-auto pt-2 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
											href: `/produto/${p.slug}`,
											target: "_blank",
											rel: "noreferrer",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
												size: "sm",
												variant: "outline",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 108,
													columnNumber: 25
												}, this), "Pré-visualizar"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 107,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 106,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "sm",
											onClick: () => approve(p.id),
											className: "bg-success text-primary-foreground hover:bg-success/90",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 113,
												columnNumber: 23
											}, this), "Aprovar e publicar"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 112,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RejectDialog, { onReject: async (reason) => {
											try {
												await rejectFn({ data: {
													id: p.id,
													reason
												} });
												toast.success("Produto rejeitado");
												refetch();
												refetchStats();
											} catch (e) {
												toast.error(e.message);
											}
										} }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 116,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 105,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 79,
							columnNumber: 17
						}, this)]
					}, p.id, true, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 38
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 20
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 53,
		columnNumber: 10
	}, this);
}
function StatCard({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `rounded-2xl border p-5 ${highlight ? "border-gold/40 bg-gold/5" : "border-border bg-card"}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 148,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: `mt-2 text-3xl font-display font-bold ${highlight ? "text-gold" : ""}`,
			children: value
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 149,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 147,
		columnNumber: 10
	}, this);
}
function RejectDialog({ onReject }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [reason, setReason] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				size: "sm",
				variant: "destructive",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 165,
					columnNumber: 11
				}, this), "Rejeitar"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 164,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 163,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, { children: "Rejeitar produto" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 171,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 170,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
					className: "text-sm text-muted-foreground",
					children: "Motivo (será visível ao produtor)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
					value: reason,
					onChange: (e) => setReason(e.target.value),
					rows: 4,
					placeholder: "Ex: capa de baixa qualidade, descrição incompleta…"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 175,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 173,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				onClick: () => setOpen(false),
				children: "Cancelar"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 178,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "destructive",
				disabled: loading || reason.trim().length < 3,
				onClick: async () => {
					setLoading(true);
					await onReject(reason.trim());
					setLoading(false);
					setOpen(false);
					setReason("");
				},
				children: "Confirmar rejeição"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 181,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 177,
				columnNumber: 9
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 169,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 162,
		columnNumber: 10
	}, this);
}
//#endregion
export { Aprovacoes as component };
