import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { a as numberType, i as literalType, n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.functions-CKBjbvSb.js
var productSchema = objectType({
	title: stringType().trim().min(3).max(160),
	slug: stringType().trim().min(3).max(160).regex(/^[a-z0-9-]+$/),
	short_description: stringType().trim().max(280).optional().nullable(),
	description: stringType().trim().max(2e4).optional().nullable(),
	product_type: enumType([
		"ebook",
		"curso",
		"pdf",
		"video",
		"software",
		"link_externo",
		"streaming",
		"assinatura",
		"template",
		"ia",
		"comunidade",
		"download"
	]),
	category_id: stringType().uuid().optional().nullable(),
	cover_url: stringType().url().optional().nullable().or(literalType("")),
	banner_url: stringType().url().optional().nullable().or(literalType("")),
	file_url: stringType().url().optional().nullable().or(literalType("")),
	price_cents: numberType().int().min(0).max(1e7),
	promo_price_cents: numberType().int().min(0).max(1e7).optional().nullable(),
	currency: stringType().length(3).default("AOA"),
	status: enumType([
		"rascunho",
		"publicado",
		"pausado",
		"em_analise"
	]).default("rascunho"),
	tags: arrayType(stringType().max(40)).max(20).default([]),
	external_url: stringType().url().optional().nullable().or(literalType("")),
	guarantee_days: numberType().int().min(0).max(60).default(7),
	delivery_kind: enumType([
		"digital",
		"fisico",
		"apk",
		"assinatura",
		"membros",
		"externo"
	]).default("digital"),
	stock_quantity: numberType().int().min(0).max(1e6).optional().nullable(),
	requires_shipping: booleanType().default(false),
	shipping_fee_cents: numberType().int().min(0).max(1e7).default(0),
	weight_grams: numberType().int().min(0).max(2e5).optional().nullable(),
	app_version: stringType().trim().max(40).optional().nullable(),
	app_package: stringType().trim().max(120).optional().nullable(),
	app_requirements: stringType().trim().max(500).optional().nullable(),
	is_subscription: booleanType().default(false),
	billing_interval: enumType([
		"mensal",
		"trimestral",
		"semestral",
		"anual"
	]).optional().nullable(),
	subscription_price_cents: numberType().int().min(0).max(1e7).optional().nullable(),
	trial_days: numberType().int().min(0).max(90).default(0),
	has_members_area: booleanType().default(false),
	allow_affiliates: booleanType().default(false),
	affiliate_commission_percent: numberType().min(0).max(80).default(30)
});
var listMyProducts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("c3a3f8fd54bed5c3c18878cf597e1726f939d42d6e720d943bfbd97a6ac28112"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("5b7a26d327af06680cbe9bbb0a9b6df0368abd96ce8d3565d048f7c25b18f817"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("6be89eb75e13139ff16a2fca08c9edb3578d894d1a17134c77e8c94427c8577a"));
var getMyProduct = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("0417bfb138d4b3852bfb19d78c9f7b3d67d83518b167c752e75eedc44ae0b17d"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => productSchema.parse(d)).handler(createSsrRpc("acc80f592bb436c21cdce6e1d5d6087ef2a2f0e66f3aa25c96c83356a4766324"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	patch: productSchema.partial()
}).parse(d)).handler(createSsrRpc("f60c4de8a0e072d909272f117a614a338a7ea53e6c76d97da6da447680f2ec9c"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("154b8633eea94111b40f7036631572cb49e5f458d27dce468c3338ae0c0dc0db"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("dfe8841e054645246d499c8e8d067aca5fa30cf76f3892cea4504ebbd6f501d6"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("759c8655a7a5a17cd88060da7b5a4fde232f408253648a416a2bf9da6220de48"));
//#endregion
export { listMyProducts as n, getMyProduct as t };
