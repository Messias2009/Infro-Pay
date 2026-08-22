import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as useAuth } from "./router-DcboVFjc.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { B as Package, Ct as Copy, F as Plus, N as QrCode, R as Pencil, Rt as ChartColumn, S as Share2, St as CreditCard, Y as LoaderCircle, Z as Link2, _ as ShoppingCart, _t as Ellipsis, a as Users, ct as GraduationCap, d as Trash2, i as Wallet, mt as Eye, w as Send } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { a as getProducerProducts, l as updateProductInFirestore, n as duplicateProductInFirestore, t as deleteProductFromFirestore } from "./products.service-DAm7Wd7_.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-Ba4OM7xW.mjs";
import { i as shareLink, n as copy, r as productLinks, t as QrDialog } from "./QrDialog-Dnj6R0gZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.produtos-BWlvmTp8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/products/ProductActions.tsx";
function ProductActions({ product, onDuplicate, onDelete, align = "end" }) {
	const [qr, setQr] = (0, import_react.useState)(null);
	const links = productLinks(product.slug);
	async function doCopy(url, label) {
		if (await copy(url)) toast.success(`${label} copiado`);
		else toast.error("Não foi possível copiar");
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			size: "sm",
			variant: "outline",
			"aria-label": "Ações do produto",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ellipsis, { className: "h-4 w-4" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 64,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 63,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 62,
		columnNumber: 9
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
		align,
		className: "w-60",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuLabel, {
				className: "truncate",
				children: product.title
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 68,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 69,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: links.product,
					target: "_blank",
					rel: "noreferrer",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "mr-2 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 72,
						columnNumber: 15
					}, this), "Visualizar produto"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 71,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 70,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: links.checkout,
					target: "_blank",
					rel: "noreferrer",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingCart, { className: "mr-2 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 78,
						columnNumber: 15
					}, this), "Abrir checkout"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 77,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 76,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 82,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				onClick: () => doCopy(links.product, "Link do produto"),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link2, { className: "mr-2 h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 84,
					columnNumber: 13
				}, this), "Copiar link do produto"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 83,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				onClick: () => doCopy(links.checkout, "Link do checkout"),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CreditCard, { className: "mr-2 h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 88,
					columnNumber: 13
				}, this), "Copiar link do checkout"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 87,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				onClick: async () => {
					const r = await shareLink(product.title, links.share);
					if (r === "copied") toast.success("Link copiado para partilhar");
					if (r === "failed") toast.error("Partilha não disponível");
				},
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, { className: "mr-2 h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 98,
					columnNumber: 13
				}, this), "Partilhar"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 91,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				onClick: () => setQr({
					url: links.product,
					title: "QR Code do produto"
				}),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, { className: "mr-2 h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 104,
					columnNumber: 13
				}, this), "QR Code do produto"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 101,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				onClick: () => setQr({
					url: links.checkout,
					title: "QR Code do checkout"
				}),
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, { className: "mr-2 h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 110,
					columnNumber: 13
				}, this), "QR Code do checkout"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 107,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 113,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor/editar/$id",
					params: { id: product.id },
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { className: "mr-2 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 116,
						columnNumber: 15
					}, this), "Editar produto"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 115,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 114,
				columnNumber: 11
			}, this),
			product.has_members_area && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (void 0)(Link, {
					to: "/produtor/curso/$id",
					params: { id: product.id },
					children: [/* @__PURE__ */ (void 0)(GraduationCap, { className: "mr-2 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 123,
						columnNumber: 17
					}, this), "Gerir aulas"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 122,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 121,
				columnNumber: 13
			}, this),
			onDuplicate && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
				onClick: () => onDuplicate(product.id),
				children: [/* @__PURE__ */ (void 0)(Copy, { className: "mr-2 h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 130,
					columnNumber: 15
				}, this), "Duplicar produto"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 129,
				columnNumber: 13
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor/financeiro",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wallet, { className: "mr-2 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 136,
						columnNumber: 15
					}, this), "Ver vendas"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 135,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 134,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "mr-2 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 142,
						columnNumber: 15
					}, this), "Ver estatísticas"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 141,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 140,
				columnNumber: 11
			}, this),
			product.allow_affiliates && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (void 0)(Link, {
					to: "/afiliados",
					children: [/* @__PURE__ */ (void 0)(Users, { className: "mr-2 h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 149,
						columnNumber: 17
					}, this), "Gerir afiliados"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 148,
					columnNumber: 15
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 147,
				columnNumber: 13
			}, this),
			onDelete && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(DropdownMenuSeparator, {}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 156,
				columnNumber: 15
			}, this), /* @__PURE__ */ (void 0)(DropdownMenuItem, {
				className: "text-destructive focus:text-destructive",
				onClick: () => onDelete(product.id),
				children: [/* @__PURE__ */ (void 0)(Trash2, { className: "mr-2 h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 161,
					columnNumber: 17
				}, this), "Excluir"]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 157,
				columnNumber: 15
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 155,
				columnNumber: 13
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 67,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 61,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrDialog, {
		open: !!qr,
		onOpenChange: (v) => !v && setQr(null),
		url: qr?.url ?? "",
		title: qr?.title ?? ""
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 169,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 60,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.produtos.tsx?tsr-split=component";
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
var BADGE = {
	publicado: "bg-success/15 text-success",
	em_analise: "bg-gold/15 text-gold",
	rascunho: "bg-muted text-muted-foreground",
	pausado: "bg-warning/15 text-warning"
};
var LABEL = {
	publicado: "Publicado",
	em_analise: "Em análise",
	rascunho: "Rascunho",
	pausado: "Pausado"
};
function MeusProdutos() {
	const router = useRouter();
	const { user } = useAuth();
	const { data: products, isLoading, refetch } = useQuery({
		queryKey: [
			"producer",
			"products",
			user?.uid
		],
		queryFn: () => getProducerProducts(user?.uid),
		refetchOnWindowFocus: true
	});
	const [qr, setQr] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function submitOne(id) {
		setBusy(id);
		try {
			await updateProductInFirestore(id, {
				status: "publicado",
				rejection_reason: null
			});
			toast.success("Produto publicado com sucesso!");
			await refetch();
			router.navigate({
				to: "/produtor/sucesso/$id",
				params: { id }
			});
		} catch (e) {
			toast.error(e.message);
		} finally {
			setBusy(null);
		}
	}
	async function dup(id) {
		try {
			await duplicateProductInFirestore(id);
			toast.success("Produto duplicado como rascunho");
			refetch();
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function del(id) {
		if (!confirm("Excluir este produto definitivamente?")) return;
		try {
			await deleteProductFromFirestore(id);
			toast.success("Produto excluído");
			refetch();
		} catch (e) {
			toast.error(e.message);
		}
	}
	async function doCopy(url, label) {
		if (await copy(url)) toast.success(`${label} copiado`);
		else toast.error("Não foi possível copiar");
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-4 sm:p-6 md:p-10 max-w-6xl mx-auto min-w-0 max-w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 mb-6 sm:mb-8 sm:flex sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs uppercase tracking-widest text-gold font-semibold",
						children: "Catálogo"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2 truncate",
						children: "Os meus produtos"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 100,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor/novo",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						className: "gradient-brand text-primary-foreground shadow-glow sm:h-10 sm:px-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4 mr-1" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 13
						}, this), "Novo produto"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 104,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 97,
				columnNumber: 7
			}, this),
			isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center justify-center p-16 text-muted-foreground gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 113,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "A carregar produtos..." }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 20
			}, this) : !products || products.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Package, { className: "h-12 w-12 text-gold mx-auto mb-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display text-xl font-semibold",
						children: "Sem produtos ainda"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground mt-2 max-w-sm mx-auto",
						children: "Ainda não tem produtos cadastrados no seu painel. Crie o seu primeiro produto digital agora."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/produtor/novo",
						className: "inline-block mt-5",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							className: "gradient-brand text-primary-foreground",
							children: "Criar primeiro produto"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 55
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0",
				children: products.map((p) => {
					const links = productLinks(p.slug);
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60 hover:shadow-glow transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/produtor/editar/$id",
								params: { id: p.id },
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "aspect-video bg-gradient-to-br from-primary/20 to-gold/10 relative",
									children: [p.cover_url && /* @__PURE__ */ (void 0)("img", {
										src: p.cover_url,
										alt: "",
										loading: "lazy",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 37
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute top-2 left-2",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${BADGE[p.status] ?? BADGE.rascunho}`,
											children: LABEL[p.status] ?? p.status
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 137,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
											className: "font-semibold line-clamp-2",
											children: p.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 143,
											columnNumber: 21
										}, this),
										p.rejection_reason && /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-destructive mt-1",
											children: ["Bloqueado: ", p.rejection_reason]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 144,
											columnNumber: 44
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between mt-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-bold text-gradient-gold",
												children: fmt(p.promo_price_cents ?? p.price_cents, p.currency)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 148,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-xs text-muted-foreground",
												children: [
													p.sales_count,
													" vendas · ",
													p.views_count,
													" views"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 151,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 147,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "px-4 flex flex-wrap gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
										label: "Visualizar produto",
										href: links.product,
										icon: Eye
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 160,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
										label: "Abrir checkout",
										href: links.checkout,
										icon: ShoppingCart
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 161,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
										label: "Copiar link do produto",
										icon: Link2,
										onClick: () => doCopy(links.product, "Link do produto")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 162,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
										label: "Copiar link do checkout",
										icon: Copy,
										onClick: () => doCopy(links.checkout, "Link do checkout")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 163,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
										label: "Partilhar",
										icon: Share2,
										onClick: async () => {
											const r = await shareLink(p.title, links.share);
											if (r === "copied") toast.success("Link copiado para partilhar");
											if (r === "failed") toast.error("Partilha não disponível");
										}
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 164,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
										label: "QR Code",
										icon: QrCode,
										onClick: () => setQr({
											url: links.product,
											title: "QR Code do produto"
										})
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 169,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconBtn, {
										label: "Excluir",
										icon: Trash2,
										destructive: true,
										onClick: () => del(p.id)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 159,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-4 flex gap-2 flex-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/produtor/editar/$id",
										params: { id: p.id },
										className: "flex-1 min-w-24",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "sm",
											variant: "outline",
											className: "w-full",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Pencil, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 181,
												columnNumber: 23
											}, this), "Editar"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 180,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 177,
										columnNumber: 19
									}, this),
									(p.status === "rascunho" || p.status === "pausado") && /* @__PURE__ */ (void 0)(Button, {
										size: "sm",
										disabled: busy === p.id,
										onClick: () => submitOne(p.id),
										className: "gradient-brand text-primary-foreground",
										children: [/* @__PURE__ */ (void 0)(Send, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 186,
											columnNumber: 23
										}, this), busy === p.id ? "A publicar..." : "Publicar"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 185,
										columnNumber: 75
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductActions, {
										product: p,
										onDuplicate: dup,
										onDelete: del
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 189,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 17
							}, this)
						]
					}, p.id, true, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 16
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 127,
				columnNumber: 18
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrDialog, {
				open: !!qr,
				onOpenChange: (v) => !v && setQr(null),
				url: qr?.url ?? "",
				title: qr?.title ?? ""
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 195,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 96,
		columnNumber: 10
	}, this);
}
function IconBtn({ label, icon: I, onClick, href, destructive }) {
	const cls = `grid h-8 w-8 place-items-center rounded-lg border border-border transition hover:border-primary/60 ${destructive ? "text-destructive hover:border-destructive/60" : "text-muted-foreground hover:text-foreground"}`;
	if (href) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		title: label,
		"aria-label": label,
		className: cls,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(I, { className: "h-3.5 w-3.5" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 214,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 213,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		title: label,
		"aria-label": label,
		onClick,
		className: cls,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(I, { className: "h-3.5 w-3.5" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 218,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 217,
		columnNumber: 10
	}, this);
}
//#endregion
export { MeusProdutos as component };
