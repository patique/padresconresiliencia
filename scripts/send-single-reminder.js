const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Datos del usuario específico
const TARGET_USER = {
    email: 'arturosanchez52003@gmail.com',
    name: 'Luis Hernandez Sanchez'
};

async function sendSpecificReminder() {
    console.log(`🔍 Preparando envío para: ${TARGET_USER.name} (${TARGET_USER.email})...\n`);

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error('❌ Credenciales de Gmail no configuradas en .env');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER.trim(),
            pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
        },
    });

    // Leer template
    const emailHtml = fs.readFileSync(
        path.join(__dirname, '..', 'emails', 'purchase-reminder.html'),
        'utf-8'
    );

    try {
        console.log(`📨 Enviando email...`);

        await transporter.sendMail({
            from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
            to: TARGET_USER.email,
            subject: '🔔 Estamos aquí para ayudarte - Padres con Resiliencia',
            html: emailHtml,
        });

        console.log(`✅ ¡Email enviado exitosamente a Luis!`);

    } catch (error) {
        console.error(`❌ Error al enviar: ${error.message}\n`);
    }
}

sendSpecificReminder();
