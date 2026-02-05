import { NextResponse } from 'next/server';
import { sendProductDeliveryEmail } from '@/lib/mail';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        console.log('📧 Enviando email de prueba...');

        // Enviar el email de entrega de producto (que ya funciona)
        await sendProductDeliveryEmail(
            'pablotinocoquevedo@gmail.com',
            'Pablo',
            'El Cerebro de tu Hijo en Pantallas'
        );

        return NextResponse.json({
            success: true,
            message: 'Email enviado exitosamente a pablotinocoquevedo@gmail.com'
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
