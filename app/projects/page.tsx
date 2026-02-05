"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";   // icons

// Components
import SciFiProjectCard from "../components/SciFiCard";
import { BackgroundDecorativeCircles } from "../components/ui/backgroundss";
import Footer from "../components/footer";

// Configuration
const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#4285F4"];

const MOCK_PROJECTS = [
  {
    _id: "1", title: "Chaser", thumbnail: "/projects/chaser.png", description: `As part of a group project, we developed an Object Chasing Machine, a robotic system designed to autonomously detect and follow a moving object using computer vision and sensor-based tracking techniques. The project combined Raspberry Pi for image processing and Arduino for motor control, enabling real-time tracking and movement.
Our team implemented OpenCV with Raspberry Pi's Camera Module to process live video feeds and detect objects based on color and shape recognition. The Raspberry Pi analyzed the object's position and communicated movement commands to the Arduino via serial communication (UART). The Arduino then controlled the motors through an L298N Motor Driver, allowing the robot to move in the correct direction.
To enhance functionality, we integrated an ultrasonic sensor for obstacle detection and avoidance, ensuring smooth navigation. This project introduced us to robotics, embedded systems, and real-time image processing, strengthening our skills in Python, C++, OpenCV, and microcontroller programming.
Through this collaborative effort, I gained valuable experience in teamwork, problem-solving, and hardware-software integration, making it a significant learning experience in the field of embedded systems and automation` },
  {
    _id: "2", title: "VittaSutra ", thumbnail: "/projects/vittasutra.png", description: `The problem VittaSutra solves
VittaSutra: Solving Government Transparency Issues
Problems Addressed
Lack of Financial Transparency: Traditional government spending systems operate in silos with limited public visibility into fund allocation and utilization.
Corruption Vulnerabilities: Opaque financial systems create opportunities for misappropriation and diversion of public funds.
Limited Accountability: Without transparent tracking, officials can avoid responsibility for project failures or delays.
Trust Deficit: Citizens remain skeptical about government claims regarding development initiatives when they cannot verify expenditures.
Our Solution
VittaSutra leverages blockchain technology to create an immutable ledger of all government expenditures. The platform:
Records every transaction on Ethereum blockchain, making records tamper-proof
Provides bilingual (Hindi/English) interfaces for broad accessibility
Allows citizens to track project progress, budgets, and actual spending
Enables officials to securely document expenditures with cryptographic verification
Includes mechanisms for citizens to report discrepancies or file complaints
Automatically tracks fund utilization rates and flags unusual patterns
By making financial data public and immutable, VittaSutra significantly reduces corruption opportunities while building citizen trust through verified transparency.` },
  { _id: "3", title: "optimal power flow", thumbnail: "/projects/optimalpowerflow.png", description: `Our project focuses on solving the Optimal Power Flow (OPF) problem using Graph Neural Networks (GNNs) in an unsupervised manner. The model learns to minimize generation cost and voltage deviations while respecting grid constraints, achieving near real-time, scalable, and cost-effective solutions compared to traditional optimization methods ` },
  { _id: "4", title: "NextOS", thumbnail: "/projects/nextos.png", description: `NextOS is a powerful yet simple graphical tool that empowers you to craft your perfect Arch Linux operating system. Through an intuitive step-by-step wizard, you can visually select your preferred desktop environment, essential applications, and custom settings without ever touching a command line. NextOS then packages your unique configuration into a personalized, bootable ISO, giving you a bespoke Arch Linux experience that’s ready to install right from the start. It’s all the power and flexibility of Arch, with none of the complexity. ` },
];

const MOCK_DOMAINS = [
  {
    domain: "Web Development",
    img: "/web-dev.png",
    side: -200,
    color: "border-blue-500",
    desc: "Building scalable, high-performance web architectures using the MERN stack and Next.js. We focus on modern frameworks, server-side rendering, and responsive design to create seamless user experiences that work flawlessly across all devices."
  },
  {
    domain: "App Development",
    img: "/app-dev.png",
    side: 200,
    color: "border-red-500",
    desc: "Creating native and cross-platform mobile solutions with Flutter and Firebase. From intuitive user interfaces to robust backend integration, we develop apps that deliver smooth performance and real-time functionality on both Android and iOS platforms."
  },
  {
    domain: "AI / Machine Learning",
    img: "/ai-robot.png",
    side: -200,
    color: "border-yellow-500",
    desc: "Designing intelligent systems with Python, TensorFlow, and PyTorch. We explore neural networks, natural language processing, and computer vision to solve complex problems and automate decision-making processes through data-driven insights."
  },
  {
    domain: "Blockchain",
    img: "/blockchain-tech.png",
    side: 200,
    color: "border-green-500",
    desc: "Developing decentralized applications (dApps) and secure smart contracts on Web3 platforms. We dive deep into Ethereum, Solidity, and consensus mechanisms to build transparent, tamper-proof systems for the future of finance and governance."
  },
  {
    domain: "UI / UX Design",
    img: "/uiux.png",
    side: -200,
    color: "border-blue-500",
    desc: "Crafting immersive user interfaces using Figma and Adobe XD. We emphasize user-centric design principles, wireframing, and interactive prototyping to create visually stunning and highly intuitive digital experiences that delight users."
  },
  {
    domain: "Hardware",
    img: "/hardware.png",
    side: 200,
    color: "border-red-500",
    desc: "Innovating with core VLSI design, PCB fabrication, and embedded IoT systems. We bridge the gap between software and physical reality, working with microcontrollers and sensors to build smart, connected devices for the modern world."
  }
];
function ProjectsContent() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);  //activeIndex : it tracks ki crousel me centre me kon sa project hai
  const [isExpanded, setIsExpanded] = useState(false);   //isExpanded: Ye ek boolean (true/false) hai jo control karta hai ki project ka "Detail Modal" khula hai ya nahi.

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      if (!isExpanded) {
        setActiveIndex((prev) => (prev + 1) % MOCK_PROJECTS.length);
      }
    }, 3000);   // time of crousel slide change- 3 sec.
    return () => clearInterval(interval);
  }, [isExpanded]);

  if (!mounted) return null;

  const current = MOCK_PROJECTS[activeIndex];
  const currentColor = GOOGLE_COLORS[activeIndex % 4];

  return (
    <div className="relative mb-200 bg-white min-h-screen text-black flex flex-col font-sans overflow-x-hidden">

      {/* Background Pastel Circles */}
      <BackgroundDecorativeCircles />

      {/* Main Content Wrapper - Bottom padding matches footer height */}
      <div className="relative z-10 w-full pb-[200px] md:pb-[80px] bg-white/5">

        {/* CAROUSEL SECTION */}
        <main className="w-full pt-30 flex flex-col items-center">
          <header className="text-center mb-0 px-0">
            <div className="flex items-center justify-center gap-2 mb-0">
              <span className="text-blue-600 text-6xl font-bold">{"<"}</span>
              <h1 className="text-7xl font-bold text-gray-900 tracking-tighter uppercase">Projects</h1>
              <span className="text-green-600 text-6xl font-bold">{"/"}</span>
              <span className="text-green-600 text-6xl font-bold">{">"}</span>
            </div>
            <p className="text-gray-600 text-lg max-w-2x mx-auto leading-relaxed font-bold px-5 py-2">
              Learn, Connect, and Grow. Join our upcoming <span className="text-blue-600">workshops</span>,
              <span className="text-red-600"> hackathons</span>, and <span className="text-yellow-600">tech talks</span>.
            </p>
          </header>

          <div className="relative w-full flex items-center justify-center h-[600px] mt-0">
            <button onClick={() => setActiveIndex((prev) => (prev - 1 + MOCK_PROJECTS.length) % MOCK_PROJECTS.length)}
              className="absolute left-10 z-50 p-6 border border-gray-200 rounded-full bg-white/50 backdrop-blur-md hover:bg-white shadow-lg transition-all">
              <ChevronLeft className="w-10 h-10 text-gray-600" />
            </button>

            <div className="flex items-center justify-center py-0 w-full relative h-full">
              {MOCK_PROJECTS.map((project, index) => {     //we decides ki kon sa card centre me hai , kon right , kon left.
                let pos = index - activeIndex;
                if (pos > MOCK_PROJECTS.length / 2) pos -= MOCK_PROJECTS.length;
                if (pos < -MOCK_PROJECTS.length / 2) pos += MOCK_PROJECTS.length;
                const isCenter = pos === 0;
                const isVisible = Math.abs(pos) <= 1;

                return (
                  <motion.div key={project._id} initial={false}    // 1.45 times larger hoge baki 0.65 x chhote.,    centre is at 0 , baki doh , at 600px away.
                    animate={{ scale: isCenter ? 1.45 : 0.65, x: pos * 600, zIndex: isCenter ? 40 : 10, opacity: isVisible ? (isCenter ? 1 : 0.25) : 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute cursor-pointer" onClick={() => isCenter ? setIsExpanded(true) : setActiveIndex(index)}>

                    {/* 🛠️ UPDATED: Passing correct props to your new SciFiCard component */}
                    <div className="w-[100px] md:w-[550px] bg-transparent overflow-visible border-none shadow-none outline-none">
                      <SciFiProjectCard
                        title={project.title}
                        logoSrc={project.thumbnail}
                        themeColor={GOOGLE_COLORS[index % 4]} // 👈 This line ensures colors rotate: Blue -> Red -> Yellow -> Green
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button onClick={() => setActiveIndex((prev) => (prev + 1) % MOCK_PROJECTS.length)}
              className="absolute right-10 z-50 p-6 border border-gray-200 rounded-full bg-white/50 backdrop-blur-md hover:bg-white shadow-lg transition-all">
              <ChevronRight className="w-10 h-10 text-gray-600" />
            </button>
          </div>
        </main>

        {/* 2 COLUMN DOMAIN HUB */}
        <section className="relative w-full py- bg-transparent">
          <div className="max-w-[1400px] mx-auto px-6 py-20 space-y-20">
            <header className="space-y-4 text-center md:text-left">
              <h2 className="text-6xl font-black uppercase tracking-tighter italic text-gray-900">Innovation Discovery Hub</h2>
              <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                <span className="text-blue-600"> </span>
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
              {MOCK_DOMAINS.map((item, i) => (
                <motion.div                  //Scroll Animations - to slide the crousel
                  key={i}
                  initial={{ opacity: 0, x: item.side, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col space-y-6 group"
                >
                  <div className="w-full aspect-video rounded-[35px] overflow-hidden relative">
                    <img src={item.img} alt={item.domain} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                  </div>

                  <div className="space-y-3">
                    <span className={`text-[10px] font-mono ${item.color.replace('border-', 'text-')} tracking-[0.4em] uppercase font-bold`}>Sector_{i + 1}</span>
                    <h3 className="text-4xl font-black uppercase tracking-tighter text-gray-800">{item.domain}</h3>
                    <p className="text-lg text-gray-500 font-mono leading-relaxed uppercase tracking-tight">{item.desc}</p>
                    <motion.div whileInView={{ width: [0, 80] }} transition={{ duration: 1.2 }} className={`h-1 ${item.color.replace('border-', 'bg-')}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-[90vw] h-[80vh] flex overflow-hidden rounded-[40px] border border-gray-200 shadow-2xl relative bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* LEFT SIDE: Pure Picture Area */}
              <div className="w-1/2 h-full bg-gray-100 relative border-r border-gray-200 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${current.thumbnail})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
              </div>

              {/* RIGHT SIDE: Content Area with Scrollable Description */}
              <div className="w-1/2 h-full bg-white p-20 md:p-20 flex flex-col relative">
                {/* Close Button - Fixed at top-right */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-10 right-10 text-gray-400 hover:text-black transition-colors z-20"
                >
                  <X className="w-10 h-10" />
                </button>

                {/* Title - Fixed at the top */}
                <h2
                  className="text-6xl  font-black uppercase mb-8 leading-tight tracking-tighter"
                  style={{ color: currentColor }}
                >
                  {current.title}
                </h2>

                {/* 🛠️ SCROLLABLE DESCRIPTION BOX */}
                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  <p className="text-xl md:text-2xl text-gray-600 font-mono leading-relaxed uppercase">
                    {current.description}
                  </p>
                </div>

                {/* Optional: Subtle indicator that there is more text */}
                <div className="h-8 bg-gradient-to-t from-white to-transparent absolute bottom-12 left-20 right-20 pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <Footer />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="bg-white min-h-screen" />}>
      <ProjectsContent />
    </Suspense>             //wrapping page in Suspense - agar data load hone mein time lage, toh user ko ek blank page ke bajaye smoothly loading state dikhegi.
  );
}