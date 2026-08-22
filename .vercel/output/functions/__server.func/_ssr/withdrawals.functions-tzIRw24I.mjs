import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { a as numberType, i as literalType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
import { t as dispatchNotification } from "./notifications.server-BlbYki90.mjs";
import { t as createServerRpc } from "./createServerRpc-Dj2O0cdM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/withdrawals.functions-tzIRw24I.js
var MIN_WITHDRAWAL_CENTS = 5e5;
var WITHDRAWAL_FEE_PERCENT = 6;
var WITHDRAWAL_FEE = .06;
async function assertAdmin(supabase, userId) {
	const { data } = await supabase.rpc("has_role", {
		_user_id: userId,
		_role: "admin"
	});
	if (!data) throw new Error("Acesso restrito a administradores");
}
var listMyBankAccounts_createServerFn_handler = createServerRpc({
	id: "765aab637128b68f0381c31e0e2e0db1eed9387eea587ef7c4e004541ad44e3c",
	name: "listMyBankAccounts",
	filename: "src/lib/withdrawals.functions.ts"
}, (opts) => listMyBankAccounts.__executeServer(opts));
var listMyBankAccounts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyBankAccounts_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("bank_accounts").select("*").eq("producer_id", context.userId).order("is_default", { ascending: false }).order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
});
var bankSchema = objectType({
	id: stringType().uuid().optional(),
	holder_name: stringType().trim().min(2).max(120),
	bank_name: stringType().trim().min(2).max(80),
	iban: stringType().trim().min(10).max(40),
	phone: stringType().trim().max(20).optional().or(literalType("")),
	is_default: booleanType().optional()
});
var upsertBankAccount_createServerFn_handler = createServerRpc({
	id: "ae663d8bde41495e821fee24aa76f561343f6aef6fab208dc4a88ae10e735b1b",
	name: "upsertBankAccount",
	filename: "src/lib/withdrawals.functions.ts"
}, (opts) => upsertBankAccount.__executeServer(opts));
var upsertBankAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => bankSchema.parse(d)).handler(upsertBankAccount_createServerFn_handler, async ({ data, context }) => {
	const payload = {
		...data,
		producer_id: context.userId
	};
	if (payload.is_default) await context.supabase.from("bank_accounts").update({ is_default: false }).eq("producer_id", context.userId);
	let res;
	if (data.id) res = await context.supabase.from("bank_accounts").update(payload).eq("id", data.id).eq("producer_id", context.userId).select().maybeSingle();
	else res = await context.supabase.from("bank_accounts").insert(payload).select().maybeSingle();
	if (res.error) throw res.error;
	return res.data;
});
var deleteBankAccount_createServerFn_handler = createServerRpc({
	id: "9c2bf91821859a21cba281d58d5c5987ad233387336a3bd70318bbbccebf1f7e",
	name: "deleteBankAccount",
	filename: "src/lib/withdrawals.functions.ts"
}, (opts) => deleteBankAccount.__executeServer(opts));
var deleteBankAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(deleteBankAccount_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("bank_accounts").delete().eq("id", data.id).eq("producer_id", context.userId);
	if (error) throw error;
	return { ok: true };
});
var requestWithdrawal_createServerFn_handler = createServerRpc({
	id: "015f4524f645a995e864a29c2310585ab9c2fb62ff4303284905b9b0dcd85ef6",
	name: "requestWithdrawal",
	filename: "src/lib/withdrawals.functions.ts"
}, (opts) => requestWithdrawal.__executeServer(opts));
var requestWithdrawal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	gross_cents: numberType().int().min(MIN_WITHDRAWAL_CENTS, "O valor mínimo de saque é 5.000 Kz"),
	bank_account_id: stringType().uuid(),
	idempotency_key: stringType().optional()
}).parse(d)).handler(requestWithdrawal_createServerFn_handler, async ({ data, context }) => {
	const feeCents = Math.round(data.gross_cents * WITHDRAWAL_FEE);
	const netCents = data.gross_cents - feeCents;
	if (data.idempotency_key) {
		const { data: existing } = await context.supabase.from("withdrawals").select("*").eq("producer_id", context.userId).eq("idempotency_key", data.idempotency_key).maybeSingle();
		if (existing) return existing;
	}
	const { error, data: row } = await context.supabase.from("withdrawals").insert({
		producer_id: context.userId,
		bank_account_id: data.bank_account_id,
		gross_cents: data.gross_cents,
		fee_cents: feeCents,
		net_cents: netCents,
		idempotency_key: data.idempotency_key ?? crypto.randomUUID(),
		status: "em_analise"
	}).select().maybeSingle();
	if (error) throw new Error(error.message ?? "Falha ao pedir saque");
	try {
		await dispatchNotification({
			userId: context.userId,
			type: "withdrawal_requested",
			title: "📤 Solicitação de Saque Recebida",
			message: `O seu pedido de levantamento de ${(data.gross_cents / 100).toLocaleString("pt-AO")} Kz (Líquido: ${(netCents / 100).toLocaleString("pt-AO")} Kz após 6% de taxa) foi submetido para análise.`,
			data: {
				amountCents: data.gross_cents,
				feeCents,
				netCents,
				feePercent: WITHDRAWAL_FEE_PERCENT
			},
			relatedId: row?.id,
			relatedType: "withdrawal",
			link: "/produtor/saques"
		});
	} catch (nErr) {
		console.warn("Erro ao despachar notificação de saque solicitado:", nErr);
	}
	return row;
});
var listMyWithdrawals_createServerFn_handler = createServerRpc({
	id: "acd6afc46f61a5d01657a7ee4f8a75e848d0b765952eb2b875d4cc56310a75da",
	name: "listMyWithdrawals",
	filename: "src/lib/withdrawals.functions.ts"
}, (opts) => listMyWithdrawals.__executeServer(opts));
var listMyWithdrawals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyWithdrawals_createServerFn_handler, async ({ context }) => {
	const { data } = await context.supabase.from("withdrawals").select("*, bank_account:bank_accounts(holder_name, bank_name, iban)").eq("producer_id", context.userId).order("created_at", { ascending: false });
	return data ?? [];
});
var listAllWithdrawals_createServerFn_handler = createServerRpc({
	id: "ec6a2693607df9b08f381b796f6df8f56929f983e94a90f025d9a06366ed9c9f",
	name: "listAllWithdrawals",
	filename: "src/lib/withdrawals.functions.ts"
}, (opts) => listAllWithdrawals.__executeServer(opts));
var listAllWithdrawals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(listAllWithdrawals_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	let q = context.supabase.from("withdrawals").select("*, bank_account:bank_accounts(holder_name, bank_name, iban, phone), producer:profiles!withdrawals_producer_id_fkey(full_name, username, avatar_url)").order("created_at", { ascending: false }).limit(200);
	if (data?.status) q = q.eq("status", data.status);
	const { data: rows, error } = await q;
	if (error) throw error;
	return rows ?? [];
});
var updateWithdrawalStatus_createServerFn_handler = createServerRpc({
	id: "ca90a5b921177391ce74901701131887d850f20f59b31d40ac6fd19ead017696",
	name: "updateWithdrawalStatus",
	filename: "src/lib/withdrawals.functions.ts"
}, (opts) => updateWithdrawalStatus.__executeServer(opts));
var updateWithdrawalStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	status: enumType([
		"em_analise",
		"aprovado",
		"pago",
		"recusado"
	]),
	rejection_reason: stringType().trim().max(500).optional()
}).parse(d)).handler(updateWithdrawalStatus_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const patch = { status: data.status };
	if (data.status === "recusado") patch.rejection_reason = data.rejection_reason ?? "Sem motivo indicado";
	const { data: currentW } = await context.supabase.from("withdrawals").select("*, bank_account:bank_accounts(bank_name, iban)").eq("id", data.id).maybeSingle();
	const { error } = await context.supabase.from("withdrawals").update(patch).eq("id", data.id);
	if (error) throw error;
	if (currentW?.producer_id) try {
		const notifType = data.status === "aprovado" || data.status === "pago" ? "withdrawal_approved" : data.status === "em_analise" ? "withdrawal_processing" : "withdrawal_rejected";
		const title = data.status === "aprovado" || data.status === "pago" ? "💰 Saque Aprovado e Transferido!" : data.status === "em_analise" ? "⏳ Saque em Análise Bancária" : "⚠️ Saque Recusado";
		const netFormatted = ((currentW.net_cents || currentW.gross_cents * .94) / 100).toLocaleString("pt-AO") + " Kz";
		const message = data.status === "aprovado" || data.status === "pago" ? `O seu levantamento líquido de ${netFormatted} foi processado e creditado com sucesso.` : data.status === "em_analise" ? `O seu levantamento de ${netFormatted} está a ser analisado pela equipa financeira.` : `O seu pedido de levantamento foi recusado.${data.rejection_reason ? ` Motivo: ${data.rejection_reason}` : ""}`;
		await dispatchNotification({
			userId: currentW.producer_id,
			type: notifType,
			title,
			message,
			data: {
				amountCents: currentW.gross_cents,
				netCents: currentW.net_cents,
				feeCents: currentW.fee_cents,
				feePercent: WITHDRAWAL_FEE_PERCENT,
				bankName: currentW.bank_account?.bank_name,
				iban: currentW.bank_account?.iban,
				reason: data.rejection_reason
			},
			relatedId: data.id,
			relatedType: "withdrawal",
			link: "/produtor/saques"
		});
	} catch (nErr) {
		console.warn("Erro ao despachar notificação de atualização de saque:", nErr);
	}
	const { logAdminAction } = await import("./admin.functions-C-gZNnTo.mjs");
	await logAdminAction(context.supabase, context.userId, `withdrawal_${data.status}`, "withdrawal", data.id, {
		status: data.status,
		reason: data.rejection_reason ?? null
	});
	return { ok: true };
});
//#endregion
export { deleteBankAccount_createServerFn_handler, listAllWithdrawals_createServerFn_handler, listMyBankAccounts_createServerFn_handler, listMyWithdrawals_createServerFn_handler, requestWithdrawal_createServerFn_handler, updateWithdrawalStatus_createServerFn_handler, upsertBankAccount_createServerFn_handler };
