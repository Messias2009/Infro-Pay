import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-C-gZNnTo.js
var isAdmin = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("f56374ba3aaffab4ed8ab7e2a3691b799933caea50cc55628ceb0dfe711b588b"));
var bootstrapAdmin = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("8b5e87060261a59e92bcd5e92ce4cf6afa0ee8e3737aa66e7c16f0be951897c6"));
var listPendingProducts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("e0ef591bbb15e20091a8e50c44968182432e55be8ec16b9caa030e8e75819313"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("e80415fdb5d15d008dfc15a18297d2d4076e8a84ab116b804adf1f68843dd2ea"));
var approveProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("bc540c94672c121fbcb5ec31a6f16d5cbe033ded4d03673baadf167a0db4e4fa"));
var rejectProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	reason: stringType().trim().min(3).max(500)
}).parse(d)).handler(createSsrRpc("f41b15ef35f165dc10d3b8d98141573d79849fd2adc76dbc1c9ef0b7f1fe2b21"));
var getAdminStats = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("4fec70c92c2624b017310f557d52373f6e45b4f5283a3272a864213d4d65e68d"));
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
var listAdminLogs = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("82650c754cd033d88d8578cb2c3c00d3abbcd9395a2b3d813880f22730923182"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	banned: booleanType(),
	reason: stringType().trim().max(300).optional()
}).parse(d)).handler(createSsrRpc("4aafb9a658e2cccbdcc24f785a4701204d776f384aaf6e32edc691cb41e45cef"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("027c3950f4cfd82ec83fa8f63198b76195c3dbe997f269b3cd0a02c7ab7475db"));
var getPlatformReport = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("7c7eeb2cc967367f13280b35dd9f4b2d8468c6d04048570968bdd59a05c44720"));
var exportCsv = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ kind: enumType([
	"pedidos",
	"produtores",
	"produtos"
]) }).parse(d)).handler(createSsrRpc("c4534fbff43557290ac9014f32ab1da8bdbbdcc886000fef10ce046174f58abc"));
//#endregion
export { approveProduct, bootstrapAdmin, exportCsv, getAdminStats, getPlatformReport, isAdmin, listAdminLogs, listPendingProducts, logAdminAction, rejectProduct };
