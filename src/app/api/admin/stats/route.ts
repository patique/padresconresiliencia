import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

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

        // 4. Calcular estadísticas
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const salesToday = approvedPurchases.filter(
            p => p.purchaseDate >= today
        );

        const revenueToday = salesToday.reduce(
            (sum, p) => sum + (p.pricePaid || 0),
            0
        );

        const totalRevenue = approvedPurchases.reduce(
            (sum, p) => sum + (p.pricePaid || 0),
            0
        );

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

        return NextResponse.json({
            success: true,
            stats: {
                totalSales: approvedPurchases.length,
                salesToday: salesToday.length,
                totalAbandoned: abandonedEmails.size,
                totalCanceled: canceledEmails.size,
                revenueToday: revenueToday,
                totalRevenue: totalRevenue,
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
        });

    } catch (error: any) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
