import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Ct as Copy, It as Check, vt as Download } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-HRHX5L42.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/QrDialog-Dnj6R0gZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
/**
* Geração de links públicos, links curtos, partilha e QR Codes de um produto.
* Puro cliente — usa a origem atual para funcionar em preview e produção.
*/
var FALLBACK_ORIGIN = "https://infropay.lovable.app";
function origin() {
	if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
	return FALLBACK_ORIGIN;
}
function productLinks(slug, ref) {
	const o = origin();
	const q = ref ? `?ref=${encodeURIComponent(ref)}` : "";
	const product = `${o}/produto/${slug}${q}`;
	return {
		product,
		checkout: `${o}/checkout/${slug}${q}`,
		short: `${o}/p/${slug}`,
		share: product
	};
}
async function copy(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		try {
			const el = document.createElement("textarea");
			el.value = text;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			el.remove();
			return true;
		} catch {
			return false;
		}
	}
}
async function qrDataUrl(text) {
	return import_lib.toDataURL(text, {
		width: 512,
		margin: 1,
		errorCorrectionLevel: "M",
		color: {
			dark: "#0F172A",
			light: "#FFFFFF"
		}
	});
}
/** Partilha nativa quando disponível; caso contrário copia o link. */
async function shareLink(title, url) {
	const nav = navigator;
	if (nav.share) try {
		await nav.share({
			title,
			text: title,
			url
		});
		return "shared";
	} catch {}
	return await copy(url) ? "copied" : "failed";
}
function downloadDataUrl(dataUrl, filename) {
	const a = document.createElement("a");
	a.href = dataUrl;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
}
var _jsxFileName = "/app/applet/src/components/products/QrDialog.tsx";
function QrDialog({ open, onOpenChange, url, title }) {
	const [src, setSrc] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open || !url) return;
		setSrc(null);
		qrDataUrl(url).then(setSrc).catch(() => toast.error("Não foi possível gerar o QR Code"));
	}, [open, url]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "sm:max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
					className: "font-display",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid place-items-center rounded-2xl border border-border bg-card p-4",
					children: src ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src,
						alt: `QR Code — ${title}`,
						className: "h-56 w-56 rounded-lg"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 38,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-56 w-56 animate-pulse rounded-lg bg-muted" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "break-all text-center text-xs text-muted-foreground",
					children: url
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: async () => {
							if (await copy(url)) {
								setDone(true);
								toast.success("Link copiado");
								setTimeout(() => setDone(false), 1500);
							}
						},
						children: [done ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "mr-1 h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 56,
							columnNumber: 21
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "mr-1 h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 56,
							columnNumber: 58
						}, this), " Copiar link"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "flex-1 gradient-brand text-primary-foreground",
						disabled: !src,
						onClick: () => src && downloadDataUrl(src, "qrcode-infropay.png"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "mr-1 h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 64,
							columnNumber: 13
						}, this), " Descarregar"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 59,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 44,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 32,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 31,
		columnNumber: 5
	}, this);
}
//#endregion
export { shareLink as i, copy as n, productLinks as r, QrDialog as t };
