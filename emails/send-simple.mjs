// Script para enviar email de prueba usando la función existente
import { sendProductDeliveryEmail } from '../src/lib/mail';

async function sendTestEmail() {
    console.log('📧 Enviando email de recordatorio de compra...\n');

    try {
        // Usar la función que ya funciona
        await sendProductDeliveryEmail(
            'pablotinocoquevedo@gmail.com',
            'Pablo',
            'El Cerebro de tu Hijo en Pantallas'
        );

        console.log('✅ Email enviado exitosamente!');
        console.log('📬 Revisa tu bandeja de entrada\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

sendTestEmail();
