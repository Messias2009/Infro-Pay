import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.functions-LZW9sMfj.js
var profileSchema = objectType({
	full_name: stringType().trim().min(2).max(120).optional().nullable(),
	username: stringType().trim().toLowerCase().regex(/^[a-z0-9_.]{3,32}$/).optional().nullable(),
	bio: stringType().trim().max(400).optional().nullable(),
	avatar_url: stringType().url().max(600).optional().nullable(),
	cover_url: stringType().url().max(600).optional().nullable(),
	social_instagram: stringType().trim().max(80).optional().nullable(),
	social_website: stringType().trim().max(160).optional().nullable()
});
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "5dbf46616266e7bfe81c82694a91090a42de6200b3efc1b9d156faf41ac3a479",
	name: "getMyProfile",
	filename: "src/lib/profile.functions.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("profiles").select("*").eq("id", context.userId).maybeSingle();
	return data;
});
var updateMyProfile_createServerFn_handler = createServerRpc({
	id: "af00eb763dce352dc2f42ef901ef426a138feb40fdc7f79166552837a77fae5f",
	name: "updateMyProfile",
	filename: "src/lib/profile.functions.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => profileSchema.parse(d)).handler(updateMyProfile_createServerFn_handler, async ({ context, data }) => {
	const { data: row, error } = await context.supabase.from("profiles").update({
		...data,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", context.userId).select("*").maybeSingle();
	if (error) throw error;
	return row;
});
var getMyAchievements_createServerFn_handler = createServerRpc({
	id: "71f147089729106c576e99d0bc7035389250f1358a638776f8d6db290a630949",
	name: "getMyAchievements",
	filename: "src/lib/profile.functions.ts"
}, (opts) => getMyAchievements.__executeServer(opts));
var getMyAchievements = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyAchievements_createServerFn_handler, async ({ context }) => {
	const { data: sales } = await context.supabase.from("sales").select("gross_cents, status").eq("producer_id", context.userId).eq("status", "pago");
	const rows = sales ?? [];
	return {
		revenue_cents: rows.reduce((a, r) => a + (r.gross_cents ?? 0), 0),
		sales_count: rows.length
	};
});
//#endregion
export { getMyAchievements_createServerFn_handler, getMyProfile_createServerFn_handler, updateMyProfile_createServerFn_handler };
