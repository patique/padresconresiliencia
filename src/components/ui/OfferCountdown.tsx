"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface OfferCountdownProps {
    className?: string;
    targetDate?: string;
    includeDays?: boolean;
    cycleDays?: number; // New prop for evergreen cycles
}

export default function OfferCountdown({
    className = "text-red-600 text-xs sm:text-sm",
    targetDate,
    includeDays = false,
    cycleDays = 3
}: OfferCountdownProps) {
    // State to store the calculated target timestamp
    const [targetTimestamp, setTargetTimestamp] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

    useEffect(() => {
        // Determine the target timestamp
        let target: number;

        if (targetDate) {
            target = new Date(targetDate).getTime();
        } else {
            // Evergreen logic: 3-day cycles starting from a fixed epoch
            const epoch = new Date('2024-01-01T00:00:00Z').getTime();
            const now = Date.now();
            const cycleMs = cycleDays * 24 * 60 * 60 * 1000;
            const elapsed = now - epoch;
            // The end of the current cycle
            target = epoch + (Math.floor(elapsed / cycleMs) + 1) * cycleMs;
        }

        setTargetTimestamp(target);

        const calculateTimeLeft = () => {
            if (!target) return { d: 0, h: 0, m: 0, s: 0 };

            const now = new Date().getTime();
            const difference = target - now;

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

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, cycleDays]);

    // Prevent hydration mismatch or empty state
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
