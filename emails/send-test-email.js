require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

/**
 * Script para enviar email de prueba usando la configuración de Gmail existente
 */

async function sendTestEmail() {
    console.log('📧 Preparando envío de email de prueba...\n');

    // Verificar credenciales
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error('❌ Error: Credenciales de Gmail no configuradas en .env');
        console.log('\nNecesitas añadir a tu archivo .env:');
        console.log('GMAIL_USER=padresconresiliencia@gmail.com');
        console.log('GMAIL_APP_PASSWORD=tu_contraseña_de_aplicación\n');
        process.exit(1);
    }

    try {
        // Crear transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER.trim(),
                pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            },
        });

        // Verificar conexión
        console.log('🔍 Verificando conexión con Gmail...');
        await transporter.verify();
        console.log('✅ Conexión verificada\n');

        // Leer el template HTML
        const emailHtml = fs.readFileSync(
            path.join(__dirname, 'purchase-reminder.html'),
            'utf-8'
        );

        console.log('📨 Enviando email a: pablotinocoquevedo@gmail.com\n');

        // Enviar email
        const info = await transporter.sendMail({
            from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
            to: 'pablotinocoquevedo@gmail.com',
            subject: '🔔 Estamos aquí para ayudarte - Padres con Resiliencia',
            html: emailHtml,
        });

        console.log('✅ ¡Email enviado exitosamente!');
        console.log('📬 Message ID:', info.messageId);
        console.log('\n💡 Revisa tu bandeja de entrada (y spam por si acaso)\n');

    } catch (error) {
        console.error('❌ Error al enviar el email:', error.message);

        if (error.message.includes('Invalid login')) {
            console.log('\n⚠️  Parece que las credenciales de Gmail no son correctas.');
            console.log('Verifica que GMAIL_APP_PASSWORD sea una "Contraseña de aplicación" de Google.\n');
        }
    }
}

// Ejecutar
sendTestEmail();
