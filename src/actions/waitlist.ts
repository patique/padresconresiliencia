'use server';

import prisma from "@/lib/prisma";

export async function joinWaitlist(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const topic = formData.get('topic') as string;

    if (!email || !topic) {
        return { success: false, message: 'El email es obligatorio.' };
    }

    try {
        await prisma.waitlist.create({
            data: {
                email,
                courseTopic: topic,
            },
        });
        return { success: true, message: '¡Gracias! Te avisaremos cuando esté listo.' };
    } catch (error) {
        console.error('Error joining waitlist:', error);
        // Expose error message for debugging purposes temporarily
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        return { success: false, message: `Error: ${errorMessage}` };
    }
}
