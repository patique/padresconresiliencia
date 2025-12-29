import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bienestar Emocional de los Padres - Guía Práctica",
  description: "Guía práctica para el bienestar emocional de los padres durante el primer año.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
