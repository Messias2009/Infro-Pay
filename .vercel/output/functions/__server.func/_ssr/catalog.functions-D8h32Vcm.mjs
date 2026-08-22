import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { a as getProducerProducts, s as getProductBySlugFirestore } from "./products.service-DAm7Wd7_.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-D8h32Vcm.js
function publicClient() {
	const url = process.env.SUPABASE_URL || "";
	const key = process.env.SUPABASE_PUBLISHABLE_KEY || "";
	if (!url || !key) return null;
	return createClient(url, key, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var listCategories_createServerFn_handler = createServerRpc({
	id: "9093087a4fde30e7cbeefd735d6dccc2718ef5ec811563a10f9b01884489c6f6",
	name: "listCategories",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listCategories.__executeServer(opts));
var listCategories = createServerFn({ method: "GET" }).handler(listCategories_createServerFn_handler, async () => {
	const supabase = publicClient();
	if (supabase) try {
		const { data, error } = await supabase.from("categories").select("id, slug, name, icon, sort_order").order("sort_order");
		if (!error && data && data.length > 0) return data;
	} catch {}
	return [
		{
			id: "1",
			slug: "ebooks",
			name: "Ebooks & Manuais",
			icon: "BookOpen",
			sort_order: 1
		},
		{
			id: "2",
			slug: "cursos",
			name: "Cursos Online",
			icon: "GraduationCap",
			sort_order: 2
		},
		{
			id: "3",
			slug: "softwares",
			name: "Softwares & Apps",
			icon: "Code",
			sort_order: 3
		},
		{
			id: "4",
			slug: "mentorias",
			name: "Mentorias & Consultorias",
			icon: "Users",
			sort_order: 4
		}
	];
});
var listPublishedProducts_createServerFn_handler = createServerRpc({
	id: "de58f2eaa999ac8398bd09ad94f18c8e6810ce1495690211ce67ae8aeb592795",
	name: "listPublishedProducts",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listPublishedProducts.__executeServer(opts));
var listPublishedProducts = createServerFn({ method: "GET" }).inputValidator((d) => d ?? {}).handler(listPublishedProducts_createServerFn_handler, async ({ data }) => {
	const supabase = publicClient();
	const recent = data?.sort === "recent";
	let rows = [];
	if (supabase) try {
		let q = supabase.from("products").select("id, slug, title, short_description, cover_url, price_cents, promo_price_cents, currency, rating, reviews_count, sales_count, created_at, category:categories(name, slug)").eq("status", "publicado").order(recent ? "created_at" : "sales_count", { ascending: false }).limit(data?.limit ?? 24);
		if (data?.category) {
			const { data: cat } = await supabase.from("categories").select("id").eq("slug", data.category).maybeSingle();
			if (cat?.id) q = q.eq("category_id", cat.id);
		}
		const res = await q;
		if (!res.error && res.data) rows = res.data;
	} catch {}
	try {
		const published = (await getProducerProducts()).filter((p) => p.status === "publicado");
		const map = /* @__PURE__ */ new Map();
		rows.forEach((r) => map.set(r.slug, r));
		published.forEach((p) => {
			if (!map.has(p.slug)) map.set(p.slug, p);
		});
		return Array.from(map.values()).slice(0, data?.limit ?? 24);
	} catch {
		return rows;
	}
});
var getProductBySlug_createServerFn_handler = createServerRpc({
	id: "338e414efdb61533c60e3c1671e7aea82e763a0409c4afad4a1f474e3d8c65ce",
	name: "getProductBySlug",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(getProductBySlug_createServerFn_handler, async ({ data }) => {
	const supabase = publicClient();
	if (supabase) try {
		const { data: row, error } = await supabase.from("products").select("*, category:categories(name, slug), producer:profiles!products_producer_id_fkey(full_name, username, avatar_url)").eq("slug", data.slug).eq("status", "publicado").maybeSingle();
		if (!error && row) return row;
	} catch {}
	return await getProductBySlugFirestore(data.slug);
});
//#endregion
export { getProductBySlug_createServerFn_handler, listCategories_createServerFn_handler, listPublishedProducts_createServerFn_handler };
