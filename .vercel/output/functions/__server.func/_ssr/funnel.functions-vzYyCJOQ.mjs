import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { a as numberType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/funnel.functions-vzYyCJOQ.js
var offerSchema = objectType({
	product_id: stringType().uuid(),
	offer_product_id: stringType().uuid(),
	kind: enumType([
		"order_bump",
		"upsell",
		"downsell"
	]),
	headline: stringType().trim().max(160).optional().nullable(),
	description: stringType().trim().max(500).optional().nullable(),
	offer_price_cents: numberType().int().min(0).max(1e7),
	sort_order: numberType().int().min(0).max(99).default(0)
});
var couponSchema = objectType({
	code: stringType().trim().min(3).max(32).regex(/^[A-Za-z0-9_-]+$/),
	product_id: stringType().uuid().optional().nullable(),
	discount_kind: enumType(["percentagem", "valor"]),
	discount_value: numberType().int().min(1).max(1e6),
	max_uses: numberType().int().min(1).max(1e5).optional().nullable(),
	expires_at: stringType().optional().nullable()
});
var listMyOffers_createServerFn_handler = createServerRpc({
	id: "e07f221a081dde46ffd6b0aae63124488bcbe7c3fdfc768a88b0ca2fb25c3882",
	name: "listMyOffers",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => listMyOffers.__executeServer(opts));
var listMyOffers = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyOffers_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("product_offers").select("*, product:products!product_offers_product_id_fkey(title, slug), offer:products!product_offers_offer_product_id_fkey(title, slug, price_cents, cover_url)").eq("producer_id", context.userId).order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
});
var createOffer_createServerFn_handler = createServerRpc({
	id: "fe8089b63af3eb5765875f0453d5f0aba62f03fc8acaa4600ef29d731f22382a",
	name: "createOffer",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => createOffer.__executeServer(opts));
var createOffer = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => offerSchema.parse(d)).handler(createOffer_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("product_offers").insert({
		...data,
		producer_id: context.userId
	});
	if (error) throw error;
	return { ok: true };
});
var toggleOffer_createServerFn_handler = createServerRpc({
	id: "262e7fe1939dda471508afa3e3fd7a489f41e7ba5956871b2a3d414e55a5393b",
	name: "toggleOffer",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => toggleOffer.__executeServer(opts));
var toggleOffer = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	active: booleanType()
}).parse(d)).handler(toggleOffer_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("product_offers").update({ active: data.active }).eq("id", data.id).eq("producer_id", context.userId);
	if (error) throw error;
	return { ok: true };
});
var deleteOffer_createServerFn_handler = createServerRpc({
	id: "aacf02ca057dae06e3afb2400ff9ef04a3e2b510b84c9a393955f7d5bcb8c1c8",
	name: "deleteOffer",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => deleteOffer.__executeServer(opts));
var deleteOffer = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteOffer_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("product_offers").delete().eq("id", data.id).eq("producer_id", context.userId);
	if (error) throw error;
	return { ok: true };
});
var listMyCoupons_createServerFn_handler = createServerRpc({
	id: "a9db698ea5315e348d89c14eb0efe07eeb0919e555886360f8313f1ad84be38d",
	name: "listMyCoupons",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => listMyCoupons.__executeServer(opts));
var listMyCoupons = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyCoupons_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("coupons").select("*, product:products(title, slug)").eq("producer_id", context.userId).order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
});
var createCoupon_createServerFn_handler = createServerRpc({
	id: "a18cffc55619a9487ec4389fe623e23c2dc52d82158cf5d878baf972d902604c",
	name: "createCoupon",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => createCoupon.__executeServer(opts));
var createCoupon = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => couponSchema.parse(d)).handler(createCoupon_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("coupons").insert({
		...data,
		code: data.code.toUpperCase(),
		product_id: data.product_id || null,
		expires_at: data.expires_at || null,
		producer_id: context.userId
	});
	if (error) throw error;
	return { ok: true };
});
var toggleCoupon_createServerFn_handler = createServerRpc({
	id: "6ffdff116971f8d3c439cbe9d9e5845b3e3719213f79bd3d1d0c8954ae836cd1",
	name: "toggleCoupon",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => toggleCoupon.__executeServer(opts));
var toggleCoupon = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	active: booleanType()
}).parse(d)).handler(toggleCoupon_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("coupons").update({ active: data.active }).eq("id", data.id).eq("producer_id", context.userId);
	if (error) throw error;
	return { ok: true };
});
var deleteCoupon_createServerFn_handler = createServerRpc({
	id: "ab4cbea18a9dfdbcda2b98e1e122c91a7f6eab757c4a531b2524fea44b9cefa3",
	name: "deleteCoupon",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => deleteCoupon.__executeServer(opts));
var deleteCoupon = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteCoupon_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("coupons").delete().eq("id", data.id).eq("producer_id", context.userId);
	if (error) throw error;
	return { ok: true };
});
var getCheckoutOffers_createServerFn_handler = createServerRpc({
	id: "6785116399a54d2160ec81f89d732ce2d1187de747231b480d3daf4ec16a7478",
	name: "getCheckoutOffers",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => getCheckoutOffers.__executeServer(opts));
var getCheckoutOffers = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ product_id: stringType().uuid() }).parse(d)).handler(getCheckoutOffers_createServerFn_handler, async ({ data }) => {
	const { createServerPublicClient } = await import("./public-client.server-DmY71YNi.mjs");
	const supabase = createServerPublicClient();
	const { data: rows, error } = await supabase.from("product_offers").select("id, kind, headline, description, offer_price_cents, sort_order, offer_product_id").eq("product_id", data.product_id).eq("active", true).order("sort_order", { ascending: true });
	if (error || !rows || rows.length === 0) return [];
	const offerProductIds = rows.map((r) => r.offer_product_id).filter(Boolean);
	const productsMap = {};
	if (offerProductIds.length > 0) {
		const { data: prods } = await supabase.from("products").select("id, title, slug, cover_url, price_cents, promo_price_cents, currency").in("id", offerProductIds);
		if (prods) prods.forEach((p) => {
			productsMap[p.id] = p;
		});
	}
	return rows.map((r) => ({
		...r,
		offer: productsMap[r.offer_product_id] || null
	}));
});
var validateCoupon_createServerFn_handler = createServerRpc({
	id: "7bba544c8e84d2cae6d38754ed415b767c0609ca660f1eb16287ef9401080450",
	name: "validateCoupon",
	filename: "src/lib/funnel.functions.ts"
}, (opts) => validateCoupon.__executeServer(opts));
var validateCoupon = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	code: stringType().trim().min(3).max(32),
	product_id: stringType().uuid(),
	amount_cents: numberType().int().min(0)
}).parse(d)).handler(validateCoupon_createServerFn_handler, async ({ data }) => {
	const { createServerPublicClient } = await import("./public-client.server-DmY71YNi.mjs");
	const { data: rows } = await createServerPublicClient().from("coupons").select("id, code, discount_kind, discount_value, max_uses, uses_count, product_id, expires_at, active").eq("code", data.code.toUpperCase()).eq("active", true).limit(5);
	const c = (rows ?? []).find((r) => !r.product_id || r.product_id === data.product_id);
	if (!c) return {
		valid: false,
		reason: "Cupão inválido."
	};
	if (c.expires_at && new Date(c.expires_at) < /* @__PURE__ */ new Date()) return {
		valid: false,
		reason: "Cupão expirado."
	};
	if (c.max_uses != null && c.uses_count >= c.max_uses) return {
		valid: false,
		reason: "Cupão esgotado."
	};
	const discount = c.discount_kind === "percentagem" ? Math.min(data.amount_cents, Math.round(data.amount_cents * c.discount_value / 100)) : Math.min(data.amount_cents, c.discount_value * 100);
	return {
		valid: true,
		code: c.code,
		discount_cents: discount
	};
});
//#endregion
export { createCoupon_createServerFn_handler, createOffer_createServerFn_handler, deleteCoupon_createServerFn_handler, deleteOffer_createServerFn_handler, getCheckoutOffers_createServerFn_handler, listMyCoupons_createServerFn_handler, listMyOffers_createServerFn_handler, toggleCoupon_createServerFn_handler, toggleOffer_createServerFn_handler, validateCoupon_createServerFn_handler };
