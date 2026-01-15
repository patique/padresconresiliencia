import { NextRequest, NextResponse } from "next/server";
import { sendProductDeliveryEmail } from "@/lib/mail";

// Define the Hotmart Token specifically here or retrieve from env
// NOTE: Ideally, put 'HOTMART_WEBHOOK_SECRET' in your .env file
const HOTMART_TOKEN = process.env.HOTMART_WEBHOOK_SECRET;

export const dynamic = "force-dynamic";

export async function GET() {
    console.log("👀 SERVER LOG CHECK: Hotmart GET endpoint hit!");
    return NextResponse.json({ message: "Hotmart Webhook Endpoint is working! Use POST for events." }, { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
        console.log("📨 INCOMING WEBHOOK REQUEST DETECTED");

        // 1. Log Headers for Debugging
        const headerToken = req.headers.get("x-hotmart-hottok");
        console.log("Headers Hottok:", headerToken ? "Present" : "Missing");

        // 2. Parse Body
        const body = await req.json();
        console.log("📦 Webhook Payload:", JSON.stringify(body, null, 2));

        // 3. Security Check (Allow Header OR Body token)
        // Some Hotmart versions send 'hottok' in the body.
        const bodyToken = body.hottok;
        const incomingToken = headerToken || bodyToken;

        if (HOTMART_TOKEN && incomingToken !== HOTMART_TOKEN) {
            console.error("⛔️ Token Mismatch.");
            console.error("Expected:", HOTMART_TOKEN.slice(0, 3) + "...");
            console.error("Received:", incomingToken ? incomingToken.slice(0, 3) + "..." : "None");
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const event = body.event; // 'PURCHASE_APPROVED', etc.
        const data = body.data;

        // 4. Handle 'PURCHASE_APPROVED'
        if (event === "PURCHASE_APPROVED") {
            const buyer = data.buyer;
            const product = data.product;

            const buyerEmail = buyer.email;
            const buyerName = buyer.name;
            const productName = product.name;

            console.log(`✅ Processing Purchase for: ${buyerName} (${buyerEmail})`);

            // 5. Send Delivery Email
            await sendProductDeliveryEmail(buyerEmail, buyerName, productName);

            return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });
        }

        console.log(`ℹ️ Unhandled Event Type: ${event}`);
        return NextResponse.json({ message: "Event received" }, { status: 200 });

    } catch (error) {
        console.error("❌ Fatal Error in Webhook:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
