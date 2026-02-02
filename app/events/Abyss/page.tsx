"use client";

import React from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import TiltedCard from "./components/TiltedCard";

// Event data for the 8 cards
const abyssEvents = [
    {
        id: 1,
        title: "The Void Tournament",
        description: "Strategy card battles in the depths",
        image: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&h=400&fit=crop",
        suit: "♠",
    },
    {
        id: 2,
        title: "Crimson Stakes",
        description: "High-risk poker championship",
        image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=400&h=400&fit=crop",
        suit: "♥",
    },
    {
        id: 3,
        title: "Diamond Heist",
        description: "Escape room challenge",
        image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=400&fit=crop",
        suit: "♦",
    },
    {
        id: 4,
        title: "Clover Quest",
        description: "Luck-based treasure hunt",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
        suit: "♣",
    },
    {
        id: 5,
        title: "Shadow Deck",
        description: "Mystery solving competition",
        image: "https://images.unsplash.com/photo-1594652634010-275456c808d0?w=400&h=400&fit=crop",
        suit: "♠",
    },
    {
        id: 6,
        title: "Heart's Gambit",
        description: "Team-based strategy games",
        image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=400&fit=crop",
        suit: "♥",
    },
    {
        id: 7,
        title: "Crystal Bluff",
        description: "Deception and deduction",
        image: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=400&h=400&fit=crop",
        suit: "♦",
    },
    {
        id: 8,
        title: "Ace's Arena",
        description: "The ultimate showdown",
        image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=400&h=400&fit=crop",
        suit: "♣",
    },
];

// Get suit color based on suit type
const getSuitColor = (suit: string) => {
    switch (suit) {
        case "♥":
            return "#DC2626";
        case "♦":
            return "#FBBC04";
        case "♠":
            return "#4285F4";
        case "♣":
            return "#34A853";
        default:
            return "#fff";
    }
};

// Animated card wrapper that appears on scroll
function AnimatedCard({ children, index }: { children: React.ReactNode; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.div>
    );
}

export default function AbyssPage() {
    return (
        <div
            className="min-h-[300vh] w-full relative"
            style={{
                backgroundImage: "url('/abyss.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
            }}
        >
            {/* Subtle dark overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

            {/* Hero Section */}
            <div className="relative z-10 flex flex-col items-center min-h-screen px-4 pt-6">
                {/* GDG Logo - Card Suits */}
                <div className="absolute top-6 left-6">
                    <div className="grid grid-cols-2 gap-1">
                        <span className="text-2xl" style={{ color: "#EA4335" }}>
                            ♦
                        </span>
                        <span className="text-2xl" style={{ color: "#34A853" }}>
                            ♣
                        </span>
                        <span className="text-2xl" style={{ color: "#4285F4" }}>
                            ♠
                        </span>
                        <span className="text-2xl" style={{ color: "#FBBC04" }}>
                            ♥
                        </span>
                    </div>
                </div>

                {/* GDG PRESENTS text */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-8 text-sm md:text-base tracking-[0.4em] font-medium text-white/90 uppercase"
                >
                    GDG PRESENTS
                </motion.p>

                {/* Main ABYSS Title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-16 md:mt-24 flex flex-col items-center"
                >
                    <h1 className="flex items-baseline">
                        <span
                            className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-white tracking-tight"
                            style={{
                                fontFamily: "'Times New Roman', Times, serif",
                                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                            }}
                        >
                            A
                        </span>
                        <span
                            className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-white tracking-tight"
                            style={{
                                fontFamily: "'Times New Roman', Times, serif",
                                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                            }}
                        >
                            B
                        </span>
                        <span
                            className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tight"
                            style={{
                                fontFamily: "'Times New Roman', Times, serif",
                                color: "#DC2626",
                                textShadow: "0 4px 30px rgba(220,38,38,0.4)",
                            }}
                        >
                            Y
                        </span>
                        <span
                            className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-white tracking-tight"
                            style={{
                                fontFamily: "'Times New Roman', Times, serif",
                                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                            }}
                        >
                            S
                        </span>
                        <span
                            className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-white tracking-tight"
                            style={{
                                fontFamily: "'Times New Roman', Times, serif",
                                textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                            }}
                        >
                            S
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/95 tracking-[0.15em] uppercase"
                        style={{
                            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                        }}
                    >
                        THE DEPTH STARES BACK
                    </motion.p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 flex flex-col items-center"
                >
                    <p className="text-white/60 text-sm tracking-wider mb-2">SCROLL TO EXPLORE</p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
                    >
                        <div className="w-1.5 h-3 bg-white/60 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Events Section */}
            <div className="relative z-10 py-20 px-4 md:px-8 lg:px-16">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Into The <span className="text-red-600">Abyss</span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Choose your path. Each card holds a different challenge waiting to be conquered.
                    </p>
                </motion.div>

                {/* Event Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {abyssEvents.map((event, index) => (
                        <AnimatedCard key={event.id} index={index}>
                            <div className="flex flex-col items-center">
                                <TiltedCard
                                    imageSrc={event.image}
                                    altText={event.title}
                                    captionText={event.title}
                                    containerHeight="280px"
                                    containerWidth="280px"
                                    imageHeight="280px"
                                    imageWidth="280px"
                                    rotateAmplitude={12}
                                    scaleOnHover={1.08}
                                    showMobileWarning={false}
                                    showTooltip
                                    displayOverlayContent
                                    overlayContent={
                                        <div
                                            className="w-full p-3 rounded-b-[15px]"
                                            style={{
                                                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)",
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="text-2xl"
                                                    style={{ color: getSuitColor(event.suit) }}
                                                >
                                                    {event.suit}
                                                </span>
                                                <h3 className="text-white font-bold text-lg">{event.title}</h3>
                                            </div>
                                            <p className="text-white/70 text-sm mt-1">{event.description}</p>
                                        </div>
                                    }
                                />
                            </div>
                        </AnimatedCard>
                    ))}
                </div>
            </div>

            {/* Footer decoration */}
            <div className="relative z-10 py-20 flex justify-center items-center gap-8">
                <span className="text-4xl" style={{ color: "#EA4335" }}>♥</span>
                <span className="text-4xl" style={{ color: "#4285F4" }}>♠</span>
                <span className="text-4xl" style={{ color: "#FBBC04" }}>♦</span>
                <span className="text-4xl" style={{ color: "#34A853" }}>♣</span>
            </div>
        </div>
    );
}
