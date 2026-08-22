import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { A as RefreshCw, B as Package, ct as GraduationCap, g as Smartphone, gt as ExternalLink, vt as Download } from "../_libs/lucide-react.mjs";
import { t as Textarea } from "./textarea-XzxVYTAX.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-1I-ZqIzI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DeliveryFields-BafJ2tMc.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/products/DeliveryFields.tsx";
var emptyDelivery = {
	delivery_kind: "digital",
	stock_quantity: "",
	requires_shipping: false,
	shipping_fee: "",
	weight_grams: "",
	app_version: "",
	app_package: "",
	app_requirements: "",
	is_subscription: false,
	billing_interval: "mensal",
	subscription_price: "",
	trial_days: "0",
	has_members_area: false
};
/** Maps the form values to the server payload shape. */
function deliveryPayload(d) {
	const num = (v) => v.trim() === "" ? null : Math.round(Number(v));
	return {
		delivery_kind: d.delivery_kind,
		stock_quantity: d.delivery_kind === "fisico" ? num(d.stock_quantity) : null,
		requires_shipping: d.delivery_kind === "fisico" ? d.requires_shipping : false,
		shipping_fee_cents: d.delivery_kind === "fisico" && d.shipping_fee ? Math.round(Number(d.shipping_fee) * 100) : 0,
		weight_grams: d.delivery_kind === "fisico" ? num(d.weight_grams) : null,
		app_version: d.delivery_kind === "apk" ? d.app_version || null : null,
		app_package: d.delivery_kind === "apk" ? d.app_package || null : null,
		app_requirements: d.delivery_kind === "apk" ? d.app_requirements || null : null,
		is_subscription: d.delivery_kind === "assinatura" || d.is_subscription,
		billing_interval: d.delivery_kind === "assinatura" || d.is_subscription ? d.billing_interval : null,
		subscription_price_cents: (d.delivery_kind === "assinatura" || d.is_subscription) && d.subscription_price ? Math.round(Number(d.subscription_price) * 100) : null,
		trial_days: Number(d.trial_days || 0),
		has_members_area: d.delivery_kind === "membros" || d.has_members_area
	};
}
/** Reads a product row back into form values. */
function deliveryFromRow(row) {
	return {
		delivery_kind: row?.delivery_kind ?? "digital",
		stock_quantity: row?.stock_quantity != null ? String(row.stock_quantity) : "",
		requires_shipping: !!row?.requires_shipping,
		shipping_fee: row?.shipping_fee_cents ? String(row.shipping_fee_cents / 100) : "",
		weight_grams: row?.weight_grams != null ? String(row.weight_grams) : "",
		app_version: row?.app_version ?? "",
		app_package: row?.app_package ?? "",
		app_requirements: row?.app_requirements ?? "",
		is_subscription: !!row?.is_subscription,
		billing_interval: row?.billing_interval ?? "mensal",
		subscription_price: row?.subscription_price_cents ? String(row.subscription_price_cents / 100) : "",
		trial_days: String(row?.trial_days ?? 0),
		has_members_area: !!row?.has_members_area
	};
}
var KINDS = [
	{
		v: "digital",
		label: "Digital (download)",
		icon: Download,
		desc: "Ficheiro entregue após pagamento"
	},
	{
		v: "membros",
		label: "Área de membros",
		icon: GraduationCap,
		desc: "Aulas, módulos e certificado"
	},
	{
		v: "assinatura",
		label: "Assinatura",
		icon: RefreshCw,
		desc: "Cobrança recorrente"
	},
	{
		v: "apk",
		label: "APK / Software",
		icon: Smartphone,
		desc: "App Android ou programa"
	},
	{
		v: "fisico",
		label: "Produto físico",
		icon: Package,
		desc: "Stock e envio"
	},
	{
		v: "externo",
		label: "Acesso externo",
		icon: ExternalLink,
		desc: "Link hospedado fora"
	}
];
function DeliveryFields({ value, onChange }) {
	const set = (k, v) => onChange({
		...value,
		[k]: v
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
				className: "text-sm",
				children: "Tipo de entrega"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-3",
				children: KINDS.map((k) => {
					const Icon = k.icon;
					const active = value.delivery_kind === k.v;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => set("delivery_kind", k.v),
						className: `text-left rounded-xl border p-3 transition ${active ? "border-primary bg-primary/10 shadow-glow" : "border-border hover:border-primary/50"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `h-4 w-4 ${active ? "text-primary-glow" : "text-muted-foreground"}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm font-semibold",
								children: k.label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 150,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-[11px] text-muted-foreground mt-1",
							children: k.desc
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 17
						}, this)]
					}, k.v, true, {
						fileName: _jsxFileName,
						lineNumber: 136,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 131,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 129,
				columnNumber: 7
			}, this),
			value.delivery_kind === "fisico" && /* @__PURE__ */ (void 0)("div", {
				className: "grid sm:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
						className: "text-sm",
						children: "Stock disponível"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Input, {
						className: "mt-1.5",
						type: "number",
						min: 0,
						value: value.stock_quantity,
						onChange: (e) => set("stock_quantity", e.target.value)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
						className: "text-sm",
						children: "Taxa de envio (Kz)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 172,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Input, {
						className: "mt-1.5",
						type: "number",
						min: 0,
						step: "0.01",
						value: value.shipping_fee,
						onChange: (e) => set("shipping_fee", e.target.value)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 173,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 171,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
						className: "text-sm",
						children: "Peso (gramas)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 183,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Input, {
						className: "mt-1.5",
						type: "number",
						min: 0,
						value: value.weight_grams,
						onChange: (e) => set("weight_grams", e.target.value)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("label", {
						className: "sm:col-span-3 flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer",
						children: [/* @__PURE__ */ (void 0)("input", {
							type: "checkbox",
							className: "h-4 w-4 accent-primary",
							checked: value.requires_shipping,
							onChange: (e) => set("requires_shipping", e.target.checked)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 193,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "text-sm",
							children: "Exigir endereço de entrega no checkout"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 192,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 160,
				columnNumber: 9
			}, this),
			value.delivery_kind === "apk" && /* @__PURE__ */ (void 0)("div", {
				className: "grid sm:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
						className: "text-sm",
						children: "Versão"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Input, {
						className: "mt-1.5",
						value: value.app_version,
						onChange: (e) => set("app_version", e.target.value),
						placeholder: "1.4.2"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
						className: "text-sm",
						children: "Pacote / bundle"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 216,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Input, {
						className: "mt-1.5",
						value: value.app_package,
						onChange: (e) => set("app_package", e.target.value),
						placeholder: "com.minhaapp.pro"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 215,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (void 0)(Label, {
							className: "text-sm",
							children: "Requisitos"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 225,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)(Textarea, {
							className: "mt-1.5",
							rows: 3,
							value: value.app_requirements,
							onChange: (e) => set("app_requirements", e.target.value),
							placeholder: "Android 8+ · 120 MB livres"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 205,
				columnNumber: 9
			}, this),
			(value.delivery_kind === "assinatura" || value.is_subscription) && /* @__PURE__ */ (void 0)("div", {
				className: "grid sm:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
						className: "text-sm",
						children: "Intervalo de cobrança"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "mt-1.5",
						children: /* @__PURE__ */ (void 0)(Select, {
							value: value.billing_interval,
							onValueChange: (v) => set("billing_interval", v),
							children: [/* @__PURE__ */ (void 0)(SelectTrigger, { children: /* @__PURE__ */ (void 0)(SelectValue, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 249,
								columnNumber: 19
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(SelectContent, { children: [
								/* @__PURE__ */ (void 0)(SelectItem, {
									value: "mensal",
									children: "Mensal"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(SelectItem, {
									value: "trimestral",
									children: "Trimestral"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 253,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(SelectItem, {
									value: "semestral",
									children: "Semestral"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(SelectItem, {
									value: "anual",
									children: "Anual"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 251,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 242,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 241,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
						className: "text-sm",
						children: "Valor por ciclo (Kz)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 261,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Input, {
						className: "mt-1.5",
						type: "number",
						min: 0,
						step: "0.01",
						value: value.subscription_price,
						onChange: (e) => set("subscription_price", e.target.value)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 262,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 260,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
						className: "text-sm",
						children: "Dias de teste grátis"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 272,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Input, {
						className: "mt-1.5",
						type: "number",
						min: 0,
						max: 90,
						value: value.trial_days,
						onChange: (e) => set("trial_days", e.target.value)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 273,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 271,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 238,
				columnNumber: 9
			}, this),
			value.delivery_kind !== "membros" && /* @__PURE__ */ (void 0)("label", {
				className: "flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer",
				children: [/* @__PURE__ */ (void 0)("input", {
					type: "checkbox",
					className: "h-4 w-4 accent-primary",
					checked: value.has_members_area,
					onChange: (e) => set("has_members_area", e.target.checked)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 287,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("span", {
					className: "text-sm",
					children: "Ativar também área de membros para este produto"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 293,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 286,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 128,
		columnNumber: 5
	}, this);
}
//#endregion
export { emptyDelivery as i, deliveryFromRow as n, deliveryPayload as r, DeliveryFields as t };
