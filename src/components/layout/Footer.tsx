"use client";

import Link from "next/link";
import { useState } from "react";
import ContactModal from "@/components/ui/ContactModal";

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <footer className="bg-stone-900 text-stone-400 py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <h4 className="text-white font-bold text-lg mb-6">Padres con Resiliencia</h4>
                        <p className="text-sm leading-relaxed">
                            Acompañando a familias en el viaje de la crianza con herramientas basadas en evidencia y mucho amor.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Recursos</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition">Guías PDF</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Cursos Online</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Plantillas Gratuitas</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition">Aviso Legal</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Política de Privacidad</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Cookies</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Contacto</h4>
                        <p className="text-sm mb-4">¿Tienes dudas? Escríbenos:</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#E07A5F] font-bold hover:text-white transition text-left"
                        >
                            Abrir formulario de contacto
                        </button>
                    </div>
                </div>
                <div className="border-t border-stone-800 pt-8 text-center text-xs">
                    &copy; {new Date().getFullYear()} Padres con Resiliencia. Todos los derechos reservados.
                </div>
            </div>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </footer>
    );
}
