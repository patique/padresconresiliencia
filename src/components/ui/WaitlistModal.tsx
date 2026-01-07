"use client";

import { X, Bell } from "lucide-react";
import { useEffect, useState } from "react";
// @ts-ignore
import { useFormState } from "react-dom";
import { joinWaitlist } from "@/actions/waitlist";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: string;
}

const initialState = {
    success: false,
    message: '',
};

export default function WaitlistModal({ isOpen, onClose, topic }: WaitlistModalProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [state, formAction] = useFormState(joinWaitlist, initialState);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (state.success) {
            const timer = setTimeout(() => {
                onClose();
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [state.success, onClose]);

    if (!isOpen || !isMounted) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 relative">
                <button
                    onClick={onClose}
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

                    {state.message && (
                        <div className={`p-3 rounded-lg mb-4 text-xs font-medium ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {state.message}
                        </div>
                    )}

                    <form action={formAction} className="space-y-4">
                        <input type="hidden" name="topic" value={topic} />

                        <div>
                            <input
                                type="email"
                                name="email"
                                className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition text-center"
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full btn-primary py-3">
                            ¡Avisadme!
                        </button>
                        <p className="text-[10px] text-stone-400">No enviamos spam. Solo te avisaremos del lanzamiento.</p>
                    </form>
                </div>
            </div>
        </div>
    );
}
