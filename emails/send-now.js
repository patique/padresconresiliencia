require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendEmail() {
    console.log('📧 Enviando email de prueba...\n');

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error('❌ Credenciales no configuradas');
        return;
    }

    try {
        // Leer el HTML
        const emailHtml = fs.readFileSync(
            path.join(__dirname, 'purchase-reminder.html'),
            'utf-8'
        );

        // Configurar transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER.trim(),
                pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            },
        });

        console.log('📨 Enviando a: pablotinocoquevedo@gmail.com');

        // Enviar
        const info = await transporter.sendMail({
            from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
            to: 'pablotinocoquevedo@gmail.com',
            subject: '🔔 Estamos aquí para ayudarte - Padres con Resiliencia',
            html: emailHtml,
        });

        console.log('\n✅ ¡Email enviado exitosamente!');
        console.log('📬 Message ID:', info.messageId);
        console.log('\n💡 Revisa tu bandeja de entrada (y spam)\n');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.code) console.error('Code:', error.code);
    }
}

sendEmail();
