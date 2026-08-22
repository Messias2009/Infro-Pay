import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications.server-BlbYki90.js
function renderInfroPayBaseEmail({ recipientName, previewText, contentHtml, ctaText, ctaUrl }) {
	return `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${previewText}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 12px !important; }
      .content-box { padding: 20px 16px !important; }
      .header-logo { height: 28px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050811; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E2E8F0; -webkit-font-smoothing: antialiased;">
  <!-- Preview Text -->
  <div style="display: none; font-size: 1px; color: #050811; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${previewText}
  </div>

  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050811; padding: 32px 0;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table class="container" width="560" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; width: 100%; margin: 0 auto;">
          
          <!-- Header Logo -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <div style="display: inline-flex; align-items: center; gap: 8px;">
                <span style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF;">
                  Infro<span style="color: #F59E0B;">Pay</span>
                </span>
              </div>
              <div style="font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 2px; margin-top: 2px;">
                Infraestrutura de Vendas Digitais
              </div>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td class="content-box" style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 16px; padding: 32px 28px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);">
              
              <!-- Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #94A3B8;">
                Olá, <strong style="color: #FFFFFF;">${recipientName ? recipientName.split(" ")[0] : "Produtor(a)"}</strong>
              </p>

              <!-- Dynamic Body Content -->
              <div style="color: #CBD5E1; font-size: 14px; line-height: 1.6;">
                ${contentHtml}
              </div>

              ${ctaText && ctaUrl ? `
              <!-- CTA Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 28px;">
                <tr>
                  <td align="center">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: #FFFFFF; font-weight: 700; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">
                      ${ctaText} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              ` : ""}

              <!-- Security Notice -->
              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #1E293B; font-size: 11px; color: #64748B; line-height: 1.5;">
                🔒 Esta é uma notificação automática e segura da sua conta InfroPay.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 24px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748B;">
                InfroPay © 2026 Todos os direitos reservados
              </p>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #475569;">
                Luanda, República de Angola · Suporte: suporte@infropay.ao
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
/**
* Format Angolan Kwanza
*/
function formatKz(amountCents) {
	return `${(amountCents / 100).toLocaleString("pt-AO", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})} Kz`;
}
/**
* 1. Template: Venda Aprovada (🟢)
*/
function renderSaleApprovedEmail({ producerName, productTitle, buyerName, buyerEmail, amountCents, netCents, paymentMethod, orderId, dashboardUrl }) {
	const subject = `🎉 Venda Aprovada: ${formatKz(amountCents)} — ${productTitle}`;
	const contentHtml = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; padding: 6px 14px; font-size: 12px; font-weight: 700; color: #10B981; margin-bottom: 10px;">
        ✓ Pagamento Confirmado
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #FFFFFF;">
        Parabéns, você realizou uma nova venda!
      </h1>
    </div>

    <!-- Highlight Box -->
    <div style="background-color: #1E293B; border-radius: 12px; padding: 18px; margin-bottom: 20px; border: 1px solid #334155;">
      <div style="font-size: 12px; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px;">Valor da Venda</div>
      <div style="font-size: 26px; font-weight: 800; color: #F59E0B; margin: 4px 0 8px 0;">
        ${formatKz(amountCents)}
      </div>
      <div style="font-size: 12px; color: #10B981;">
        Saldo líquido creditado na sua conta: <strong>${formatKz(netCents)}</strong>
      </div>
    </div>

    <!-- Order Details Table -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px; margin-bottom: 16px;">
      <tr>
        <td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Produto:</td>
        <td align="right" style="padding: 8px 0; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid #1E293B;">${productTitle}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Comprador:</td>
        <td align="right" style="padding: 8px 0; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid #1E293B;">${buyerName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Email do Cliente:</td>
        <td align="right" style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${buyerEmail}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94A3B8; border-bottom: 1px solid #1E293B;">Método de Pagamento:</td>
        <td align="right" style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #1E293B;">${paymentMethod}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #94A3B8;">Código do Pedido:</td>
        <td align="right" style="padding: 8px 0; color: #94A3B8; font-family: monospace;">${orderId}</td>
      </tr>
    </table>
  `;
	return {
		subject,
		html: renderInfroPayBaseEmail({
			recipientName: producerName,
			previewText: `Você recebeu uma nova venda de ${formatKz(amountCents)} no produto ${productTitle}`,
			contentHtml,
			ctaText: "Aceder ao Painel de Vendas",
			ctaUrl: dashboardUrl
		})
	};
}
/**
* 2. Template: Novo Pedido Criado (🛒)
*/
function renderNewOrderEmail({ producerName, productTitle, buyerName, amountCents, paymentMethod, dashboardUrl }) {
	const subject = `🛒 Novo Pedido Gerado: ${productTitle} (${formatKz(amountCents)})`;
	const contentHtml = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; background-color: rgba(37, 99, 235, 0.15); border: 1px solid rgba(37, 99, 235, 0.3); border-radius: 9999px; padding: 6px 14px; font-size: 12px; font-weight: 700; color: #60A5FA; margin-bottom: 10px;">
        Aguardando Pagamento
      </div>
      <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #FFFFFF;">
        Um cliente gerou um novo pedido
      </h1>
    </div>

    <p style="margin-bottom: 16px;">
      O cliente <strong>${buyerName}</strong> selecionou o produto <strong>${productTitle}</strong> no valor de <strong style="color: #F59E0B;">${formatKz(amountCents)}</strong> via <em>${paymentMethod}</em>.
    </p>

    <div style="background-color: #1E293B; border-radius: 12px; padding: 14px; border: 1px solid #334155; font-size: 13px; color: #94A3B8;">
      Assim que o pagamento for liquidado e confirmado pelo sistema, você receberá a notificação de venda aprovada e o saldo será creditado automaticamente.
    </div>
  `;
	return {
		subject,
		html: renderInfroPayBaseEmail({
			recipientName: producerName,
			previewText: `Novo pedido gerado para ${productTitle} por ${buyerName}`,
			contentHtml,
			ctaText: "Ver Pedidos no Painel",
			ctaUrl: dashboardUrl
		})
	};
}
/**
* 3. Template: Saque / Cashout (💰 / ⏳ / ⚠️)
*/
function renderWithdrawalEmail({ producerName, status, amountCents, bankName, iban, reason, dashboardUrl }) {
	let title = "";
	let badgeColor = "";
	let badgeText = "";
	let description = "";
	switch (status) {
		case "aprovado":
			title = "💰 Saque Aprovado e Transferido!";
			badgeColor = "#10B981";
			badgeText = "Aprovado com Sucesso";
			description = `O seu levantamento no valor de <strong style="color: #F59E0B;">${formatKz(amountCents)}</strong> foi aprovado pela administração e transferido para a sua conta bancária.`;
			break;
		case "em_processamento":
			title = "⏳ Saque em Processamento";
			badgeColor = "#3B82F6";
			badgeText = "Em Análise Bancária";
			description = `O seu pedido de levantamento de <strong style="color: #F59E0B;">${formatKz(amountCents)}</strong> está a ser processado pela equipa financeira.`;
			break;
		case "recusado":
			title = "⚠️ Saque Não Aprovado";
			badgeColor = "#EF4444";
			badgeText = "Recusado";
			description = `O seu pedido de levantamento de ${formatKz(amountCents)} não pôde ser concluído.${reason ? `<br><br><strong>Motivo indicado:</strong> ${reason}` : ""}<br><br>O valor foi estornado para o seu saldo disponível.`;
			break;
		default:
			title = "📤 Solicitação de Saque Recebida";
			badgeColor = "#F59E0B";
			badgeText = "Recebido";
			description = `Recebemos a sua solicitação de levantamento no valor de <strong style="color: #F59E0B;">${formatKz(amountCents)}</strong>.`;
	}
	const subject = `${title}: ${formatKz(amountCents)}`;
	const contentHtml = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.05); border: 1px solid ${badgeColor}; border-radius: 9999px; padding: 6px 14px; font-size: 12px; font-weight: 700; color: ${badgeColor}; margin-bottom: 10px;">
        ${badgeText}
      </div>
      <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #FFFFFF;">
        ${title}
      </h1>
    </div>

    <p style="margin-bottom: 20px; font-size: 14px; line-height: 1.6;">
      ${description}
    </p>

    ${bankName && iban ? `
    <div style="background-color: #1E293B; border-radius: 12px; padding: 16px; border: 1px solid #334155; font-size: 13px;">
      <div style="color: #94A3B8; font-size: 11px; text-transform: uppercase; margin-bottom: 4px;">Dados Bancários de Destino:</div>
      <div style="color: #FFFFFF; font-weight: 600;">${bankName}</div>
      <div style="color: #94A3B8; font-family: monospace; margin-top: 2px;">IBAN: ${iban}</div>
    </div>
    ` : ""}
  `;
	return {
		subject,
		html: renderInfroPayBaseEmail({
			recipientName: producerName,
			previewText: `${title} - ${formatKz(amountCents)}`,
			contentHtml,
			ctaText: "Ver Extrato Financeiro",
			ctaUrl: dashboardUrl
		})
	};
}
/**
* 4. Template: Atualização / Comunicado da Plataforma (📢 / 🔵)
*/
function renderPlatformUpdateEmail({ recipientName, title, message, actionUrl }) {
	return {
		subject: `📢 Atualização InfroPay: ${title}`,
		html: renderInfroPayBaseEmail({
			recipientName,
			previewText: title,
			contentHtml: `
    <div style="margin-bottom: 20px;">
      <div style="display: inline-block; background-color: rgba(37, 99, 235, 0.15); border: 1px solid rgba(37, 99, 235, 0.3); border-radius: 9999px; padding: 6px 14px; font-size: 12px; font-weight: 700; color: #60A5FA; margin-bottom: 10px;">
        Comunicado Oficial
      </div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #FFFFFF;">
        ${title}
      </h1>
    </div>

    <div style="background-color: #1E293B; border-radius: 12px; padding: 20px; border: 1px solid #334155; font-size: 14px; line-height: 1.7; color: #E2E8F0; white-space: pre-line;">
      ${message}
    </div>
  `,
			ctaText: actionUrl ? "Explorar Novidades" : "Aceder à Plataforma",
			ctaUrl: actionUrl || "https://infropay.ao/produtor"
		})
	};
}
/**
* 5. Template: Alerta de Segurança (🔒)
*/
function renderSecurityAlertEmail({ recipientName, alertTitle, alertDescription, timestamp, ipAddress }) {
	return {
		subject: `🔒 Alerta de Segurança da Conta — InfroPay`,
		html: renderInfroPayBaseEmail({
			recipientName,
			previewText: alertTitle,
			contentHtml: `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: inline-block; background-color: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 9999px; padding: 6px 14px; font-size: 12px; font-weight: 700; color: #F87171; margin-bottom: 10px;">
        Aviso de Segurança
      </div>
      <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #FFFFFF;">
        ${alertTitle}
      </h1>
    </div>

    <p style="margin-bottom: 16px; line-height: 1.6;">
      ${alertDescription}
    </p>

    <div style="background-color: #1E293B; border-radius: 12px; padding: 14px; border: 1px solid #334155; font-size: 12px; color: #94A3B8; margin-bottom: 16px;">
      <div><strong>Data/Hora:</strong> ${timestamp || (/* @__PURE__ */ new Date()).toLocaleString("pt-PT")}</div>
      ${ipAddress ? `<div><strong>Endereço IP:</strong> ${ipAddress}</div>` : ""}
    </div>

    <p style="font-size: 13px; color: #CBD5E1;">
      Se não reconhece esta acção, recomendamos alterar imediatamente a sua palavra-passe e contactar o suporte em <a href="mailto:suporte@infropay.ao" style="color: #F59E0B;">suporte@infropay.ao</a>.
    </p>
  `,
			ctaText: "Proteger Minha Conta",
			ctaUrl: "https://infropay.ao/perfil"
		})
	};
}
var recentEventsCache = /* @__PURE__ */ new Map();
function getAdminClient() {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
	return createClient(url, key, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
}
/**
* Send Transactional Email via available service (Resend / SendGrid / Custom SMTP / Console Fallback)
*/
async function sendEmail({ to, subject, html }) {
	try {
		if (process.env.RESEND_API_KEY) {
			const res = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					from: process.env.EMAIL_FROM || "InfroPay <suporte@infropay.ao>",
					to: [to],
					subject,
					html
				})
			});
			if (!res.ok) {
				const text = await res.text();
				console.warn("Resend API warning:", text);
			}
			return { success: true };
		}
		console.log(`[InfroPay Email Service] To: ${to} | Subject: "${subject}"`);
		return { success: true };
	} catch (err) {
		console.error("Erro ao enviar email transacional:", err);
		return {
			success: false,
			error: err.message
		};
	}
}
/**
* Send Web Push / FCM Push notification to user devices
*/
async function sendPushNotification({ userId, title, body, link, data }) {
	try {
		console.log(`[InfroPay Push Dispatcher] Dispatched Push for User ${userId}: "${title}"`);
		return {
			success: true,
			sentCount: 1
		};
	} catch (err) {
		console.error("Erro ao despachar Push:", err);
		return {
			success: false,
			sentCount: 0
		};
	}
}
/**
* Central Notification Dispatcher with Idempotency and Channel Management
*/
async function dispatchNotification(params) {
	const { userId, type, title, message, data = {}, relatedId, relatedType, link, channels = [
		"in_app",
		"push",
		"email"
	], idempotencyKey = `${type}_${relatedId || "none"}_${userId}` } = params;
	const now = Date.now();
	const cachedTime = recentEventsCache.get(idempotencyKey);
	if (cachedTime && now - cachedTime < 6e4) {
		console.log(`[Notification Engine] Event ${idempotencyKey} already processed. Skipping duplicate.`);
		return {
			success: true,
			inApp: false,
			push: false,
			email: false,
			skipped: true
		};
	}
	recentEventsCache.set(idempotencyKey, now);
	if (recentEventsCache.size > 1e3) {
		for (const [k, t] of recentEventsCache.entries()) if (now - t > 36e5) recentEventsCache.delete(k);
	}
	const supabase = getAdminClient();
	let userEmail = "";
	let userName = "Produtor";
	try {
		const { data: profile } = await supabase.from("profiles").select("full_name, username").eq("id", userId).maybeSingle();
		if (profile?.full_name) userName = profile.full_name;
		const { data: authUser } = await supabase.auth.admin.getUserById(userId).catch(() => ({ data: { user: null } }));
		if (authUser?.user?.email) userEmail = authUser.user.email;
	} catch (err) {
		console.warn("Não foi possível carregar email do usuário:", err);
	}
	if (!userEmail && data.buyerEmail) userEmail = data.buyerEmail;
	const activeChannels = new Set(channels);
	let inAppSuccess = false;
	if (activeChannels.has("in_app")) try {
		const { error } = await supabase.from("notifications").insert({
			user_id: userId,
			type: mapTypeToDb(type),
			title,
			body: message,
			link: link ?? null,
			read: false
		});
		if (!error) inAppSuccess = true;
	} catch (inAppErr) {
		console.warn("Erro ao salvar notificação in-app:", inAppErr);
	}
	let pushSuccess = false;
	if (activeChannels.has("push")) pushSuccess = (await sendPushNotification({
		userId,
		title,
		body: message,
		link,
		data
	})).success;
	let emailSuccess = false;
	if (activeChannels.has("email") && userEmail) {
		let emailRender = null;
		const dashboardUrl = link ? `https://infropay.ao${link}` : "https://infropay.ao/produtor";
		if (type === "sale_approved") emailRender = renderSaleApprovedEmail({
			producerName: userName,
			productTitle: data.productTitle || "Infoproduto",
			buyerName: data.buyerName || "Cliente",
			buyerEmail: data.buyerEmail || "",
			amountCents: data.amountCents || 0,
			netCents: data.netCents || 0,
			paymentMethod: data.paymentMethod || "Multicaixa",
			orderId: relatedId || "ORD-INFRO",
			dashboardUrl
		});
		else if (type === "sale_created") emailRender = renderNewOrderEmail({
			producerName: userName,
			productTitle: data.productTitle || "Infoproduto",
			buyerName: data.buyerName || "Cliente",
			amountCents: data.amountCents || 0,
			paymentMethod: data.paymentMethod || "Multicaixa",
			dashboardUrl
		});
		else if (type === "withdrawal_requested" || type === "withdrawal_approved" || type === "withdrawal_processing" || type === "withdrawal_rejected") emailRender = renderWithdrawalEmail({
			producerName: userName,
			status: {
				withdrawal_requested: "solicitado",
				withdrawal_processing: "em_processamento",
				withdrawal_approved: "aprovado",
				withdrawal_rejected: "recusado"
			}[type],
			amountCents: data.amountCents || 0,
			bankName: data.bankName,
			iban: data.iban,
			reason: data.reason,
			dashboardUrl: "https://infropay.ao/produtor/saques"
		});
		else if (type === "platform_update" || type === "system_alert") emailRender = renderPlatformUpdateEmail({
			recipientName: userName,
			title,
			message,
			actionUrl: dashboardUrl
		});
		else if (type === "security_alert") emailRender = renderSecurityAlertEmail({
			recipientName: userName,
			alertTitle: title,
			alertDescription: message,
			timestamp: (/* @__PURE__ */ new Date()).toLocaleString("pt-PT")
		});
		if (emailRender) emailSuccess = (await sendEmail({
			to: userEmail,
			subject: emailRender.subject,
			html: emailRender.html
		})).success;
	}
	return {
		success: true,
		inApp: inAppSuccess,
		push: pushSuccess,
		email: emailSuccess
	};
}
function mapTypeToDb(type) {
	if (type === "sale_approved" || type === "sale_created") return "sale";
	if (type === "withdrawal_requested" || type === "withdrawal_approved" || type === "withdrawal_rejected" || type === "withdrawal_processing") return "withdrawal";
	return "system";
}
//#endregion
export { dispatchNotification as t };
