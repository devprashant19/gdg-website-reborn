"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Components
import Navbar from "../components/navbar/navbar";
import SciFiProjectCard from "../components/SciFiCard"; 
import { NeuralBackground } from "../components/NeuralBackground-Blue";

// Strict Google Color Sequence: Blue -> Red -> Yellow -> Green
const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

const MOCK_PROJECTS = [
  { _id: "1", title: "CRAWLER 1", thumbnail: "/ai.png", description: "SYSTEM_LOG: Artificial Intelligence subsystem initialized. Monitoring high-frequency data streams for pattern recognition." },
  { _id: "2", title: "CRAWLER 2", thumbnail: "/cloud.png", description: "GLOBAL_CLOUD_SUMMIT: Distributed computing architecture deployed. 2026 Summit protocols active." },
  { _id: "3", title: "CRAWLER 3", thumbnail: "/blockchain.png", description: "BLOCKCHAIN_CORE: Decentralized ledger verification active. Secure node-to-node encryption established." },
  { _id: "4", title: "CRAWLER 4", thumbnail: "/portal.png", description: "GATEWAY_ACTIVE: User interface portal for NIT Hamirpur developers. Repository access granted." },
  { _id: "5", title: "CRAWLER 5", thumbnail: "/market.png", description: "MARKET_WARS: Real-time scarcity market simulator built for GDG tech fests." },
  // { _id: "6", title: "CRAWLER 6", thumbnail: "/vision.png", description: "NEURAL_VISION: Edge-AI surveillance system using computer vision and IoT." },
  // { _id: "7", title: "CRAWLER 7", thumbnail: "/eco.png", description: "ECO_GRID: Decentralized energy management system designed for campus sustainability." },
  // { _id: "8", title: "CRAWLER 8", thumbnail: "/pulse.png", description: "PULSE_AI: Health monitoring system using wearable sensor data and machine learning algorithms." }
];

function ProjectsContent() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-slide logic at constant speed
    const interval = setInterval(() => {
      if (!isExpanded) {
        setActiveIndex((prev) => (prev + 1) % MOCK_PROJECTS.length);
      }
    }, 3500); 
    return () => clearInterval(interval);
  }, [isExpanded]);

  if (!mounted) return null;

  const current = MOCK_PROJECTS[activeIndex];
  const currentColor = GOOGLE_COLORS[activeIndex % 4];

  return (
    <div className="relative bg-black min-h-screen text-white flex flex-col overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <NeuralBackground />
      </div>

      <Navbar />

      <main className="relative z-10 flex-grow w-full pt-20 flex flex-col items-center">
        {/* Header: Non-italic as requested */}
        <header className="text-center mb-10 px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-blue-600 text-6xl font-bold">{"<"}</span>
            <h1 className="text-7xl font-bold text-white tracking-tighter uppercase">Projects</h1>
            <span className="text-green-600 text-6xl font-bold">{"/"}</span>
            <span className="text-green-600 text-6xl font-bold">{">"}</span>
          </div>
          
          <p className="text-zinc-300 text-lg max-w-3xl mx-auto leading-relaxed font-semibold">
            Learn, Connect, and Grow. Join our upcoming  <span /*className="text-blue-500"*/>workshops</span>, 
            <span /*className="text-red-500"*/> hackathons</span>, and <span /*className="text-yellow-500"*/>tech talks</span>.
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            {GOOGLE_COLORS.map((color, i) => (
              <motion.div key={i} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.15)]" style={{ backgroundColor: color }} />
            ))}
          </div>
        </header>

        {/* Self-Moving Infinite Carousel */}
        <div className="relative w-full max-w-7xl flex items-center justify-center h-[500px] mt-10">
          <button onClick={() => setActiveIndex((prev) => (prev - 1 + MOCK_PROJECTS.length) % MOCK_PROJECTS.length)}
            className="absolute left-6 md:left-10 z-50 p-4 border border-zinc-800 rounded-full bg-black/40 backdrop-blur-md hover:bg-zinc-900 transition-all">
            <ChevronLeft className="w-8 h-8 text-zinc-400" />
          </button>

          <div className="flex items-center justify-center w-full relative h-full">
            {MOCK_PROJECTS.map((project, index) => {
              let pos = index - activeIndex;
              if (pos > MOCK_PROJECTS.length / 2) pos -= MOCK_PROJECTS.length;
              if (pos < -MOCK_PROJECTS.length / 2) pos += MOCK_PROJECTS.length;

              const isCenter = pos === 0;
              const isVisible = Math.abs(pos) <= 1;

              return (
                <motion.div
                  key={project._id}
                  initial={false}
                  animate={{
                    scale: isCenter ? 1.25 : 0.8,
                    x: pos * 450,
                    zIndex: isCenter ? 40 : 10,
                    opacity: isVisible ? (isCenter ? 1 : 0.3) : 0,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute cursor-pointer"
                  onClick={() => isCenter ? setIsExpanded(true) : setActiveIndex(index)}
                >
                  <div className="w-[380px] md:w-[450px]">
                    <SciFiProjectCard project={project} borderColor={GOOGLE_COLORS[index % 4]} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button onClick={() => setActiveIndex((prev) => (prev + 1) % MOCK_PROJECTS.length)}
            className="absolute right-6 md:right-10 z-50 p-4 border border-zinc-800 rounded-full bg-black/40 backdrop-blur-md hover:bg-zinc-900 transition-all">
            <ChevronRight className="w-8 h-8 text-zinc-400" />
          </button>
        </div>
      </main>

      {/* Expanded Split-View with Blurred Right Board */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              className="w-[85vw] h-[75vh] flex overflow-hidden rounded-[40px] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-1/2 h-full bg-zinc-950 flex items-center justify-center relative">
                <div className="scale-125">
                   <SciFiProjectCard project={current} borderColor={currentColor} />
                </div>
              </div>

              <div className="w-1/2 h-full bg-white/5 backdrop-blur-[60px] p-20 flex flex-col justify-center border-l border-white/5">
                <button onClick={() => setIsExpanded(false)} className="absolute top-10 right-10 text-zinc-500 hover:text-white transition-all">
                  <X className="w-10 h-10" />
                </button>
                <h2 className="text-7xl font-black uppercase mb-8 tracking-tighter" style={{ color: currentColor }}>
                  {current.title}
                </h2>
                <div className="h-1 w-20 mb-8" style={{ backgroundColor: currentColor }} />
                <p className="text-2xl text-zinc-300 font-mono leading-relaxed uppercase">
                  {current.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 w-full bg-black border-t border-zinc-900 pt-16 pb-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Google Developer Student Club</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              A Google Developers program for university students to learn mobile and web development skills.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 font-mono">About Us</h3>
            <ul className="space-y-3 text-zinc-500 text-sm font-mono uppercase">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Our Team</li>
              <li className="hover:text-white cursor-pointer">Events</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6 font-mono">Get Involved</h3>
            <ul className="space-y-3 text-zinc-500 text-sm font-mono uppercase">
              <li className="hover:text-white cursor-pointer">Join Us</li>
              <li className="hover:text-white cursor-pointer">Our Projects</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <ProjectsContent />
    </Suspense>
  );
}