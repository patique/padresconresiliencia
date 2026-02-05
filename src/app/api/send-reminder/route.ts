import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            return NextResponse.json(
                { error: 'Email credentials not configured' },
                { status: 500 }
            );
        }

        // Leer el template HTML
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
        await transporter.sendMail({
            from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: '🔔 Estamos aquí para ayudarte - Padres con Resiliencia',
            html: emailHtml,
        });

        return NextResponse.json({ success: true, message: 'Email sent successfully' });

    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
