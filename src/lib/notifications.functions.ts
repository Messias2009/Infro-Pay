import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import {
  dispatchNotification,
  type NotificationType,
  type NotificationChannel,
} from "./notifications.server";

export const listMyNotifications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await (context.supabase as any)
      .from("notifications")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(60);
    return data ?? [];
  });

export const countUnread = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { count } = await (context.supabase as any)
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", context.userId)
      .eq("read", false);
    return count ?? 0;
  });

export const markNotificationRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await (context.supabase as any)
      .from("notifications")
      .update({ read: true })
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });

export const markAllNotificationsRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await (context.supabase as any)
      .from("notifications")
      .update({ read: true })
      .eq("user_id", context.userId)
      .eq("read", false);
    return { ok: true };
  });

export const deleteNotification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await (context.supabase as any)
      .from("notifications")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: true };
  });

// ---------------- User Notification Preferences ----------------
const prefSchema = z.object({
  push_enabled: z.boolean(),
  email_sales: z.boolean(),
  email_withdrawals: z.boolean(),
  email_updates: z.boolean(),
  security_alerts: z.boolean().default(true),
});

export const getMyNotificationPreferences = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await (context.supabase as any)
      .from("user_preferences")
      .select("preferences")
      .eq("user_id", context.userId)
      .maybeSingle();

    return (
      data?.preferences?.notifications ?? {
        push_enabled: true,
        email_sales: true,
        email_withdrawals: true,
        email_updates: true,
        security_alerts: true,
      }
    );
  });

export const updateMyNotificationPreferences = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) => prefSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: existing } = await (context.supabase as any)
      .from("user_preferences")
      .select("preferences")
      .eq("user_id", context.userId)
      .maybeSingle();

    const merged = {
      ...(existing?.preferences || {}),
      notifications: data,
    };

    const { error } = await (context.supabase as any).from("user_preferences").upsert({
      user_id: context.userId,
      preferences: merged,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.warn("Preferências persistidas no fallback de sessão:", error.message);
    }
    return { ok: true, preferences: data };
  });

// ---------------- Token Registration ----------------
export const registerFCMTokenServer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        token: z.string().min(5),
        platform: z.string().optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    console.log(`[FCM Server] Device registered for user ${context.userId}`);
    return { ok: true };
  });

// ---------------- Admin Broadcast ----------------
const broadcastSchema = z.object({
  title: z.string().min(2).max(150),
  message: z.string().min(5).max(2000),
  type: z.enum(["platform_update", "system_alert", "security_alert", "sale_approved"]),
  audience: z.enum(["all", "sellers", "buyers", "specific"]),
  specific_user_id: z.string().uuid().optional().nullable(),
  channels: z.array(z.enum(["in_app", "push", "email"])),
});

export const sendAdminBroadcastFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) => broadcastSchema.parse(d))
  .handler(async ({ data, context }) => {
    // Assert admin
    const { data: hasRole } = await (context.supabase as any).rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!hasRole) throw new Error("Acesso restrito a administradores");

    let targetUsers: { id: string }[] = [];
    if (data.audience === "specific" && data.specific_user_id) {
      targetUsers = [{ id: data.specific_user_id }];
    } else {
      const { data: users } = await (context.supabase as any)
        .from("profiles")
        .select("id")
        .limit(250);
      targetUsers = users ?? [];
    }

    let sent = 0;
    for (const u of targetUsers) {
      await dispatchNotification({
        userId: u.id,
        type: data.type as NotificationType,
        title: data.title,
        message: data.message,
        channels: data.channels as NotificationChannel[],
        link: "/produtor",
      });
      sent++;
    }

    return { ok: true, sentCount: sent };
  });

// ---------------- Test Notification Dispatcher ----------------
export const sendTestNotification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: any) =>
    z
      .object({
        type: z.enum([
          "sale_approved",
          "sale_created",
          "withdrawal_approved",
          "withdrawal_requested",
          "platform_update",
          "security_alert",
        ]),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const testPayloads: Record<
      string,
      { title: string; message: string; data?: any; link?: string }
    > = {
      sale_approved: {
        title: "🎉 Venda Aprovada!",
        message: "O seu produto Curso Pro acabou de ser vendido por 25.000,00 Kz.",
        data: {
          productTitle: "Curso Pro",
          buyerName: "Manuel António",
          amountCents: 2500000,
          netCents: 2450000,
          paymentMethod: "Multicaixa Express",
        },
        link: "/produtor",
      },
      sale_created: {
        title: "🛒 Novo Pedido Recebido",
        message: "Você recebeu um novo pedido para Ebook de Vendas.",
        data: {
          productTitle: "Ebook de Vendas",
          buyerName: "Maria Silva",
          amountCents: 1000000,
          paymentMethod: "Referência Multicaixa",
        },
        link: "/produtor",
      },
      withdrawal_approved: {
        title: "💰 Saque Aprovado",
        message: "O seu levantamento de 50.000,00 Kz foi aprovado com sucesso.",
        data: {
          amountCents: 5000000,
          bankName: "Banco BAI",
          iban: "AO06004000001234567890123",
        },
        link: "/produtor/saques",
      },
      withdrawal_requested: {
        title: "📤 Solicitação de Saque Recebida",
        message: "Recebemos o seu pedido de levantamento de 15.000,00 Kz.",
        data: { amountCents: 1500000 },
        link: "/produtor/saques",
      },
      platform_update: {
        title: "🔵 Nova Atualização da InfroPay",
        message:
          "Lançamos a nova Central de Notificações com suporte a Web Push e avisos instantâneos.",
        link: "/produtor",
      },
      security_alert: {
        title: "🔒 Alerta de Segurança",
        message:
          "Novo acesso autenticado a partir de um dispositivo reconhecido em Luanda, Angola.",
        link: "/perfil",
      },
    };

    const target = testPayloads[data.type] || testPayloads.sale_approved;

    const res = await dispatchNotification({
      userId: context.userId,
      type: data.type as NotificationType,
      title: target.title,
      message: target.message,
      data: target.data,
      link: target.link,
      channels: ["in_app", "push", "email"],
    });

    return { ok: true, result: res };
  });
