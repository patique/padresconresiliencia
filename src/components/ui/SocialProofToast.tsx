"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const NOTIFICATIONS = [
    { name: "Lucía M.", action: "se unió a 'Educar en la Fe'", location: "Madrid", time: "hace 2 min" },
    { name: "Carlos R.", action: "descargó 'Bienestar Emocional'", location: "Barcelona", time: "hace 5 min" },
    { name: "Ana P.", action: "se unió a la lista de espera", location: "Valencia", time: "hace 12 min" },
    { name: "Sofía G.", action: "compró el Pack Crianza", location: "Sevilla", time: "hace 1 hora" },
    { name: "Miguel A.", action: "descargó la guía gratuita", location: "Bilbao", time: "hace 20 min" },
];

export default function SocialProofToast() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentNotification, setCurrentNotification] = useState(0);

    useEffect(() => {
        // Initial delay
        const initialTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        // Cycle notifications
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentNotification((prev) => (prev + 1) % NOTIFICATIONS.length);
                setIsVisible(true);
            }, 500); // Wait for fade out before changing text and fading in
        }, 15000); // Show new one every 15s

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    const data = NOTIFICATIONS[currentNotification];

    if (!data) return null;

    return (
        <div
            className={`fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
        >
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-stone-100 p-4 flex items-center gap-4 max-w-sm pr-10 relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-stone-300 hover:text-stone-500 transition"
                >
                    <X className="w-3 h-3" />
                </button>

                <div className="bg-green-100 p-2 rounded-full shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>

                <div>
                    <p className="text-sm text-stone-800 font-medium">
                        <span className="font-bold">{data.name}</span> de {data.location}
                    </p>
                    <p className="text-xs text-stone-500">
                        {data.action} <span className="text-stone-300">•</span> {data.time}
                    </p>
                </div>
            </div>
        </div>
    );
}
