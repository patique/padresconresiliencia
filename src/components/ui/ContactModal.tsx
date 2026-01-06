"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
// @ts-ignore
import { useFormState } from "react-dom";
import { submitContactForm } from "@/actions/contact";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const initialState = {
    success: false,
    message: '',
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [state, formAction] = useFormState(submitContactForm, initialState);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (state.success) {
            const timer = setTimeout(() => {
                onClose();
                // Reset state logic would be ideal here if persist
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [state.success, onClose]);


    if (!isOpen || !isMounted) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-bold text-stone-800 mb-2">Contáctanos</h2>
                    <p className="text-stone-600 mb-6 text-sm">
                        ¿Tienes alguna duda sobre nuestros productos? Escríbenos y te responderemos lo antes posible.
                    </p>

                    {state.message && (
                        <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {state.message}
                        </div>
                    )}

                    <form action={formAction} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold text-stone-500 uppercase mb-1">Nombre</label>
                            <input type="text" id="name" name="name" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition" placeholder="Tu nombre" required />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-stone-500 uppercase mb-1">Email</label>
                            <input type="email" id="email" name="email" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition" placeholder="tucorreo@ejemplo.com" required />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-xs font-bold text-stone-500 uppercase mb-1">Mensaje</label>
                            <textarea id="message" name="message" rows={4} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition resize-none" placeholder="¿En qué podemos ayudarte?" required></textarea>
                        </div>

                        <button type="submit" className="w-full btn-primary py-3 mt-2">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
