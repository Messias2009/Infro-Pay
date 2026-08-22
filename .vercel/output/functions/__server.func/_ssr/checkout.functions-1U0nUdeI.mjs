import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout.functions-1U0nUdeI.js
function pub() {
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var createOrderSchema = objectType({
	product_slug: stringType().min(1),
	buyer_name: stringType().trim().min(2).max(120),
	buyer_email: stringType().trim().email().max(180),
	buyer_phone: stringType().trim().min(6).max(40),
	payment_method: enumType([
		"multicaixa_express",
		"referencia",
		"transferencia"
	]),
	ref: stringType().trim().min(4).max(40).optional().nullable(),
	order_bump_offer_id: stringType().uuid().optional().nullable()
});
var createOrder_createServerFn_handler = createServerRpc({
	id: "06d5162b8305b43f6214c879b78a9e70f49074c90c7b326749aa9214a4924dc5",
	name: "createOrder",
	filename: "src/lib/checkout.functions.ts"
}, (opts) => createOrder.__executeServer(opts));
var createOrder = createServerFn({ method: "POST" }).inputValidator((d) => createOrderSchema.parse(d)).handler(createOrder_createServerFn_handler, async ({ data }) => {
	const supabase = pub();
	const { data: product, error: pErr } = await supabase.from("products").select("id, producer_id, price_cents, promo_price_cents, currency, status, allow_affiliates, affiliate_commission_percent").eq("slug", data.product_slug).maybeSingle();
	if (pErr) throw pErr;
	if (!product || product.status !== "publicado") throw new Error("Produto indisponível");
	const baseGross = product.promo_price_cents && product.promo_price_cents < product.price_cents ? product.promo_price_cents : product.price_cents;
	let bumpCents = 0;
	let bumpOfferProductId = null;
	if (data.order_bump_offer_id) {
		const { data: offer } = await supabase.from("product_offers").select("id, offer_product_id, offer_price_cents, active, product_id").eq("id", data.order_bump_offer_id).eq("product_id", product.id).eq("active", true).maybeSingle();
		if (offer) {
			bumpCents = offer.offer_price_cents || 0;
			bumpOfferProductId = offer.offer_product_id;
		}
	}
	const gross = baseGross + bumpCents;
	const fee = Math.round(gross * .02);
	let affiliateId = null;
	let affiliateCode = null;
	let affiliateCommission = 0;
	if (data.ref && product.allow_affiliates) {
		const { data: link } = await supabase.from("affiliate_links").select("affiliate_id, product_id, code").eq("code", data.ref).maybeSingle();
		if (link && link.product_id === product.id && link.affiliate_id !== product.producer_id) {
			affiliateId = link.affiliate_id;
			affiliateCode = link.code;
			affiliateCommission = Math.round(baseGross * Number(product.affiliate_commission_percent ?? 0) / 100);
		}
	}
	const net = gross - fee - affiliateCommission;
	const { data: sale, error } = await supabase.from("sales").insert({
		product_id: product.id,
		producer_id: product.producer_id,
		buyer_name: data.buyer_name,
		buyer_email: data.buyer_email,
		buyer_phone: data.buyer_phone,
		gross_cents: gross,
		platform_fee_cents: fee,
		net_cents: net,
		currency: product.currency,
		payment_method: data.payment_method,
		status: "pendente",
		origin: bumpOfferProductId ? `bump:${bumpOfferProductId}` : "checkout",
		affiliate_id: affiliateId,
		affiliate_code: affiliateCode,
		affiliate_commission_cents: affiliateCommission
	}).select("access_token").single();
	if (error) throw error;
	return { token: sale.access_token };
});
var getOrderByToken_createServerFn_handler = createServerRpc({
	id: "14888ff19711077aa789fb19a6b7cb05adbc393ec108769c1ff0dd32fc9b1ef2",
	name: "getOrderByToken",
	filename: "src/lib/checkout.functions.ts"
}, (opts) => getOrderByToken.__executeServer(opts));
var getOrderByToken = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ token: stringType().min(10) }).parse(d)).handler(getOrderByToken_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-ZrdrXq7H.mjs");
	const { data: sale, error } = await supabaseAdmin.from("sales").select("id, status, gross_cents, currency, payment_method, buyer_name, buyer_email, origin, created_at, paid_at, product:products(id, title, slug, cover_url, file_url, external_url, delivery_kind, has_members_area, guarantee_days)").eq("access_token", data.token).maybeSingle();
	if (error) throw error;
	if (!sale) return null;
	let bumpProduct = null;
	if (sale.origin && sale.origin.startsWith("bump:")) {
		const bumpId = sale.origin.replace("bump:", "");
		const { data: bProd } = await supabaseAdmin.from("products").select("id, title, slug, cover_url, file_url, external_url, delivery_kind, has_members_area").eq("id", bumpId).maybeSingle();
		bumpProduct = bProd;
	}
	return {
		...sale,
		bump_product: bumpProduct
	};
});
//#endregion
export { createOrder_createServerFn_handler, getOrderByToken_createServerFn_handler };
