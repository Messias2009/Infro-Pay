import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/finance.functions-Bk3KQqq_.js
async function ensureWalletRow(supabase, uid) {
	await supabase.from("wallets").upsert({ producer_id: uid }, { onConflict: "producer_id" });
}
var sumBy = (arr, k) => arr.reduce((a, r) => a + (r[k] ?? 0), 0);
function bucket(rows, label) {
	return {
		label,
		gross: sumBy(rows, "gross_cents") / 100,
		net: sumBy(rows, "net_cents") / 100,
		count: rows.length
	};
}
var between = (rows, from, to) => rows.filter((r) => {
	const t = new Date(r.created_at);
	return t >= from && t < to;
});
/** Daily buckets for the last `days` days. */
function dailySeries(paid, days = 14) {
	const now = /* @__PURE__ */ new Date();
	const out = [];
	for (let i = days - 1; i >= 0; i--) {
		const d = new Date(now);
		d.setDate(now.getDate() - i);
		d.setHours(0, 0, 0, 0);
		const next = new Date(d);
		next.setDate(d.getDate() + 1);
		out.push(bucket(between(paid, d, next), d.toISOString().slice(5, 10)));
	}
	return out;
}
/** Weekly buckets for the last `weeks` weeks. */
function weeklySeries(paid, weeks = 8) {
	const now = /* @__PURE__ */ new Date();
	const out = [];
	for (let i = weeks - 1; i >= 0; i--) {
		const to = new Date(now);
		to.setDate(now.getDate() - i * 7 + 1);
		to.setHours(0, 0, 0, 0);
		const from = new Date(to);
		from.setDate(to.getDate() - 7);
		out.push(bucket(between(paid, from, to), `${from.getDate()}/${from.getMonth() + 1}`));
	}
	return out;
}
var MONTHS = [
	"Jan",
	"Fev",
	"Mar",
	"Abr",
	"Mai",
	"Jun",
	"Jul",
	"Ago",
	"Set",
	"Out",
	"Nov",
	"Dez"
];
/** Monthly buckets for the last `months` months. */
function monthlySeries(paid, months = 12) {
	const now = /* @__PURE__ */ new Date();
	const out = [];
	for (let i = months - 1; i >= 0; i--) {
		const from = new Date(now.getFullYear(), now.getMonth() - i, 1);
		const to = new Date(from.getFullYear(), from.getMonth() + 1, 1);
		out.push(bucket(between(paid, from, to), MONTHS[from.getMonth()]));
	}
	return out;
}
/** Yearly buckets for the last `years` years. */
function yearlySeries(paid, years = 3) {
	const now = /* @__PURE__ */ new Date();
	const out = [];
	for (let i = years - 1; i >= 0; i--) {
		const y = now.getFullYear() - i;
		out.push(bucket(between(paid, new Date(y, 0, 1), new Date(y + 1, 0, 1)), String(y)));
	}
	return out;
}
var getMyWallet_createServerFn_handler = createServerRpc({
	id: "bf3de193b23cd87165510b9899c15ad6694f04f1926a7e96554953adab4b0574",
	name: "getMyWallet",
	filename: "src/lib/finance.functions.ts"
}, (opts) => getMyWallet.__executeServer(opts));
var getMyWallet = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyWallet_createServerFn_handler, async ({ context }) => {
	try {
		await context.supabase.rpc("release_matured_sales");
	} catch {}
	await ensureWalletRow(context.supabase, context.userId);
	const { data } = await context.supabase.from("wallets").select("*").eq("producer_id", context.userId).maybeSingle();
	return data ?? {
		producer_id: context.userId,
		available_cents: 0,
		pending_cents: 0,
		currency: "AOA"
	};
});
var getMyFinanceOverview_createServerFn_handler = createServerRpc({
	id: "aba3f7101b38f82ad1538bbd465130fe2422c20e6327fd8b607959ae5edda2b3",
	name: "getMyFinanceOverview",
	filename: "src/lib/finance.functions.ts"
}, (opts) => getMyFinanceOverview.__executeServer(opts));
var getMyFinanceOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyFinanceOverview_createServerFn_handler, async ({ context }) => {
	try {
		await context.supabase.rpc("release_matured_sales");
	} catch {}
	const { data: sales } = await context.supabase.from("sales").select("id, gross_cents, net_cents, platform_fee_cents, status, created_at, product_id, payment_method").eq("producer_id", context.userId).order("created_at", { ascending: false }).limit(500);
	const rows = sales ?? [];
	const paid = rows.filter((r) => r.status === "pago");
	const now = /* @__PURE__ */ new Date();
	const startOfDay = new Date(now);
	startOfDay.setHours(0, 0, 0, 0);
	const startOfWeek = new Date(now);
	startOfWeek.setDate(now.getDate() - 7);
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const sum = sumBy;
	const inRange = (from) => paid.filter((r) => new Date(r.created_at) >= from);
	const series = dailySeries(paid, 14).map((b) => ({
		date: b.label,
		gross: b.gross,
		net: b.net,
		count: b.count
	}));
	const seriesDaily = dailySeries(paid, 30);
	const seriesWeekly = weeklySeries(paid, 8);
	const seriesMonthly = monthlySeries(paid, 12);
	const seriesYearly = yearlySeries(paid, 3);
	const byProd = {};
	for (const r of paid) {
		byProd[r.product_id] = byProd[r.product_id] ?? {
			count: 0,
			net: 0
		};
		byProd[r.product_id].count++;
		byProd[r.product_id].net += r.net_cents ?? 0;
	}
	const topIds = Object.entries(byProd).sort((a, b) => b[1].net - a[1].net).slice(0, 5).map(([id]) => id);
	let topProducts = [];
	if (topIds.length) {
		const { data: prods } = await context.supabase.from("products").select("id, title, cover_url").in("id", topIds);
		topProducts = (prods ?? []).map((p) => ({
			...p,
			...byProd[p.id]
		}));
		topProducts.sort((a, b) => b.net - a.net);
	}
	const totalGross = sum(paid, "gross_cents");
	const totalNet = sum(paid, "net_cents");
	const totalFees = sum(paid, "platform_fee_cents");
	const salesCount = paid.length;
	const { data: prodRows } = await context.supabase.from("products").select("views_count").eq("producer_id", context.userId);
	const totalViews = (prodRows ?? []).reduce((a, r) => a + (r.views_count ?? 0), 0);
	return {
		today: {
			count: inRange(startOfDay).length,
			gross: sum(inRange(startOfDay), "gross_cents")
		},
		week: {
			count: inRange(startOfWeek).length,
			gross: sum(inRange(startOfWeek), "gross_cents")
		},
		month: {
			count: inRange(startOfMonth).length,
			gross: sum(inRange(startOfMonth), "gross_cents")
		},
		totalGross,
		totalNet,
		totalFees,
		salesCount,
		avgTicket: salesCount ? Math.round(totalGross / salesCount) : 0,
		totalViews,
		conversion: totalViews ? salesCount / totalViews : 0,
		series,
		seriesDaily,
		seriesWeekly,
		seriesMonthly,
		seriesYearly,
		topProducts,
		recent: rows.slice(0, 10)
	};
});
var listMyTransactions_createServerFn_handler = createServerRpc({
	id: "14515014247cf8108311dc0bc9082a3dab1bd287c8dc0ffab778bd2976e1c9d5",
	name: "listMyTransactions",
	filename: "src/lib/finance.functions.ts"
}, (opts) => listMyTransactions.__executeServer(opts));
var listMyTransactions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyTransactions_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("sales").select("id, gross_cents, net_cents, platform_fee_cents, status, payment_method, buyer_name, buyer_email, created_at, released, release_at, product:products(title, slug)").eq("producer_id", context.userId).order("created_at", { ascending: false }).limit(200);
	return data ?? [];
});
//#endregion
export { getMyFinanceOverview_createServerFn_handler, getMyWallet_createServerFn_handler, listMyTransactions_createServerFn_handler };
