import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as infropay_mark_default } from "./infropay-mark-CgfXU-W0.mjs";
import { At as CircleCheck, J as Lock, S as Share2, Y as LoaderCircle, h as Sparkles, l as TriangleAlert, qt as Award, vt as Download, y as Shield } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AwardPlaque-BKruEmG-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/plaques/AwardPlaque.tsx";
var PLAQUE_THEMES = {
	bronze: {
		primary: "#CD7F32",
		secondary: "#8B4513",
		glow: "rgba(205, 127, 50, 0.45)",
		border: "rgba(205, 127, 50, 0.7)",
		accent: "#FFA07A",
		trophyColor: "#D2691E",
		ribbonGradient: "linear-gradient(135deg, #8B4513 0%, #CD7F32 50%, #A0522D 100%)",
		badgeBg: "#1F1510",
		subtitle: "Iniciação de Vendas"
	},
	prata: {
		primary: "#E0E0E0",
		secondary: "#9E9E9E",
		glow: "rgba(224, 224, 224, 0.4)",
		border: "rgba(224, 224, 224, 0.7)",
		accent: "#FFFFFF",
		trophyColor: "#C0C0C0",
		ribbonGradient: "linear-gradient(135deg, #757575 0%, #E0E0E0 50%, #BDBDBD 100%)",
		badgeBg: "#14181F",
		subtitle: "Marca dos 100 Mil Kz"
	},
	ouro: {
		primary: "#FFD700",
		secondary: "#B8860B",
		glow: "rgba(255, 215, 0, 0.55)",
		border: "rgba(255, 215, 0, 0.8)",
		accent: "#FFF8DC",
		trophyColor: "#FFC107",
		ribbonGradient: "linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #D4AF37 100%)",
		badgeBg: "#1D190B",
		subtitle: "Clube dos 500 Mil Kz"
	},
	platina: {
		primary: "#E5E4E2",
		secondary: "#78909C",
		glow: "rgba(229, 228, 226, 0.5)",
		border: "rgba(229, 228, 226, 0.75)",
		accent: "#FFFFFF",
		trophyColor: "#CFD8DC",
		ribbonGradient: "linear-gradient(135deg, #546E7A 0%, #ECEFF1 50%, #90A4AE 100%)",
		badgeBg: "#10161C",
		subtitle: "Clube do Milhão Kz"
	},
	diamante: {
		primary: "#00E5FF",
		secondary: "#0091EA",
		glow: "rgba(0, 229, 255, 0.6)",
		border: "rgba(0, 229, 255, 0.85)",
		accent: "#E0F7FA",
		trophyColor: "#29B6F6",
		ribbonGradient: "linear-gradient(135deg, #01579B 0%, #00E5FF 50%, #0288D1 100%)",
		badgeBg: "#061826",
		subtitle: "Marca dos 5 Milhões Kz"
	},
	mestre: {
		primary: "#E040FB",
		secondary: "#7B1FA2",
		glow: "rgba(224, 64, 251, 0.55)",
		border: "rgba(224, 64, 251, 0.8)",
		accent: "#F3E5F5",
		trophyColor: "#AB47BC",
		ribbonGradient: "linear-gradient(135deg, #4A148C 0%, #E040FB 50%, #8E24AA 100%)",
		badgeBg: "#180A24",
		subtitle: "Mestre dos 10 Milhões Kz"
	},
	elite: {
		primary: "#FF1744",
		secondary: "#C2185B",
		glow: "rgba(255, 23, 68, 0.55)",
		border: "rgba(255, 23, 68, 0.8)",
		accent: "#FFEBEE",
		trophyColor: "#FF5252",
		ribbonGradient: "linear-gradient(135deg, #880E4F 0%, #FF1744 50%, #C2185B 100%)",
		badgeBg: "#220810",
		subtitle: "Elite dos 25 Milhões Kz"
	},
	lenda: {
		primary: "#00E676",
		secondary: "#00897B",
		glow: "rgba(0, 230, 118, 0.6)",
		border: "rgba(0, 230, 118, 0.85)",
		accent: "#E8F5E9",
		trophyColor: "#26A69A",
		ribbonGradient: "linear-gradient(135deg, #004D40 0%, #00E676 50%, #00897B 100%)",
		badgeBg: "#051C14",
		subtitle: "Lenda dos 50 Milhões Kz"
	},
	imortal: {
		primary: "#FFAB00",
		secondary: "#FF6D00",
		glow: "rgba(255, 171, 0, 0.6)",
		border: "rgba(255, 171, 0, 0.85)",
		accent: "#FFF8E1",
		trophyColor: "#FF9100",
		ribbonGradient: "linear-gradient(135deg, #E65100 0%, #FFD600 50%, #FF9100 100%)",
		badgeBg: "#241604",
		subtitle: "Imortal dos 100 Milhões Kz"
	},
	infinito: {
		primary: "#7C4DFF",
		secondary: "#304FFE",
		glow: "rgba(124, 77, 255, 0.7)",
		border: "rgba(124, 77, 255, 0.9)",
		accent: "#EDE7F6",
		trophyColor: "#651FFF",
		ribbonGradient: "linear-gradient(135deg, #1A237E 0%, #7C4DFF 50%, #3D5AFE 100%)",
		badgeBg: "#100B2A",
		subtitle: "Nível Máximo Infinito"
	}
};
function AwardPlaque({ level, sellerName = "Produtor Oficial InfroPay", milestoneText, issuedDate, serialNumber, className = "", showActions = false, isUnlocked, userRevenueCents }) {
	const plaqueRef = (0, import_react.useRef)(null);
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	const theme = PLAQUE_THEMES[level.key] || PLAQUE_THEMES.ouro;
	const unlocked = isUnlocked !== void 0 ? isUnlocked : userRevenueCents !== void 0 ? userRevenueCents >= level.min_cents : false;
	const dateStr = issuedDate || (/* @__PURE__ */ new Date()).toLocaleDateString("pt-AO", {
		month: "long",
		year: "numeric"
	});
	const serial = serialNumber || `INFR-${level.key.toUpperCase()}-${Math.floor(1e5 + Math.random() * 9e5)}`;
	const displayMilestone = milestoneText || `Faturamento Superior a ${(level.min_cents / 100).toLocaleString("pt-AO")} Kz`;
	const handleDownload = async () => {
		if (!unlocked) {
			toast.error("Acesso bloqueado: Atinja a meta oficial para liberar o download da placa.");
			return;
		}
		setDownloading(true);
		try {
			const canvas = document.createElement("canvas");
			canvas.width = 1200;
			canvas.height = 1200;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				const grad = ctx.createRadialGradient(600, 400, 50, 600, 600, 800);
				grad.addColorStop(0, "#0D1424");
				grad.addColorStop(.7, "#050912");
				grad.addColorStop(1, "#020408");
				ctx.fillStyle = grad;
				ctx.fillRect(0, 0, 1200, 1200);
				ctx.strokeStyle = theme.primary;
				ctx.lineWidth = 14;
				ctx.strokeRect(40, 40, 1120, 1120);
				ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
				ctx.lineWidth = 2;
				ctx.strokeRect(65, 65, 1070, 1070);
				ctx.fillStyle = "#FFFFFF";
				ctx.font = "bold 36px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText("INFROPAY OFFICIAL AWARD", 600, 140);
				ctx.fillStyle = theme.primary;
				ctx.font = "bold 22px sans-serif";
				ctx.fillText("PLACA DE RECONHECIMENTO DE VENDAS", 600, 185);
				ctx.save();
				ctx.beginPath();
				ctx.arc(600, 420, 150, 0, Math.PI * 2);
				ctx.fillStyle = "#0B111E";
				ctx.fill();
				ctx.strokeStyle = theme.primary;
				ctx.lineWidth = 10;
				ctx.shadowColor = theme.glow;
				ctx.shadowBlur = 40;
				ctx.stroke();
				ctx.restore();
				ctx.fillStyle = theme.primary;
				ctx.font = "bold 38px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText("🏆", 600, 400);
				ctx.fillStyle = "#FFFFFF";
				ctx.font = "900 48px sans-serif";
				ctx.fillText(level.name.toUpperCase(), 600, 470);
				ctx.fillStyle = theme.accent;
				ctx.font = "bold 28px sans-serif";
				ctx.fillText(theme.subtitle.toUpperCase(), 600, 640);
				ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
				ctx.fillRect(150, 700, 900, 320);
				ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
				ctx.lineWidth = 2;
				ctx.strokeRect(150, 700, 900, 320);
				ctx.fillStyle = "#94A3B8";
				ctx.font = "600 22px sans-serif";
				ctx.fillText("CONCEDIDO OFICIALMENTE A", 600, 750);
				ctx.fillStyle = "#FFFFFF";
				ctx.font = "bold 44px sans-serif";
				ctx.fillText(sellerName, 600, 815);
				ctx.fillStyle = theme.primary;
				ctx.font = "bold 30px sans-serif";
				ctx.fillText(`✓ ${displayMilestone}`, 600, 875);
				ctx.fillStyle = "#64748B";
				ctx.font = "18px monospace";
				ctx.fillText(`AUTENTICIDADE: ${serial} · EMISSÃO: ${dateStr}`, 600, 960);
				ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
				ctx.font = "16px sans-serif";
				ctx.fillText("InfroPay Technologies Angola · Certificação Digital Oficial", 600, 1100);
				const dataUrl = canvas.toDataURL("image/png");
				const a = document.createElement("a");
				a.href = dataUrl;
				a.download = `InfroPay_Placa_${level.name}_${sellerName.replace(/\s+/g, "_")}.png`;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				toast.success("Placa oficial gerada e transferida em alta resolução!");
			}
		} catch (err) {
			console.error(err);
			toast.error("Erro ao gerar a imagem da placa.");
		} finally {
			setDownloading(false);
		}
	};
	const handleShare = async () => {
		if (!unlocked) {
			toast.error("Acesso bloqueado: Atinja a meta de vendas para partilhar a placa oficial.");
			return;
		}
		const shareData = {
			title: `Placa Oficial ${level.name} — InfroPay`,
			text: `Conquistei a Placa Oficial ${level.name} na InfroPay com ${displayMilestone}! 🚀🏆`,
			url: window.location.origin + "/legends"
		};
		if (navigator.share) try {
			await navigator.share(shareData);
			toast.success("Placa partilhada!");
		} catch {}
		else {
			navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
			toast.success("Link e mensagem copiados para partilha!");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `flex flex-col items-center gap-4 w-full min-w-0 max-w-full ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			ref: plaqueRef,
			id: `plaque-${level.key}`,
			className: "relative w-full aspect-square max-w-[480px] sm:max-w-[520px] rounded-3xl overflow-hidden shadow-2xl transition-all select-none border",
			style: {
				backgroundColor: "#050811",
				borderColor: theme.border,
				boxShadow: unlocked ? `0 25px 60px -15px ${theme.glow}, 0 0 0 1px ${theme.border}` : "0 10px 30px rgba(0,0,0,0.6)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute inset-0 opacity-25 pointer-events-none",
					style: {
						backgroundImage: `radial-gradient(${theme.primary} 1.2px, transparent 1.2px), radial-gradient(#2563EB 1.2px, transparent 1.2px)`,
						backgroundSize: "28px 28px",
						backgroundPosition: "0 0, 14px 14px"
					}
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 343,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute -top-28 -left-28 w-72 h-72 rounded-full blur-[90px] pointer-events-none opacity-40",
					style: { backgroundColor: theme.primary }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 352,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute -bottom-28 -right-28 w-72 h-72 rounded-full blur-[90px] pointer-events-none opacity-30",
					style: { backgroundColor: "#2563EB" }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 356,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute inset-3 sm:inset-4 rounded-2xl pointer-events-none border",
					style: { borderColor: theme.border }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 362,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 pointer-events-none",
					style: { borderColor: theme.primary }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 368,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 pointer-events-none",
					style: { borderColor: "#3B82F6" }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 372,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 pointer-events-none",
					style: { borderColor: "#3B82F6" }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 376,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 pointer-events-none",
					style: { borderColor: theme.primary }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 380,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative h-full w-full p-6 sm:p-8 flex flex-col justify-between items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-full flex items-center justify-between border-b border-white/10 pb-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: infropay_mark_default,
									alt: "InfroPay",
									className: "h-5 w-5 object-contain"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 390,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-bold tracking-tight text-white text-xs sm:text-sm",
									children: ["Infro", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										style: { color: theme.primary },
										children: "Pay"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 392,
										columnNumber: 22
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 391,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 389,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1 text-[9px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, {
									className: "h-3 w-3",
									style: { color: theme.primary }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 396,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Placa Oficial" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 397,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 395,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 388,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "my-auto flex flex-col items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative flex items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full blur-2xl pointer-events-none ${unlocked ? "opacity-60 animate-pulse" : "opacity-20"}`,
									style: { backgroundColor: theme.glow }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 404,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center p-1 shadow-2xl border-2",
									style: {
										background: `linear-gradient(135deg, #0B111E 0%, ${theme.badgeBg} 100%)`,
										borderColor: theme.primary,
										boxShadow: unlocked ? `0 0 35px ${theme.glow}` : "none"
									},
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "w-full h-full rounded-full flex flex-col items-center justify-center relative overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, {
											className: "w-10 h-10 sm:w-16 sm:h-16 drop-shadow-lg transition-transform duration-500",
											style: { color: theme.primary }
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 421,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "absolute bottom-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-white/90 shadow-sm",
											style: { background: theme.ribbonGradient },
											children: level.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 425,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 420,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 412,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 403,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.25em]",
									style: { color: theme.primary },
									children: theme.subtitle
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 437,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "text-xl sm:text-2xl font-extrabold tracking-tight text-white drop-shadow-md mt-0.5",
									children: ["NÍVEL ", level.name.toUpperCase()]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 443,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 436,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 402,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-full rounded-xl p-3.5 sm:p-4 border relative overflow-hidden backdrop-blur-md",
							style: {
								backgroundColor: "rgba(11, 17, 30, 0.88)",
								borderColor: "rgba(255, 255, 255, 0.12)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[9px] uppercase font-semibold text-muted-foreground tracking-wider",
									children: "Concedido a"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 457,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm sm:text-lg font-bold text-white tracking-tight truncate mt-0.5",
									children: sellerName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 460,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-1 text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5",
									style: { color: theme.primary },
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3.5 w-3.5 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 468,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "truncate",
										children: displayMilestone
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 469,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 464,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[9px] text-muted-foreground font-mono",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-1 text-emerald-400",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-2.5 w-2.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 474,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Autenticado" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 475,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 473,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: dateStr }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 477,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "opacity-75",
											children: serial
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 478,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 472,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 450,
							columnNumber: 11
						}, this),
						!unlocked && /* @__PURE__ */ (void 0)("div", {
							className: "absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "h-14 w-14 rounded-2xl bg-gold/15 border border-gold/40 grid place-items-center mb-3 shadow-lg shadow-gold/10",
									children: /* @__PURE__ */ (void 0)(Lock, { className: "h-7 w-7 text-gold" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 486,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 485,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "font-display text-lg sm:text-xl font-bold text-foreground",
									children: "Placa Bloqueada"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 488,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed",
									children: [
										"Atinja a meta de faturamento de",
										" ",
										/* @__PURE__ */ (void 0)("strong", {
											className: "text-foreground",
											children: [(level.min_cents / 100).toLocaleString("pt-AO"), " Kz"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 493,
											columnNumber: 17
										}, this),
										" ",
										"para desbloquear o download e a partilha oficial."
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 491,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-3 px-3 py-1 rounded-full bg-muted/60 border border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider",
									children: "🔒 Rigor & Exclusividade InfroPay"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 498,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 484,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 386,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 330,
			columnNumber: 7
		}, this), showActions && /* @__PURE__ */ (void 0)("div", {
			className: "w-full flex flex-col items-center gap-2.5 max-w-md",
			children: unlocked ? /* @__PURE__ */ (void 0)("div", {
				className: "flex flex-wrap items-center justify-center gap-2.5 w-full",
				children: [/* @__PURE__ */ (void 0)(Button, {
					size: "sm",
					variant: "outline",
					disabled: downloading,
					onClick: handleDownload,
					className: "text-xs gap-1.5 flex-1 min-w-[140px] border-gold/40 text-foreground hover:bg-gold/10",
					children: [downloading ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 519,
						columnNumber: 19
					}, this) : /* @__PURE__ */ (void 0)(Download, { className: "h-3.5 w-3.5 text-gold" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 521,
						columnNumber: 19
					}, this), "Baixar Placa HD (PNG)"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 511,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)(Button, {
					size: "sm",
					onClick: handleShare,
					className: "gradient-brand text-primary-foreground text-xs gap-1.5 flex-1 min-w-[140px] shadow-glow",
					children: [/* @__PURE__ */ (void 0)(Share2, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 530,
						columnNumber: 17
					}, this), " Partilhar Conquista"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 525,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 510,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (void 0)("div", {
				className: "w-full p-3 rounded-xl border border-destructive/30 bg-destructive/10 text-center text-xs text-muted-foreground flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "h-4 w-4 text-destructive shrink-0" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 535,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)("span", { children: "Download e partilha bloqueados até atingir a meta oficial de faturamento." }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 536,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 534,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 508,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 328,
		columnNumber: 5
	}, this);
}
//#endregion
export { AwardPlaque as t };
