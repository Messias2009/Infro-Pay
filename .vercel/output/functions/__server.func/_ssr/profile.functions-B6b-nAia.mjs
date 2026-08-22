import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile.functions-B6b-nAia.js
var profileSchema = objectType({
	full_name: stringType().trim().min(2).max(120).optional().nullable(),
	username: stringType().trim().toLowerCase().regex(/^[a-z0-9_.]{3,32}$/).optional().nullable(),
	bio: stringType().trim().max(400).optional().nullable(),
	avatar_url: stringType().url().max(600).optional().nullable(),
	cover_url: stringType().url().max(600).optional().nullable(),
	social_instagram: stringType().trim().max(80).optional().nullable(),
	social_website: stringType().trim().max(160).optional().nullable()
});
var getMyProfile = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("5dbf46616266e7bfe81c82694a91090a42de6200b3efc1b9d156faf41ac3a479"));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => profileSchema.parse(d)).handler(createSsrRpc("af00eb763dce352dc2f42ef901ef426a138feb40fdc7f79166552837a77fae5f"));
var getMyAchievements = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("71f147089729106c576e99d0bc7035389250f1358a638776f8d6db290a630949"));
//#endregion
export { getMyProfile as n, updateMyProfile as r, getMyAchievements as t };
