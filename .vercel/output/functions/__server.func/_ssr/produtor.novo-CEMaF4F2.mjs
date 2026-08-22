import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { n as listCategories } from "./catalog.functions-DC0doerl.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { O as Save, Xt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as Textarea } from "./textarea-XzxVYTAX.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-1I-ZqIzI.mjs";
import { c as saveProductToFirestore } from "./products.service-DAm7Wd7_.mjs";
import { t as MediaUpload } from "./MediaUpload-B1fhNNi7.mjs";
import { i as emptyDelivery, r as deliveryPayload, t as DeliveryFields } from "./DeliveryFields-BafJ2tMc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.novo-CEMaF4F2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.novo.tsx?tsr-split=component";
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
function slugify(s) {
	return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
function NovoProduto() {
	const router = useRouter();
	const catsFn = useServerFn(listCategories);
	const { data: cats } = useQuery({
		queryKey: ["categories"],
		queryFn: () => catsFn()
	});
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		slug: "",
		short_description: "",
		description: "",
		product_type: "ebook",
		category_id: "",
		cover_url: "",
		banner_url: "",
		file_url: "",
		external_url: "",
		price: "",
		promo_price: "",
		currency: "AOA",
		submit_for_review: true,
		tags: "",
		guarantee_days: 7
	});
	const [delivery, setDelivery] = (0, import_react.useState)(emptyDelivery);
	const [loading, setLoading] = (0, import_react.useState)(false);
	function set(k, v) {
		setForm((f) => ({
			...f,
			[k]: v
		}));
	}
	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		try {
			const payload = {
				title: form.title.trim(),
				slug: form.slug || slugify(form.title),
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
				status: form.submit_for_review ? "publicado" : "rascunho",
				tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
				guarantee_days: Number(form.guarantee_days),
				...deliveryPayload(delivery)
			};
			const saved = await saveProductToFirestore(payload);
			toast.success(saved.status === "publicado" ? "Produto publicado com sucesso!" : "Produto guardado como rascunho!");
			router.navigate({
				to: "/produtor/sucesso/$id",
				params: { id: saved.id }
			});
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading(false);
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
					lineNumber: 94,
					columnNumber: 9
				}, this), " Voltar"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 93,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-xs uppercase tracking-widest text-gold font-semibold",
				children: "Novo produto"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-3xl md:text-4xl font-bold mt-2",
				children: "Criar produto"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 97,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground mt-2",
				children: "Preencha os detalhes. Ao publicar, o conteúdo é validado automaticamente e o produto fica disponível de imediato."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: submit,
				className: "mt-8 grid gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Informação principal",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Título",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: form.title,
									onChange: (e) => {
										set("title", e.target.value);
										if (!form.slug) set("slug", slugify(e.target.value));
									},
									placeholder: "Curso completo de…",
									required: true,
									maxLength: 160
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 106,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 105,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Slug (URL)",
								hint: "apenas letras minúsculas, números e hífens",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: form.slug,
									onChange: (e) => set("slug", slugify(e.target.value)),
									placeholder: "curso-completo",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Descrição curta",
								hint: "máx. 280 caracteres",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: form.short_description,
									onChange: (e) => set("short_description", e.target.value),
									maxLength: 280
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 115,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 114,
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
									lineNumber: 118,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 117,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 104,
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
										lineNumber: 127,
										columnNumber: 19
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 126,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: TYPES.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: v,
										children: l
									}, v, false, {
										fileName: _jsxFileName,
										lineNumber: 130,
										columnNumber: 42
									}, this)) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 129,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
								label: "Categoria",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
									value: form.category_id,
									onValueChange: (v) => set("category_id", v),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Selecione..." }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 139,
										columnNumber: 19
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 138,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: (cats ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: c.id,
										children: c.name
									}, c.id, false, {
										fileName: _jsxFileName,
										lineNumber: 142,
										columnNumber: 42
									}, this)) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 137,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "Tags",
							hint: "separadas por vírgula",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.tags,
								onChange: (e) => set("tags", e.target.value),
								placeholder: "marketing, vendas, ia"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Mídia",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MediaUpload, {
								kind: "image",
								label: "Capa do produto (1:1 ou 4:3)",
								value: form.cover_url,
								onChange: (u) => set("cover_url", u ?? ""),
								productKey: form.slug || "novo"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MediaUpload, {
								kind: "image",
								label: "Banner promocional (opcional, 16:9)",
								value: form.banner_url,
								onChange: (u) => set("banner_url", u ?? ""),
								productKey: form.slug || "novo"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Ficheiro / conteúdo",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MediaUpload, {
							kind: "file",
							label: "Ficheiro principal (opcional)",
							hint: "PDF, ZIP, MP4… O link será entregue ao comprador.",
							value: form.file_url,
							onChange: (u) => set("file_url", u ?? ""),
							productKey: form.slug || "novo"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
							label: "URL externa (opcional)",
							hint: "Use para produtos hospedados noutro sítio (ex: link de aulas).",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form.external_url,
								onChange: (e) => set("external_url", e.target.value),
								placeholder: "https://…"
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
						lineNumber: 161,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Tipo de entrega",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DeliveryFields, {
							value: delivery,
							onChange: setDelivery
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 169,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Preço e garantia",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid sm:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									label: "Preço",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										type: "number",
										min: 0,
										step: "0.01",
										value: form.price,
										onChange: (e) => set("price", e.target.value),
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 175,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 174,
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
										lineNumber: 178,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 177,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
									label: "Moeda",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
										value: form.currency,
										onValueChange: (v) => set("currency", v),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 183,
											columnNumber: 19
										}, this) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 182,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "AOA",
												children: "AOA — Kwanza"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 186,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "EUR",
												children: "EUR — Euro"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 187,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "USD",
												children: "USD — Dólar"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 188,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "BRL",
												children: "BRL — Real"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 189,
												columnNumber: 19
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 185,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 181,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 173,
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
								lineNumber: 195,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 194,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 172,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
						title: "Publicação",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "flex items-start gap-3 cursor-pointer rounded-xl border border-border p-4 hover:border-primary/60 transition",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "checkbox",
								checked: form.submit_for_review,
								onChange: (e) => set("submit_for_review", e.target.checked),
								className: "mt-1 h-4 w-4 accent-primary"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-medium",
								children: "Publicar agora"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-muted-foreground",
								children: "A validação de conteúdo é automática e instantânea: se estiver conforme as políticas, o produto fica publicado e pronto para vender. Caso contrário, será guardado como rascunho."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 200,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 199,
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
								lineNumber: 215,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							disabled: loading,
							className: "gradient-brand text-primary-foreground shadow-glow",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "h-4 w-4 mr-1" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 220,
								columnNumber: 13
							}, this), loading ? "A publicar..." : form.submit_for_review ? "Publicar agora" : "Guardar rascunho"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 213,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 92,
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
			lineNumber: 235,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-4",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 236,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 234,
		columnNumber: 10
	}, this);
}
function Field({ label, hint, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			className: "text-sm",
			children: [label, required && /* @__PURE__ */ (void 0)("span", {
				className: "text-destructive ml-1",
				children: "*"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 253,
				columnNumber: 22
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 251,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-1.5",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 255,
			columnNumber: 7
		}, this),
		hint && /* @__PURE__ */ (void 0)("p", {
			className: "text-xs text-muted-foreground mt-1",
			children: hint
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 256,
			columnNumber: 16
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 250,
		columnNumber: 10
	}, this);
}
//#endregion
export { NovoProduto as component };
