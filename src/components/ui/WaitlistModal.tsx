"use client";

import { X, Bell } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { joinWaitlist } from "@/actions/waitlist";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: string;
    previewContent?: React.ReactNode;
}

export default function WaitlistModal({ isOpen, onClose, topic, previewContent }: WaitlistModalProps) {
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

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200 text-left">
            <div
                className={`bg-white rounded-2xl shadow-2xl w-full ${previewContent ? 'max-w-2xl' : 'max-w-sm'} overflow-hidden animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh]`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    type="button"
                    className="absolute top-4 right-4 z-10 p-1 bg-white/80 rounded-full text-stone-400 hover:text-stone-600 transition hover:bg-stone-100"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className={`p-6 ${previewContent ? 'pb-2' : 'pb-0'} text-center shrink-0`}>
                    <div className="w-12 h-12 bg-[#F2CC8F]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell className="w-6 h-6 text-[#E07A5F]" />
                    </div>

                    <h2 className="text-xl font-bold text-stone-800 mb-1">
                        {previewContent ? `Adelanto Exclusivo: ${topic}` : "¡Muy pronto!"}
                    </h2>

                    {!previewContent && (
                        <p className="text-stone-600 text-sm">
                            El curso <strong>"{topic}"</strong> está en desarrollo.
                        </p>
                    )}
                </div>

                {/* Optional Preview Content */}
                {previewContent && (
                    <div className="flex-1 overflow-y-auto px-6 py-2">
                        <div className="bg-stone-50 rounded-xl p-5 border border-stone-100 text-sm text-stone-600 leading-relaxed shadow-inner">
                            {previewContent}
                        </div>
                    </div>
                )}

                <div className="p-6 pt-4 bg-white shrink-0 border-t border-stone-100 z-10 w-full">
                    {previewContent && (
                        <p className="text-stone-800 font-bold text-center mb-4 text-sm">
                            ¿Te gusta lo que ves? Únete a la lista de espera.<br />
                            <span className="font-normal text-stone-500 text-xs">Recibirás un descuento especial de lanzamiento.</span>
                        </p>
                    )}

                    {!previewContent && (
                        <p className="text-stone-600 mb-6 text-sm text-center">
                            Déjanos tu email y sé el primero en enterarte (y recibir un descuento especial).
                        </p>
                    )}

                    {message && (
                        <div className={`p-3 rounded-lg mb-4 text-xs font-medium text-center ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-3">
                        <input type="hidden" name="topic" value={topic} />
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                name="email"
                                className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition placeholder:text-stone-400"
                                placeholder="tu@email.com"
                                required
                                disabled={isPending}
                            />
                            <button type="submit" disabled={isPending} className="btn-primary py-3 px-6 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                                {isPending ? 'Enviando...' : '¡Avisadme!'}
                            </button>
                        </div>
                        <p className="text-[10px] text-stone-400 text-center">No enviamos spam. Solo te avisaremos del lanzamiento.</p>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}
