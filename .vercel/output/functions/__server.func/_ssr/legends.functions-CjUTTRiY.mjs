import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legends.functions-CjUTTRiY.js
function pub() {
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var LEVELS = [
	{
		key: "bronze",
		name: "Bronze",
		min_cents: 0,
		color: "#B87333",
		gradient: "linear-gradient(135deg,#8B4513,#B87333)"
	},
	{
		key: "prata",
		name: "Prata",
		min_cents: 1e7,
		color: "#C0C0C0",
		gradient: "linear-gradient(135deg,#7C7C7C,#E8E8E8)"
	},
	{
		key: "ouro",
		name: "Ouro",
		min_cents: 5e7,
		color: "#F9A825",
		gradient: "linear-gradient(135deg,#B8860B,#FFD700)"
	},
	{
		key: "platina",
		name: "Platina",
		min_cents: 1e8,
		color: "#E5E4E2",
		gradient: "linear-gradient(135deg,#8FA6B3,#E5E4E2)"
	},
	{
		key: "diamante",
		name: "Diamante",
		min_cents: 5e8,
		color: "#B9F2FF",
		gradient: "linear-gradient(135deg,#4FC3F7,#B9F2FF)"
	},
	{
		key: "mestre",
		name: "Mestre",
		min_cents: 1e9,
		color: "#9C27B0",
		gradient: "linear-gradient(135deg,#6A1B9A,#CE93D8)"
	},
	{
		key: "elite",
		name: "Elite",
		min_cents: 25e8,
		color: "#F44336",
		gradient: "linear-gradient(135deg,#B71C1C,#FF7043)"
	},
	{
		key: "lenda",
		name: "Lenda",
		min_cents: 5e9,
		color: "#00BCD4",
		gradient: "linear-gradient(135deg,#006064,#4DD0E1)"
	},
	{
		key: "imortal",
		name: "Imortal",
		min_cents: 1e10,
		color: "#FFEB3B",
		gradient: "linear-gradient(135deg,#F57F17,#FFF176)"
	},
	{
		key: "infinito",
		name: "Infinito",
		min_cents: 25e9,
		color: "#7C4DFF",
		gradient: "linear-gradient(135deg,#311B92,#B388FF)"
	}
];
function levelFor(total) {
	let current = LEVELS[0];
	for (const l of LEVELS) if (total >= l.min_cents) current = l;
	return current;
}
var listLegends_createServerFn_handler = createServerRpc({
	id: "c316399c5e9baf9c540f078df41f24750b8fb48203f870f53b12054168955e28",
	name: "listLegends",
	filename: "src/lib/legends.functions.ts"
}, (opts) => listLegends.__executeServer(opts));
var listLegends = createServerFn({ method: "GET" }).handler(listLegends_createServerFn_handler, async () => {
	const supabase = pub();
	const { data: sales } = await supabase.from("sales").select("producer_id, gross_cents").eq("status", "pago");
	const agg = /* @__PURE__ */ new Map();
	for (const s of sales ?? []) {
		const cur = agg.get(s.producer_id) ?? {
			revenue: 0,
			count: 0
		};
		cur.revenue += s.gross_cents ?? 0;
		cur.count += 1;
		agg.set(s.producer_id, cur);
	}
	const ids = [...agg.keys()];
	if (ids.length === 0) return [];
	const { data: profiles } = await supabase.from("profiles").select("id, full_name, username, avatar_url").in("id", ids);
	const rows = (profiles ?? []).map((p) => {
		const stats = agg.get(p.id);
		const lvl = levelFor(stats.revenue);
		return {
			id: p.id,
			name: p.full_name ?? p.username ?? "Produtor",
			avatar_url: p.avatar_url,
			revenue_cents: stats.revenue,
			sales_count: stats.count,
			level: lvl
		};
	});
	rows.sort((a, b) => b.revenue_cents - a.revenue_cents);
	return rows.slice(0, 100);
});
//#endregion
export { listLegends_createServerFn_handler };
