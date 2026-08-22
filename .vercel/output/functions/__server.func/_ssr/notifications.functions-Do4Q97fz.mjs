import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications.functions-Do4Q97fz.js
var listMyNotifications = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("acdc1590236f0839542f983a97a7193af437f8125c921a77e6feea3b73ccec73"));
var countUnread = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("e7ff2b2df4e7a0c082778d58af44f4d3fa963d5650df25437c074f0ad15e5ab6"));
var markNotificationRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("385e76cdf807dd53711b6f969d894db85cf9b0ca7a6373bb34c6352adedccb64"));
var markAllNotificationsRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("9450c15293c0a6ae5fe14448bd9f3e0ad58f596f22af371b91f88b98002e414b"));
var deleteNotification = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("f06422965368cb200c820397c3202e17a495c2d964e585a6d01ab01406020d27"));
var prefSchema = objectType({
	push_enabled: booleanType(),
	email_sales: booleanType(),
	email_withdrawals: booleanType(),
	email_updates: booleanType(),
	security_alerts: booleanType().default(true)
});
var getMyNotificationPreferences = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("bb23b49c00fd28f3992417a3ef8cacbe388fe736d4e9fe21b7351a7205343c94"));
var updateMyNotificationPreferences = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => prefSchema.parse(d)).handler(createSsrRpc("f1b8f918e853db28df33636a7543c9c28f2d218f110fb315be7bf51f46532bf3"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	token: stringType().min(5),
	platform: stringType().optional()
}).parse(d)).handler(createSsrRpc("cf354fa98ab7fe6ede59565fe8999e47f4374aebcb5d1dd6bfc5a5bd13783681"));
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
var sendAdminBroadcastFn = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => broadcastSchema.parse(d)).handler(createSsrRpc("8f2c3e50da8f144c7636f845fe0c6698e0778d3800c007d10e797747a8125066"));
var sendTestNotification = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ type: enumType([
	"sale_approved",
	"sale_created",
	"withdrawal_approved",
	"withdrawal_requested",
	"platform_update",
	"security_alert"
]) }).parse(d)).handler(createSsrRpc("b3f65dc7e408d66c19ba4b4808a75ccd758898f7c3060c9742d56016735f0843"));
//#endregion
export { markAllNotificationsRead as a, sendTestNotification as c, listMyNotifications as i, updateMyNotificationPreferences as l, deleteNotification as n, markNotificationRead as o, getMyNotificationPreferences as r, sendAdminBroadcastFn as s, countUnread as t };
