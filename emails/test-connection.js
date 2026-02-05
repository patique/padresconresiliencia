require('dotenv').config();
const nodemailer = require('nodemailer');

async function testConnection() {
    console.log('🔍 Diagnóstico de conexión Gmail\n');

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    console.log('Usuario:', user);
    console.log('Password length:', pass ? pass.length : 0);
    console.log('Password (primeros 4):', pass ? pass.substring(0, 4) + '...' : 'N/A');
    console.log('\n');

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user?.trim(),
                pass: pass?.replace(/\s+/g, ''),
            },
            debug: true, // Enable debug output
            logger: true // Log information in console
        });

        console.log('Intentando verificar...\n');
        await transporter.verify();
        console.log('\n✅ ¡Conexión exitosa!');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error('Code:', error.code);
    }
}

testConnection();
