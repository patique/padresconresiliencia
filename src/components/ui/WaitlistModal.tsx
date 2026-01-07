"use client";

import { X, Bell } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { joinWaitlist } from "@/actions/waitlist";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: string;
}

export default function WaitlistModal({ isOpen, onClose, topic }: WaitlistModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setMessage(null);
            // Prevent body scroll when modal is open
        }
    }, [isOpen]);

    if (!mounted) return null;
    if (!isOpen) return null;

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            try {
                const result = await joinWaitlist(null, formData);
                if (result.success) {
                    setMessage({ text: result.message, type: 'success' });
                    setTimeout(() => {
                        onClose();
                    }, 2500);
                } else {
                    setMessage({ text: result.message, type: 'error' });
                }
            } catch (error) {
                console.error("Waitlist error:", error);
                setMessage({ text: "Ocurrió un error inesperado. Inténtalo de nuevo.", type: 'error' });
            }
        });
    }

    // Use Portal to render outside of the DOM hierarchy (solves z-index/transform issues)
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    type="button"
                    className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 text-center">
                    <div className="w-12 h-12 bg-[#F2CC8F]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-6 h-6 text-[#E07A5F]" />
                    </div>

                    <h2 className="text-xl font-bold text-stone-800 mb-2">¡Muy pronto!</h2>
                    <p className="text-stone-600 mb-6 text-sm">
                        El curso <strong>"{topic}"</strong> está en desarrollo. Déjanos tu email y sé el primero en enterarte (y recibir un descuento especial).
                    </p>

                    {message && (
                        <div className={`p-3 rounded-lg mb-4 text-xs font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-4">
                        <input type="hidden" name="topic" value={topic} />

                        <div>
                            <input
                                type="email"
                                name="email"
                                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition text-center"
                                placeholder="tu@email.com"
                                required
                                disabled={isPending}
                            />
                        </div>

                        <button type="submit" disabled={isPending} className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isPending ? 'Enviando...' : '¡Avisadme!'}
                        </button>
                        <p className="text-[10px] text-stone-400">No enviamos spam. Solo te avisaremos del lanzamiento.</p>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}
