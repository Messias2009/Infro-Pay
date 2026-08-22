import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as useAuth } from "./router-DcboVFjc.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as infropay_mark_default } from "./infropay-mark-CgfXU-W0.mjs";
import { H as MessageCircle, J as Lock, U as Menu, Yt as ArrowRight, b as ShieldCheck, nt as Instagram, o as User, q as LogOut } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-Ba4OM7xW.mjs";
import { a as SheetTrigger, i as SheetTitle, n as SheetContent, r as SheetHeader, t as Sheet } from "./sheet-DTTtJ7cS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-BFBAQL8A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$2 = "/app/applet/src/components/site/Header.tsx";
function Header({ variant = "default" }) {
	const { user, signOut: authSignOut } = useAuth();
	const router = useRouter();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	async function signOut() {
		await authSignOut();
		router.navigate({ to: "/" });
	}
	if (variant === "checkout") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-50 border-b border-border/60 glass w-full",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 gap-2 w-full",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/",
				className: "flex items-center gap-2 group shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative h-8 w-8 sm:h-9 sm:w-9 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 rounded-lg blur-md gradient-brand opacity-50 group-hover:opacity-100 transition" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 34,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: infropay_mark_default,
						alt: "InfroPay",
						width: 512,
						height: 512,
						className: "relative h-8 w-8 sm:h-9 sm:w-9 rounded-lg object-contain"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 35,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 33,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-base sm:text-lg font-bold tracking-tight",
						children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-gradient-gold",
							children: "Pay"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 45,
							columnNumber: 22
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 44,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs text-muted-foreground -mt-0.5",
						children: "Checkout Seguro"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 47,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 43,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 32,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-card/80 border border-border/60 rounded-full px-2.5 sm:px-3.5 py-1.5 shadow-sm shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-success shrink-0" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 52,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-semibold text-foreground hidden sm:inline",
						children: "Ambiente 100% Seguro"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 53,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs text-muted-foreground flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-3 w-3 text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 57,
							columnNumber: 15
						}, this), " SSL 256-bit"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 56,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 51,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 31,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 30,
		columnNumber: 7
	}, this);
	if (variant === "loja") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-50 border-b border-border/60 glass",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 group",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative h-9 w-9",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 rounded-lg blur-md gradient-brand opacity-50 group-hover:opacity-100 transition" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 71,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: infropay_mark_default,
							alt: "InfroPay",
							width: 512,
							height: 512,
							className: "relative h-9 w-9 rounded-lg object-contain"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 72,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 70,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-lg font-bold tracking-tight",
							children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-gold",
								children: "Pay"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 82,
								columnNumber: 22
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 81,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[10px] text-muted-foreground -mt-0.5",
							children: "Loja Oficial"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 84,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 80,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 69,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "hidden md:flex items-center gap-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/loja",
							className: "px-3 py-2 rounded-md font-semibold text-foreground bg-accent/40",
							children: "Todos os produtos"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 89,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/loja",
							search: { cat: "cursos" },
							className: "px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition",
							children: "Cursos"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 95,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/loja",
							search: { cat: "ebooks" },
							className: "px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition",
							children: "Ebooks"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 102,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/loja",
							search: { cat: "templates" },
							className: "px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition",
							children: "Templates"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 109,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/loja",
							search: { cat: "mentorias" },
							className: "px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition",
							children: "Mentorias"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 116,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 88,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/produtor",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							className: "hidden sm:inline-flex",
							children: "Painel"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 129,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 128,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 136,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 135,
							columnNumber: 21
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 134,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
						align: "end",
						className: "w-52",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
								disabled: true,
								className: "text-xs",
								children: user.email
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 140,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 143,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/produtor",
									children: "Painel do produtor"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 145,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 144,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 147,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
								onClick: signOut,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "h-4 w-4 mr-2" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 149,
									columnNumber: 23
								}, this), "Sair"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 148,
								columnNumber: 21
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 139,
						columnNumber: 19
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 133,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 127,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/auth",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "sm",
							children: "Entrar"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 158,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 157,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/auth",
						search: { mode: "signup" },
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							className: "gradient-brand text-primary-foreground shadow-glow hover:opacity-90",
							children: "Vender"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 163,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 162,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 156,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 125,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 68,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 67,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-50 border-b border-border/60 glass",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 group",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative h-9 w-9",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 rounded-lg blur-md gradient-brand opacity-50 group-hover:opacity-100 transition" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 184,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: infropay_mark_default,
							alt: "InfroPay",
							width: 512,
							height: 512,
							className: "relative h-9 w-9 rounded-lg object-contain"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 185,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 183,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-lg font-bold tracking-tight",
							children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-gold",
								children: "Pay"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 195,
								columnNumber: 20
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 194,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[10px] text-muted-foreground -mt-0.5",
							children: "plataforma para produtores"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 197,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 193,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 182,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "hidden md:flex items-center gap-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							className: "px-3 py-2 rounded-md text-foreground font-medium hover:bg-accent/40 transition",
							children: "Início"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 205,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "/#como-funciona",
							className: "px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition",
							children: "Como funciona"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 211,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "/#recursos",
							className: "px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition",
							children: "Recursos"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 217,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "/#produtores",
							className: "px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition",
							children: "Para produtores"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 223,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "/#faq",
							className: "px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition",
							children: "FAQ"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 229,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/contactos",
							className: "px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/40 transition",
							children: "Contactos"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 235,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 204,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hidden sm:flex items-center gap-2.5",
					children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/produtor",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							className: "font-semibold",
							children: "Painel do Produtor"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 248,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 247,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 255,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 254,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 253,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
						align: "end",
						className: "w-52",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
								disabled: true,
								className: "text-xs",
								children: user.email
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 259,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 262,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/produtor",
									children: "Painel de Vendas"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 264,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 263,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/produtor/produtos",
									children: "Meus Produtos"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 267,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 266,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/produtor/saques",
									children: "Financeiro & Saques"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 270,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 269,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, {}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 272,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
								onClick: signOut,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "h-4 w-4 mr-2" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 274,
									columnNumber: 21
								}, this), "Sair"]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 273,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 258,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 252,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 246,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/auth",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "sm",
							className: "font-medium",
							children: "Entrar"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 283,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 282,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/auth",
						search: { mode: "signup" },
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							className: "gradient-brand text-primary-foreground shadow-glow hover:opacity-90 font-medium px-4",
							children: "Começar agora"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 288,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 287,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 281,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 244,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 sm:hidden",
					children: [user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/produtor",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							className: "h-9 px-3 text-xs",
							children: "Painel"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 303,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 302,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/auth",
						search: { mode: "signup" },
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							className: "gradient-brand text-primary-foreground text-xs h-9 px-3",
							children: "Começar"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 309,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 308,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sheet, {
						open: mobileOpen,
						onOpenChange: setMobileOpen,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-9 w-9",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 318,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "sr-only",
									children: "Abrir menu"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 319,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 317,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 316,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetContent, {
							side: "right",
							className: "w-[280px] sm:w-[320px] p-6 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetHeader, {
								className: "text-left pb-4 border-b border-border/60",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTitle, {
									className: "flex items-center gap-2 text-base",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: infropay_mark_default,
										alt: "InfroPay",
										width: 32,
										height: 32,
										className: "h-7 w-7 rounded-md object-contain"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 329,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-gold",
										children: "Pay"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 337,
										columnNumber: 28
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 336,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 328,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 327,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
								className: "flex flex-col gap-2 mt-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/",
										onClick: () => setMobileOpen(false),
										className: "flex items-center justify-between p-2.5 rounded-lg font-medium text-foreground hover:bg-accent/50 transition",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Início" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 348,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 343,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: "/#como-funciona",
										onClick: () => setMobileOpen(false),
										className: "flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Como funciona" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 355,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 350,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: "/#recursos",
										onClick: () => setMobileOpen(false),
										className: "flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Recursos" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 362,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 357,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: "/#produtores",
										onClick: () => setMobileOpen(false),
										className: "flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Para produtores" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 369,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 364,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: "/#faq",
										onClick: () => setMobileOpen(false),
										className: "flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "FAQ" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 376,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 371,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/contactos",
										onClick: () => setMobileOpen(false),
										className: "flex items-center justify-between p-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Contactos" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 383,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 378,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "my-2 border-t border-border/40 pt-2 flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/termos",
											onClick: () => setMobileOpen(false),
											className: "px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground",
											children: "Termos de Uso"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 386,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/privacidade",
											onClick: () => setMobileOpen(false),
											className: "px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground",
											children: "Política de Privacidade"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 393,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 385,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 342,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 326,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "pt-6 border-t border-border/60 space-y-2.5",
								children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground truncate px-1",
										children: user.email
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 407,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/produtor",
										onClick: () => setMobileOpen(false),
										className: "w-full block",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											className: "w-full gradient-brand text-primary-foreground",
											children: "Acessar Painel"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 413,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 408,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										className: "w-full text-xs",
										onClick: () => {
											setMobileOpen(false);
											signOut();
										},
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "h-3.5 w-3.5 mr-1.5" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 425,
											columnNumber: 23
										}, this), "Sair da conta"]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 417,
										columnNumber: 21
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 406,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/auth",
									onClick: () => setMobileOpen(false),
									className: "w-full block",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "outline",
										className: "w-full",
										children: "Entrar na conta"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 432,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 431,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/auth",
									search: { mode: "signup" },
									onClick: () => setMobileOpen(false),
									className: "w-full block",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										className: "w-full gradient-brand text-primary-foreground shadow-glow",
										children: ["Começar agora ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-4 w-4 ml-1.5" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 443,
											columnNumber: 39
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 442,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 436,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 430,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 404,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 322,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 315,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 300,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 181,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 180,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/site/Footer.tsx";
function Footer({ variant = "default" }) {
	if (variant === "home" || variant === "loja") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "mt-16 border-t border-border/60 py-8 bg-card/20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs sm:text-sm text-muted-foreground font-medium",
				children: "InfroPay © 2026 Todos os direitos reservados"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 11,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-4 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: "https://wa.me/244932415854",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center gap-1.5 hover:text-[#25D366] transition font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 21,
						columnNumber: 15
					}, this), " WhatsApp"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 15,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: "https://instagram.com/infropay.ao",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center gap-1.5 hover:text-gold transition font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Instagram, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 29,
						columnNumber: 15
					}, this), " @infropay.ao"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 23,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 14,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 10,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 9,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "mt-16 border-t border-border/60 py-8 bg-card/20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs text-muted-foreground font-medium",
				children: "InfroPay © 2026 Todos os direitos reservados"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 40,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-center sm:justify-end gap-4 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "https://wa.me/244932415854",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-1 hover:text-[#25D366] transition font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 50,
							columnNumber: 13
						}, this), " WhatsApp"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 44,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "https://instagram.com/infropay.ao",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-1 hover:text-gold transition font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Instagram, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 58,
							columnNumber: 13
						}, this), " Instagram"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 52,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-border",
						children: "|"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 60,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/termos",
						className: "hover:text-foreground transition",
						children: "Termos de Uso"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 61,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/privacidade",
						className: "hover:text-foreground transition",
						children: "Privacidade"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 64,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/contactos",
						className: "hover:text-foreground transition",
						children: "Contactos"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 67,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 43,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 39,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 38,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/site/SiteLayout.tsx";
function SiteLayout({ children, variant = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen flex flex-col w-full max-w-full overflow-x-clip",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Header, { variant }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 16,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 w-full max-w-full",
				children
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 17,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, { variant }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 18,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 5
	}, this);
}
//#endregion
export { SiteLayout as t };
