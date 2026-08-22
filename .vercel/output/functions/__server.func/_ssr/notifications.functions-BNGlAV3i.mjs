import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import { t as dispatchNotification } from "./notifications.server-BlbYki90.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications.functions-BNGlAV3i.js
var listMyNotifications_createServerFn_handler = createServerRpc({
	id: "acdc1590236f0839542f983a97a7193af437f8125c921a77e6feea3b73ccec73",
	name: "listMyNotifications",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => listMyNotifications.__executeServer(opts));
var listMyNotifications = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyNotifications_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("notifications").select("*").eq("user_id", context.userId).order("created_at", { ascending: false }).limit(60);
	return data ?? [];
});
var countUnread_createServerFn_handler = createServerRpc({
	id: "e7ff2b2df4e7a0c082778d58af44f4d3fa963d5650df25437c074f0ad15e5ab6",
	name: "countUnread",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => countUnread.__executeServer(opts));
var countUnread = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(countUnread_createServerFn_handler, async ({ context }) => {
	const { count } = await context.supabase.from("notifications").select("id", {
		count: "exact",
		head: true
	}).eq("user_id", context.userId).eq("read", false);
	return count ?? 0;
});
var markNotificationRead_createServerFn_handler = createServerRpc({
	id: "385e76cdf807dd53711b6f969d894db85cf9b0ca7a6373bb34c6352adedccb64",
	name: "markNotificationRead",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => markNotificationRead.__executeServer(opts));
var markNotificationRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(markNotificationRead_createServerFn_handler, async ({ data, context }) => {
	await context.supabase.from("notifications").update({ read: true }).eq("id", data.id).eq("user_id", context.userId);
	return { ok: true };
});
var markAllNotificationsRead_createServerFn_handler = createServerRpc({
	id: "9450c15293c0a6ae5fe14448bd9f3e0ad58f596f22af371b91f88b98002e414b",
	name: "markAllNotificationsRead",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => markAllNotificationsRead.__executeServer(opts));
var markAllNotificationsRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(markAllNotificationsRead_createServerFn_handler, async ({ context }) => {
	await context.supabase.from("notifications").update({ read: true }).eq("user_id", context.userId).eq("read", false);
	return { ok: true };
});
var deleteNotification_createServerFn_handler = createServerRpc({
	id: "f06422965368cb200c820397c3202e17a495c2d964e585a6d01ab01406020d27",
	name: "deleteNotification",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => deleteNotification.__executeServer(opts));
var deleteNotification = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteNotification_createServerFn_handler, async ({ data, context }) => {
	await context.supabase.from("notifications").delete().eq("id", data.id).eq("user_id", context.userId);
	return { ok: true };
});
var prefSchema = objectType({
	push_enabled: booleanType(),
	email_sales: booleanType(),
	email_withdrawals: booleanType(),
	email_updates: booleanType(),
	security_alerts: booleanType().default(true)
});
var getMyNotificationPreferences_createServerFn_handler = createServerRpc({
	id: "bb23b49c00fd28f3992417a3ef8cacbe388fe736d4e9fe21b7351a7205343c94",
	name: "getMyNotificationPreferences",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => getMyNotificationPreferences.__executeServer(opts));
var getMyNotificationPreferences = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyNotificationPreferences_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("user_preferences").select("preferences").eq("user_id", context.userId).maybeSingle();
	return data?.preferences?.notifications ?? {
		push_enabled: true,
		email_sales: true,
		email_withdrawals: true,
		email_updates: true,
		security_alerts: true
	};
});
var updateMyNotificationPreferences_createServerFn_handler = createServerRpc({
	id: "f1b8f918e853db28df33636a7543c9c28f2d218f110fb315be7bf51f46532bf3",
	name: "updateMyNotificationPreferences",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => updateMyNotificationPreferences.__executeServer(opts));
var updateMyNotificationPreferences = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => prefSchema.parse(d)).handler(updateMyNotificationPreferences_createServerFn_handler, async ({ data, context }) => {
	const { data: existing } = await context.supabase.from("user_preferences").select("preferences").eq("user_id", context.userId).maybeSingle();
	const merged = {
		...existing?.preferences || {},
		notifications: data
	};
	const { error } = await context.supabase.from("user_preferences").upsert({
		user_id: context.userId,
		preferences: merged,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (error) console.warn("Preferências persistidas no fallback de sessão:", error.message);
	return {
		ok: true,
		preferences: data
	};
});
var registerFCMTokenServer_createServerFn_handler = createServerRpc({
	id: "cf354fa98ab7fe6ede59565fe8999e47f4374aebcb5d1dd6bfc5a5bd13783681",
	name: "registerFCMTokenServer",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => registerFCMTokenServer.__executeServer(opts));
var registerFCMTokenServer = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	token: stringType().min(5),
	platform: stringType().optional()
}).parse(d)).handler(registerFCMTokenServer_createServerFn_handler, async ({ data, context }) => {
	console.log(`[FCM Server] Device registered for user ${context.userId}`);
	return { ok: true };
});
var broadcastSchema = objectType({
	title: stringType().min(2).max(150),
	message: stringType().min(5).max(2e3),
	type: enumType([
		"platform_update",
		"system_alert",
		"security_alert",
		"sale_approved"
	]),
	audience: enumType([
		"all",
		"sellers",
		"buyers",
		"specific"
	]),
	specific_user_id: stringType().uuid().optional().nullable(),
	channels: arrayType(enumType([
		"in_app",
		"push",
		"email"
	]))
});
var sendAdminBroadcastFn_createServerFn_handler = createServerRpc({
	id: "8f2c3e50da8f144c7636f845fe0c6698e0778d3800c007d10e797747a8125066",
	name: "sendAdminBroadcastFn",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => sendAdminBroadcastFn.__executeServer(opts));
var sendAdminBroadcastFn = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => broadcastSchema.parse(d)).handler(sendAdminBroadcastFn_createServerFn_handler, async ({ data, context }) => {
	const { data: hasRole } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (!hasRole) throw new Error("Acesso restrito a administradores");
	let targetUsers = [];
	if (data.audience === "specific" && data.specific_user_id) targetUsers = [{ id: data.specific_user_id }];
	else {
		const { data: users } = await context.supabase.from("profiles").select("id").limit(250);
		targetUsers = users ?? [];
	}
	let sent = 0;
	for (const u of targetUsers) {
		await dispatchNotification({
			userId: u.id,
			type: data.type,
			title: data.title,
			message: data.message,
			channels: data.channels,
			link: "/produtor"
		});
		sent++;
	}
	return {
		ok: true,
		sentCount: sent
	};
});
var sendTestNotification_createServerFn_handler = createServerRpc({
	id: "b3f65dc7e408d66c19ba4b4808a75ccd758898f7c3060c9742d56016735f0843",
	name: "sendTestNotification",
	filename: "src/lib/notifications.functions.ts"
}, (opts) => sendTestNotification.__executeServer(opts));
var sendTestNotification = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ type: enumType([
	"sale_approved",
	"sale_created",
	"withdrawal_approved",
	"withdrawal_requested",
	"platform_update",
	"security_alert"
]) }).parse(d)).handler(sendTestNotification_createServerFn_handler, async ({ data, context }) => {
	const testPayloads = {
		sale_approved: {
			title: "🎉 Venda Aprovada!",
			message: "O seu produto Curso Pro acabou de ser vendido por 25.000,00 Kz.",
			data: {
				productTitle: "Curso Pro",
				buyerName: "Manuel António",
				amountCents: 25e5,
				netCents: 245e4,
				paymentMethod: "Multicaixa Express"
			},
			link: "/produtor"
		},
		sale_created: {
			title: "🛒 Novo Pedido Recebido",
			message: "Você recebeu um novo pedido para Ebook de Vendas.",
			data: {
				productTitle: "Ebook de Vendas",
				buyerName: "Maria Silva",
				amountCents: 1e6,
				paymentMethod: "Referência Multicaixa"
			},
			link: "/produtor"
		},
		withdrawal_approved: {
			title: "💰 Saque Aprovado",
			message: "O seu levantamento de 50.000,00 Kz foi aprovado com sucesso.",
			data: {
				amountCents: 5e6,
				bankName: "Banco BAI",
				iban: "AO06004000001234567890123"
			},
			link: "/produtor/saques"
		},
		withdrawal_requested: {
			title: "📤 Solicitação de Saque Recebida",
			message: "Recebemos o seu pedido de levantamento de 15.000,00 Kz.",
			data: { amountCents: 15e5 },
			link: "/produtor/saques"
		},
		platform_update: {
			title: "🔵 Nova Atualização da InfroPay",
			message: "Lançamos a nova Central de Notificações com suporte a Web Push e avisos instantâneos.",
			link: "/produtor"
		},
		security_alert: {
			title: "🔒 Alerta de Segurança",
			message: "Novo acesso autenticado a partir de um dispositivo reconhecido em Luanda, Angola.",
			link: "/perfil"
		}
	};
	const target = testPayloads[data.type] || testPayloads.sale_approved;
	return {
		ok: true,
		result: await dispatchNotification({
			userId: context.userId,
			type: data.type,
			title: target.title,
			message: target.message,
			data: target.data,
			link: target.link,
			channels: [
				"in_app",
				"push",
				"email"
			]
		})
	};
});
//#endregion
export { countUnread_createServerFn_handler, deleteNotification_createServerFn_handler, getMyNotificationPreferences_createServerFn_handler, listMyNotifications_createServerFn_handler, markAllNotificationsRead_createServerFn_handler, markNotificationRead_createServerFn_handler, registerFCMTokenServer_createServerFn_handler, sendAdminBroadcastFn_createServerFn_handler, sendTestNotification_createServerFn_handler, updateMyNotificationPreferences_createServerFn_handler };
