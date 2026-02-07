import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { getExchangeRates, convertCurrency } from '@/lib/currency';

export async function GET() {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 1. Obtener ventas aprobadas
        const approvedPurchases = await prisma.purchase.findMany({
            where: {
                status: 'APPROVED'
            },
            include: {
                customer: true
            },
            orderBy: {
                purchaseDate: 'desc'
            }
        });

        // 2. Obtener compras canceladas
        const canceledPurchases = await prisma.webhookLog.findMany({
            where: {
                event: 'PURCHASE_CANCELED'
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 3. Obtener carritos abandonados
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

        // 4. Obtener tasas de cambio
        const exchangeRates = await getExchangeRates();

        // 5. Calcular estadísticas
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const salesToday = approvedPurchases.filter(
            p => p.purchaseDate >= today
        );

        // Calcular ingresos convertidos a EUR
        const revenueTodayEUR = salesToday.reduce((sum, p) => {
            const amountInEUR = convertCurrency(
                p.pricePaid || 0,
                p.currency || 'EUR',
                'EUR',
                exchangeRates
            );
            return sum + amountInEUR;
        }, 0);

        const totalRevenueEUR = approvedPurchases.reduce((sum, p) => {
            const amountInEUR = convertCurrency(
                p.pricePaid || 0,
                p.currency || 'EUR',
                'EUR',
                exchangeRates
            );
            return sum + amountInEUR;
        }, 0);

        // Agrupar ingresos por moneda
        const revenueByCurrency: Record<string, number> = {};
        approvedPurchases.forEach(p => {
            const currency = p.currency || 'EUR';
            if (!revenueByCurrency[currency]) {
                revenueByCurrency[currency] = 0;
            }
            revenueByCurrency[currency] += p.pricePaid || 0;
        });

        // 6. Calcular métricas de conversión
        const totalAttempts = approvedPurchases.length + canceledPurchases.length + abandonedCarts.length;
        const conversionRate = totalAttempts > 0
            ? (approvedPurchases.length / totalAttempts) * 100
            : 0;

        // Valor promedio del pedido (Average Order Value)
        const aov = approvedPurchases.length > 0
            ? totalRevenueEUR / approvedPurchases.length
            : 0;

        // Producto más vendido
        const productSales: Record<string, number> = {};
        approvedPurchases.forEach(p => {
            const product = p.productName || 'Desconocido';
            productSales[product] = (productSales[product] || 0) + 1;
        });
        const topProduct = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];

        // País con más ventas
        const countrySales: Record<string, number> = {};
        approvedPurchases.forEach(p => {
            const country = p.customer.country || 'Desconocido';
            countrySales[country] = (countrySales[country] || 0) + 1;
        });
        const topCountry = Object.entries(countrySales).sort((a, b) => b[1] - a[1])[0];

        // Tasa de recuperación (carritos que se convirtieron después)
        // Nota: Esto requeriría tracking adicional, por ahora lo dejamos en 0
        const recoveryRate = 0;

        // 5. Extraer emails únicos de cancelados
        const canceledEmails = new Set<string>();
        const canceledDetails: any[] = [];

        canceledPurchases.forEach(log => {
            const buyer = (log.payload as any)?.data?.buyer;
            if (buyer?.email) {
                canceledEmails.add(buyer.email);
                canceledDetails.push({
                    email: buyer.email,
                    name: buyer.name || 'N/A',
                    product: (log.payload as any)?.data?.product?.name || 'N/A',
                    country: buyer.address?.country || buyer.country || 'N/A',
                    date: log.createdAt,
                    event: 'PURCHASE_CANCELED'
                });
            }
        });

        // 6. Extraer emails de abandonados
        const abandonedEmails = new Set<string>();
        const abandonedDetails: any[] = [];

        abandonedCarts.forEach(cart => {
            if (cart.customer?.email) {
                abandonedEmails.add(cart.customer.email);
                abandonedDetails.push({
                    email: cart.customer.email,
                    name: cart.customer.name || 'N/A',
                    product: cart.productName,
                    country: cart.customer.country || 'N/A',
                    date: cart.createdAt,
                    event: 'CART_ABANDONED'
                });
            }
        });

        // 7. Combinar detalles
        const allNegativeEvents = [...canceledDetails, ...abandonedDetails];
        allNegativeEvents.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // 8. Agrupar ventas por día (últimos 30 días)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const salesByDay: Record<string, { date: string; sales: number; revenue: number }> = {};

        // Inicializar todos los días con 0
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateKey = date.toISOString().split('T')[0];
            salesByDay[dateKey] = {
                date: dateKey,
                sales: 0,
                revenue: 0
            };
        }

        // Contar ventas por día
        approvedPurchases.forEach(purchase => {
            if (purchase.purchaseDate >= thirtyDaysAgo) {
                const dateKey = purchase.purchaseDate.toISOString().split('T')[0];
                if (salesByDay[dateKey]) {
                    salesByDay[dateKey].sales += 1;
                    salesByDay[dateKey].revenue += purchase.pricePaid || 0;
                }
            }
        });

        // Convertir a array y ordenar por fecha
        const chartData = Object.values(salesByDay).sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return NextResponse.json({
            success: true,
            stats: {
                totalSales: approvedPurchases.length,
                salesToday: salesToday.length,
                totalAbandoned: abandonedEmails.size,
                totalCanceled: canceledEmails.size,
                revenueTodayEUR: revenueTodayEUR,
                totalRevenueEUR: totalRevenueEUR,
                revenueByCurrency: revenueByCurrency,
                // Métricas de conversión
                conversionRate: conversionRate,
                aov: aov,
                topProduct: topProduct ? { name: topProduct[0], sales: topProduct[1] } : null,
                topCountry: topCountry ? { name: topCountry[0], sales: topCountry[1] } : null,
                recoveryRate: recoveryRate,
            },
            sales: approvedPurchases.map(p => ({
                transactionId: p.transactionId,
                productName: p.productName,
                pricePaid: p.pricePaid,
                currency: p.currency,
                purchaseDate: p.purchaseDate,
                customerEmail: p.customer.email,
                customerName: p.customer.name,
                customerCountry: p.customer.country,
            })),
            negativeEvents: allNegativeEvents,
            chartData: chartData,
            exchangeRates: exchangeRates,
        });

    } catch (error: any) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
