"use client";

import { useState, useEffect } from "react";

import { Clock } from "lucide-react";

export default function OfferCountdown({ className = "text-red-600 text-xs sm:text-sm" }: { className?: string }) {
    // Target: 2026-01-16 00:00:00 (user's request)
    const TARGET_DATE = new Date("2026-01-16T00:00:00+01:00").getTime();

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
        <div className={`flex items-center gap-2 font-bold mt-1 ${className}`}>
            <Clock className="w-[1.2em] h-[1.2em] animate-pulse" />
            <span className="tabular-nums">
                {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
            </span>
        </div>
    );
}
