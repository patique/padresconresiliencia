"use client";

import { useState, useEffect } from "react";

import { Clock } from "lucide-react";

export default function OfferCountdown({
    className = "text-red-600 text-xs sm:text-sm",
    targetDate = "2026-01-18T23:59:59+01:00",
    includeDays = false
}: {
    className?: string;
    targetDate?: string;
    includeDays?: boolean;
}) {
    // Target: passed prop or default
    const TARGET_DATE = new Date(targetDate).getTime();

    const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = TARGET_DATE - now;

            if (difference > 0) {
                return {
                    d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    m: Math.floor((difference / 1000 / 60) % 60),
                    s: Math.floor((difference / 1000) % 60),
                };
            } else {
                return { d: 0, h: 0, m: 0, s: 0 };
            }
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [TARGET_DATE]);

    if (!timeLeft) return null;

    return (
        <div className={`flex items-center gap-2 font-bold mt-1 ${className}`}>
            <Clock className="w-[1.2em] h-[1.2em] animate-pulse" />
            <span className="tabular-nums">
                {includeDays && timeLeft.d > 0 ? (
                    <span>{timeLeft.d}d {timeLeft.h}h {timeLeft.m}m</span>
                ) : (
                    <span>
                        {String(timeLeft.d * 24 + timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
                    </span>
                )}
            </span>
        </div>
    );
}
