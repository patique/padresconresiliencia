const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const prisma = new PrismaClient();

/**
 * Script para enviar emails de recordatorio a compradores que no completaron la compra
 * 
 * Uso:
 * node scripts/send-reminder-emails.js
 */

async function sendReminderEmails() {
    try {
        console.log('🔍 Obteniendo emails de compras canceladas...\n');

        // 1. Obtener PURCHASE_CANCELED
        const canceledPurchases = await prisma.webhookLog.findMany({
            where: {
                event: 'PURCHASE_CANCELED'
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 2. Obtener carritos abandonados
        const abandonedCarts = await prisma.abandonedCart.findMany({
            where: {
                recovered: false
            },
            include: {
                customer: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 3. Extraer emails únicos
        const emailsToSend = new Map();

        canceledPurchases.forEach(log => {
            const buyer = log.payload?.data?.buyer;
            if (buyer?.email && !emailsToSend.has(buyer.email)) {
                emailsToSend.set(buyer.email, {
                    email: buyer.email,
                    name: buyer.name || 'Cliente',
                    product: log.payload?.data?.product?.name || 'Nuestros productos'
                });
            }
        });

        abandonedCarts.forEach(cart => {
            if (cart.customer?.email && !emailsToSend.has(cart.customer.email)) {
                emailsToSend.set(cart.customer.email, {
                    email: cart.customer.email,
                    name: cart.customer.name || 'Cliente',
                    product: cart.productName
                });
            }
        });

        console.log(`📧 Total de emails a enviar: ${emailsToSend.size}\n`);

        if (emailsToSend.size === 0) {
            console.log('✅ No hay emails pendientes de enviar.');
            return;
        }

        // 4. Configurar transporter
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

        // 5. Leer template
        const emailHtml = fs.readFileSync(
            path.join(__dirname, '..', 'emails', 'purchase-reminder.html'),
            'utf-8'
        );

        // 6. Enviar emails
        console.log('📨 Enviando emails...\n');
        let sent = 0;
        let failed = 0;

        for (const [email, data] of emailsToSend) {
            try {
                console.log(`   Enviando a: ${email} (${data.name})...`);

                await transporter.sendMail({
                    from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
                    to: email,
                    subject: '🔔 Estamos aquí para ayudarte - Padres con Resiliencia',
                    html: emailHtml,
                });

                sent++;
                console.log(`   ✅ Enviado\n`);

                // Esperar 2 segundos entre emails para no saturar
                await new Promise(resolve => setTimeout(resolve, 2000));

            } catch (error) {
                failed++;
                console.error(`   ❌ Error: ${error.message}\n`);
            }
        }

        console.log('═══════════════════════════════════════════════════════');
        console.log('📊 RESUMEN DE ENVÍO:');
        console.log(`   ✅ Enviados exitosamente: ${sent}`);
        console.log(`   ❌ Fallidos: ${failed}`);
        console.log(`   📧 Total: ${emailsToSend.size}`);
        console.log('═══════════════════════════════════════════════════════\n');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar
sendReminderEmails();
