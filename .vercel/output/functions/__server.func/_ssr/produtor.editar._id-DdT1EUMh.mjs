import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { n as listCategories } from "./catalog.functions-DC0doerl.mjs";
import { s as Route$3 } from "./router-DcboVFjc.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { O as Save, Xt as ArrowLeft, d as Trash2, w as Send } from "../_libs/lucide-react.mjs";
import { n as buttonVariants, r as cn, t as Button } from "./button-2_3vHNWL.mjs";
import { t as Textarea } from "./textarea-XzxVYTAX.mjs";
import { a as Overlay2, c as Title2, i as Description2, l as Trigger2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-1I-ZqIzI.mjs";
import { l as updateProductInFirestore, o as getProductById, t as deleteProductFromFirestore } from "./products.service-DAm7Wd7_.mjs";
import { t as Switch } from "./switch-BglIGq6V.mjs";
import { t as MediaUpload } from "./MediaUpload-B1fhNNi7.mjs";
import { i as emptyDelivery, n as deliveryFromRow, r as deliveryPayload, t as DeliveryFields } from "./DeliveryFields-BafJ2tMc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.editar._id-DdT1EUMh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ui/alert-dialog.tsx";
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 17,
	columnNumber: 3
}, void 0));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogOverlay, {}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 33,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 34,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 32,
	columnNumber: 3
}, void 0));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 47,
	columnNumber: 3
}, void 0);
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 52,
	columnNumber: 3
}, void 0);
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 63,
	columnNumber: 3
}, void 0));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 75,
	columnNumber: 3
}, void 0));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 87,
	columnNumber: 3
}, void 0));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 95,
	columnNumber: 3
}, void 0));
AlertDialogCancel.displayName = Cancel.displayName;
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.editar.$id.tsx?tsr-split=component";
var TYPES = [
	["ebook", "Ebook"],
	["curso", "Curso"],
	["pdf", "PDF"],
	["video", "Vídeo"],
	["software", "Software"],
	["link_externo", "Link externo"],
	["streaming", "Streaming"],
	["assinatura", "Assinatura"],
	["template", "Template"],
	["ia", "IA"],
	["comunidade", "Comunidade"],
	["download", "Download"]
];
var STATUS_LABEL = {
	rascunho: "Rascunho",
	em_analise: "Em análise",
	publicado: "Publicado",
	pausado: "Pausado"
};
function EditarProduto() {
	const { id } = Route$3.useParams();
	const router = useRouter();
	const catsFn = useServerFn(listCategories);
	const { data: product, isLoading, refetch } = useQuery({
		queryKey: ["my-product", id],
		queryFn: () => getProductById(id)
	});
	const { data: cats } = useQuery({
		queryKey: ["categories"],
		queryFn: () => catsFn()
	});
	const [form, setForm] = (0, import_react.useState)(null);
	const [delivery, setDelivery] = (0, import_react.useState)(emptyDelivery);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (product) {
			setForm({
				title: product.title,
				slug: product.slug,
				short_description: product.short_description ?? "",
				description: product.description ?? "",
				product_type: product.product_type,
				category_id: product.category_id ?? "",
				cover_url: product.cover_url ?? "",
				banner_url: product.banner_url ?? "",
				file_url: product.file_url ?? "",
				external_url: product.external_url ?? "",
				price: ((product.price_cents || 0) / 100).toString(),
				promo_price: product.promo_price_cents ? (product.promo_price_cents / 100).toString() : "",
				currency: product.currency,
				tags: (product.tags ?? []).join(", "),
				guarantee_days: product.guarantee_days ?? 7,
				allow_affiliates: product.allow_affiliates ?? false,
				affiliate_commission_percent: Number(product.affiliate_commission_percent ?? 30),
				status: product.status
			});
			setDelivery(deliveryFromRow(product));
		}
	}, [product]);
	if (isLoading || !form) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-10 text-muted-foreground",
		children: "A carregar..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 74,
		columnNumber: 34
	}, this);
	function set(k, v) {
		setForm((f) => ({
			...f,
			[k]: v
		}));
	}
	async function save(e) {
		e.preventDefault();
		setSaving(true);
		try {
			await updateProductInFirestore(id, {
				title: form.title.trim(),
				slug: form.slug,
				short_description: form.short_description || null,
				description: form.description || null,
				product_type: form.product_type,
				category_id: form.category_id || null,
				cover_url: form.cover_url || null,
				banner_url: form.banner_url || null,
				file_url: form.file_url || null,
				external_url: form.external_url || null,
				price_cents: Math.round(Number(form.price || "0") * 100),
				promo_price_cents: form.promo_price ? Math.round(Number(form.promo_price) * 100) : null,
				currency: form.currency.toUpperCase(),
				tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
				guarantee_days: Number(form.guarantee_days),
				allow_affiliates: !!form.allow_affiliates,
				affiliate_commission_percent: Number(form.affiliate_commission_percent || 0),
				...deliveryPayload(delivery)
			});
			toast.success("Alterações guardadas");
			refetch();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setSaving(false);
		}
	}
	async function submitForApproval() {
		try {
			await updateProductInFirestore(id, {
				status: "publicado",
				rejection_reason: null
			});
			toast.success("Produto publicado com sucesso!");
			refetch();
		} catch (err) {
			toast.error(err.message);
		}
	}
	async function remove() {
		try {
			await deleteProductFromFirestore(id);
			toast.success("Produto eliminado");
			router.navigate({ to: "/produtor/produtos" });
		} catch (err) {
			toast.error(err.message);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/produtor/produtos",
				className: "inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4 mr-1" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 138,
					columnNumber: 9
				}, this), " Voltar"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 137,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs uppercase tracking-widest text-gold font-semibold",
						children: "Editar produto"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 142,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-3xl md:text-4xl font-bold mt-2",
						children: form.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-3 flex items-center gap-2 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `text-xs px-3 py-1 rounded-full font-semibold ${product?.status === "publicado" ? "bg-success/15 text-success" : product?.status === "em_analise" ? "bg-gold/15 text-gold" : product?.status === "pausado" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`,
							children: STATUS_LABEL[product?.status ?? "rascunho"]
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 147,
							columnNumber: 13
						}, this), product?.rejection_reason && /* @__PURE__ */ (void 0)("span", {
							className: "text-xs text-destructive",
							children: ["Motivo: ", product.rejection_reason]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 150,
							columnNumber: 43
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 146,
						columnNumber: 11
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 141,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-2",
					children: [product?.status !== "em_analise" && product?.status !== "publicado" && /* @__PURE__ */ (void 0)(Button, {
						type: "button",
						onClick: submitForApproval,
						variant: "outline",
						className: "border-gold/40 text-gold hover:bg-gold/10",
						children: [/* @__PURE__ */ (void 0)(Send, { className: "h-4 w-4 mr-1" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 15
						}, this), " Enviar para aprovação"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 83
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							variant: "destructive",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 158,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogTitle, { children: "Eliminar produto?" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 165,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogDescription, { children: "Esta ação não pode ser desfeita." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogCancel, { children: "Cancelar" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AlertDialogAction, {
						onClick: remove,
						className: "bg-destructive text-destructive-foreground",
						children: "Eliminar"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 157,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 140,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: save,
				className: "mt-8 grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Informação principal",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Título",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: form.title,
									onChange: (e) => set("title", e.target.value),
									required: true,
									maxLength: 160
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 181,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Slug",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: form.slug,
									onChange: (e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-")),
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Descrição curta",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: form.short_description,
									onChange: (e) => set("short_description", e.target.value),
									maxLength: 280
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 188,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Descrição completa",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
									value: form.description,
									onChange: (e) => set("description", e.target.value),
									rows: 6
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 180,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Classificação",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid sm:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Tipo",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: form.product_type,
									onValueChange: (v) => set("product_type", v),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 200,
										columnNumber: 19
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 199,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: TYPES.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: v,
										children: l
									}, v, false, {
										fileName: _jsxFileName,
										lineNumber: 203,
										columnNumber: 42
									}, this)) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 202,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Categoria",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: form.category_id,
									onValueChange: (v) => set("category_id", v),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Selecione..." }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 19
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 211,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: (cats ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: c.id,
										children: c.name
									}, c.id, false, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 42
									}, this)) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 214,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Tags",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.tags,
								onChange: (e) => set("tags", e.target.value)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 223,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 195,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Mídia",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MediaUpload, {
							kind: "image",
							label: "Capa",
							value: form.cover_url,
							onChange: (u) => set("cover_url", u ?? ""),
							productKey: id
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 228,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MediaUpload, {
							kind: "image",
							label: "Banner",
							value: form.banner_url,
							onChange: (u) => set("banner_url", u ?? ""),
							productKey: id
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 227,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Ficheiro",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MediaUpload, {
							kind: "file",
							label: "Ficheiro principal",
							value: form.file_url,
							onChange: (u) => set("file_url", u ?? ""),
							productKey: id
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 233,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "URL externa",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.external_url,
								onChange: (e) => set("external_url", e.target.value)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 232,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Tipo de entrega",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DeliveryFields, {
							value: delivery,
							onChange: setDelivery
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 240,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Preço e garantia",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid sm:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									label: "Preço",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										type: "number",
										min: 0,
										step: "0.01",
										value: form.price,
										onChange: (e) => set("price", e.target.value),
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 246,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									label: "Preço promocional",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										type: "number",
										min: 0,
										step: "0.01",
										value: form.promo_price,
										onChange: (e) => set("promo_price", e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 249,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									label: "Moeda",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
										value: form.currency,
										onValueChange: (v) => set("currency", v),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 254,
											columnNumber: 19
										}, this) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 253,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "AOA",
												children: "AOA"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 257,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "EUR",
												children: "EUR"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 258,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "USD",
												children: "USD"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 259,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "BRL",
												children: "BRL"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 260,
												columnNumber: 19
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 256,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 252,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Dias de garantia",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "number",
								min: 0,
								max: 60,
								value: form.guarantee_days,
								onChange: (e) => set("guarantee_days", Number(e.target.value))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Programa de afiliados",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-sm",
								children: "Permitir afiliados"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 273,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Outros utilizadores podem gerar links e promover este produto em troca de comissão."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 274,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
								checked: !!form.allow_affiliates,
								onCheckedChange: (v) => set("allow_affiliates", v)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 278,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 11
						}, this), form.allow_affiliates && /* @__PURE__ */ (void 0)(Field, {
							label: "Comissão do afiliado (%)",
							hint: "Descontada do valor que recebe por venda. Máximo 80%.",
							children: /* @__PURE__ */ (void 0)(Input, {
								type: "number",
								min: 1,
								max: 80,
								step: "1",
								value: form.affiliate_commission_percent,
								onChange: (e) => set("affiliate_commission_percent", Number(e.target.value))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 280,
							columnNumber: 37
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 270,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-3 justify-end pt-4 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/produtor/produtos",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								variant: "outline",
								children: "Cancelar"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 287,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 286,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							disabled: saving,
							className: "gradient-brand text-primary-foreground shadow-glow",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "h-4 w-4 mr-1" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 292,
								columnNumber: 13
							}, this), saving ? "A guardar..." : "Guardar alterações"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 291,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 285,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 179,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 136,
		columnNumber: 10
	}, this);
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "font-display font-semibold text-lg mb-4",
			children: title
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 307,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-4",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 308,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 306,
		columnNumber: 10
	}, this);
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			className: "text-sm",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 321,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-1.5",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 322,
			columnNumber: 7
		}, this),
		hint && /* @__PURE__ */ (void 0)("p", {
			className: "text-xs text-muted-foreground mt-1",
			children: hint
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 323,
			columnNumber: 16
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 320,
		columnNumber: 10
	}, this);
}
//#endregion
export { EditarProduto as component };
