import nodemailer from 'nodemailer';

/**
 * Sistema de notificaciones para eventos críticos de negocio
 * Envía alertas por email cuando ocurren eventos importantes
 */

interface NotificationData {
    event: string;
    email: string;
    name: string;
    product?: string;
    amount?: number;
    country?: string;
    timestamp: Date;
}

/**
 * Envía notificación por email al administrador
 */
export async function sendAdminNotification(data: NotificationData) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error('❌ Gmail credentials not configured for admin notifications');
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER.trim(),
                pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            },
        });

        // Determinar el tipo de alerta y su urgencia
        const isUrgent = data.event === 'PURCHASE_CANCELED' || data.event === 'PURCHASE_REFUNDED';
        const emoji = getEventEmoji(data.event);
        const priority = isUrgent ? 'high' : 'normal';

        const subject = `${emoji} ${data.event} - ${data.name}`;

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: ${isUrgent ? '#dc2626' : '#3b82f6'}; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
                    .detail { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #3b82f6; }
                    .urgent { border-left-color: #dc2626; }
                    .footer { margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
                    .label { font-weight: bold; color: #4b5563; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2 style="margin: 0;">${emoji} Notificación de Hotmart</h2>
                        <p style="margin: 5px 0 0 0; opacity: 0.9;">${data.event}</p>
                    </div>
                    
                    <div class="content">
                        <div class="detail ${isUrgent ? 'urgent' : ''}">
                            <p><span class="label">📧 Email:</span> ${data.email}</p>
                            <p><span class="label">👤 Nombre:</span> ${data.name}</p>
                            ${data.product ? `<p><span class="label">📚 Producto:</span> ${data.product}</p>` : ''}
                            ${data.amount ? `<p><span class="label">💰 Monto:</span> $${data.amount}</p>` : ''}
                            ${data.country ? `<p><span class="label">🌍 País:</span> ${data.country}</p>` : ''}
                            <p><span class="label">🕐 Fecha:</span> ${data.timestamp.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</p>
                        </div>

                        ${isUrgent ? `
                            <div style="margin-top: 20px; padding: 15px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;">
                                <p style="margin: 0; color: #991b1b; font-weight: bold;">⚠️ Acción Requerida</p>
                                <p style="margin: 10px 0 0 0; color: #7f1d1d;">
                                    ${data.event === 'PURCHASE_CANCELED'
                    ? 'Esta venta fue cancelada. Considera enviar un email de seguimiento al cliente.'
                    : 'Se ha solicitado un reembolso. Revisa los detalles en Hotmart.'}
                                </p>
                            </div>
                        ` : ''}

                        <div style="margin-top: 20px; text-align: center;">
                            <a href="https://app.hotmart.com/tools/reports/sales" 
                               style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                Ver en Hotmart
                            </a>
                        </div>
                    </div>

                    <div class="footer">
                        <p style="margin: 0;">Notificación automática de Padres con Resiliencia</p>
                        <p style="margin: 5px 0 0 0;">Para configurar estas notificaciones, edita las variables de entorno.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        await transporter.sendMail({
            from: `"Padres con Resiliencia - Sistema" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER, // Enviar al mismo email del admin
            subject: subject,
            html: htmlContent,
            priority: priority as any,
        });

        console.log(`✅ Admin notification sent for ${data.event}`);

    } catch (error) {
        console.error('❌ Error sending admin notification:', error);
    }
}

/**
 * Envía notificación por Telegram (opcional)
 */
export async function sendTelegramNotification(data: NotificationData) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.log('ℹ️ Telegram not configured, skipping notification');
        return;
    }

    try {
        const emoji = getEventEmoji(data.event);
        const message = `
${emoji} *${data.event}*

👤 ${data.name}
📧 ${data.email}
${data.product ? `📚 ${data.product}` : ''}
${data.amount ? `💰 $${data.amount}` : ''}
${data.country ? `🌍 ${data.country}` : ''}
🕐 ${data.timestamp.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
        `.trim();

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown',
            }),
        });

        if (response.ok) {
            console.log(`✅ Telegram notification sent for ${data.event}`);
        } else {
            console.error('❌ Telegram API error:', await response.text());
        }

    } catch (error) {
        console.error('❌ Error sending Telegram notification:', error);
    }
}

/**
 * Obtiene el emoji apropiado para cada tipo de evento
 */
function getEventEmoji(event: string): string {
    const emojiMap: Record<string, string> = {
        'PURCHASE_APPROVED': '✅',
        'PURCHASE_CANCELED': '❌',
        'PURCHASE_OUT_OF_SHOPPING_CART': '🛒',
        'PURCHASE_REFUNDED': '💸',
        'PURCHASE_DELAYED': '⏳',
        'PURCHASE_COMPLETE': '🎉',
        'SUBSCRIPTION_CANCELLATION': '🔴',
    };

    return emojiMap[event] || '📢';
}

/**
 * Función principal para enviar notificaciones
 * Envía por email y Telegram si están configurados
 */
export async function notifyAdmin(data: NotificationData) {
    // Enviar ambas notificaciones en paralelo
    await Promise.all([
        sendAdminNotification(data),
        sendTelegramNotification(data),
    ]);
}
