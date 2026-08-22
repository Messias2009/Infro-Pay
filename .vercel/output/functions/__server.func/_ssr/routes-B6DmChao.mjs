import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { $ as Layers, At as CircleCheck, Ht as BookOpen, J as Lock, Jt as ArrowUpRight, Ot as CircleQuestionMark, Rt as ChartColumn, St as CreditCard, Vt as Briefcase, X as Link$1, Yt as ArrowRight, a as Users, b as ShieldCheck, c as Trophy, ct as GraduationCap, dt as Flame, f as Target, g as Smartphone, i as Wallet, k as Rocket, m as Star, pt as FileCode, r as Wrench, t as Zap, u as TrendingUp, v as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as SiteLayout } from "./SiteLayout-BFBAQL8A.mjs";
import { t as banner_produtores_default } from "./banner-produtores-DdzT2dXY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B6DmChao.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$2 = "/app/applet/src/components/site/TrustMarquee.tsx";
var ITEMS = [
	{
		icon: ShieldCheck,
		title: "Compra protegida",
		desc: "Garantia em todas as ordens"
	},
	{
		icon: Zap,
		title: "Entrega instantânea",
		desc: "Acesso liberado após pagamento"
	},
	{
		icon: TrendingUp,
		title: "Alta conversão",
		desc: "Checkout otimizado"
	},
	{
		icon: Star,
		title: "Curadoria premium",
		desc: "Produtos verificados"
	},
	{
		icon: Wallet,
		title: "Saque em Kwanza",
		desc: "A partir de 5.000 Kz"
	},
	{
		icon: Smartphone,
		title: "Multicaixa Express",
		desc: "Pagamento nacional"
	},
	{
		icon: Trophy,
		title: "Placas oficiais",
		desc: "10 níveis de conquista"
	},
	{
		icon: Rocket,
		title: "Comissão de 2%",
		desc: "A menor do mercado"
	}
];
function TrustMarquee() {
	const row = [...ITEMS, ...ITEMS];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "border-y border-border/60 bg-card/40 overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "marquee-mask py-8",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex w-max animate-marquee gap-10 hover:[animation-play-state:paused] motion-reduce:animate-none",
				children: row.map((item, i) => {
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start gap-3 w-[260px] shrink-0",
						"aria-hidden": i >= ITEMS.length,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 grid place-items-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5 text-primary-glow" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 38,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 37,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-semibold text-sm",
								children: item.title
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 41,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-muted-foreground",
								children: item.desc
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 42,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 40,
							columnNumber: 17
						}, this)]
					}, i, true, {
						fileName: _jsxFileName$2,
						lineNumber: 32,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 28,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 27,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 26,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/CountUp.tsx";
/** Number that animates from 0 to `to` when it becomes visible. */
function CountUp({ to, duration = 1600, prefix = "", suffix = "", decimals = 0, className }) {
	const [val, setVal] = (0, import_react.useState)(0);
	const ref = (0, import_react.useRef)(null);
	const started = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver((entries) => {
			for (const e of entries) if (e.isIntersecting && !started.current) {
				started.current = true;
				const t0 = performance.now();
				const step = (t) => {
					const p = Math.min(1, (t - t0) / duration);
					const eased = 1 - Math.pow(1 - p, 3);
					setVal(to * eased);
					if (p < 1) requestAnimationFrame(step);
					else setVal(to);
				};
				requestAnimationFrame(step);
			}
		}, { threshold: .35 });
		io.observe(el);
		return () => io.disconnect();
	}, [to, duration]);
	const formatted = val.toLocaleString("pt-PT", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	}).replace(/\s+/g, "\xA0");
	const cleanSuffix = suffix.replace(/ /g, "\xA0");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		ref,
		className: `whitespace-nowrap inline-block ${className ?? ""}`,
		children: [
			prefix,
			formatted,
			cleanSuffix
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 60,
		columnNumber: 5
	}, this);
}
var hero_premium_default = "/assets/hero-premium-Coek-CL7.jpg";
var dashboard_preview_default = "/assets/dashboard-preview-CVf80lc_.jpg";
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, {
		variant: "home",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "relative overflow-hidden w-full max-w-full min-w-0 box-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: hero_premium_default,
						alt: "",
						width: 1920,
						height: 1080,
						className: "absolute inset-0 h-full w-full object-cover opacity-35"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 14,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 15,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_60%)] opacity-20" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-32 min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "max-w-3xl min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-foreground/90 border border-gold/30 shadow-sm max-w-full",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-gold shrink-0 animate-pulse" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 22,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "truncate",
										children: "Infraestrutura de vendas para criadores"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 23,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 21,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
									className: "mt-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08] text-foreground break-words min-w-0",
									children: [
										"Venda seus produtos digitais com a",
										" ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-gradient-gold",
											children: "InfroPay"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 29,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 27,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-4 sm:mt-5 text-sm sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl break-words min-w-0",
									children: "Crie seu produto, gere seu link de venda e envie diretamente para os seus clientes. Receba pagamentos com Multicaixa Express, acompanhe pedidos em tempo real e saque seus ganhos com rapidez."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 33,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										className: "w-full sm:w-auto",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "lg",
											className: "w-full sm:w-auto gradient-brand text-primary-foreground shadow-glow hover:opacity-95 h-12 px-7 font-bold text-sm sm:text-base",
											children: ["Começar agora ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-2 h-4 w-4 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 45,
												columnNumber: 33
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 44,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 41,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/auth",
										className: "w-full sm:w-auto",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "lg",
											variant: "outline",
											className: "w-full sm:w-auto h-12 px-7 font-semibold border-border/80 hover:bg-accent/60 text-sm sm:text-base",
											children: "Entrar na conta"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 49,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 48,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 40,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-8 sm:mt-12 grid grid-cols-3 gap-2.5 sm:gap-6 max-w-lg border-t border-border/60 pt-5 sm:pt-6 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-display text-xl sm:text-3xl font-bold text-gradient-gold truncate",
												children: "2%"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 58,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate",
												children: "Taxa por venda"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 61,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 57,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-display text-xl sm:text-3xl font-bold text-foreground truncate",
												children: "100%"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 66,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate",
												children: "Controle total"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 69,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 65,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "font-display text-xl sm:text-3xl font-bold text-gold truncate",
												children: "1h"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 74,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate",
												children: "Liberação rápida"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 77,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 73,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 56,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 19,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 13,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "como-funciona",
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 scroll-mt-20 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center max-w-2xl mx-auto mb-10 sm:mb-14 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-bold uppercase tracking-widest text-gold",
							children: "Como funciona"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words",
							children: "Venda em poucos passos"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-xs sm:text-base text-muted-foreground break-words",
							children: "Tudo o que você precisa para começar a faturar com produtos digitais em Angola sem complicação técnica."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-w-0",
					children: [
						{
							step: "01",
							title: "Crie sua conta",
							desc: "Cadastre-se gratuitamente e configure o seu perfil em menos de 1 minuto.",
							icon: Users
						},
						{
							step: "02",
							title: "Cadastre seu produto",
							desc: "Adicione nome, imagem, descrição, preço e ficheiros ou aulas do seu infoproduto.",
							icon: ShoppingBag
						},
						{
							step: "03",
							title: "Gere seu link",
							desc: "A plataforma cria automaticamente o link exclusivo da página de venda/checkout.",
							icon: Link$1
						},
						{
							step: "04",
							title: "Compartilhe",
							desc: "Copie o link e envie para seus clientes através do WhatsApp, redes sociais ou anúncios.",
							icon: ArrowUpRight
						}
					].map((s) => {
						const Icon = s.icon;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative rounded-2xl border border-border/80 bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-gold/50 transition-all duration-300 group min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute top-4 right-4 text-3xl sm:text-4xl font-display font-black text-foreground/5 select-none group-hover:text-gold/10 transition",
								children: s.step
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-11 w-11 sm:h-12 sm:w-12 rounded-xl gradient-brand grid place-items-center mb-4 sm:mb-5 text-primary-foreground shadow-md",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5 sm:h-6 sm:w-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 128,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 127,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[11px] sm:text-xs font-bold text-gold tracking-wider",
									children: ["ETAPA ", s.step]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-1 text-base sm:text-lg font-bold text-foreground break-words",
									children: s.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words",
									children: s.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 17
							}, this)]
						}, s.step, true, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 99,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "produtores",
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center max-w-3xl mx-auto mb-10 sm:mb-12 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-bold uppercase tracking-widest text-gold",
							children: "Painel de Gestão"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 148,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words",
							children: "Tenha tudo sob controle em um único painel."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-xs sm:text-base text-muted-foreground break-words",
							children: "Acompanhe vendas, faturamento, pedidos, comissões, saldo liberado e desempenho do seu negócio em tempo real."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative rounded-2xl sm:rounded-3xl border border-border/90 bg-card p-3 sm:p-6 shadow-2xl overflow-hidden min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 px-2 sm:px-3 py-2 border-b border-border/60 mb-4 sm:mb-5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2.5 w-2.5 rounded-full bg-destructive shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 165,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2.5 w-2.5 rounded-full bg-warning shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 166,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2.5 w-2.5 rounded-full bg-success shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono text-muted-foreground truncate",
										children: "infropay.ao/produtor"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 15
								}, this), "Atualização em tempo real"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-5 sm:mb-6 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-border/70 bg-background/60 p-3 sm:p-4 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase truncate",
											children: "Faturamento"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 181,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 text-base sm:text-2xl font-bold text-gold truncate",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CountUp, {
												to: 1285e3,
												prefix: "",
												suffix: " Kz"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 185,
												columnNumber: 17
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 184,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 text-[9px] sm:text-[10px] text-emerald-500 font-semibold flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "h-3 w-3 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 188,
												columnNumber: 17
											}, this), " +24% este mês"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 187,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-border/70 bg-background/60 p-3 sm:p-4 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase truncate",
											children: "Vendas"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 193,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 text-base sm:text-2xl font-bold text-foreground truncate",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CountUp, {
												to: 142,
												prefix: "+",
												suffix: " pedidos"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 197,
												columnNumber: 17
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 196,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 text-[9px] sm:text-[10px] text-muted-foreground truncate",
											children: "98.4% aprovação"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 199,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-border/70 bg-background/60 p-3 sm:p-4 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase truncate",
											children: "Saldo Disponível"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 205,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 text-base sm:text-2xl font-bold text-emerald-500 truncate",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CountUp, {
												to: 96e4,
												prefix: "",
												suffix: " Kz"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 209,
												columnNumber: 17
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 208,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 text-[9px] sm:text-[10px] text-muted-foreground truncate",
											children: "Pronto para saque"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 211,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-border/70 bg-background/60 p-3 sm:p-4 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase truncate",
											children: "Produtos"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 217,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 text-base sm:text-2xl font-bold text-primary-glow truncate",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CountUp, {
												to: 6,
												suffix: " ativos"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 221,
												columnNumber: 17
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 220,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-1 text-[9px] sm:text-[10px] text-muted-foreground truncate",
											children: "Checkouts ativos"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 223,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 179,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative rounded-xl sm:rounded-2xl overflow-hidden border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: dashboard_preview_default,
								alt: "Prévia do painel do produtor InfroPay",
								width: 1600,
								height: 900,
								loading: "lazy",
								className: "w-full h-auto object-cover max-h-[400px]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-4 sm:p-6",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/auth",
									search: { mode: "signup" },
									className: "w-full sm:w-auto",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										className: "w-full sm:w-auto gradient-brand text-primary-foreground shadow-glow font-bold text-xs sm:text-sm",
										children: ["Criar conta de produtor ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-4 w-4 ml-1.5 shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 237,
											columnNumber: 43
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 236,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 233,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 146,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "recursos",
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center max-w-2xl mx-auto mb-10 sm:mb-12 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-bold uppercase tracking-widest text-gold",
							children: "Recursos"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 248,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words",
							children: "Tudo que você precisa para vender"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 249,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-xs sm:text-base text-muted-foreground break-words",
							children: "Uma estrutura completa construída para potencializar as conversões dos seus produtos digitais."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 252,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 247,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 min-w-0",
					children: [
						{
							title: "Produtos",
							desc: "Cadastre e gerencie seus cursos, ebooks, mentorias e arquivos com facilidade.",
							icon: ShoppingBag
						},
						{
							title: "Checkout",
							desc: "Tenha uma página de pagamento própria e ultra rápida para cada produto cadastrado.",
							icon: CreditCard
						},
						{
							title: "Links de venda",
							desc: "Gere links exclusivos com rastreamento para compartilhar com seus clientes.",
							icon: Link$1
						},
						{
							title: "Pedidos",
							desc: "Acompanhe todos os pedidos realizados, dados do cliente e entrega do conteúdo.",
							icon: Layers
						},
						{
							title: "Pagamentos",
							desc: "Acompanhe o estado de aprovação de pagamentos por Multicaixa Express e Referência.",
							icon: ShieldCheck
						},
						{
							title: "Analytics",
							desc: "Veja o desempenho das suas vendas, taxas de conversão e faturamento diário.",
							icon: ChartColumn
						},
						{
							title: "Order Bump",
							desc: "Ofereça produtos complementares no checkout e aumente o valor médio de cada venda.",
							icon: Zap
						},
						{
							title: "Pixel",
							desc: "Configure eventos de conversão (Facebook, Google, TikTok) para acompanhar campanhas.",
							icon: Target
						}
					].map((r) => {
						const Icon = r.icon;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-border bg-card p-4 sm:p-5 hover:border-gold/40 hover:bg-card/90 transition flex flex-col justify-between min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-10 w-10 rounded-xl bg-gold/10 text-gold grid place-items-center mb-3",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 296,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 295,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-sm sm:text-base font-bold text-foreground break-words",
									children: r.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 298,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words",
									children: r.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 301,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 294,
								columnNumber: 17
							}, this)
						}, r.title, false, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 258,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 246,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl sm:rounded-3xl border border-border/80 bg-card/60 p-5 sm:p-10 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "max-w-3xl mb-8 sm:mb-10 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs font-bold uppercase tracking-widest text-gold",
								children: "Público-Alvo"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 314,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words",
								children: "Feita para quem transforma conhecimento em produto"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 317,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-xs sm:text-base text-muted-foreground break-words",
								children: "Não importa o formato do seu conhecimento. A InfroPay fornece a infraestrutura de checkout e entrega certa para você."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 313,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 min-w-0",
						children: [
							{
								title: "Criadores de cursos",
								desc: "Hospede aulas em vídeo ou entregue acesso a plataformas externas com facilidade.",
								icon: GraduationCap
							},
							{
								title: "Autores de ebooks",
								desc: "Venda PDFs, livros digitais e guias práticos com download imediato e protegido.",
								icon: BookOpen
							},
							{
								title: "Criadores de templates",
								desc: "Comercialize planilhas, modelos Notion, designs Figma e materiais prontos.",
								icon: FileCode
							},
							{
								title: "Mentores & Consultores",
								desc: "Venda sessões 1 a 1, consultorias em grupo e acompanhamentos personalizados.",
								icon: Briefcase
							},
							{
								title: "Prestadores de serviços",
								desc: "Cobre por serviços pontuais ou pacotes de entrega com confirmação automática.",
								icon: Wrench
							},
							{
								title: "Infoprodutores & Afiliados",
								desc: "Escale suas vendas com links diretos, pixels de conversão e saques rápidos.",
								icon: Flame
							}
						].map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border/60 bg-background/60 p-4 sm:p-5 flex items-start gap-3.5 hover:border-gold/40 transition min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gold/10 text-gold grid place-items-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-4 w-4 sm:h-5 sm:w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 355,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 354,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-sm sm:text-base font-bold text-foreground break-words",
										children: item.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 358,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xs text-muted-foreground leading-relaxed break-words",
										children: item.desc
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 361,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 357,
									columnNumber: 19
								}, this)]
							}, item.title, true, {
								fileName: _jsxFileName,
								lineNumber: 353,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 326,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 312,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 311,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center max-w-2xl mx-auto mb-10 sm:mb-12 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-bold uppercase tracking-widest text-gold",
							children: "Infraestrutura Segura"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 374,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-2 text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight break-words",
							children: "Venda com confiança"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 377,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-3 text-xs sm:text-base text-muted-foreground break-words",
							children: "Construímos uma plataforma estável, transparente e adaptada à realidade financeira de Angola."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 380,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 373,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-w-0",
					children: [
						{
							title: "Pagamentos protegidos",
							desc: "Integração segura com operadoras locais e protocolo de confirmação automatizado.",
							icon: Lock
						},
						{
							title: "Gestão de pedidos",
							desc: "Histórico detalhado de cada transação, status de pagamento e dados do comprador.",
							icon: Layers
						},
						{
							title: "Checkout seguro",
							desc: "Páginas com criptografia SSL 256-bit e alta taxa de disponibilidade para o comprador.",
							icon: ShieldCheck
						},
						{
							title: "Controle das vendas",
							desc: "Notificações instantâneas a cada venda realizada para acompanhar em tempo real.",
							icon: Zap
						},
						{
							title: "Dados organizados",
							desc: "Gestão simples da sua base de clientes, faturamento acumulado e produtos ativos.",
							icon: ChartColumn
						},
						{
							title: "Acompanhamento financeiro",
							desc: "Painel transparente de saques, saldos liberados e transferências diretas por IBAN.",
							icon: TrendingUp
						}
					].map((item) => {
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-border/80 transition min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-10 w-10 rounded-xl bg-gold/10 text-gold grid place-items-center mb-3 sm:mb-4",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 415,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 414,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-sm sm:text-base font-bold text-foreground break-words",
									children: item.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 417,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words",
									children: item.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 420,
									columnNumber: 17
								}, this)
							]
						}, item.title, true, {
							fileName: _jsxFileName,
							lineNumber: 413,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 386,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 372,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrustMarquee, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 429,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "faq",
				className: "mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center mb-8 sm:mb-10 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs font-bold uppercase tracking-widest text-gold",
							children: "Dúvidas"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 434,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-2 text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight break-words",
							children: "Perguntas Frequentes"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 435,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-xs sm:text-sm text-muted-foreground break-words",
							children: "Respostas diretas sobre como vender com a InfroPay."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 438,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 433,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-3 sm:space-y-4 min-w-0",
					children: [
						{
							q: "Quanto custa para criar conta e cadastrar produtos?",
							a: "É 100% gratuito. Não há mensalidades nem taxas de adesão. A InfroPay cobra apenas uma taxa de 2% por venda realizada."
						},
						{
							q: "Como o cliente paga pelo meu produto?",
							a: "O cliente acessa o seu link de checkout e pode pagar via Multicaixa Express, Referência Multicaixa ou Transferência Bancária."
						},
						{
							q: "Como recebo o dinheiro das minhas vendas?",
							a: "Seu saldo fica disponível no painel do produtor e pode ser sacado diretamente para a sua conta bancária angolana via IBAN."
						},
						{
							q: "Preciso ter uma loja completa para vender?",
							a: "Não! A InfroPay gera links de venda diretos. Você só precisa cadastrar o produto, copiar o link e enviar aos seus clientes."
						},
						{
							q: "Que tipos de produtos posso vender?",
							a: "Você pode vender cursos online, ebooks, mentorias, planilhas, arquivos digitais, templates e serviços pontuais."
						}
					].map((item, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card p-4 sm:p-5 text-left transition hover:border-gold/40 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-bold text-xs sm:text-base text-foreground flex items-center gap-2 break-words",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleQuestionMark, { className: "h-4 w-4 text-gold shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 461,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.q }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 462,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 460,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-xs sm:text-sm text-muted-foreground pl-6 leading-relaxed break-words",
							children: item.a
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 464,
							columnNumber: 15
						}, this)]
					}, idx, true, {
						fileName: _jsxFileName,
						lineNumber: 459,
						columnNumber: 31
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 443,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 432,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-24 min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/30 min-h-[320px] sm:min-h-[380px] min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: banner_produtores_default,
							alt: "",
							width: 1600,
							height: 900,
							loading: "lazy",
							className: "absolute inset-0 h-full w-full object-cover opacity-40"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 474,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-br from-background/70 via-background/85 to-primary/20" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 475,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -top-20 -right-20 h-72 w-72 rounded-full gradient-brand opacity-25 blur-3xl" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 476,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute -bottom-20 -left-20 h-72 w-72 rounded-full gradient-gold opacity-15 blur-3xl" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 477,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative p-6 sm:p-12 md:p-14 max-w-2xl min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs font-semibold uppercase tracking-widest text-gold",
									children: "Comece agora"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 479,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight break-words",
									children: "Seu próximo produto pode começar aqui."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 482,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-3 text-xs sm:text-base text-muted-foreground leading-relaxed break-words",
									children: "Crie sua conta, cadastre seu produto e comece a compartilhar seu link de venda hoje mesmo."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 485,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "mt-5 space-y-2 text-xs sm:text-sm text-foreground/90",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 492,
												columnNumber: 17
											}, this), " Sem mensalidade — apenas 2% por venda aprovada"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 491,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 496,
												columnNumber: 17
											}, this), " Checkout Multicaixa com alta conversão"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 495,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 500,
												columnNumber: 17
											}, this), " Saques por transferência bancária (IBAN)"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 499,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 490,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										className: "w-full sm:w-auto",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "lg",
											className: "w-full sm:w-auto gradient-brand text-primary-foreground shadow-glow h-12 px-7 font-bold text-sm sm:text-base",
											children: ["Começar agora ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-1.5 h-4 w-4 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 510,
												columnNumber: 33
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 509,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 506,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/auth",
										className: "w-full sm:w-auto",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "lg",
											variant: "outline",
											className: "w-full sm:w-auto h-12 px-7 font-semibold border-border/80 text-sm sm:text-base",
											children: "Já tenho uma conta"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 514,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 513,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 505,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 478,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 473,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 472,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 10
	}, this);
}
//#endregion
export { HomePage as component };
