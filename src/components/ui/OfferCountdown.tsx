"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function OfferCountdown() {
    // Target: 2026-01-15 00:00:00 (user's request)
    const TARGET_DATE = new Date("2026-01-15T00:00:00+01:00").getTime();

    const [timeLeft, setTimeLeft] = useState<{ h: number, m: number, s: number } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = TARGET_DATE - now;

            if (difference > 0) {
                return {
                    h: Math.floor((difference / (1000 * 60 * 60))),
                    m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    s: Math.floor((difference % (1000 * 60)) / 1000),
                };
            } else {
                return { h: 0, m: 0, s: 0 };
            }
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;

    return (
        <div className="flex items-center gap-2 text-red-600 font-bold text-xs sm:text-sm mt-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
            <span className="tabular-nums">
                {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
            </span>
        </div>
    );
}
