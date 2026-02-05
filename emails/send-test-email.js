const fs = require('fs');
const path = require('path');

/**
 * Script para enviar email de prueba de recordatorio de compra cancelada
 * 
 * IMPORTANTE: Este script usa Resend para enviar emails.
 * Necesitas una API key de Resend (https://resend.com)
 * 
 * Instalación:
 * npm install resend
 * 
 * Uso:
 * RESEND_API_KEY=tu_api_key node emails/send-test-email.js
 */

async function sendTestEmail() {
    try {
        // Importar Resend
        const { Resend } = require('resend');

        // Verificar que existe la API key
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('❌ Error: RESEND_API_KEY no está configurada');
            console.log('\n📝 Para obtener una API key:');
            console.log('1. Ve a https://resend.com');
            console.log('2. Crea una cuenta gratuita');
            console.log('3. Genera una API key');
            console.log('4. Ejecuta: RESEND_API_KEY=tu_api_key node emails/send-test-email.js\n');
            process.exit(1);
        }

        const resend = new Resend(apiKey);

        // Leer el template HTML
        const emailHtml = fs.readFileSync(
            path.join(__dirname, 'purchase-reminder.html'),
            'utf-8'
        );

        console.log('📧 Enviando email de prueba...\n');

        // Enviar email
        const data = await resend.emails.send({
            from: 'Padres con Resiliencia <onboarding@resend.dev>', // Email de prueba de Resend
            to: ['pablotinocoquevedo@gmail.com'], // Tu email para prueba
            subject: '🔔 Estamos aquí para ayudarte - Padres con Resiliencia',
            html: emailHtml,
        });

        console.log('✅ Email enviado exitosamente!');
        console.log('📬 ID del email:', data.id);
        console.log('\n💡 Revisa tu bandeja de entrada (y spam por si acaso)\n');

    } catch (error) {
        console.error('❌ Error al enviar el email:', error.message);

        if (error.message.includes('resend')) {
            console.log('\n📦 Parece que Resend no está instalado.');
            console.log('Ejecuta: npm install resend\n');
        }
    }
}

// Ejecutar
sendTestEmail();
