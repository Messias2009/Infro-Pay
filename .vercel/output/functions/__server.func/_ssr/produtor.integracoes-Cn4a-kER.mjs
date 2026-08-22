import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.integracoes-Cn4a-kER.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var schema = objectType({
	meta_pixel_id: stringType().trim().max(60).optional().nullable(),
	meta_capi_token: stringType().trim().max(400).optional().nullable(),
	google_ads_id: stringType().trim().max(60).optional().nullable(),
	google_ads_label: stringType().trim().max(80).optional().nullable(),
	ga_measurement_id: stringType().trim().max(40).optional().nullable(),
	utmify_token: stringType().trim().max(200).optional().nullable()
});
var getMyIntegrations = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("44f8b4cf461e63779174134d78941ac6e91e35e239624009cb22195b0c636a71"));
var upsertMyIntegrations = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => schema.parse(d)).handler(createSsrRpc("78fdee379d7cdbbaad34437cf1a1380b9277163f8442d88f640a174029229e89"));
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.integracoes.tsx?tsr-split=component";
var INTEGRATIONS = [
	{
		key: "meta",
		name: "Meta Ads",
		desc: "Facebook & Instagram Pixel + Conversions API",
		color: "#1877F2",
		fields: [{
			id: "meta_pixel_id",
			label: "Pixel ID",
			placeholder: "1234567890"
		}, {
			id: "meta_capi_token",
			label: "CAPI Access Token (opcional)",
			placeholder: "EAAxxxxx..."
		}],
		logo: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			viewBox: "0 0 40 40",
			className: "h-8 w-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				fill: "#1877F2",
				d: "M20 4a16 16 0 100 32 16 16 0 000-32z"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 36,
				columnNumber: 9
			}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
				fill: "#fff",
				d: "M22.4 32V22h3.4l.5-4h-3.9v-2.5c0-1.2.3-2 2-2h2.1V9.9c-.4-.1-1.7-.2-3.3-.2-3.2 0-5.4 2-5.4 5.6V18h-3.4v4h3.4v10h4.6z"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 37,
				columnNumber: 9
			}, void 0)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 9
		}, void 0)
	},
	{
		key: "google_ads",
		name: "Google Ads",
		desc: "Conversion tracking para campanhas",
		color: "#FBBC04",
		fields: [{
			id: "google_ads_id",
			label: "Conversion ID (AW-...)",
			placeholder: "AW-123456789"
		}, {
			id: "google_ads_label",
			label: "Conversion Label",
			placeholder: "abcDEF123"
		}],
		logo: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			viewBox: "0 0 40 40",
			className: "h-8 w-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					fill: "#FBBC04",
					d: "M15 6l10 17-5 9L10 15z"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					fill: "#4285F4",
					d: "M25 6l10 17-5 9-10-17z"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
					cx: "10",
					cy: "30",
					r: "5",
					fill: "#34A853"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 9
				}, void 0)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 53,
			columnNumber: 9
		}, void 0)
	},
	{
		key: "ga",
		name: "Google Analytics 4",
		desc: "Medição de tráfego e eventos",
		color: "#F9AB00",
		fields: [{
			id: "ga_measurement_id",
			label: "Measurement ID (G-...)",
			placeholder: "G-XXXXXXX"
		}],
		logo: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			viewBox: "0 0 40 40",
			className: "h-8 w-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
					x: "24",
					y: "6",
					width: "10",
					height: "28",
					rx: "5",
					fill: "#F9AB00"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
					x: "14",
					y: "16",
					width: "10",
					height: "18",
					rx: "5",
					fill: "#E37400"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
					cx: "9",
					cy: "30",
					r: "5",
					fill: "#E37400"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 9
				}, void 0)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 68,
			columnNumber: 9
		}, void 0)
	},
	{
		key: "utmify",
		name: "Utmify",
		desc: "Rastreamento de UTM e atribuição",
		color: "#7C4DFF",
		fields: [{
			id: "utmify_token",
			label: "API Token",
			placeholder: "utm_xxxxxxxxxx"
		}],
		logo: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			viewBox: "0 0 40 40",
			className: "h-8 w-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
				width: "40",
				height: "40",
				rx: "10",
				fill: "#7C4DFF"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 9
			}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", {
				x: "20",
				y: "26",
				textAnchor: "middle",
				fill: "#fff",
				fontFamily: "system-ui",
				fontWeight: "800",
				fontSize: "16",
				children: "U"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 85,
				columnNumber: 9
			}, void 0)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 83,
			columnNumber: 9
		}, void 0)
	}
];
function Page() {
	const qc = useQueryClient();
	const getFn = useServerFn(getMyIntegrations);
	const saveFn = useServerFn(upsertMyIntegrations);
	const { data } = useQuery({
		queryKey: ["me", "integrations"],
		queryFn: () => getFn()
	});
	const [form, setForm] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (data) setForm(data);
	}, [data]);
	async function save() {
		try {
			await saveFn({ data: {
				meta_pixel_id: form.meta_pixel_id || null,
				meta_capi_token: form.meta_capi_token || null,
				google_ads_id: form.google_ads_id || null,
				google_ads_label: form.google_ads_label || null,
				ga_measurement_id: form.ga_measurement_id || null,
				utmify_token: form.utmify_token || null
			} });
			toast.success("Integrações guardadas");
			qc.invalidateQueries({ queryKey: ["me", "integrations"] });
		} catch (e) {
			toast.error(e.message ?? "Erro");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-5xl mx-auto space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-xs uppercase tracking-widest text-gold font-semibold",
					children: "Marketing"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-3xl md:text-4xl font-bold mt-2",
					children: "Integrações"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 127,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "Configuração global — cada produto pode substituir estes valores individualmente."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 128,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 125,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid md:grid-cols-2 gap-5",
				children: INTEGRATIONS.map((i) => {
					const configured = i.fields.some((f) => Boolean(form[f.id]));
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "shrink-0 h-12 w-12 rounded-xl grid place-items-center bg-background border border-border",
								children: i.logo
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-display font-semibold text-lg",
										style: { color: i.color },
										children: i.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 143,
										columnNumber: 21
									}, this), configured && /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] px-1.5 py-0.5 rounded bg-success/15 text-success font-semibold",
										children: "ATIVO"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 148,
										columnNumber: 36
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: i.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 152,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 141,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 space-y-3",
							children: i.fields.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs",
								children: f.label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								value: form[f.id] ?? "",
								onChange: (e) => setForm({
									...form,
									[f.id]: e.target.value
								}),
								placeholder: f.placeholder,
								className: "mt-1 font-mono text-xs"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 158,
								columnNumber: 21
							}, this)] }, f.id, true, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 36
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 15
						}, this)]
					}, i.key, true, {
						fileName: _jsxFileName,
						lineNumber: 136,
						columnNumber: 16
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 133,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					onClick: save,
					className: "gradient-brand text-primary-foreground shadow-glow",
					children: "Guardar integrações"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 169,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 168,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 124,
		columnNumber: 10
	}, this);
}
//#endregion
export { Page as component };
