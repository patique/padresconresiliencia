import { NextRequest, NextResponse } from "next/server";
import { sendProductDeliveryEmail } from "@/lib/mail";

// Define the Hotmart Token specifically here or retrieve from env
// NOTE: Ideally, put 'HOTMART_WEBHOOK_SECRET' in your .env file
const HOTMART_TOKEN = process.env.HOTMART_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    try {
        // 1. Validate Secret Token (Security)
        const incomingToken = req.headers.get("x-hotmart-hottok");

        // If you haven't set the env var yet, we log a warning but might allow it for testing 
        // IF you want strict security immediately, uncomment the check below.
        if (HOTMART_TOKEN && incomingToken !== HOTMART_TOKEN) {
            console.error("⛔️ Unauthorized Hotmart Webhook attempt.");
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // 2. Parse the Data
        const body = await req.json();
        console.log("🔔 Hotmart Webhook Received:", JSON.stringify(body, null, 2));

        const event = body.event; // 'PURCHASE_APPROVED', etc.
        const data = body.data;

        // 3. Handle 'PURCHASE_APPROVED'
        if (event === "PURCHASE_APPROVED") {
            const buyer = data.buyer;
            const product = data.product;

            const buyerEmail = buyer.email;
            const buyerName = buyer.name;
            const productName = product.name;

            console.log(`✅ Purchase Approved for: ${buyerName} (${buyerEmail})`);

            // 4. Send Delivery Email
            await sendProductDeliveryEmail(buyerEmail, buyerName, productName);

            return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });
        }

        // Handle other events or ignore
        return NextResponse.json({ message: "Event received but not processed" }, { status: 200 });

    } catch (error) {
        console.error("❌ Error processing webhook:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
