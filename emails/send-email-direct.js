const fs = require('fs');
const path = require('path');

// Importar la función de envío de email existente
const { sendCartAbandonmentEmail } = require('../src/lib/mail.ts');

async function sendPurchaseReminderEmail() {
    console.log('📧 Enviando email de recordatorio de compra cancelada...\n');

    // Leer el HTML del template
    const emailHtml = fs.readFileSync(
        path.join(__dirname, 'purchase-reminder.html'),
        'utf-8'
    );

    // Usar la función existente pero con el HTML personalizado
    // Como workaround, vamos a usar directamente nodemailer
    require('dotenv').config();
    const nodemailer = require('nodemailer');

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error('❌ Credenciales no configuradas');
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.GMAIL_USER.trim(),
                pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log('📨 Enviando...');

        const info = await transporter.sendMail({
            from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
            to: 'pablotinocoquevedo@gmail.com',
            subject: '🔔 Estamos aquí para ayudarte - Padres con Resiliencia',
            html: emailHtml,
        });

        console.log('✅ Email enviado!');
        console.log('Message ID:', info.messageId);
        console.log('\n💡 Revisa tu bandeja de entrada\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

sendPurchaseReminderEmail();
