import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/affiliate.functions-CyspNj4z.js
function pub() {
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
/** Catálogo público de produtos abertos a afiliação. */
var listAffiliateOffers_createServerFn_handler = createServerRpc({
	id: "e3c20dcb46c8a205ec414540eeae495d5dc5c79d8c854f9c76f2b02ec153af6c",
	name: "listAffiliateOffers",
	filename: "src/lib/affiliate.functions.ts"
}, (opts) => listAffiliateOffers.__executeServer(opts));
var listAffiliateOffers = createServerFn({ method: "GET" }).handler(listAffiliateOffers_createServerFn_handler, async () => {
	const { data, error } = await pub().from("products").select("id, slug, title, cover_url, price_cents, promo_price_cents, currency, sales_count, affiliate_commission_percent, category:categories(name), producer:profiles!products_producer_id_fkey(full_name, username, avatar_url)").eq("allow_affiliates", true).eq("status", "publicado").order("sales_count", { ascending: false }).limit(60);
	if (error) throw error;
	return data ?? [];
});
var registerAffiliateClick_createServerFn_handler = createServerRpc({
	id: "40384c516644e6bf099b845c84cd515f66bd2c90020f1781531a63677b35a9f5",
	name: "registerAffiliateClick",
	filename: "src/lib/affiliate.functions.ts"
}, (opts) => registerAffiliateClick.__executeServer(opts));
var registerAffiliateClick = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ code: stringType().trim().min(4).max(40) }).parse(d)).handler(registerAffiliateClick_createServerFn_handler, async ({ data }) => {
	await pub().rpc("register_affiliate_click", { _code: data.code });
	return { ok: true };
});
function randomCode() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let out = "";
	for (let i = 0; i < 8; i++) out += alphabet[Math.floor(Math.random() * 32)];
	return out;
}
/** Gera (ou devolve) o link de afiliado do utilizador para um produto. */
var createAffiliateLink_createServerFn_handler = createServerRpc({
	id: "88d6d1034b99d5d47788bdd190029656b7b78e7a5980f8579708cbd761fb281d",
	name: "createAffiliateLink",
	filename: "src/lib/affiliate.functions.ts"
}, (opts) => createAffiliateLink.__executeServer(opts));
var createAffiliateLink = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ product_id: stringType().uuid() }).parse(d)).handler(createAffiliateLink_createServerFn_handler, async ({ data, context }) => {
	const { data: product, error: pErr } = await context.supabase.from("products").select("id, slug, producer_id, allow_affiliates, status").eq("id", data.product_id).maybeSingle();
	if (pErr) throw pErr;
	if (!product || !product.allow_affiliates || product.status !== "publicado") throw new Error("Este produto não aceita afiliados");
	if (product.producer_id === context.userId) throw new Error("Não pode afiliar-se ao seu próprio produto");
	const { data: existing } = await context.supabase.from("affiliate_links").select("id, code").eq("product_id", product.id).eq("affiliate_id", context.userId).maybeSingle();
	if (existing) return {
		code: existing.code,
		slug: product.slug
	};
	let lastError = null;
	for (let attempt = 0; attempt < 5; attempt++) {
		const code = randomCode();
		const { data: row, error } = await context.supabase.from("affiliate_links").insert({
			product_id: product.id,
			affiliate_id: context.userId,
			code
		}).select("code").single();
		if (!error) return {
			code: row.code,
			slug: product.slug
		};
		lastError = error;
	}
	throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error("Não foi possível gerar o link");
});
var getAffiliateOverview_createServerFn_handler = createServerRpc({
	id: "a58636fba6d2212f4827a1705dcf2b46c0c9791c9dd197b0076b47799dfaf9c0",
	name: "getAffiliateOverview",
	filename: "src/lib/affiliate.functions.ts"
}, (opts) => getAffiliateOverview.__executeServer(opts));
var getAffiliateOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAffiliateOverview_createServerFn_handler, async ({ context }) => {
	const [{ data: links }, { data: sales }] = await Promise.all([context.supabase.from("affiliate_links").select("id, code, clicks, created_at, product:products(id, slug, title, cover_url, currency, affiliate_commission_percent, price_cents, promo_price_cents)").eq("affiliate_id", context.userId).order("created_at", { ascending: false }), context.supabase.from("sales").select("id, status, gross_cents, affiliate_commission_cents, currency, created_at, product:products(title, slug)").eq("affiliate_id", context.userId).order("created_at", { ascending: false }).limit(200)]);
	const rows = sales ?? [];
	const paid = rows.filter((s) => s.status === "pago");
	const pending = rows.filter((s) => s.status === "pendente");
	const byLink = /* @__PURE__ */ new Map();
	for (const s of paid) {
		const key = s.product?.slug ?? "";
		const cur = byLink.get(key) ?? {
			sales: 0,
			earned: 0
		};
		byLink.set(key, {
			sales: cur.sales + 1,
			earned: cur.earned + (s.affiliate_commission_cents ?? 0)
		});
	}
	const clicks = (links ?? []).reduce((a, l) => a + (l.clicks ?? 0), 0);
	const earned = paid.reduce((a, s) => a + (s.affiliate_commission_cents ?? 0), 0);
	const pendingCents = pending.reduce((a, s) => a + (s.affiliate_commission_cents ?? 0), 0);
	return {
		clicks,
		salesCount: paid.length,
		earnedCents: earned,
		pendingCents,
		conversion: clicks ? paid.length / clicks : 0,
		links: (links ?? []).map((l) => ({
			...l,
			stats: byLink.get(l.product?.slug ?? "") ?? {
				sales: 0,
				earned: 0
			}
		})),
		recent: rows.slice(0, 20)
	};
});
//#endregion
export { createAffiliateLink_createServerFn_handler, getAffiliateOverview_createServerFn_handler, listAffiliateOffers_createServerFn_handler, registerAffiliateClick_createServerFn_handler };
