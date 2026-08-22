import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { a as numberType, i as literalType, n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.functions-B1f5KbKz.js
var RULES = [
	{
		label: "conteúdo ilegal ou proibido",
		patterns: [
			/\b(pornograf\w*|pedofil\w*|zoofil\w*|incesto)\b/i,
			/\b(cocaina|coca[íi]na|heroina|hero[íi]na|metanfetamina|maconha|drogas?\s+(ilegais|pesadas))\b/i,
			/\b(arma de fogo|armas de fogo|munic[õo]es|explosivos?|granada)\b/i,
			/\b(documentos? falsos?|passaporte falso|bi falso|diploma falso|certificado falso)\b/i,
			/\b(dinheiro falso|notas falsas)\b/i,
			/\b(marfim|[óo]rg[ãa]os? humanos?|tr[áa]fico)\b/i
		]
	},
	{
		label: "fraude ou esquema financeiro proibido",
		patterns: [
			/\b(esquema (de )?pir[âa]mide|pirâmide financeira|ponzi)\b/i,
			/\b(hack\w*|crack\w*|keygen|nulled|licen[çc]as? pirata\w*|serial crackeado)\b/i,
			/\b(cart[õo]es? clonad\w*|cc full|carding|lavagem de dinheiro)\b/i,
			/\b(rendimento garantido|lucro garantido|ganho garantido|100% de lucro|dinheiro f[áa]cil garantido)\b/i,
			/\b(dobre o seu dinheiro|triplique o seu dinheiro)\b/i
		]
	},
	{
		label: "spam ou descrição enganosa",
		patterns: [
			/(?:https?:\/\/\S+\s*){6,}/i,
			/\b(clique aqui agora){2,}/i,
			/(.)\1{14,}/,
			/\b(ganhe \d{5,}\s*kz por dia)\b/i
		]
	}
];
/** Domínios de encurtadores/hospedagem opaca frequentemente usados para links maliciosos. */
var BLOCKED_HOSTS = [
	"bit.ly",
	"tinyurl.com",
	"cutt.ly",
	"is.gd",
	"t.co",
	"shorturl.at",
	"adf.ly",
	"shrinkme.io",
	"ouo.io",
	"linkvertise.com",
	"grabify.link"
];
function hosts(text) {
	const out = [];
	for (const m of text.matchAll(/https?:\/\/([^/\s"'<>)]+)/gi)) out.push(m[1].toLowerCase().replace(/^www\./, ""));
	return out;
}
function moderateProduct(input) {
	const title = (input.title ?? "").trim();
	const short = (input.short_description ?? "").trim();
	const desc = (input.description ?? "").trim();
	if (title.length < 5) return {
		ok: false,
		reason: "O título é demasiado curto. Use um título claro com pelo menos 5 caracteres."
	};
	if (!short && desc.length < 40) return {
		ok: false,
		reason: "Adicione uma descrição do produto (mínimo 40 caracteres) ou uma descrição curta antes de publicar."
	};
	if (/\b(teste|test|asdf|lorem ipsum)\b/i.test(title) && title.length < 20) return {
		ok: false,
		reason: "O título parece ser de teste. Use o nome real do produto."
	};
	const blob = [
		title,
		short,
		desc,
		(input.tags ?? []).join(" ")
	].join("\n");
	for (const rule of RULES) for (const re of rule.patterns) if (re.test(blob)) return {
		ok: false,
		reason: `Publicação bloqueada pela validação automática: ${rule.label}. Reveja o título, a descrição e as etiquetas e submeta novamente.`
	};
	const bad = [
		...hosts(blob),
		...hosts(input.external_url ?? ""),
		...hosts(input.file_url ?? "")
	].find((h) => BLOCKED_HOSTS.some((b) => h === b || h.endsWith("." + b)));
	if (bad) return {
		ok: false,
		reason: `Link não permitido (${bad}). Não são aceites encurtadores de links — use o endereço final e verificável.`
	};
	for (const url of [input.external_url, input.file_url]) if (url && /^http:\/\//i.test(url)) return {
		ok: false,
		reason: "Os links do produto devem usar HTTPS por segurança."
	};
	return { ok: true };
}
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
var listMyProducts_createServerFn_handler = createServerRpc({
	id: "c3a3f8fd54bed5c3c18878cf597e1726f939d42d6e720d943bfbd97a6ac28112",
	name: "listMyProducts",
	filename: "src/lib/products.functions.ts"
}, (opts) => listMyProducts.__executeServer(opts));
var listMyProducts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyProducts_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("products").select("id, slug, title, status, price_cents, promo_price_cents, currency, sales_count, views_count, cover_url, rejection_reason, created_at, allow_affiliates, affiliate_commission_percent, has_members_area, category:categories(name)").eq("producer_id", context.userId).order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
});
var getMyProductMetrics_createServerFn_handler = createServerRpc({
	id: "5b7a26d327af06680cbe9bbb0a9b6df0368abd96ce8d3565d048f7c25b18f817",
	name: "getMyProductMetrics",
	filename: "src/lib/products.functions.ts"
}, (opts) => getMyProductMetrics.__executeServer(opts));
var getMyProductMetrics = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyProductMetrics_createServerFn_handler, async ({ context }) => {
	const [{ data: products }, { data: sales }] = await Promise.all([context.supabase.from("products").select("id, title, slug, views_count, cover_url, price_cents, currency, status").eq("producer_id", context.userId).order("created_at", { ascending: false }), context.supabase.from("sales").select("product_id, gross_cents, net_cents, affiliate_commission_cents, status, released").eq("producer_id", context.userId)]);
	const ids = (products ?? []).map((p) => p.id);
	const { data: allLinks } = ids.length ? await context.supabase.from("affiliate_links").select("product_id, affiliate_id, clicks").in("product_id", ids) : { data: [] };
	return (products ?? []).map((p) => {
		const paid = (sales ?? []).filter((x) => x.product_id === p.id).filter((x) => x.status === "pago");
		const l = (allLinks ?? []).filter((x) => x.product_id === p.id);
		const clicks = l.reduce((a, x) => a + (x.clicks ?? 0), 0);
		const views = p.views_count ?? 0;
		const base = views + clicks;
		const commissionPaid = paid.filter((x) => x.released).reduce((a, x) => a + (x.affiliate_commission_cents ?? 0), 0);
		const commissionPending = paid.filter((x) => !x.released).reduce((a, x) => a + (x.affiliate_commission_cents ?? 0), 0);
		return {
			id: p.id,
			title: p.title,
			slug: p.slug,
			cover_url: p.cover_url,
			currency: p.currency,
			status: p.status,
			views,
			clicks,
			sales: paid.length,
			revenue: paid.reduce((a, x) => a + (x.gross_cents ?? 0), 0),
			net: paid.reduce((a, x) => a + (x.net_cents ?? 0), 0),
			conversion: base > 0 ? paid.length / base * 100 : 0,
			activeAffiliates: new Set(l.map((x) => x.affiliate_id)).size,
			commissionPaid,
			commissionPending
		};
	});
});
var duplicateProduct_createServerFn_handler = createServerRpc({
	id: "6be89eb75e13139ff16a2fca08c9edb3578d894d1a17134c77e8c94427c8577a",
	name: "duplicateProduct",
	filename: "src/lib/products.functions.ts"
}, (opts) => duplicateProduct.__executeServer(opts));
var duplicateProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(duplicateProduct_createServerFn_handler, async ({ data, context }) => {
	const { data: row, error } = await context.supabase.from("products").select("*").eq("id", data.id).eq("producer_id", context.userId).maybeSingle();
	if (error) throw error;
	if (!row) throw new Error("Produto não encontrado");
	const { id: _id, created_at: _c, updated_at: _u, sales_count: _s, views_count: _v, reviews_count: _r, rating: _rt, rejection_reason: _rr, slug, title, ...rest } = row;
	const suffix = Date.now().toString(36).slice(-4);
	const { data: created, error: iErr } = await context.supabase.from("products").insert({
		...rest,
		producer_id: context.userId,
		title: `${title} (cópia)`,
		slug: `${slug}-copia-${suffix}`.slice(0, 160),
		status: "rascunho"
	}).select("id, slug").single();
	if (iErr) throw iErr;
	return created;
});
var getMyProduct_createServerFn_handler = createServerRpc({
	id: "0417bfb138d4b3852bfb19d78c9f7b3d67d83518b167c752e75eedc44ae0b17d",
	name: "getMyProduct",
	filename: "src/lib/products.functions.ts"
}, (opts) => getMyProduct.__executeServer(opts));
var getMyProduct = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(getMyProduct_createServerFn_handler, async ({ data, context }) => {
	const { data: row, error } = await context.supabase.from("products").select("*").eq("id", data.id).eq("producer_id", context.userId).maybeSingle();
	if (error) throw error;
	if (!row) throw new Error("Produto não encontrado");
	return row;
});
var createProduct_createServerFn_handler = createServerRpc({
	id: "acc80f592bb436c21cdce6e1d5d6087ef2a2f0e66f3aa25c96c83356a4766324",
	name: "createProduct",
	filename: "src/lib/products.functions.ts"
}, (opts) => createProduct.__executeServer(opts));
var createProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => productSchema.parse(d)).handler(createProduct_createServerFn_handler, async ({ data, context }) => {
	await context.supabase.from("user_roles").upsert({
		user_id: context.userId,
		role: "producer"
	}, {
		onConflict: "user_id,role",
		ignoreDuplicates: true
	});
	let status = data.status;
	const rejection_reason = null;
	if (status === "publicado" || status === "em_analise") {
		const verdict = moderateProduct(data);
		if (!verdict.ok) throw new Error(verdict.reason);
		status = "publicado";
	}
	const insert = {
		...data,
		status,
		rejection_reason,
		cover_url: data.cover_url || null,
		banner_url: data.banner_url || null,
		file_url: data.file_url || null,
		external_url: data.external_url || null,
		producer_id: context.userId
	};
	const { data: row, error } = await context.supabase.from("products").insert(insert).select("id, slug, status").single();
	if (error) throw error;
	return row;
});
var updateProduct_createServerFn_handler = createServerRpc({
	id: "f60c4de8a0e072d909272f117a614a338a7ea53e6c76d97da6da447680f2ec9c",
	name: "updateProduct",
	filename: "src/lib/products.functions.ts"
}, (opts) => updateProduct.__executeServer(opts));
var updateProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	patch: productSchema.partial()
}).parse(d)).handler(updateProduct_createServerFn_handler, async ({ data, context }) => {
	const patch = { ...data.patch };
	for (const k of [
		"cover_url",
		"banner_url",
		"file_url",
		"external_url"
	]) if (patch[k] === "") patch[k] = null;
	if (patch.status === "publicado" || patch.status === "em_analise") {
		const { data: current } = await context.supabase.from("products").select("title, short_description, description, external_url, file_url, tags, price_cents").eq("id", data.id).eq("producer_id", context.userId).maybeSingle();
		const verdict = moderateProduct({
			...current ?? {},
			...patch
		});
		if (!verdict.ok) {
			await context.supabase.from("products").update({
				status: "rascunho",
				rejection_reason: verdict.reason
			}).eq("id", data.id).eq("producer_id", context.userId);
			throw new Error(verdict.reason);
		}
		patch.status = "publicado";
		patch.rejection_reason = null;
	}
	const { data: row, error } = await context.supabase.from("products").update(patch).eq("id", data.id).eq("producer_id", context.userId).select("id, slug, status").single();
	if (error) throw error;
	return row;
});
var deleteProduct_createServerFn_handler = createServerRpc({
	id: "154b8633eea94111b40f7036631572cb49e5f458d27dce468c3338ae0c0dc0db",
	name: "deleteProduct",
	filename: "src/lib/products.functions.ts"
}, (opts) => deleteProduct.__executeServer(opts));
var deleteProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteProduct_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("products").delete().eq("id", data.id).eq("producer_id", context.userId);
	if (error) throw error;
	return { ok: true };
});
var submitProductForApproval_createServerFn_handler = createServerRpc({
	id: "dfe8841e054645246d499c8e8d067aca5fa30cf76f3892cea4504ebbd6f501d6",
	name: "submitProductForApproval",
	filename: "src/lib/products.functions.ts"
}, (opts) => submitProductForApproval.__executeServer(opts));
var submitProductForApproval = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(submitProductForApproval_createServerFn_handler, async ({ data, context }) => {
	const { data: current, error: gErr } = await context.supabase.from("products").select("title, short_description, description, external_url, file_url, tags, price_cents").eq("id", data.id).eq("producer_id", context.userId).maybeSingle();
	if (gErr) throw gErr;
	if (!current) throw new Error("Produto não encontrado");
	const verdict = moderateProduct(current);
	if (!verdict.ok) {
		await context.supabase.from("products").update({
			status: "rascunho",
			rejection_reason: verdict.reason
		}).eq("id", data.id).eq("producer_id", context.userId);
		throw new Error(verdict.reason);
	}
	const { error } = await context.supabase.from("products").update({
		status: "publicado",
		rejection_reason: null
	}).eq("id", data.id).eq("producer_id", context.userId);
	if (error) throw error;
	return {
		ok: true,
		status: "publicado"
	};
});
var getMyProducerStats_createServerFn_handler = createServerRpc({
	id: "759c8655a7a5a17cd88060da7b5a4fde232f408253648a416a2bf9da6220de48",
	name: "getMyProducerStats",
	filename: "src/lib/products.functions.ts"
}, (opts) => getMyProducerStats.__executeServer(opts));
var getMyProducerStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyProducerStats_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("products").select("status, sales_count, views_count, price_cents").eq("producer_id", context.userId);
	const rows = data ?? [];
	return {
		total: rows.length,
		published: rows.filter((r) => r.status === "publicado").length,
		drafts: rows.filter((r) => r.status === "rascunho").length,
		pending: rows.filter((r) => r.status === "em_analise").length,
		totalSales: rows.reduce((s, r) => s + (r.sales_count ?? 0), 0),
		totalViews: rows.reduce((s, r) => s + (r.views_count ?? 0), 0)
	};
});
//#endregion
export { createProduct_createServerFn_handler, deleteProduct_createServerFn_handler, duplicateProduct_createServerFn_handler, getMyProducerStats_createServerFn_handler, getMyProductMetrics_createServerFn_handler, getMyProduct_createServerFn_handler, listMyProducts_createServerFn_handler, submitProductForApproval_createServerFn_handler, updateProduct_createServerFn_handler };
