import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    // 1. Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { email, name } = body;

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 });
        }

        console.log(`📧 Sending manual reminder to: ${email}`);

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            return NextResponse.json(
                { error: "Email credentials not configured" },
                { status: 500 }
            );
        }

        // Leer template
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

        console.log(`✅ Reminder sent to ${email}`);

        return NextResponse.json({
            success: true,
            message: `Reminder sent to ${email}`
        });

    } catch (error: any) {
        console.error('❌ Error sending reminder:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
