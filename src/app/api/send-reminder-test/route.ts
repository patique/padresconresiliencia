import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        console.log('📧 Sending purchase reminder email...');

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.error('Missing credentials');
            return NextResponse.json(
                { error: 'Email credentials not configured' },
                { status: 500 }
            );
        }

        // Read the PURCHASE REMINDER email template
        const emailHtml = fs.readFileSync(
            path.join(process.cwd(), 'emails', 'purchase-reminder.html'),
            'utf-8'
        );

        // Configure transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER.trim(),
                pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
            },
        });

        console.log('Sending purchase reminder to: pablotinocoquevedo@gmail.com');

        // Send email with the purchase reminder template
        const info = await transporter.sendMail({
            from: `"Padres con Resiliencia" <${process.env.GMAIL_USER}>`,
            to: 'pablotinocoquevedo@gmail.com',
            subject: '🔔 Estamos aquí para ayudarte - Padres con Resiliencia',
            html: emailHtml,
        });

        console.log('✅ Purchase reminder email sent! Message ID:', info.messageId);

        return NextResponse.json({
            success: true,
            message: 'Purchase reminder email sent successfully to pablotinocoquevedo@gmail.com',
            messageId: info.messageId
        });

    } catch (error: any) {
        console.error('❌ Error sending email:', error);
        return NextResponse.json(
            { error: error.message, details: error.toString() },
            { status: 500 }
        );
    }
}
