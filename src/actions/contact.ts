'use server';

import prisma from "@/lib/prisma";

export async function submitContactForm(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, message: 'Todos los campos son obligatorios.' };
    }

    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                message,
            },
        });
        return { success: true, message: 'Mensaje enviado correctamente.' };
    } catch (error) {
        console.error('Error saving contact:', error);
        return { success: false, message: 'Hubo un error al enviar el mensaje.' };
    }
}
