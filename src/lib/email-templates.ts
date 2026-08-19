/**
 * InfroPay Branded Responsive Transactional Email Templates
 * Colors: Navy Blue (#0A0F1D / #0F172A), Electric Blue (#2563EB), Gold (#F59E0B / #D97706), White (#FFFFFF)
 */

interface BaseEmailProps {
  recipientName?: string;
  previewText: string;
  contentHtml: string;
  ctaText?: string;
  ctaUrl?: string;
}

export function renderInfroPayBaseEmail({
  recipientName,
  previewText,
  contentHtml,
  ctaText,
  ctaUrl,
}: BaseEmailProps): string {
  const name = recipientName ? recipientName.split(" ")[0] : "Produtor(a)";

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
                Olá, <strong style="color: #FFFFFF;">${name}</strong>
              </p>

              <!-- Dynamic Body Content -->
              <div style="color: #CBD5E1; font-size: 14px; line-height: 1.6;">
                ${contentHtml}
              </div>

              ${
                ctaText && ctaUrl
                  ? `
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
              `
                  : ""
              }

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
export function formatKz(amountCents: number): string {
  const kz = (amountCents / 100).toLocaleString("pt-AO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${kz} Kz`;
}

/**
 * 1. Template: Venda Aprovada (🟢)
 */
export function renderSaleApprovedEmail({
  producerName,
  productTitle,
  buyerName,
  buyerEmail,
  amountCents,
  netCents,
  paymentMethod,
  orderId,
  dashboardUrl,
}: {
  producerName: string;
  productTitle: string;
  buyerName: string;
  buyerEmail: string;
  amountCents: number;
  netCents: number;
  paymentMethod: string;
  orderId: string;
  dashboardUrl: string;
}): { subject: string; html: string } {
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
      ctaUrl: dashboardUrl,
    }),
  };
}

/**
 * 2. Template: Novo Pedido Criado (🛒)
 */
export function renderNewOrderEmail({
  producerName,
  productTitle,
  buyerName,
  amountCents,
  paymentMethod,
  dashboardUrl,
}: {
  producerName: string;
  productTitle: string;
  buyerName: string;
  amountCents: number;
  paymentMethod: string;
  dashboardUrl: string;
}): { subject: string; html: string } {
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
      ctaUrl: dashboardUrl,
    }),
  };
}

/**
 * 3. Template: Saque / Cashout (💰 / ⏳ / ⚠️)
 */
export function renderWithdrawalEmail({
  producerName,
  status,
  amountCents,
  bankName,
  iban,
  reason,
  dashboardUrl,
}: {
  producerName: string;
  status: "solicitado" | "em_processamento" | "aprovado" | "recusado";
  amountCents: number;
  bankName?: string;
  iban?: string;
  reason?: string;
  dashboardUrl: string;
}): { subject: string; html: string } {
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

    ${
      bankName && iban
        ? `
    <div style="background-color: #1E293B; border-radius: 12px; padding: 16px; border: 1px solid #334155; font-size: 13px;">
      <div style="color: #94A3B8; font-size: 11px; text-transform: uppercase; margin-bottom: 4px;">Dados Bancários de Destino:</div>
      <div style="color: #FFFFFF; font-weight: 600;">${bankName}</div>
      <div style="color: #94A3B8; font-family: monospace; margin-top: 2px;">IBAN: ${iban}</div>
    </div>
    `
        : ""
    }
  `;

  return {
    subject,
    html: renderInfroPayBaseEmail({
      recipientName: producerName,
      previewText: `${title} - ${formatKz(amountCents)}`,
      contentHtml,
      ctaText: "Ver Extrato Financeiro",
      ctaUrl: dashboardUrl,
    }),
  };
}

/**
 * 4. Template: Atualização / Comunicado da Plataforma (📢 / 🔵)
 */
export function renderPlatformUpdateEmail({
  recipientName,
  title,
  message,
  actionUrl,
}: {
  recipientName: string;
  title: string;
  message: string;
  actionUrl?: string;
}): { subject: string; html: string } {
  const subject = `📢 Atualização InfroPay: ${title}`;

  const contentHtml = `
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
  `;

  return {
    subject,
    html: renderInfroPayBaseEmail({
      recipientName,
      previewText: title,
      contentHtml,
      ctaText: actionUrl ? "Explorar Novidades" : "Aceder à Plataforma",
      ctaUrl: actionUrl || "https://infropay.ao/produtor",
    }),
  };
}

/**
 * 5. Template: Alerta de Segurança (🔒)
 */
export function renderSecurityAlertEmail({
  recipientName,
  alertTitle,
  alertDescription,
  timestamp,
  ipAddress,
}: {
  recipientName: string;
  alertTitle: string;
  alertDescription: string;
  timestamp?: string;
  ipAddress?: string;
}): { subject: string; html: string } {
  const subject = `🔒 Alerta de Segurança da Conta — InfroPay`;

  const contentHtml = `
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
      <div><strong>Data/Hora:</strong> ${timestamp || new Date().toLocaleString("pt-PT")}</div>
      ${ipAddress ? `<div><strong>Endereço IP:</strong> ${ipAddress}</div>` : ""}
    </div>

    <p style="font-size: 13px; color: #CBD5E1;">
      Se não reconhece esta acção, recomendamos alterar imediatamente a sua palavra-passe e contactar o suporte em <a href="mailto:suporte@infropay.ao" style="color: #F59E0B;">suporte@infropay.ao</a>.
    </p>
  `;

  return {
    subject,
    html: renderInfroPayBaseEmail({
      recipientName,
      previewText: alertTitle,
      contentHtml,
      ctaText: "Proteger Minha Conta",
      ctaUrl: "https://infropay.ao/perfil",
    }),
  };
}
