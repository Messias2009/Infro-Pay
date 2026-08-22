import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/integrations.functions-C4UCp_V_.js
var schema = objectType({
	meta_pixel_id: stringType().trim().max(60).optional().nullable(),
	meta_capi_token: stringType().trim().max(400).optional().nullable(),
	google_ads_id: stringType().trim().max(60).optional().nullable(),
	google_ads_label: stringType().trim().max(80).optional().nullable(),
	ga_measurement_id: stringType().trim().max(40).optional().nullable(),
	utmify_token: stringType().trim().max(200).optional().nullable()
});
var getMyIntegrations_createServerFn_handler = createServerRpc({
	id: "44f8b4cf461e63779174134d78941ac6e91e35e239624009cb22195b0c636a71",
	name: "getMyIntegrations",
	filename: "src/lib/integrations.functions.ts"
}, (opts) => getMyIntegrations.__executeServer(opts));
var getMyIntegrations = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyIntegrations_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("user_integrations").select("*").eq("user_id", context.userId).maybeSingle();
	return data ?? {
		user_id: context.userId,
		meta_pixel_id: null,
		meta_capi_token: null,
		google_ads_id: null,
		google_ads_label: null,
		ga_measurement_id: null,
		utmify_token: null
	};
});
var upsertMyIntegrations_createServerFn_handler = createServerRpc({
	id: "78fdee379d7cdbbaad34437cf1a1380b9277163f8442d88f640a174029229e89",
	name: "upsertMyIntegrations",
	filename: "src/lib/integrations.functions.ts"
}, (opts) => upsertMyIntegrations.__executeServer(opts));
var upsertMyIntegrations = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => schema.parse(d)).handler(upsertMyIntegrations_createServerFn_handler, async ({ context, data }) => {
	const payload = {
		user_id: context.userId,
		...data,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	const { data: row, error } = await context.supabase.from("user_integrations").upsert(payload, { onConflict: "user_id" }).select("*").maybeSingle();
	if (error) throw error;
	return row;
});
//#endregion
export { getMyIntegrations_createServerFn_handler, upsertMyIntegrations_createServerFn_handler };
