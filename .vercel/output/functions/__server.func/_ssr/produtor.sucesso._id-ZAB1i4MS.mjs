import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { r as Route$2 } from "./router-DcboVFjc.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { At as CircleCheck, Ct as Copy, N as QrCode, R as Pencil, Rt as ChartColumn, S as Share2, St as CreditCard, Yt as ArrowRight, Z as Link2, _ as ShoppingCart, a as Users, i as Wallet, mt as Eye, z as PartyPopper } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as getMyProduct } from "./products.functions-CKBjbvSb.mjs";
import { i as shareLink, n as copy, r as productLinks, t as QrDialog } from "./QrDialog-Dnj6R0gZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.sucesso._id-ZAB1i4MS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.sucesso.$id.tsx?tsr-split=component";
function kz(cents, currency) {
	try {
		return new Intl.NumberFormat("pt-PT", {
			style: "currency",
			currency,
			maximumFractionDigits: 0
		}).format(cents / 100);
	} catch {
		return `${currency} ${(cents / 100).toFixed(2)}`;
	}
}
function Sucesso() {
	const { id } = Route$2.useParams();
	const router = useRouter();
	const fn = useServerFn(getMyProduct);
	const { data: p, isPending } = useQuery({
		queryKey: [
			"producer",
			"product",
			id
		],
		queryFn: () => fn({ data: { id } })
	});
	const [qr, setQr] = (0, import_react.useState)(null);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-64 max-w-3xl animate-pulse rounded-3xl bg-muted" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 46,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 45,
		columnNumber: 12
	}, this);
	if (!p) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-muted-foreground",
			children: "Produto não encontrado."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 51,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/produtor/produtos",
			className: "mt-4 inline-block",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { children: "Voltar aos produtos" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 52,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 12
	}, this);
	const links = productLinks(p.slug);
	const published = p.status === "publicado";
	async function doCopy(url, label) {
		if (await copy(url)) toast.success(`${label} copiado`);
		else toast.error("Não foi possível copiar");
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-4 sm:p-6 md:p-10 max-w-5xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative overflow-hidden rounded-3xl border border-success/30 bg-card p-6 md:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full gradient-brand opacity-20 blur-3xl animate-glow-pulse" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 65,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full gradient-gold opacity-15 blur-3xl animate-floaty" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 69,
										columnNumber: 13
									}, this),
									" ",
									published ? "Publicado e aprovado automaticamente" : "Guardado como rascunho"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "font-display mt-4 flex items-center gap-3 text-2xl font-bold sm:text-3xl md:text-4xl",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PartyPopper, { className: "h-7 w-7 shrink-0 text-gold" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 73,
									columnNumber: 13
								}, this), published ? "Produto publicado com sucesso!" : "Produto criado com sucesso!"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 72,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-muted-foreground",
								children: published ? "Já pode vender agora mesmo: partilhe o link, abra o checkout ou gere um QR Code." : "Publique quando estiver pronto — a validação é automática e instantânea."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 76,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 grid gap-5 rounded-2xl border border-border bg-card p-5 sm:grid-cols-[160px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-gold/10 sm:w-40",
					children: p.cover_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: p.cover_url,
						alt: p.title,
						className: "h-full w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 26
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid h-full place-items-center text-xs text-muted-foreground",
						children: "Sem capa"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 107
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-display truncate text-xl font-semibold",
							children: p.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 11
						}, this),
						p.short_description && /* @__PURE__ */ (void 0)("p", {
							className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
							children: p.short_description
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 35
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {
									label: "Preço",
									value: kz(p.promo_price_cents ?? p.price_cents, p.currency)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {
									label: "Estado",
									value: published ? "Publicado" : "Rascunho"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {
									label: "Publicação",
									value: new Date(p.updated_at ?? p.created_at).toLocaleDateString("pt-PT")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 95,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 83,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 rounded-2xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-display text-lg font-semibold",
					children: "Links gerados automaticamente"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 102,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LinkRow, {
							label: "Página do produto",
							url: links.product,
							onCopy: () => doCopy(links.product, "Link do produto")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 104,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LinkRow, {
							label: "Checkout",
							url: links.checkout,
							onCopy: () => doCopy(links.checkout, "Link do checkout")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LinkRow, {
							label: "Link curto",
							url: links.short,
							onCopy: () => doCopy(links.short, "Link curto")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 101,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-display mb-3 text-lg font-semibold",
					children: "Ações rápidas"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionLink, {
							href: links.product,
							icon: Eye,
							label: "Visualizar produto"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ActionLink, {
							href: links.checkout,
							icon: ShoppingCart,
							label: "Visualizar checkout"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
							icon: Link2,
							label: "Copiar link do produto",
							onClick: () => doCopy(links.product, "Link do produto")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
							icon: CreditCard,
							label: "Copiar link do checkout",
							onClick: () => doCopy(links.checkout, "Link do checkout")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
							icon: Share2,
							label: "Partilhar produto",
							onClick: async () => {
								const r = await shareLink(p.title, links.share);
								if (r === "copied") toast.success("Link copiado para partilhar");
								if (r === "failed") toast.error("Partilha não disponível");
							}
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
							icon: QrCode,
							label: "QR Code do produto",
							onClick: () => setQr({
								url: links.product,
								title: "QR Code do produto"
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
							icon: QrCode,
							label: "QR Code do checkout",
							onClick: () => setQr({
								url: links.checkout,
								title: "QR Code do checkout"
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
							icon: Pencil,
							label: "Editar produto",
							onClick: () => router.navigate({
								to: "/produtor/editar/$id",
								params: { id }
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
							icon: ChartColumn,
							label: "Ver estatísticas",
							onClick: () => router.navigate({ to: "/produtor" })
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Action, {
							icon: Wallet,
							label: "Ver vendas",
							onClick: () => router.navigate({ to: "/produtor/financeiro" })
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 11
						}, this),
						p.allow_affiliates && /* @__PURE__ */ (void 0)(Action, {
							icon: Users,
							label: "Gerir afiliados",
							onClick: () => router.navigate({ to: "/afiliados" })
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 34
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 113,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 flex flex-wrap justify-end gap-3 border-t border-border pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor/produtos",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						children: "Os meus produtos"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 150,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/produtor/novo",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "gradient-brand text-primary-foreground shadow-glow",
						children: ["Criar outro produto ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-1 h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 33
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrDialog, {
				open: !!qr,
				onOpenChange: (v) => !v && setQr(null),
				url: qr?.url ?? "",
				title: qr?.title ?? ""
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 160,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 62,
		columnNumber: 10
	}, this);
}
function Meta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-xl border border-border bg-background/50 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 171,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-0.5 truncate text-sm font-semibold",
			children: value
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 172,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 170,
		columnNumber: 10
	}, this);
}
function LinkRow({ label, url, onCopy }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-background/50 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-[10px] uppercase tracking-widest text-muted-foreground",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 186,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "truncate text-sm",
				children: url
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 187,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 185,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			size: "sm",
			variant: "outline",
			className: "shrink-0",
			onClick: onCopy,
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "h-3.5 w-3.5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 190,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 189,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 184,
		columnNumber: 10
	}, this);
}
function Action({ icon: I, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick,
		className: "flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-4 text-left transition hover:border-primary/60 hover:shadow-glow",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(I, { className: "h-5 w-5 text-gold" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 205,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-sm font-medium leading-tight",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 206,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 204,
		columnNumber: 10
	}, this);
}
function ActionLink({ href, icon: I, label }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: "flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-4 transition hover:border-primary/60 hover:shadow-glow",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(I, { className: "h-5 w-5 text-gold" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 219,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-sm font-medium leading-tight",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 220,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 218,
		columnNumber: 10
	}, this);
}
//#endregion
export { Sucesso as component };
