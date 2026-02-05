require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendEmail() {
    console.log('📧 Intentando enviar email con SSL (puerto 465)...\n');

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

        // Configurar transporter con SSL
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // SSL
            auth: {
                user: process.env.GMAIL_USER.trim(),
                pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 10000,
            socketTimeout: 10000,
        });

        console.log('Usuario:', process.env.GMAIL_USER);
        console.log('📨 Enviando a: pablotinocoquevedo@gmail.com\n');

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
        if (error.command) console.error('Command:', error.command);
    }
}

sendEmail();
