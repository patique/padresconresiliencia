import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    // Verificar que solo se use en desarrollo o con un token secreto
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (process.env.NODE_ENV === 'production' && token !== process.env.TEST_EMAIL_TOKEN) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            return NextResponse.json(
                { error: 'Email credentials not configured' },
                { status: 500 }
            );
        }

        // Leer el template
        const emailHtml = fs.readFileSync(
            path.join(process.cwd(), 'emails', 'purchase-reminder.html'),
            'utf-8'
        );

        // Configurar transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER.trim(),
                pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            },
        });

        // Enviar email
        const info = await transporter.sendMail({
            from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
            to: 'pablotinocoquevedo@gmail.com',
            subject: '🔔 Estamos aquí para ayudarte - Padres con Resiliencia',
            html: emailHtml,
        });

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId
        });

    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
