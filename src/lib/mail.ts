import nodemailer from 'nodemailer';

export async function sendNotificationEmail(name: string, email: string, message: string) {
    console.log("Attempting to send notification email...");

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error("❌ Gmail credentials MISSING in environment variables.");
        console.log("GMAIL_USER:", process.env.GMAIL_USER ? "Set" : "Missing");
        console.log("GMAIL_APP_PASSWORD:", process.env.GMAIL_APP_PASSWORD ? "Set" : "Missing");
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER?.trim(),
                pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, ''),
            },
        });

        await transporter.verify(); // Verify connection configuration
        console.log("Transporter verification successful.");

        await transporter.sendMail({
            from: process.env.GMAIL_USER, // Sender address
            to: process.env.GMAIL_USER,   // Receiver address
            replyTo: email,               // Reply to the customer
            subject: `🔔 Nuevo Mensaje de ${name} - Padres con Resiliencia`,
            text: `Has recibido un nuevo mensaje a través de la web:\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #E07A5F;">Nuevo Mensaje de Contacto</h2>
                    <p><strong>De:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
                    <p><strong>Mensaje:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #E07A5F;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `,
        });
        console.log("✅ Notification email sent successfully");
    } catch (error) {
        console.error("❌ Error sending notification email:", error);
    }
}
