'use server';

import prisma from "@/lib/prisma";

export async function joinWaitlist(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const topic = formData.get('topic') as string;

    if (!email || !topic) {
        return { success: false, message: 'El email es obligatorio.' };
    }

    try {
        console.log('Sending waitlist data...', { email, topic });

        // Debugging: Check if model exists
        if (!prisma.waitlist) {
            console.error('CRITICAL ERROR: prisma.waitlist is undefined');
            console.error('Available prisma keys:', Object.keys(prisma));
            // Attempt to force access via string index signature if typing is wrong
            // @ts-ignore
            if (prisma['Waitlist']) {
                console.log('Found Waitlist with uppercase W');
                // @ts-ignore
                await prisma['Waitlist'].create({ data: { email, courseTopic: topic } });
                return { success: true, message: '¡Gracias! Te avisaremos cuando esté listo.' };
            }

            throw new Error(`Prisma model 'waitlist' not found on client. Keys: ${Object.keys(prisma).join(', ')}`);
        }

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
