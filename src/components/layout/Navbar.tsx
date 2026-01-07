"use client";

import Link from "next/link";
import { useState } from "react";
import ContactModal from "@/components/ui/ContactModal";

export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-stone-800 tracking-tight flex items-center gap-2">
                        <span className="w-8 h-8 bg-[#E07A5F] rounded-full flex items-center justify-center text-white text-sm">P</span>
                        Padres con Resiliencia
                    </Link>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
                        <Link href="/#productos" className="hover:text-[#E07A5F] transition">Recursos</Link>
                        <Link href="/blog" className="hover:text-[#E07A5F] transition">Blog</Link>
                        <Link href="/#nosotros" className="hover:text-[#E07A5F] transition">Sobre Nosotros</Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn-primary cursor-pointer"
                        >
                            Contacto
                        </button>
                    </nav>
                </div>
            </header>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
