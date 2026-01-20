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

export async function sendProductDeliveryEmail(email: string, name: string, productName: string) {
    console.log(`Attempting to send delivery email to ${email} for ${productName}...`);

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error("❌ Gmail credentials MISSING in environment variables.");
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

        // Customize the download link based on the product if needed.
        // For now, we'll hardcode the known ebook PDF link or a thank you page.
        // Since we don't have a direct file hosting URL yet, we might point them to a 'thank you' page 
        // or effectively, we can assume the PDF is hosted somewhere. 
        // For this MVP, let's assume we send them to the same Hotmart Access URL or a dummy link for now, 
        // BUT better yet, let's send them to the Hotmart access page which is the standard.
        // Hotmart usually provides the access link in the webhook payload, but if not, we use the generic one.
        const accessLink = "https://consumer.hotmart.com/purchase/access";

        await transporter.sendMail({
            from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `🚀 Tu acceso a: ${productName}`,
            text: `Hola ${name},\n\n¡Gracias por tu compra!\nAquí tienes el acceso a tu ebook "${productName}".\n\nAcceder ahora: ${accessLink}\n\nSi tienes alguna duda, responde a este correo.\n\nUn abrazo,\nPablo de Padres con Resiliencia`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #fcfcfc;">
                    <div style="background-color: #E07A5F; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">¡Tu Pedido está Listo! 📚</h1>
                    </div>
                    <div style="padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px; background-color: white;">
                        <p style="font-size: 16px; line-height: 1.5;">Hola <strong>${name}</strong>,</p>
                        <p style="font-size: 16px; line-height: 1.5;">¡Muchas gracias por confiar en nosotros! Ya tienes todo listo para empezar a transformar la crianza de tu hijo.</p>
                        <p style="font-size: 16px; line-height: 1.5;">Aquí tienes el acceso inmediato a tu ebook: <strong>${productName}</strong>.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${accessLink}" style="background-color: #E07A5F; color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 6px rgba(224, 122, 95, 0.3);">
                                Acceder al Contenido
                            </a>
                        </div>
                        
                        <p style="font-size: 14px; color: #777; margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                            Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
                            <a href="${accessLink}" style="color: #E07A5F;">${accessLink}</a>
                        </p>
                    </div>
                    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                        © ${new Date().getFullYear()} Padres con Resiliencia. Todos los derechos reservados.
                    </div>
                </div>
            `,
        });
        console.log(`✅ Delivery email sent successfully to ${email}`);
    } catch (error) {
        console.error("❌ Error sending delivery email:", error);
    }
}

export async function sendCartAbandonmentEmail(email: string, name: string, productName: string, checkoutUrl: string) {
    console.log(`Attempting to send cart abandonment email to ${email}...`);

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.error("❌ Gmail credentials MISSING in environment variables.");
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

        await transporter.sendMail({
            from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `🙈 ¿Olvidaste esto? (${productName})`,
            text: `Hola ${name},\n\nHemos guardado tu carrito por unas horas.\n\nNotamos que estabas a punto de adquirir "${productName}" pero no finalizaste la compra.\n\n¿Tuviste algún problema técnico o duda?\n\nPuedes retomar tu pedido aquí: ${checkoutUrl}\n\nUn abrazo,\nPablo de Padres con Resiliencia`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background-color: #fcfcfc;">
                    <div style="background-color: #E07A5F; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">¿Te has dejado algo? 🤔</h1>
                    </div>
                    <div style="padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px; background-color: white;">
                        <p style="font-size: 16px; line-height: 1.5;">Hola <strong>${name}</strong>,</p>
                        <p style="font-size: 16px; line-height: 1.5;">Hemos notado que estabas interesado en <strong>"${productName}"</strong>, pero no llegaste a finalizar la compra.</p>
                        <p style="font-size: 16px; line-height: 1.5;">Entendemos que la vida de padre es un caos y a veces nos interrumpen en el peor momento.</p>
                        <p style="font-size: 16px; line-height: 1.5; font-weight: bold; color: #E07A5F;">¡No te preocupes! Hemos guardado tu carrito.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${checkoutUrl}" style="background-color: #E07A5F; color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 6px rgba(224, 122, 95, 0.3);">
                                Retomar mi Pedido
                            </a>
                        </div>
                        
                        <p style="font-size: 14px; color: #777; margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                            Si ya has comprado, ignora este mensaje o avísanos para que no te molestemos más. 😊
                        </p>
                    </div>
                    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                        © ${new Date().getFullYear()} Padres con Resiliencia. Todos los derechos reservados.
                    </div>
                </div>
            `,
        });
        console.log(`✅ Cart abandonment email sent successfully to ${email}`);
    } catch (error) {
        console.error("❌ Error sending cart abandonment email:", error);
    }
}
