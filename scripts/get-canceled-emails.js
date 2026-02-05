const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Script para obtener emails de compradores que no completaron la compra
 * 
 * Extrae:
 * 1. PURCHASE_CANCELED - Compras que fueron canceladas
 * 2. PURCHASE_OUT_OF_SHOPPING_CART - Carritos abandonados
 */

async function getCanceledPurchaseEmails() {
    try {
        console.log('🔍 Buscando compras canceladas y carritos abandonados...\n');

        // 1. Obtener PURCHASE_CANCELED desde webhookLog
        const canceledPurchases = await prisma.webhookLog.findMany({
            where: {
                event: 'PURCHASE_CANCELED'
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log(`📊 Total de PURCHASE_CANCELED encontrados: ${canceledPurchases.length}\n`);

        // Extraer emails únicos de PURCHASE_CANCELED
        const canceledEmails = new Set();
        const canceledDetails = [];

        canceledPurchases.forEach(log => {
            const buyer = log.payload?.data?.buyer;
            if (buyer?.email) {
                canceledEmails.add(buyer.email);
                canceledDetails.push({
                    email: buyer.email,
                    name: buyer.name || 'N/A',
                    product: log.payload?.data?.product?.name || 'N/A',
                    date: log.createdAt,
                    event: 'PURCHASE_CANCELED'
                });
            }
        });

        // 2. Obtener PURCHASE_OUT_OF_SHOPPING_CART desde abandonedCart
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

        console.log(`📊 Total de carritos abandonados: ${abandonedCarts.length}\n`);

        const abandonedEmails = new Set();
        const abandonedDetails = [];

        abandonedCarts.forEach(cart => {
            if (cart.customer?.email) {
                abandonedEmails.add(cart.customer.email);
                abandonedDetails.push({
                    email: cart.customer.email,
                    name: cart.customer.name || 'N/A',
                    product: cart.productName,
                    date: cart.createdAt,
                    event: 'CART_ABANDONED'
                });
            }
        });

        // 3. Combinar y mostrar resultados
        const allEmails = new Set([...canceledEmails, ...abandonedEmails]);
        const allDetails = [...canceledDetails, ...abandonedDetails];

        console.log('═══════════════════════════════════════════════════════');
        console.log('📧 EMAILS DE COMPRADORES QUE NO COMPLETARON LA COMPRA');
        console.log('═══════════════════════════════════════════════════════\n');

        console.log(`✉️  Total de emails únicos: ${allEmails.size}\n`);

        console.log('📋 LISTA DE EMAILS:');
        console.log('-------------------');
        Array.from(allEmails).forEach((email, index) => {
            console.log(`${index + 1}. ${email}`);
        });

        console.log('\n📊 DETALLES COMPLETOS:');
        console.log('=====================\n');

        allDetails.forEach((detail, index) => {
            console.log(`${index + 1}. ${detail.email}`);
            console.log(`   Nombre: ${detail.name}`);
            console.log(`   Producto: ${detail.product}`);
            console.log(`   Fecha: ${detail.date.toISOString()}`);
            console.log(`   Tipo: ${detail.event}`);
            console.log('');
        });

        console.log('═══════════════════════════════════════════════════════');
        console.log('💡 RESUMEN:');
        console.log(`   - Compras canceladas: ${canceledEmails.size}`);
        console.log(`   - Carritos abandonados: ${abandonedEmails.size}`);
        console.log(`   - Total únicos: ${allEmails.size}`);
        console.log('═══════════════════════════════════════════════════════\n');

        // 4. Exportar a CSV (opcional)
        console.log('💾 Guardando en archivo CSV...');
        const fs = require('fs');
        const csvContent = [
            'Email,Nombre,Producto,Fecha,Tipo',
            ...allDetails.map(d => `${d.email},"${d.name}","${d.product}",${d.date.toISOString()},${d.event}`)
        ].join('\n');

        fs.writeFileSync('emails-compras-canceladas.csv', csvContent);
        console.log('✅ Archivo guardado: emails-compras-canceladas.csv\n');

        return {
            emails: Array.from(allEmails),
            details: allDetails,
            stats: {
                canceled: canceledEmails.size,
                abandoned: abandonedEmails.size,
                total: allEmails.size
            }
        };

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar
getCanceledPurchaseEmails();
