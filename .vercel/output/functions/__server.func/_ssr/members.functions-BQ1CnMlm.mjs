import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { a as numberType, n as booleanType, o as objectType, s as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/members.functions-BQ1CnMlm.js
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
var getMyCourseTree_createServerFn_handler = createServerRpc({
	id: "d21669c0ab4510955d497994d91dbe173a3dca0e078271f8a7a4f2a9d2833735",
	name: "getMyCourseTree",
	filename: "src/lib/members.functions.ts"
}, (opts) => getMyCourseTree.__executeServer(opts));
var getMyCourseTree = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ product_id: stringType().uuid() }).parse(d)).handler(getMyCourseTree_createServerFn_handler, async ({ data, context }) => {
	const { data: product } = await context.supabase.from("products").select("id, title, slug, has_members_area, delivery_kind").eq("id", data.product_id).eq("producer_id", context.userId).maybeSingle();
	if (!product) throw new Error("Produto não encontrado");
	const { data: modules } = await context.supabase.from("course_modules").select("*").eq("product_id", data.product_id).order("sort_order");
	const ids = (modules ?? []).map((m) => m.id);
	let lessons = [];
	if (ids.length) {
		const { data: ls } = await context.supabase.from("course_lessons").select("*").in("module_id", ids).order("sort_order");
		lessons = ls ?? [];
	}
	return {
		product,
		modules: (modules ?? []).map((m) => ({
			...m,
			lessons: lessons.filter((l) => l.module_id === m.id)
		}))
	};
});
var createModule_createServerFn_handler = createServerRpc({
	id: "2838e65654b0c98d23edd828f22028de7f69d88eaeb0866a66dd064880467063",
	name: "createModule",
	filename: "src/lib/members.functions.ts"
}, (opts) => createModule.__executeServer(opts));
var createModule = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => moduleSchema.parse(d)).handler(createModule_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("course_modules").insert({
		...data,
		producer_id: context.userId
	});
	if (error) throw error;
	return { ok: true };
});
var deleteModule_createServerFn_handler = createServerRpc({
	id: "e2c533be1027491944fb72fe78db0e61709aa25060441f83a8d4c94648cd71a8",
	name: "deleteModule",
	filename: "src/lib/members.functions.ts"
}, (opts) => deleteModule.__executeServer(opts));
var deleteModule = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteModule_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("course_modules").delete().eq("id", data.id).eq("producer_id", context.userId);
	if (error) throw error;
	return { ok: true };
});
var createLesson_createServerFn_handler = createServerRpc({
	id: "8f3ea03090cea2753ed9d774d9c2d52a175d091a5f6f94475c8fdf0878f72fe5",
	name: "createLesson",
	filename: "src/lib/members.functions.ts"
}, (opts) => createLesson.__executeServer(opts));
var createLesson = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => lessonSchema.parse(d)).handler(createLesson_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("course_lessons").insert({
		...data,
		video_url: data.video_url || null,
		attachment_url: data.attachment_url || null,
		producer_id: context.userId
	});
	if (error) throw error;
	return { ok: true };
});
var deleteLesson_createServerFn_handler = createServerRpc({
	id: "54f0a2e4fa9e611b4440a67de8b01b6b4bc61c75f3a0286a5ea9d7b204108e43",
	name: "deleteLesson",
	filename: "src/lib/members.functions.ts"
}, (opts) => deleteLesson.__executeServer(opts));
var deleteLesson = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteLesson_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("course_lessons").delete().eq("id", data.id).eq("producer_id", context.userId);
	if (error) throw error;
	return { ok: true };
});
var claimMyEnrollments_createServerFn_handler = createServerRpc({
	id: "22c175ab51adc5de1ffd1724d30ca22af253f0d03f8f5677c61f516e49775e6f",
	name: "claimMyEnrollments",
	filename: "src/lib/members.functions.ts"
}, (opts) => claimMyEnrollments.__executeServer(opts));
var claimMyEnrollments = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(claimMyEnrollments_createServerFn_handler, async ({ context }) => {
	const email = context.claims?.email;
	if (!email) return { created: 0 };
	const { data: sales } = await context.supabase.from("sales").select("id, product_id").eq("status", "pago").eq("buyer_email", email);
	const rows = sales ?? [];
	let created = 0;
	for (const s of rows) {
		const { error } = await context.supabase.from("enrollments").upsert({
			user_id: context.userId,
			product_id: s.product_id,
			sale_id: s.id
		}, {
			onConflict: "user_id,product_id",
			ignoreDuplicates: true
		});
		if (!error) created++;
	}
	return { created };
});
var listMyEnrollments_createServerFn_handler = createServerRpc({
	id: "4f61f966dd1d688c42b4061aab8d87c2e82e3c5388c415cf635e0d5681856877",
	name: "listMyEnrollments",
	filename: "src/lib/members.functions.ts"
}, (opts) => listMyEnrollments.__executeServer(opts));
var listMyEnrollments = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyEnrollments_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("enrollments").select("id, progress_percent, completed_at, certificate_issued, created_at, product:products(id, title, slug, cover_url, short_description)").eq("user_id", context.userId).order("created_at", { ascending: false });
	return data ?? [];
});
var getMyCourse_createServerFn_handler = createServerRpc({
	id: "e202d450b8a5038c68c5f3e27bfac60dec2eea49a956cce8dfea9bed30a4bcbb",
	name: "getMyCourse",
	filename: "src/lib/members.functions.ts"
}, (opts) => getMyCourse.__executeServer(opts));
var getMyCourse = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ slug: stringType().trim().min(1).max(160) }).parse(d)).handler(getMyCourse_createServerFn_handler, async ({ data, context }) => {
	const { data: product } = await context.supabase.from("products").select("id, title, slug, cover_url, description").eq("slug", data.slug).maybeSingle();
	if (!product) throw new Error("Produto não encontrado");
	const { data: enrollment } = await context.supabase.from("enrollments").select("*").eq("user_id", context.userId).eq("product_id", product.id).maybeSingle();
	if (!enrollment) throw new Error("Ainda não tens acesso a esta área de membros.");
	const { data: modules } = await context.supabase.from("course_modules").select("*").eq("product_id", product.id).order("sort_order");
	const ids = (modules ?? []).map((m) => m.id);
	let lessons = [];
	let progress = [];
	if (ids.length) {
		const { data: ls } = await context.supabase.from("course_lessons").select("*").in("module_id", ids).order("sort_order");
		lessons = ls ?? [];
		const lessonIds = lessons.map((l) => l.id);
		if (lessonIds.length) {
			const { data: pr } = await context.supabase.from("lesson_progress").select("lesson_id, completed, seconds_watched").eq("user_id", context.userId).in("lesson_id", lessonIds);
			progress = pr ?? [];
		}
	}
	return {
		product,
		enrollment,
		modules: (modules ?? []).map((m) => ({
			...m,
			lessons: lessons.filter((l) => l.module_id === m.id).map((l) => ({
				...l,
				completed: !!progress.find((p) => p.lesson_id === l.id && p.completed)
			}))
		}))
	};
});
var setLessonProgress_createServerFn_handler = createServerRpc({
	id: "042d2aa29fc2133de966628a2a5a65b397a0b00ecc406d623790fa20e2365395",
	name: "setLessonProgress",
	filename: "src/lib/members.functions.ts"
}, (opts) => setLessonProgress.__executeServer(opts));
var setLessonProgress = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	lesson_id: stringType().uuid(),
	product_id: stringType().uuid(),
	completed: booleanType()
}).parse(d)).handler(setLessonProgress_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("lesson_progress").upsert({
		user_id: context.userId,
		lesson_id: data.lesson_id,
		completed: data.completed
	}, { onConflict: "user_id,lesson_id" });
	if (error) throw error;
	const { data: modules } = await context.supabase.from("course_modules").select("id").eq("product_id", data.product_id);
	const ids = (modules ?? []).map((m) => m.id);
	let total = 0;
	let done = 0;
	if (ids.length) {
		const { data: lessons } = await context.supabase.from("course_lessons").select("id").in("module_id", ids);
		const lessonIds = (lessons ?? []).map((l) => l.id);
		total = lessonIds.length;
		if (total) {
			const { data: pr } = await context.supabase.from("lesson_progress").select("lesson_id, completed").eq("user_id", context.userId).in("lesson_id", lessonIds);
			done = (pr ?? []).filter((p) => p.completed).length;
		}
	}
	const percent = total ? Math.round(done / total * 100) : 0;
	await context.supabase.from("enrollments").update({
		progress_percent: percent,
		completed_at: percent === 100 ? (/* @__PURE__ */ new Date()).toISOString() : null,
		certificate_issued: percent === 100
	}).eq("user_id", context.userId).eq("product_id", data.product_id);
	return {
		progress_percent: percent,
		lessons_done: done,
		lessons_total: total
	};
});
//#endregion
export { claimMyEnrollments_createServerFn_handler, createLesson_createServerFn_handler, createModule_createServerFn_handler, deleteLesson_createServerFn_handler, deleteModule_createServerFn_handler, getMyCourseTree_createServerFn_handler, getMyCourse_createServerFn_handler, listMyEnrollments_createServerFn_handler, setLessonProgress_createServerFn_handler };
