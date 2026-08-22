import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { a as numberType, n as booleanType, o as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/members.functions-Df7r0MfK.js
var moduleSchema = objectType({
	product_id: stringType().uuid(),
	title: stringType().trim().min(2).max(160),
	description: stringType().trim().max(1e3).optional().nullable(),
	sort_order: numberType().int().min(0).max(999).default(0)
});
var lessonSchema = objectType({
	module_id: stringType().uuid(),
	title: stringType().trim().min(2).max(160),
	description: stringType().trim().max(2e3).optional().nullable(),
	video_url: stringType().trim().max(2e3).optional().nullable(),
	attachment_url: stringType().trim().max(2e3).optional().nullable(),
	duration_minutes: numberType().int().min(0).max(1e3).optional().nullable(),
	sort_order: numberType().int().min(0).max(999).default(0),
	is_free: booleanType().default(false)
});
var getMyCourseTree = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ product_id: stringType().uuid() }).parse(d)).handler(createSsrRpc("d21669c0ab4510955d497994d91dbe173a3dca0e078271f8a7a4f2a9d2833735"));
var createModule = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => moduleSchema.parse(d)).handler(createSsrRpc("2838e65654b0c98d23edd828f22028de7f69d88eaeb0866a66dd064880467063"));
var deleteModule = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("e2c533be1027491944fb72fe78db0e61709aa25060441f83a8d4c94648cd71a8"));
var createLesson = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => lessonSchema.parse(d)).handler(createSsrRpc("8f3ea03090cea2753ed9d774d9c2d52a175d091a5f6f94475c8fdf0878f72fe5"));
var deleteLesson = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("54f0a2e4fa9e611b4440a67de8b01b6b4bc61c75f3a0286a5ea9d7b204108e43"));
/** Creates enrollments for every paid sale that matches the signed-in user's e-mail. */
var claimMyEnrollments = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("22c175ab51adc5de1ffd1724d30ca22af253f0d03f8f5677c61f516e49775e6f"));
var listMyEnrollments = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("4f61f966dd1d688c42b4061aab8d87c2e82e3c5388c415cf635e0d5681856877"));
var getMyCourse = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ slug: stringType().trim().min(1).max(160) }).parse(d)).handler(createSsrRpc("e202d450b8a5038c68c5f3e27bfac60dec2eea49a956cce8dfea9bed30a4bcbb"));
var setLessonProgress = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	lesson_id: stringType().uuid(),
	product_id: stringType().uuid(),
	completed: booleanType()
}).parse(d)).handler(createSsrRpc("042d2aa29fc2133de966628a2a5a65b397a0b00ecc406d623790fa20e2365395"));
//#endregion
export { deleteModule as a, listMyEnrollments as c, deleteLesson as i, setLessonProgress as l, createLesson as n, getMyCourse as o, createModule as r, getMyCourseTree as s, claimMyEnrollments as t };
