import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { t as dispatchNotification } from "./notifications.server-BlbYki90.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-CZytr7We.js
async function assertAdmin(supabase, userId) {
	const { data } = await supabase.rpc("has_role", {
		_user_id: userId,
		_role: "admin"
	});
	if (!data) throw new Error("Acesso restrito a administradores");
}
var isAdmin_createServerFn_handler = createServerRpc({
	id: "f56374ba3aaffab4ed8ab7e2a3691b799933caea50cc55628ceb0dfe711b588b",
	name: "isAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => isAdmin.__executeServer(opts));
var isAdmin = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(isAdmin_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	return !!data;
});
var bootstrapAdmin_createServerFn_handler = createServerRpc({
	id: "8b5e87060261a59e92bcd5e92ce4cf6afa0ee8e3737aa66e7c16f0be951897c6",
	name: "bootstrapAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => bootstrapAdmin.__executeServer(opts));
var bootstrapAdmin = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(bootstrapAdmin_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.rpc("bootstrap_admin");
	if (error) throw error;
	return { promoted: !!data };
});
var listPendingProducts_createServerFn_handler = createServerRpc({
	id: "e0ef591bbb15e20091a8e50c44968182432e55be8ec16b9caa030e8e75819313",
	name: "listPendingProducts",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listPendingProducts.__executeServer(opts));
var listPendingProducts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listPendingProducts_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { data, error } = await context.supabase.from("products").select("id, slug, title, short_description, cover_url, price_cents, currency, product_type, created_at, producer_id, category:categories(name), producer:profiles!products_producer_id_fkey(full_name, username, avatar_url)").eq("status", "em_analise").order("created_at", { ascending: true });
	if (error) throw error;
	return data ?? [];
});
var listAllProductsAdmin_createServerFn_handler = createServerRpc({
	id: "e80415fdb5d15d008dfc15a18297d2d4076e8a84ab116b804adf1f68843dd2ea",
	name: "listAllProductsAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listAllProductsAdmin.__executeServer(opts));
var listAllProductsAdmin = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(listAllProductsAdmin_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	let q = context.supabase.from("products").select("id, slug, title, status, cover_url, price_cents, currency, sales_count, created_at, producer:profiles!products_producer_id_fkey(full_name, username)").order("created_at", { ascending: false }).limit(100);
	if (data?.status) q = q.eq("status", data.status);
	const { data: rows, error } = await q;
	if (error) throw error;
	return rows ?? [];
});
var approveProduct_createServerFn_handler = createServerRpc({
	id: "bc540c94672c121fbcb5ec31a6f16d5cbe033ded4d03673baadf167a0db4e4fa",
	name: "approveProduct",
	filename: "src/lib/admin.functions.ts"
}, (opts) => approveProduct.__executeServer(opts));
var approveProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(approveProduct_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { data: prod } = await context.supabase.from("products").select("title, producer_id, slug").eq("id", data.id).maybeSingle();
	const { error } = await context.supabase.from("products").update({
		status: "publicado",
		rejection_reason: null
	}).eq("id", data.id);
	if (error) throw error;
	if (prod?.producer_id) try {
		await dispatchNotification({
			userId: prod.producer_id,
			type: "product_approved",
			title: "🎉 Produto Aprovado!",
			message: `O seu produto "${prod.title}" foi aprovado pela equipa e já está disponível para venda.`,
			link: `/produtor/produtos/${prod.slug}`,
			channels: [
				"in_app",
				"push",
				"email"
			]
		});
	} catch (nErr) {
		console.warn("Erro ao notificar aprovação de produto:", nErr);
	}
	await logAdminAction(context.supabase, context.userId, "product_approved", "product", data.id);
	return { ok: true };
});
var rejectProduct_createServerFn_handler = createServerRpc({
	id: "f41b15ef35f165dc10d3b8d98141573d79849fd2adc76dbc1c9ef0b7f1fe2b21",
	name: "rejectProduct",
	filename: "src/lib/admin.functions.ts"
}, (opts) => rejectProduct.__executeServer(opts));
var rejectProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	reason: stringType().trim().min(3).max(500)
}).parse(d)).handler(rejectProduct_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { data: prod } = await context.supabase.from("products").select("title, producer_id, slug").eq("id", data.id).maybeSingle();
	const { error } = await context.supabase.from("products").update({
		status: "rascunho",
		rejection_reason: data.reason
	}).eq("id", data.id);
	if (error) throw error;
	if (prod?.producer_id) try {
		await dispatchNotification({
			userId: prod.producer_id,
			type: "product_rejected",
			title: "⚠️ Revisão Necessária no Produto",
			message: `O produto "${prod.title}" necessita de ajustes: ${data.reason}`,
			link: `/produtor/produtos/${prod.slug}`,
			channels: [
				"in_app",
				"push",
				"email"
			]
		});
	} catch (nErr) {
		console.warn("Erro ao notificar rejeição de produto:", nErr);
	}
	await logAdminAction(context.supabase, context.userId, "product_rejected", "product", data.id, { reason: data.reason });
	return { ok: true };
});
var getAdminStats_createServerFn_handler = createServerRpc({
	id: "4fec70c92c2624b017310f557d52373f6e45b4f5283a3272a864213d4d65e68d",
	name: "getAdminStats",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminStats.__executeServer(opts));
var getAdminStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminStats_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { data } = await context.supabase.from("products").select("status");
	const rows = data ?? [];
	return {
		total: rows.length,
		published: rows.filter((r) => r.status === "publicado").length,
		pending: rows.filter((r) => r.status === "em_analise").length,
		drafts: rows.filter((r) => r.status === "rascunho").length
	};
});
async function logAdminAction(supabase, adminId, action, target_type, target_id, details = {}) {
	let adminName = null;
	const { data: prof } = await supabase.from("profiles").select("full_name, username").eq("id", adminId).maybeSingle();
	adminName = prof?.full_name ?? prof?.username ?? null;
	await supabase.from("admin_logs").insert({
		admin_id: adminId,
		admin_name: adminName,
		action,
		target_type,
		target_id,
		details
	});
}
var listAdminLogs_createServerFn_handler = createServerRpc({
	id: "82650c754cd033d88d8578cb2c3c00d3abbcd9395a2b3d813880f22730923182",
	name: "listAdminLogs",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listAdminLogs.__executeServer(opts));
var listAdminLogs = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(listAdminLogs_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	let q = context.supabase.from("admin_logs").select("*").order("created_at", { ascending: false }).limit(300);
	if (data?.action) q = q.eq("action", data.action);
	const { data: rows, error } = await q;
	if (error) throw error;
	return rows ?? [];
});
var listUsers_createServerFn_handler = createServerRpc({
	id: "ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab",
	name: "listUsers",
	filename: "src/lib/admin.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
var listUsers = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(listUsers_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { supabaseAdmin } = await import("./client.server-ZrdrXq7H.mjs");
	const { data: profiles } = await supabaseAdmin.from("profiles").select("id, full_name, username, avatar_url, is_banned, ban_reason, created_at").order("created_at", { ascending: false }).limit(500);
	const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id, role");
	const { data: sales } = await supabaseAdmin.from("sales").select("producer_id, buyer_user_id, gross_cents, status");
	const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers({
		page: 1,
		perPage: 1e3
	});
	const emailById = /* @__PURE__ */ new Map();
	for (const u of authUsers?.users ?? []) if (u.id) emailById.set(u.id, u.email ?? "");
	const rolesById = /* @__PURE__ */ new Map();
	for (const r of roles ?? []) rolesById.set(r.user_id, [...rolesById.get(r.user_id) ?? [], r.role]);
	const sold = /* @__PURE__ */ new Map();
	const spent = /* @__PURE__ */ new Map();
	for (const s of sales ?? []) {
		if (s.status !== "pago") continue;
		sold.set(s.producer_id, (sold.get(s.producer_id) ?? 0) + s.gross_cents);
		if (s.buyer_user_id) spent.set(s.buyer_user_id, (spent.get(s.buyer_user_id) ?? 0) + s.gross_cents);
	}
	const term = (data?.search ?? "").trim().toLowerCase();
	return (profiles ?? []).map((p) => ({
		...p,
		email: emailById.get(p.id) ?? "",
		roles: rolesById.get(p.id) ?? [],
		total_sold_cents: sold.get(p.id) ?? 0,
		total_spent_cents: spent.get(p.id) ?? 0
	})).filter((p) => !term || (p.full_name ?? "").toLowerCase().includes(term) || (p.username ?? "").toLowerCase().includes(term) || p.email.toLowerCase().includes(term));
});
var toggleUserBan_createServerFn_handler = createServerRpc({
	id: "4aafb9a658e2cccbdcc24f785a4701204d776f384aaf6e32edc691cb41e45cef",
	name: "toggleUserBan",
	filename: "src/lib/admin.functions.ts"
}, (opts) => toggleUserBan.__executeServer(opts));
var toggleUserBan = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	banned: booleanType(),
	reason: stringType().trim().max(300).optional()
}).parse(d)).handler(toggleUserBan_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	if (data.id === context.userId) throw new Error("Não pode bloquear a sua própria conta");
	const { error } = await context.supabase.from("profiles").update({
		is_banned: data.banned,
		banned_at: data.banned ? (/* @__PURE__ */ new Date()).toISOString() : null,
		ban_reason: data.banned ? data.reason ?? "Sem motivo indicado" : null
	}).eq("id", data.id);
	if (error) throw error;
	await logAdminAction(context.supabase, context.userId, data.banned ? "user_banned" : "user_unbanned", "user", data.id, { reason: data.reason ?? null });
	return { ok: true };
});
var getMyAccountStatus_createServerFn_handler = createServerRpc({
	id: "027c3950f4cfd82ec83fa8f63198b76195c3dbe997f269b3cd0a02c7ab7475db",
	name: "getMyAccountStatus",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getMyAccountStatus.__executeServer(opts));
var getMyAccountStatus = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyAccountStatus_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("profiles").select("is_banned, ban_reason").eq("id", context.userId).maybeSingle();
	return {
		banned: !!data?.is_banned,
		reason: data?.ban_reason ?? null
	};
});
var getPlatformReport_createServerFn_handler = createServerRpc({
	id: "7c7eeb2cc967367f13280b35dd9f4b2d8468c6d04048570968bdd59a05c44720",
	name: "getPlatformReport",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getPlatformReport.__executeServer(opts));
var getPlatformReport = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getPlatformReport_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { supabaseAdmin } = await import("./client.server-ZrdrXq7H.mjs");
	const [{ data: sales }, { data: withdrawals }, { data: products }, { data: profiles }] = await Promise.all([
		supabaseAdmin.from("sales").select("gross_cents, platform_fee_cents, net_cents, affiliate_commission_cents, status, created_at, paid_at, producer_id, product_id"),
		supabaseAdmin.from("withdrawals").select("gross_cents, fee_cents, net_cents, status"),
		supabaseAdmin.from("products").select("id, title, slug, sales_count, producer_id"),
		supabaseAdmin.from("profiles").select("id, full_name, username")
	]);
	const paid = (sales ?? []).filter((s) => s.status === "pago");
	const gross = paid.reduce((a, s) => a + s.gross_cents, 0);
	const commissions = paid.reduce((a, s) => a + s.platform_fee_cents, 0);
	const affiliateCommissions = paid.reduce((a, s) => a + (s.affiliate_commission_cents ?? 0), 0);
	const wd = withdrawals ?? [];
	const withdrawalFees = wd.filter((w) => w.status === "pago").reduce((a, w) => a + w.fee_cents, 0);
	const withdrawnNet = wd.filter((w) => w.status === "pago").reduce((a, w) => a + w.net_cents, 0);
	const pendingWithdrawals = wd.filter((w) => w.status === "em_analise" || w.status === "aprovado").reduce((a, w) => a + w.gross_cents, 0);
	const days = [];
	for (let i = 29; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setUTCHours(0, 0, 0, 0);
		d.setUTCDate(d.getUTCDate() - i);
		days.push({
			date: d.toISOString().slice(0, 10),
			total: 0,
			count: 0
		});
	}
	const idx = new Map(days.map((d, i) => [d.date, i]));
	for (const s of paid) {
		const key = (s.paid_at ?? s.created_at).slice(0, 10);
		const i = idx.get(key);
		if (i !== void 0) {
			days[i].total += s.gross_cents;
			days[i].count += 1;
		}
	}
	const nameById = new Map((profiles ?? []).map((p) => [p.id, p.full_name ?? p.username ?? "—"]));
	const byProducer = /* @__PURE__ */ new Map();
	const byProduct = /* @__PURE__ */ new Map();
	for (const s of paid) {
		byProducer.set(s.producer_id, (byProducer.get(s.producer_id) ?? 0) + s.gross_cents);
		const cur = byProduct.get(s.product_id) ?? {
			revenue: 0,
			count: 0
		};
		byProduct.set(s.product_id, {
			revenue: cur.revenue + s.gross_cents,
			count: cur.count + 1
		});
	}
	const productById = new Map((products ?? []).map((p) => [p.id, p]));
	return {
		totals: {
			gross_cents: gross,
			commissions_cents: commissions,
			affiliate_commissions_cents: affiliateCommissions,
			withdrawal_fees_cents: withdrawalFees,
			withdrawn_cents: withdrawnNet,
			pending_withdrawals_cents: pendingWithdrawals,
			sales_count: paid.length,
			products_count: (products ?? []).length,
			users_count: (profiles ?? []).length
		},
		series: days,
		top_producers: [...byProducer.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, revenue]) => ({
			id,
			name: nameById.get(id) ?? "—",
			revenue_cents: revenue
		})),
		top_products: [...byProduct.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 5).map(([id, v]) => ({
			id,
			title: productById.get(id)?.title ?? "—",
			slug: productById.get(id)?.slug ?? "",
			sales: v.count,
			revenue_cents: v.revenue
		}))
	};
});
function toCsv(rows) {
	if (!rows.length) return "";
	const headers = Object.keys(rows[0]);
	const esc = (v) => `"${String(v ?? "").replace(/"/g, "\"\"")}"`;
	return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}
var exportCsv_createServerFn_handler = createServerRpc({
	id: "c4534fbff43557290ac9014f32ab1da8bdbbdcc886000fef10ce046174f58abc",
	name: "exportCsv",
	filename: "src/lib/admin.functions.ts"
}, (opts) => exportCsv.__executeServer(opts));
var exportCsv = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ kind: enumType([
	"pedidos",
	"produtores",
	"produtos"
]) }).parse(d)).handler(exportCsv_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { supabaseAdmin } = await import("./client.server-ZrdrXq7H.mjs");
	if (data.kind === "pedidos") {
		const { data: rows } = await supabaseAdmin.from("sales").select("id, created_at, paid_at, status, payment_method, gross_cents, platform_fee_cents, net_cents, currency, buyer_name, buyer_email, product:products(title)").order("created_at", { ascending: false }).limit(5e3);
		return toCsv((rows ?? []).map((r) => ({
			id: r.id,
			criado: r.created_at,
			pago: r.paid_at,
			estado: r.status,
			metodo: r.payment_method,
			bruto: r.gross_cents / 100,
			comissao: r.platform_fee_cents / 100,
			liquido: r.net_cents / 100,
			moeda: r.currency,
			comprador: r.buyer_name,
			email: r.buyer_email,
			produto: r.product?.title
		})));
	}
	if (data.kind === "produtos") {
		const { data: rows } = await supabaseAdmin.from("products").select("id, title, slug, status, price_cents, currency, sales_count, views_count, created_at").order("sales_count", { ascending: false }).limit(5e3);
		return toCsv((rows ?? []).map((r) => ({
			id: r.id,
			titulo: r.title,
			slug: r.slug,
			estado: r.status,
			preco: r.price_cents / 100,
			moeda: r.currency,
			vendas: r.sales_count,
			visualizacoes: r.views_count,
			criado: r.created_at
		})));
	}
	const [{ data: profiles }, { data: sales }] = await Promise.all([supabaseAdmin.from("profiles").select("id, full_name, username, is_banned, created_at"), supabaseAdmin.from("sales").select("producer_id, gross_cents, status")]);
	const sold = /* @__PURE__ */ new Map();
	for (const s of sales ?? []) {
		if (s.status !== "pago") continue;
		const c = sold.get(s.producer_id) ?? {
			revenue: 0,
			count: 0
		};
		sold.set(s.producer_id, {
			revenue: c.revenue + s.gross_cents,
			count: c.count + 1
		});
	}
	return toCsv((profiles ?? []).map((p) => ({
		id: p.id,
		nome: p.full_name,
		username: p.username,
		bloqueado: p.is_banned,
		faturamento: (sold.get(p.id)?.revenue ?? 0) / 100,
		vendas: sold.get(p.id)?.count ?? 0,
		registo: p.created_at
	})));
});
//#endregion
export { approveProduct_createServerFn_handler, bootstrapAdmin_createServerFn_handler, exportCsv_createServerFn_handler, getAdminStats_createServerFn_handler, getMyAccountStatus_createServerFn_handler, getPlatformReport_createServerFn_handler, isAdmin_createServerFn_handler, listAdminLogs_createServerFn_handler, listAllProductsAdmin_createServerFn_handler, listPendingProducts_createServerFn_handler, listUsers_createServerFn_handler, rejectProduct_createServerFn_handler, toggleUserBan_createServerFn_handler };
