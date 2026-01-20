"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

const NAMES = [
    "María G.", "Laura M.", "Carmen R.", "Ana P.", "Lucía S.", "Sofía L.",
    "Elena D.", "Isabel T.", "Marta V.", "Paula C.", "Valentina M.", "Camila R.",
    "Mateo G.", "Sebastián P.", "Santiago L.", "Mariana C.", "Diego V.",
    "Fernanda S.", "Gabriela O.", "Nicolás F.", "Valeria A.", "Matías J.",
    "Daniela B.", "Martín E.", "Felipe A.", "Ximena R.", "Juana M."
];

const LOCATIONS = [
    "Madrid, España", "Ciudad de México, MX", "Buenos Aires, AR",
    "Barcelona, España", "Bogotá, Colombia", "Santiago, Chile",
    "Lima, Perú", "Valencia, España", "Medellín, Colombia",
    "Sevilla, España", "Guadalajara, MX", "Montevideo, Uruguay",
    "Quito, Ecuador", "Bilbao, España", "Córdoba, Argentina",
    "Málaga, España", "Monterrey, MX", "Rosario, Argentina",
    "Zaragoza, España", "Cali, Colombia", "San José, Costa Rica",
    "Alicante, España", "Santo Domingo, RD", "Mendoza, Argentina",
    "Murcia, España", "Puebla, MX", "Asunción, Paraguay",
    "Palma, España", "Barranquilla, Colombia", "Ciudad de Panamá",
    "Vigo, España", "Arequipa, Perú", "Valparaíso, Chile"
];

const ACTIONS = [
    "se unió a 'Educar en la Fe'",
    "descargó 'Bienestar Emocional'",
    "se unió a la lista de espera",
    "compró el Pack Crianza",
    "descargó la guía gratuita",
    "reservó su plaza",
    "comenzó el curso"
];

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generateNotification = () => {
    const time = Math.floor(Math.random() * 59) + 1;
    return {
        name: getRandomElement(NAMES),
        location: getRandomElement(LOCATIONS),
        action: getRandomElement(ACTIONS),
        time: `hace ${time} min`
    };
};

export default function SocialProofToast() {
    const [isVisible, setIsVisible] = useState(false);
    const [notification, setNotification] = useState<{ name: string, location: string, action: string, time: string } | null>(null);

    useEffect(() => {
        // Initialize with random data on mount (client-side only to avoid hydration mismatch)
        setNotification(generateNotification());

        // Initial delay
        const initialTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        // Cycle notifications
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setNotification(generateNotification());
                setIsVisible(true);
            }, 500); // Wait for fade out
        }, 15000 + Math.random() * 10000); // Randomize interval slightly (15-25s)

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    if (!notification) return null;

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
                        <span className="font-bold">{notification.name}</span> de {notification.location}
                    </p>
                    <p className="text-xs text-stone-500">
                        {notification.action} <span className="text-stone-300">•</span> {notification.time}
                    </p>
                </div>
            </div>
        </div>
    );
}
