import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { a as numberType, i as literalType, n as booleanType, o as objectType, r as enumType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/withdrawals.functions-DcFkCgPW.js
var MIN_WITHDRAWAL_CENTS = 5e5;
var WITHDRAWAL_FEE = .06;
var listMyBankAccounts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("765aab637128b68f0381c31e0e2e0db1eed9387eea587ef7c4e004541ad44e3c"));
var bankSchema = objectType({
	id: stringType().uuid().optional(),
	holder_name: stringType().trim().min(2).max(120),
	bank_name: stringType().trim().min(2).max(80),
	iban: stringType().trim().min(10).max(40),
	phone: stringType().trim().max(20).optional().or(literalType("")),
	is_default: booleanType().optional()
});
var upsertBankAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => bankSchema.parse(d)).handler(createSsrRpc("ae663d8bde41495e821fee24aa76f561343f6aef6fab208dc4a88ae10e735b1b"));
var deleteBankAccount = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ id: stringType().uuid() }).parse(d)).handler(createSsrRpc("9c2bf91821859a21cba281d58d5c5987ad233387336a3bd70318bbbccebf1f7e"));
var requestWithdrawal = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	gross_cents: numberType().int().min(MIN_WITHDRAWAL_CENTS, "O valor mínimo de saque é 5.000 Kz"),
	bank_account_id: stringType().uuid(),
	idempotency_key: stringType().optional()
}).parse(d)).handler(createSsrRpc("015f4524f645a995e864a29c2310585ab9c2fb62ff4303284905b9b0dcd85ef6"));
var listMyWithdrawals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("acd6afc46f61a5d01657a7ee4f8a75e848d0b765952eb2b875d4cc56310a75da"));
var listAllWithdrawals = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((d) => d ?? {}).handler(createSsrRpc("ec6a2693607df9b08f381b796f6df8f56929f983e94a90f025d9a06366ed9c9f"));
var updateWithdrawalStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
	id: stringType().uuid(),
	status: enumType([
		"em_analise",
		"aprovado",
		"pago",
		"recusado"
	]),
	rejection_reason: stringType().trim().max(500).optional()
}).parse(d)).handler(createSsrRpc("ca90a5b921177391ce74901701131887d850f20f59b31d40ac6fd19ead017696"));
//#endregion
export { listMyWithdrawals as a, upsertBankAccount as c, listMyBankAccounts as i, deleteBankAccount as n, requestWithdrawal as o, listAllWithdrawals as r, updateWithdrawalStatus as s, WITHDRAWAL_FEE as t };
