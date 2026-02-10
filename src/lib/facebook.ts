import { createHash } from 'crypto';

const FB_PIXEL_ID = "1526673325256881";
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

interface FacebookEventData {
    eventName: string; // 'Purchase', 'InitiateCheckout', etc.
    eventId?: string; // Unique ID for deduplication (e.g. transaction ID)
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    clientIp?: string;
    userAgent?: string;
    value?: number;
    currency?: string;
    contentName?: string;
    contentIds?: string[];
    sourceUrl?: string;
}

/**
 * Hash data using SHA-256 as required by Meta (Facebook)
 */
function hashData(data: string): string {
    return createHash('sha256').update(data).digest('hex');
}

export async function sendFacebookConversion(data: FacebookEventData) {
    if (!FB_ACCESS_TOKEN) {
        console.warn("⚠️ FB_ACCESS_TOKEN is missing. Event not sent to Facebook.");
        return;
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const userData: any = {
        em: [hashData(data.email.trim().toLowerCase())], // Emails must be hashed
    };

    if (data.phone) userData.ph = [hashData(data.phone.trim().replace(/[^0-9]/g, ''))];
    if (data.firstName) userData.fn = [hashData(data.firstName.trim().toLowerCase())];
    if (data.lastName) userData.ln = [hashData(data.lastName.trim().toLowerCase())];
    if (data.country) userData.country = [hashData(data.country.trim().toLowerCase())];
    if (data.clientIp) userData.client_ip_address = data.clientIp;
    if (data.userAgent) userData.client_user_agent = data.userAgent;

    const payload = {
        data: [
            {
                event_name: data.eventName,
                event_time: currentTimestamp,
                event_id: data.eventId, // Critical for deduplication if the browser pixel also fires!
                action_source: "website",
                user_data: userData,
                custom_data: {
                    currency: data.currency || "EUR",
                    value: data.value || 0,
                    content_name: data.contentName,
                    content_ids: data.contentIds,
                },
                event_source_url: data.sourceUrl || "https://padresconresiliencia.com",
            },
        ],
        test_event_code: process.env.FB_TEST_EVENT_CODE, // Optional: for testing in "Test Events" tab
    };

    try {
        const response = await fetch(
            `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const responseData = await response.json();

        if (!response.ok) {
            console.error("❌ Facebook CAPI Error:", JSON.stringify(responseData, null, 2));
        } else {
            console.log("✅ Facebook CAPI Event Sent:", data.eventName);
        }
    } catch (error) {
        console.error("❌ Facebook CAPI Network Error:", error);
    }
}
