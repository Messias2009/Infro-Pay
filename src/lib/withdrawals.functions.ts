import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { dispatchNotification } from "./notifications.server";

export const MIN_WITHDRAWAL_CENTS = 500_000; // 5.000 Kz (in cents)
export const WITHDRAWAL_FEE_PERCENT = 6; // 6%
export const WITHDRAWAL_FEE = 0.06; // 6% decimal
export const SALE_FEE_PERCENT = 2; // 2%
export const SALE_FEE = 0.02; // 2% decimal

async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (!data) throw new Error("Acesso restrito a administradores");
}

// ---------------- Bank accounts ----------------
export const listMyBankAccounts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await (context.supabase as any)
      .from("bank_accounts")
      .select("*")
      .eq("producer_id", context.userId)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

const bankSchema = z.object({
  id: z.string().uuid().optional(),
  holder_name: z.string().trim().min(2).max(120),
  bank_name: z.string().trim().min(2).max(80),
  iban: z.string().trim().min(10).max(40),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  is_default: z.boolean().optional(),
});

export const upsertBankAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) => bankSchema.parse(d))
  .handler(async ({ data, context }) => {
    const payload = { ...data, producer_id: context.userId };
    if (payload.is_default) {
      await (context.supabase as any)
        .from("bank_accounts")
        .update({ is_default: false })
        .eq("producer_id", context.userId);
    }
    let res;
    if (data.id) {
      res = await (context.supabase as any)
        .from("bank_accounts")
        .update(payload)
        .eq("id", data.id)
        .eq("producer_id", context.userId)
        .select()
        .maybeSingle();
    } else {
      res = await (context.supabase as any)
        .from("bank_accounts")
        .insert(payload)
        .select()
        .maybeSingle();
    }
    if (res.error) throw res.error;
    return res.data;
  });

export const deleteBankAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await (context.supabase as any)
      .from("bank_accounts")
      .delete()
      .eq("id", data.id)
      .eq("producer_id", context.userId);
    if (error) throw error;
    return { ok: true };
  });

// ---------------- Withdrawals with 6% fee & Idempotency ----------------
export const requestWithdrawal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        gross_cents: z
          .number()
          .int()
          .min(MIN_WITHDRAWAL_CENTS, "O valor mínimo de saque é 5.000 Kz"),
        bank_account_id: z.string().uuid(),
        idempotency_key: z.string().optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const feeCents = Math.round(data.gross_cents * WITHDRAWAL_FEE);
    const netCents = data.gross_cents - feeCents;

    // Check existing pending withdrawal with same idempotency key if provided
    if (data.idempotency_key) {
      const { data: existing } = await (context.supabase as any)
        .from("withdrawals")
        .select("*")
        .eq("producer_id", context.userId)
        .eq("idempotency_key", data.idempotency_key)
        .maybeSingle();
      if (existing) {
        return existing;
      }
    }

    const { error, data: row } = await (context.supabase as any)
      .from("withdrawals")
      .insert({
        producer_id: context.userId,
        bank_account_id: data.bank_account_id,
        gross_cents: data.gross_cents,
        fee_cents: feeCents,
        net_cents: netCents,
        idempotency_key: data.idempotency_key ?? crypto.randomUUID(),
        status: "em_analise",
      })
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message ?? "Falha ao pedir saque");

    // Dispatch withdrawal requested notification
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
          feePercent: WITHDRAWAL_FEE_PERCENT,
        },
        relatedId: row?.id,
        relatedType: "withdrawal",
        link: "/produtor/saques",
      });
    } catch (nErr) {
      console.warn("Erro ao despachar notificação de saque solicitado:", nErr);
    }

    return row;
  });

export const listMyWithdrawals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await (context.supabase as any)
      .from("withdrawals")
      .select("*, bank_account:bank_accounts(holder_name, bank_name, iban)")
      .eq("producer_id", context.userId)
      .order("created_at", { ascending: false });
    return data ?? [];
  });

// ---------------- Admin ----------------
export const listAllWithdrawals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { status?: string } | undefined) => d ?? {})
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    let q = (context.supabase as any)
      .from("withdrawals")
      .select(
        "*, bank_account:bank_accounts(holder_name, bank_name, iban, phone), producer:profiles!withdrawals_producer_id_fkey(full_name, username, avatar_url)",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (data?.status) q = q.eq("status", data.status);
    const { data: rows, error } = await q;
    if (error) throw error;
    return rows ?? [];
  });

export const updateWithdrawalStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["em_analise", "aprovado", "pago", "recusado"]),
        rejection_reason: z.string().trim().max(500).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const patch: any = { status: data.status };
    if (data.status === "recusado")
      patch.rejection_reason = data.rejection_reason ?? "Sem motivo indicado";

    // Fetch withdrawal details for notification
    const { data: currentW } = await (context.supabase as any)
      .from("withdrawals")
      .select("*, bank_account:bank_accounts(bank_name, iban)")
      .eq("id", data.id)
      .maybeSingle();

    const { error } = await (context.supabase as any)
      .from("withdrawals")
      .update(patch)
      .eq("id", data.id);
    if (error) throw error;

    // Dispatch status update notification to producer
    if (currentW?.producer_id) {
      try {
        const notifType =
          data.status === "aprovado" || data.status === "pago"
            ? "withdrawal_approved"
            : data.status === "em_analise"
              ? "withdrawal_processing"
              : "withdrawal_rejected";

        const title =
          data.status === "aprovado" || data.status === "pago"
            ? "💰 Saque Aprovado e Transferido!"
            : data.status === "em_analise"
              ? "⏳ Saque em Análise Bancária"
              : "⚠️ Saque Recusado";

        const netFormatted =
          (
            (currentW.net_cents || currentW.gross_cents * (1 - WITHDRAWAL_FEE)) / 100
          ).toLocaleString("pt-AO") + " Kz";
        const message =
          data.status === "aprovado" || data.status === "pago"
            ? `O seu levantamento líquido de ${netFormatted} foi processado e creditado com sucesso.`
            : data.status === "em_analise"
              ? `O seu levantamento de ${netFormatted} está a ser analisado pela equipa financeira.`
              : `O seu pedido de levantamento foi recusado.${data.rejection_reason ? ` Motivo: ${data.rejection_reason}` : ""}`;

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
            reason: data.rejection_reason,
          },
          relatedId: data.id,
          relatedType: "withdrawal",
          link: "/produtor/saques",
        });
      } catch (nErr) {
        console.warn("Erro ao despachar notificação de atualização de saque:", nErr);
      }
    }

    const { logAdminAction } = await import("./admin.functions");
    await logAdminAction(
      context.supabase,
      context.userId,
      `withdrawal_${data.status}`,
      "withdrawal",
      data.id,
      {
        status: data.status,
        reason: data.rejection_reason ?? null,
      },
    );
    return { ok: true };
  });
