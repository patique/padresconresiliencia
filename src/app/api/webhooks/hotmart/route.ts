import { NextRequest, NextResponse } from "next/server";
import { sendProductDeliveryEmail, sendCartAbandonmentEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";

// Define the Hotmart Token specifically here or retrieve from env
const HOTMART_TOKEN = process.env.HOTMART_WEBHOOK_SECRET;

export const dynamic = "force-dynamic";

export async function GET() {
    console.log("👀 SERVER LOG CHECK: Hotmart GET endpoint hit!");
    return NextResponse.json({ message: "Hotmart Webhook Endpoint is working! Use POST for events." }, { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
        console.log("📨 INCOMING WEBHOOK REQUEST DETECTED");

        // 1. Log Headers & Auth
        const headerToken = req.headers.get("x-hotmart-hottok");
        const body = await req.json();

        // Security Check
        const bodyToken = body.hottok;
        const incomingToken = headerToken || bodyToken;

        if (HOTMART_TOKEN && incomingToken !== HOTMART_TOKEN) {
            console.error("⛔️ UNAUTHORIZED Webhook Attempt");
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const event = body.event;
        console.log(`📡 Processing Event: ${event}`);

        // 2. DATABASE LOGGING ( The "Black Box" )
        // We log absolutely everything first, so we never lose data.
        await prisma.webhookLog.create({
            data: {
                event: event,
                payload: body as any, // Cast to any to store JSON freely
                processed: false // Will update to true if we handle it successfully
            }
        });

        const data = body.data;
        const buyer = data.buyer; // Common in most sales events

        // 3. INTELLIGENT CUSTOMER UPDATE (CRM)
        // If we have buyer info, we update/create the customer record immediately.
        let customer = null;
        if (buyer && buyer.email) {
            customer = await prisma.customer.upsert({
                where: { email: buyer.email },
                update: {
                    name: buyer.name || undefined,
                    phone: buyer.phone || buyer.checkout_phone || undefined,
                    country: buyer.address?.country || undefined, // Safe navigation just in case
                },
                create: {
                    email: buyer.email,
                    name: buyer.name,
                    phone: buyer.phone || buyer.checkout_phone,
                    country: buyer.address?.country,
                }
            });
            console.log(`👤 Customer Synced: ${customer.email} (${customer.id})`);
        }

        // 4. HANDLE SPECIFIC EVENTS

        // --- CASE A: NEW SALE ---
        if (event === "PURCHASE_APPROVED") {
            const product = data.product;
            const purchaseData = data.purchase;

            if (customer && purchaseData) {
                // Record Purchase
                await prisma.purchase.create({
                    data: {
                        transactionId: purchaseData.transaction,
                        status: purchaseData.status || 'APPROVED',
                        productName: product.name,
                        pricePaid: purchaseData.price?.value || 0,
                        currency: purchaseData.price?.currency_value || 'UNK',
                        purchaseDate: new Date(purchaseData.order_date || Date.now()),
                        customerId: customer.id
                    }
                });
                console.log("💰 Purchase Recorded in DB");

                // Trigger Action: Send Email
                await sendProductDeliveryEmail(buyer.email, buyer.name, product.name);
            }

            return NextResponse.json({ message: "Sale Processed" }, { status: 200 });
        }

        // --- CASE B: CART ABANDONMENT ---
        if (event === "PURCHASE_OUT_OF_SHOPPING_CART") {
            const product = data.product;

            if (customer) {
                // Record Abandonment
                await prisma.abandonedCart.create({
                    data: {
                        productName: product.name,
                        customerId: customer.id,
                        checkoutUrl: "https://pay.hotmart.com/D103873545U", // Ideally dynamic, but hardcoded for now
                        recovered: false
                    }
                });
                console.log("🛒 Abandoned Cart Recorded in DB");

                // Trigger Action: Send Recovery Email
                const checkoutUrl = "https://pay.hotmart.com/D103873545U";
                await sendCartAbandonmentEmail(buyer.email, buyer.name, product.name, checkoutUrl);
            }

            return NextResponse.json({ message: "Abandonment Processed" }, { status: 200 });
        }

        // --- UNHANDLED EVENTS (But Logged) ---
        // Since we are logging everything at step 2, these are safe.
        // Useful for: PURCHASE_REFUNDED, SUBSCRIPTION_CANCELLATION, etc.
        console.log(`💾 Event ${event} logged but no specific action taken yet.`);

        return NextResponse.json({ message: "Event Logged" }, { status: 200 });

    } catch (error) {
        console.error("❌ Fatal Error in Webhook:", error);
        // Even if it fails, try to return 200 to Hotmart so they don't retry indefinitely if it's a code error?
        // No, return 500 so they retry if it's a temporary DB glitch.
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
