import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        console.log('🔍 Fetching canceled purchases and abandoned carts...');

        // 1. Get PURCHASE_CANCELED from webhookLog
        const canceledPurchases = await prisma.webhookLog.findMany({
            where: {
                event: 'PURCHASE_CANCELED'
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // 2. Get abandoned carts
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

        // 3. Extract emails and details
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
                    date: log.createdAt,
                    event: 'PURCHASE_CANCELED'
                });
            }
        });

        const abandonedEmails = new Set<string>();
        const abandonedDetails: any[] = [];

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

        // 4. Combine results
        const allEmails = Array.from(new Set([...canceledEmails, ...abandonedEmails]));
        const allDetails = [...canceledDetails, ...abandonedDetails];

        // Sort by date (most recent first)
        allDetails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json({
            success: true,
            stats: {
                totalUnique: allEmails.length,
                canceled: canceledEmails.size,
                abandoned: abandonedEmails.size,
                totalEvents: allDetails.length
            },
            emails: allEmails,
            details: allDetails
        });

    } catch (error: any) {
        console.error('Error fetching canceled emails:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
