import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Padres con Resiliencia",
  description: "Recursos para una crianza consciente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
