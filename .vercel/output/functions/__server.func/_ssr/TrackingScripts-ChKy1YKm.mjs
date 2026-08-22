import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { n as booleanType, o as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TrackingScripts-ChKy1YKm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/** Public: pixel/analytics IDs for a product page (product override > producer defaults). */
var getProductTracking = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType().min(1) }).parse(d)).handler(createSsrRpc("2bde35afd1c3a6fac7609ae260ff4d5ccc3e3c3c8d3e14b3d9be14ab75e0787e"));
/** Public: tracking payload for the order page + server-side UTMify/CAPI dispatch when paid. */
var getOrderTracking = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	token: stringType().min(10),
	notify: booleanType().optional()
}).parse(d)).handler(createSsrRpc("46ceb3ad4636b44a954ed95b19f034734b17c66deaeaeaaff947116385741b8d"));
function loadScript(src, id) {
	if (document.getElementById(id)) return;
	const s = document.createElement("script");
	s.id = id;
	s.async = true;
	s.src = src;
	document.head.appendChild(s);
}
function ensureMeta(pixelId) {
	if (!window.fbq) {
		const n = (...args) => {
			if (n.callMethod) n.callMethod(...args);
			else n.queue.push(args);
		};
		n.queue = [];
		n.loaded = true;
		n.version = "2.0";
		window.fbq = n;
		loadScript("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel-src");
	}
	if (!window._fbqLoaded) {
		window.fbq?.("init", pixelId);
		window._fbqLoaded = true;
	}
}
function ensureGtag(id) {
	window.dataLayer = window.dataLayer || [];
	if (!window.gtag) {
		window.gtag = function gtag(...args) {
			window.dataLayer.push(args);
		};
		window.gtag("js", /* @__PURE__ */ new Date());
	}
	window._gtagLoaded = window._gtagLoaded || {};
	if (!window._gtagLoaded[id]) {
		loadScript(`https://www.googletagmanager.com/gtag/js?id=${id}`, `gtag-src-${id}`);
		window.gtag("config", id);
		window._gtagLoaded[id] = true;
	}
}
/** Guarda global (sobrevive a re-renders, refetch e navegação SPA). */
var firedKeys = /* @__PURE__ */ new Set();
function alreadyFired(key, persist) {
	if (firedKeys.has(key)) return true;
	if (persist && typeof window !== "undefined") try {
		if (window.sessionStorage.getItem(key) === "1") {
			firedKeys.add(key);
			return true;
		}
		window.sessionStorage.setItem(key, "1");
	} catch {}
	firedKeys.add(key);
	return false;
}
/**
* Injects the producer's Meta Pixel / GA4 / Google Ads tags and fires
* PageView + the given event exactly once per user action.
*/
function TrackingScripts({ config, event }) {
	(0, import_react.useEffect)(() => {
		if (!config) return;
		const { meta_pixel_id, ga_measurement_id, google_ads_id, google_ads_label } = config;
		const path = typeof window !== "undefined" ? window.location.pathname : "";
		if (meta_pixel_id) {
			ensureMeta(meta_pixel_id);
			if (!alreadyFired(`ip_pv_${meta_pixel_id}_${path}`, false)) window.fbq?.("track", "PageView");
		}
		if (ga_measurement_id) ensureGtag(ga_measurement_id);
		if (google_ads_id) ensureGtag(google_ads_id);
		if (!event) return;
		const persist = event.type === "Purchase";
		if (alreadyFired(`ip_ev_${event.type}_${event.id}`, persist)) return;
		if (meta_pixel_id) window.fbq?.("track", event.type, {
			content_ids: [event.id],
			content_name: event.name,
			content_type: "product",
			value: event.value,
			currency: event.currency
		});
		if (ga_measurement_id) {
			const gaEvent = event.type === "Purchase" ? "purchase" : event.type === "InitiateCheckout" ? "begin_checkout" : "view_item";
			window.gtag?.("event", gaEvent, {
				send_to: ga_measurement_id,
				transaction_id: event.type === "Purchase" ? event.id : void 0,
				value: event.value,
				currency: event.currency,
				items: [{
					item_id: event.id,
					item_name: event.name,
					price: event.value
				}]
			});
		}
		if (event.type === "Purchase" && google_ads_id) window.gtag?.("event", "conversion", {
			send_to: google_ads_label ? `${google_ads_id}/${google_ads_label}` : google_ads_id,
			value: event.value,
			currency: event.currency,
			transaction_id: event.id
		});
	}, [
		config,
		event?.type,
		event?.id
	]);
	return null;
}
//#endregion
export { getOrderTracking as n, getProductTracking as r, TrackingScripts as t };
