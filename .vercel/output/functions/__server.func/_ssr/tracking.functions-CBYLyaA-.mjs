import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { n as booleanType, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tracking.functions-CBYLyaA-.js
var getProductTracking_createServerFn_handler = createServerRpc({
	id: "2bde35afd1c3a6fac7609ae260ff4d5ccc3e3c3c8d3e14b3d9be14ab75e0787e",
	name: "getProductTracking",
	filename: "src/lib/tracking.functions.ts"
}, (opts) => getProductTracking.__executeServer(opts));
var getProductTracking = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType().min(1) }).parse(d)).handler(getProductTracking_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-ZrdrXq7H.mjs");
	const empty = {
		meta_pixel_id: null,
		ga_measurement_id: null,
		google_ads_id: null,
		google_ads_label: null
	};
	const { data: product } = await supabaseAdmin.from("products").select("producer_id, status, meta_pixel_id, ga_measurement_id, google_ads_label").eq("slug", data.slug).maybeSingle();
	if (!product || product.status !== "publicado") return empty;
	const { data: integ } = await supabaseAdmin.from("user_integrations").select("meta_pixel_id, ga_measurement_id, google_ads_id, google_ads_label").eq("user_id", product.producer_id).maybeSingle();
	return {
		meta_pixel_id: product.meta_pixel_id || integ?.meta_pixel_id || null,
		ga_measurement_id: product.ga_measurement_id || integ?.ga_measurement_id || null,
		google_ads_id: integ?.google_ads_id || null,
		google_ads_label: product.google_ads_label || integ?.google_ads_label || null
	};
});
var getOrderTracking_createServerFn_handler = createServerRpc({
	id: "46ceb3ad4636b44a954ed95b19f034734b17c66deaeaeaaff947116385741b8d",
	name: "getOrderTracking",
	filename: "src/lib/tracking.functions.ts"
}, (opts) => getOrderTracking.__executeServer(opts));
var getOrderTracking = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	token: stringType().min(10),
	notify: booleanType().optional()
}).parse(d)).handler(getOrderTracking_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-ZrdrXq7H.mjs");
	const { data: sale } = await supabaseAdmin.from("sales").select("id, status, gross_cents, currency, buyer_name, buyer_email, buyer_phone, payment_method, created_at, paid_at, producer_id, product:products(id, title, slug, meta_pixel_id, ga_measurement_id, google_ads_label, utmify_token)").eq("access_token", data.token).maybeSingle();
	if (!sale) return null;
	const product = sale.product;
	const { data: integ } = await supabaseAdmin.from("user_integrations").select("meta_pixel_id, meta_capi_token, ga_measurement_id, google_ads_id, google_ads_label, utmify_token").eq("user_id", sale.producer_id).maybeSingle();
	const cfg = {
		meta_pixel_id: product?.meta_pixel_id || integ?.meta_pixel_id || null,
		ga_measurement_id: product?.ga_measurement_id || integ?.ga_measurement_id || null,
		google_ads_id: integ?.google_ads_id || null,
		google_ads_label: product?.google_ads_label || integ?.google_ads_label || null,
		status: sale.status,
		value: sale.gross_cents / 100,
		currency: sale.currency,
		content_id: product?.id ?? "",
		content_name: product?.title ?? ""
	};
	if (data.notify && sale.status === "pago") {
		const utmifyToken = product?.utmify_token || integ?.utmify_token || null;
		const capiToken = integ?.meta_capi_token || null;
		await Promise.allSettled([utmifyToken ? fetch("https://api.utmify.com.br/api-credentials/orders", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"x-api-token": utmifyToken
			},
			body: JSON.stringify({
				orderId: sale.id,
				platform: "InfroPay",
				paymentMethod: sale.payment_method,
				status: "paid",
				createdAt: sale.created_at,
				approvedDate: sale.paid_at,
				customer: {
					name: sale.buyer_name,
					email: sale.buyer_email,
					phone: sale.buyer_phone,
					country: "AO"
				},
				products: [{
					id: product?.id,
					name: product?.title,
					quantity: 1,
					priceInCents: sale.gross_cents
				}],
				commission: {
					totalPriceInCents: sale.gross_cents,
					currency: sale.currency
				}
			})
		}).catch(() => null) : null, capiToken && cfg.meta_pixel_id ? fetch(`https://graph.facebook.com/v19.0/${cfg.meta_pixel_id}/events?access_token=${capiToken}`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ data: [{
				event_name: "Purchase",
				event_time: Math.floor(Date.now() / 1e3),
				event_id: sale.id,
				action_source: "website",
				custom_data: {
					value: cfg.value,
					currency: cfg.currency
				}
			}] })
		}).catch(() => null) : null]);
	}
	return cfg;
});
//#endregion
export { getOrderTracking_createServerFn_handler, getProductTracking_createServerFn_handler };
