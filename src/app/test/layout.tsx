import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tienda - Padres con Resiliencia",
    description: "Recursos digitales y guías para una crianza consciente.",
};

export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="antialiased">
            {children}
        </div>
    );
}
