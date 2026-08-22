import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { a as numberType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/funnel.functions-CzVEF5Dx.js
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
var listMyOffers = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("e07f221a081dde46ffd6b0aae63124488bcbe7c3fdfc768a88b0ca2fb25c3882"));
var createOffer = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => offerSchema.parse(d)).handler(createSsrRpc("fe8089b63af3eb5765875f0453d5f0aba62f03fc8acaa4600ef29d731f22382a"));
var toggleOffer = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	active: booleanType()
}).parse(d)).handler(createSsrRpc("262e7fe1939dda471508afa3e3fd7a489f41e7ba5956871b2a3d414e55a5393b"));
var deleteOffer = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("aacf02ca057dae06e3afb2400ff9ef04a3e2b510b84c9a393955f7d5bcb8c1c8"));
var listMyCoupons = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("a9db698ea5315e348d89c14eb0efe07eeb0919e555886360f8313f1ad84be38d"));
var createCoupon = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => couponSchema.parse(d)).handler(createSsrRpc("a18cffc55619a9487ec4389fe623e23c2dc52d82158cf5d878baf972d902604c"));
var toggleCoupon = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	active: booleanType()
}).parse(d)).handler(createSsrRpc("6ffdff116971f8d3c439cbe9d9e5845b3e3719213f79bd3d1d0c8954ae836cd1"));
var deleteCoupon = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("ab4cbea18a9dfdbcda2b98e1e122c91a7f6eab757c4a531b2524fea44b9cefa3"));
/** Public: order bumps / upsells shown on a checkout page. */
var getCheckoutOffers = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ product_id: stringType().uuid() }).parse(d)).handler(createSsrRpc("6785116399a54d2160ec81f89d732ce2d1187de747231b480d3daf4ec16a7478"));
createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	code: stringType().trim().min(3).max(32),
	product_id: stringType().uuid(),
	amount_cents: numberType().int().min(0)
}).parse(d)).handler(createSsrRpc("7bba544c8e84d2cae6d38754ed415b767c0609ca660f1eb16287ef9401080450"));
//#endregion
export { getCheckoutOffers as a, toggleCoupon as c, deleteOffer as i, toggleOffer as l, createOffer as n, listMyCoupons as o, deleteCoupon as r, listMyOffers as s, createCoupon as t };
