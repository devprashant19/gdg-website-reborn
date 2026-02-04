"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button"; 
import { motion } from "framer-motion";

const PromoBanner = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Set target date to Friday, Feb 6th, 2026 based on user context
    const targetDate = new Date("2026-02-06T00:00:00");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();
            let newTimeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };

            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return newTimeLeft;
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-background py-0">
            {/* Increased height to ensure text visibility and prevent cropping */}
            <div className="relative w-full min-h-dvh flex items-center justify-center">
                {/* Background Image */}
                <Image
                    src="/assets/abyss_art.png"
                    alt="Promo Banner Background"
                    fill
                    className="object-contain w-full z-1"
                    priority
                />

                <div className="relative z-20 container mx-auto px-4 flex flex-col items-end md:flex-row md:justify-end gap-8 h-full">

                    {/* Main Content Area - Shifted to the right to avoid covering the ABYSS logo on the left */}
                    <div className="flex flex-col md:flex-row items-center md:justify-end gap-8 w-full md:w-auto md:ml-auto">

                        {/* Countdown & Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="ml-auto my-auto flex flex-col items-end text-center text-white md:mt-24"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Image src="/assets/gemini-color.png" width={20} height={20} alt="Gemini" className="animate-pulse" />
                                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white drop-shadow-lg">
                                    Registration Closing Soon
                                </h2>
                            </div>

                            <div className="flex gap-3 md:gap-4 text-center">
                                <CountdownUnit value={timeLeft.days} label="Days" color="border-blue-500 text-blue-400" />
                                <CountdownUnit value={timeLeft.hours} label="Hours" color="border-red-500 text-red-400" />
                                <CountdownUnit value={timeLeft.minutes} label="Mins" color="border-yellow-500 text-yellow-400" />
                                <CountdownUnit value={timeLeft.seconds} label="Secs" color="border-green-500 text-green-400" />
                            </div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="flex flex-col items-center mt-10"
                            >
                                <Link href="/events/Abyss">
                                    <Button
                                        size="lg"
                                        className="relative group overflow-hidden text-lg font-bold px-8 py-6 rounded-full bg-white text-neutral-900 border border-white/20 transition-all hover:scale-105 shadow-xl hover:shadow-2xl mt-4"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Image src="/assets/gemini-color.png" width={20} height={20} alt="Gemini" />
                                            REGISTER NOW
                                        </span>
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Side: CTA Button */}

                    </div>

                </div>
            </div>
        </section>
    );
};

const CountdownUnit = ({ value, label, color }: { value: number; label: string, color: string }) => (
    <div className={`flex flex-col items-center p-2 md:p-3 bg-black/40 backdrop-blur-xl rounded-xl border ${color} min-w-[60px] md:min-w-[70px] shadow-lg`}>
        <span className={`text-xl md:text-2xl font-bold font-mono ${color.split(' ')[1]}`}>{String(value).padStart(2, '0')}</span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-white/50 font-medium">{label}</span>
    </div>
);

export default PromoBanner;
