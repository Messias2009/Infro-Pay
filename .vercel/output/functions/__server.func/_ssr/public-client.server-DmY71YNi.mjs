import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-client.server-DmY71YNi.js
/** Publishable-key Supabase client for public (anon) reads inside server functions. */
function createServerPublicClient() {
	return createClient(process.env["SUPABASE_URL"], process.env["SUPABASE_PUBLISHABLE_KEY"], { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
//#endregion
export { createServerPublicClient };
