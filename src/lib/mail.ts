import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendNotificationEmail(name: string, email: string, message: string) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.warn("Gmail credentials not found. Skipping email notification.");
        return;
    }

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER, // Sender address (your gmail)
            to: process.env.GMAIL_USER,   // Receiver address (yourself)
            replyTo: email,               // When you click reply, it goes to the customer
            subject: `🔔 Nuevo Mensaje de ${name} - Padres con Resiliencia`,
            text: `Has recibido un nuevo mensaje a través de la web:\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #E07A5F;">Nuevo Mensaje de Contacto</h2>
                    <p><strong>De:</strong> ${name} (${email})</p>
                    <p><strong>Mensaje:</strong></p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #E07A5F;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <br>
                    <p style="font-size: 12px; color: #888;">Este correo fue enviado automáticamente desde padresconresiliencia.com</p>
                </div>
            `,
        });
        console.log("Notification email sent successfully");
    } catch (error) {
        console.error("Error sending notification email:", error);
        // Don't throw error to avoid breaking the user flow if email fails
    }
}
