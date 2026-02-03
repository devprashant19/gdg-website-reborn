'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useInView } from "motion/react";
import localFont from 'next/font/local';
import TiltedCard from './TiltedCard';

// --- Font Configuration ---
const geizer = localFont({
  src: './fonts/Geizer.otf',
  display: 'swap',
  variable: '--font-geizer',
});

// --- Types ---
type Suit = 'spades' | 'clubs' | 'diamonds' | 'hearts';

interface Game {
  id: number;
  title: string;
  suit: Suit;
  rank: string;
  difficulty: string;
  description: string;
  gameplay: string;
  twist: string;
  rules: string[];
  gameOver: string;
  image: string;
}

// --- Data: The 8 Games (Detailed) ---
const games: Game[] = [
  {
    id: 1,
    title: "Algo Wars",
    suit: "diamonds",
    rank: "K",
    difficulty: "Game Theory",
    description: "A team-based strategy game inspired by the Repeated Prisoner’s Dilemma. You don’t play the game manually. You design a strategy, and your algorithm plays for you. No coding experience is required—this is a battle of psychological and logical thinking.",
    gameplay: "Teams submit a single strategy that decides whether to Cooperate (C) or Defect (D) based on history. Submissions can be in Plain English, Voice, Logic rules, or Flowcharts.\n\nYour strategy is then executed automatically in a tournament against other teams. The goal is not just to win one match, but to perform well over many rounds by balancing cooperation and betrayal.",
    twist: "The total number of rounds (N) is unknown. A chaotic Multi-team (N-player) mode may be revealed on game day.",
    rules: [
      "Team Size: 2–4 members (Club/society-based).",
      "No coding required. Strategies accepted in English, Voice, or Logic.",
      "Objective: Maximize average score over unknown rounds.",
      "Scoring: Based on Prisoner's Dilemma payoff (Revealed on day).",
      "Winning Criteria: Highest average score.",
    ],
    gameOver: "Betrayal (Zero Sum)",
    image: "https://i.postimg.cc/NFk82F0r/algo-mob.jpg"
  },
  {
    id: 2,
    title: "Club Quiz",
    suit: "clubs",
    rank: "3",
    difficulty: "Knowledge / Reflex",
    description: "A battle of knowledge, speed, and nerves.\nTeams compete in a multi-stage quiz where only the sharpest minds survive. Every answer counts. Every second matters. Hesitation can cost your team a place in the next round. This isn’t just about knowing the right answers — it’s about staying calm under pressure, thinking fast, and outlasting the competition.",
    gameplay: "All interested participants must register through a Google Form. Based on their responses, 12 teams will be shortlisted to compete on stage.\nThese teams will face an intense Rapid Fire Buzzer Round, where speed and accuracy decide survival. The fastest minds advance — the rest are eliminated.\nFrom there, 7 teams move forward into the main quiz battle, consisting of multiple knowledge rounds where teams answer in sequence, with chances to pass questions to others.\nEvery stage narrows the field. Only one team will emerge as champions.",
    twist: "You don’t just need the right answer — you need it before anyone else. Delays, wrong buzzes, and missed passes can cost your team the game. Stay alert. Stay sharp",
    rules: [
      "Each team must consist of exactly 3 members",
      "Only one team per club is allowed to compete",
      "Non-club members may also participate through the registration form selection process",
      "Initial screening is done via Google Form responses",
      "Top 12 teams qualify for the Rapid Fire Buzzer Round",
      "After eliminations, 7 teams proceed to the main quiz rounds",
      "The main stage consists of 5 standard quiz rounds with passing allowed between teams",
      "Quizmaster decisions are final and binding",
    ],
    gameOver: "Elimination (The Drop)",
    image: "https://i.postimg.cc/C1ZVmfNP/c6d62881-d45d-460f-9080-caf1eb38a3fa.png"
  },
  {
    id: 3,
    title: "Psycho Pool",
    suit: "hearts",
    rank: "J",
    difficulty: "Psychological",
    description: "A competitive social experiment where you don't play against the game—you play against the crowd. Participants must navigate three phases of psychological elimination by predicting collective choices. It is a test of herd mentality versus individual intuition. Can you predict what everyone else is thinking before they do?",
    gameplay: "The game operates in three distinct phases.\n\nPhase 1 (Survival): You must avoid choosing the least selected option. Uniqueness is fatal.\n\nPhase 2 (Balance): You must avoid both the most popular AND the least popular options. You must survive in the 'average'.\n\nPhase 3 (The Showdown): The top players compete against the Audience. The spectators vote to 'kill' specific answers. If the crowd predicts your choice, you are eliminated.",
    twist: "In the final round, the Audience is the executioner. If they successfully predict the finalists' moves, the game ends in an Audience Victory and no player wins.",
    rules: [
      "Phase 1: Do NOT pick the least popular answer. (Minority gets eliminated).",
      "Phase 2: Do NOT pick the Most OR Least popular answer. (Extremes get eliminated).",
      "Phase 3: The top selected players fight against the audience.",
      "Absolute silence is mandatory. No discussion allowed.",
    ],
    gameOver: "Rejected (Social Exile)",
    image: "https://i.postimg.cc/13MZyrrS/Gemini-Generated-Image-3x7q1a3x7q1a3x7q.png"
  },
  {
    id: 4,
    title: "Escape Room",
    suit: "spades",
    rank: "5",
    difficulty: "Physical / Logic",
    description: "A high-stakes containment breach scenario. Teams are thrust into a physical track rigged with obstacles that require calculation and agility. Digital reliance is a weakness; here, only your mind and body can save you from the lockdown.",
    gameplay: "The game will be conducted in two rounds. In Round 1, teams must complete two different tracks with multiple levels, moving across the old LH building under the guidance of volunteers. Each team must finish the first track within the given time limit to qualify for the second track.\n\nIn Round 2, the qualified teams will face a final challenge that tests their speed, coordination, and problem-solving skills. The team that completes the task in the shortest time will be declared the winner.",
    twist: "The Price of Knowledge: You may summon a Volunteer for help, but it costs you. You must choose: Sacrifice one teammate (immediate removal from the round) or suffer a 60-second Time Freeze.",
    rules: [
      "ABSOLUTE BAN: No mobile phones, internet, or outside help.",
      "Zero Tolerance: Cheating or misbehavior results in instant team elimination.",
      "Data Protocol: Codes derived from obstacles must be written on the General Instructions Sheet.",
      "Penalty Option: To ask for help, you must accept a 60s penalty OR eject one member.",
    ],
    gameOver: "Disqualified (Purged)",
    image: "https://i.postimg.cc/Dy8Grxmw/escaperoom.jpg"
  },
  {
    id: 5,
    title: "Market Wars",
    suit: "diamonds",
    rank: "10",
    difficulty: "Strategy",
    description: "A ruthlessly volatile economic simulation consisting of 4 root conglomerates. You are not just a trader; you are a Founder. With capital locked in your own roots and liquid assets to wage war elsewhere, you must navigate four phases of market chaos. Sentiment, demand, and crisis management will determine who owns the market and who gets liquidated.",
    gameplay: "You start with $1000. The catch? $400 is forcefully locked into your Root Company. The remaining $600 is your weapon for cross-trading.\n\nThe war unfolds in 4 Phases:\nPhase 1 (Investment): Company values fluctuate dynamically based on demand.\nPhase 2 (Sentiment): Rumors and public opinion sway values.\nPhase 3 (Crisis): Real-world scenarios demand instant decisions.\nPhase 4 (The Pitch): Top Founders fight for one last valuation boost.",
    twist: "The fool leaps and finds the abyss; the wise man stands still and finds the bridge. Do not feed the beast of the market until you have counted its teeth and measured its bite.",
    rules: [
      "4 Root Companies. Teams assigned as Founders under one Root.",
      "Budget: $1000 ($400 Locked Root Investment + $600 Liquid).",
      "Values fluctuate based on Demand, Sentiment, and Decisions.",
      "Phase 4 is exclusive to top-performing teams.",
    ],
    gameOver: "Liquidation (Bankruptcy)",
    image: "https://i.postimg.cc/DyR4gqc3/Gemini-Generated-Image-hsl40phsl40phsl4.png"
  },
  {
    id: 6,
    title: "Black Box",
    suit: "spades",
    rank: "8",
    difficulty: "Strategy / Bidding",
    description: "A multi-panel economic warfare simulation. Teams compete in independent panels, bidding blindly on mystery boxes containing words and hidden effects. Only the top scorers across all panels survive to enter the Open Auction Finale.",
    gameplay: "Phase 1 (Blind Auction): 5 Rounds of sealed bidding on Mystery Boxes. Hints are cryptic. Highest bid wins; ties favor the underdog. Boxes contain Words and an Effect Card (Power-up, Penalty, or Neutral).\n\nQualification: Scores are compared globally across all panels. Only the top 15–20 teams advance.\n\nPhase 2 (The Finale): A high-stakes Live Open Auction for Stamps. Value is determined by age—older stamps mean higher points.",
    twist: "Throw your fortune at a sealed mystery, but be warned: some prizes are just beautifully wrapped sabotages waiting to detonate in your hands.",
    rules: [
      "Sealed Bidding: 2 mins per round. Highest bid wins.",
      "Tie Breaker: Team with the LOWER total score wins the box.",
      "Scoring: Word Combinations + Effect Card modifiers.",
      "Qualification: Top 15-20 teams GLOBALLY (not just per panel).",
      "Finale: Live bidding on Stamps. Highest Stamp Value wins.",
    ],
    gameOver: "Insolvent (Global Elimination)",
    image: "https://i.postimg.cc/3JqDw28F/blackbox.jpg"
  },
  {
    id: 7,
    title: "Simcity",
    suit: "clubs",
    rank: "Q",
    difficulty: "Management",
    description: "A high-stakes city management simulation on a massive touch table. You are the ruling council of a city facing an apocalypse. You must make moral choices that determine who lives and who dies.",
    gameplay: "Players are assigned roles: Mayor, General, Engineer, Doctor. You have limited energy and food. A disaster strikes every round (pandemic, earthquake, riots).\n\nYou must allocate resources. Powering the hospital might save lives but leaves the walls undefended against raiders. Every choice has a body count.",
    twist: "Natural disasters are not random. They are triggered by the progress of the opposing team, who are playing as 'Nature'.",
    rules: [
      "Manage power, water, and food levels.",
      "Keep population happiness above 50% to prevent revolution.",
      "Survive 3 waves of escalating disasters.",
      "Rebuild infrastructure faster than it is destroyed.",
    ],
    gameOver: "Total Collapse (Anarchy)",
    image: "https://i.postimg.cc/3rFbvJVP/simcity.jpg"
  },
  {
    id: 8,
    title: "Buckshot Roulette",
    suit: "hearts",
    rank: "A",
    difficulty: "Probability / Malice",
    description: "A high-stakes game of risk, bluffing, and survival. Players take turns drawing hidden cards and choosing who suffers the consequences — themselves or someone else. Every choice could cost a life… or earn another chance. Ability cards introduce control, deception, and strategy. Only one player walks out alive each round.",
    gameplay: "Each player starts with 3 lives. A deck contains a hidden mix of Static and Charged cards.\n\nOn your turn, you must choose who to use the top card on before it is revealed. Players receive ability cards at the start of each cycle and may hold a maximum of 2.\n\nRounds continue until only one player remains alive. Each team sends one player per round, and the team with the most surviving players at the end wins.",
    twist: "Targeting yourself is a gamble — it might give you another turn. Targeting others might save you… or make you a threat.",
    rules: [
      "Start with 3 Lives. Deck contains hidden Static & Charged cards.",
      "Must choose target (Self or Opponent) before revealing card.",
      "Charged Card: Target loses 1 Life.",
      "Static Card on Self: Play again. Static on Opponent: Turn passes.",
      "Abilities: Cryostat (Freeze), Flip (Switch), Radar (Peek), Hover (Discard).",
      "Max 2 Ability Cards held at any time.",
    ],
    gameOver: "Zero Lives (Discharged)",
    image: "https://i.postimg.cc/1XcJQJhk/buckshot.jpg"
  },
];

// --- Helpers ---

const getSuitColor = (suit: Suit) => {
  switch (suit) {
    case "hearts": return "#DC2626"; // Red
    case "diamonds": return "#FBBC04"; // Gold/Yellow
    case "spades": return "#4285F4"; // Blue
    case "clubs": return "#34A853"; // Green
  }
};

const SuitIcon = ({ suit }: { suit: Suit }) => {
  const color = getSuitColor(suit);
  const baseClass = "text-2xl transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_8px_currentColor] cursor-default";
  switch (suit) {
    case 'hearts': return <span style={{ color }} className={baseClass}>♥</span>;
    case 'diamonds': return <span style={{ color }} className={baseClass}>♦</span>;
    case 'spades': return <span style={{ color }} className={baseClass}>♠</span>;
    case 'clubs': return <span style={{ color }} className={baseClass}>♣</span>;
  }
};

// Time unit component for countdown
const TimeUnit = ({ value, label, isSeconds = false }: { value: number; label: string; isSeconds?: boolean }) => (
  <div className="flex flex-col items-center">
    <motion.div
      key={isSeconds ? value : undefined}
      initial={isSeconds ? { scale: 1.1, opacity: 0.7 } : false}
      animate={isSeconds ? { scale: 1, opacity: 1 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative"
    >
      <span
        className="text-xl md:text-2xl lg:text-3xl font-bold tabular-nums"
        style={{
          textShadow: '0 0 10px rgba(220, 38, 38, 0.6), 0 2px 4px rgba(0,0,0,0.8)'
        }}
      >
        {value.toString().padStart(2, '0')}
      </span>
    </motion.div>
    <span className="text-[10px] md:text-xs text-red-400/70 uppercase tracking-wider mt-1">{label}</span>
  </div>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Setting target to Feb 6, 2026 
    const targetDate = new Date('2026-02-06T00:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="text-red-500 border border-red-900/60 px-4 md:px-6 py-3 md:py-4 bg-black/85 backdrop-blur-md rounded-lg inline-flex items-center gap-1 font-mono"
      style={{
        boxShadow: '0 0 20px rgba(180, 20, 20, 0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}
    >
      {/* VISA Label */}
      <span
        className="text-xs md:text-sm text-red-400/80 tracking-[0.2em] mr-2 md:mr-4 uppercase font-semibold"
        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
      >
        VISA:
      </span>

      {/* Time Units */}
      <div className="flex items-center gap-2 md:gap-4">
        <TimeUnit value={timeLeft.days} label="days" />
        <span className="text-red-600/50 text-lg md:text-xl font-light">:</span>
        <TimeUnit value={timeLeft.hours} label="hrs" />
        <span className="text-red-600/50 text-lg md:text-xl font-light">:</span>
        <TimeUnit value={timeLeft.minutes} label="min" />
        <span className="text-red-600/50 text-lg md:text-xl font-light">:</span>
        <TimeUnit value={timeLeft.seconds} label="sec" isSeconds />
      </div>
    </div>
  );
};

// --- Animations ---
function AnimatedCardWrapper({ children, index }: { children: React.ReactNode; index: number }) {
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
      className="flex justify-center"
    >
      {children}
    </motion.div>
  );
}

// --- Modal Component ---
const GameModal = ({ game, onClose }: { game: Game; onClose: () => void }) => {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div
        className="relative w-full max-w-2xl border border-neutral-700 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Background Image Layer --- */}
        <div className="absolute inset-0 z-0">
          {/* The Image */}
          <img
            src={game.image}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          {/* The Blur/Darken Overlay - Darker for readability, Neutral Black */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
        </div>

        {/* --- Content Layer (Sitting on top of background) --- */}
        <div className="relative z-10">
          {/* Header Bar */}
          <div className={`h-2 w-full ${game.suit === 'hearts' || game.suit === 'diamonds' ? 'bg-red-600' : 'bg-cyan-500'}`} />

          <div className="p-8 max-h-[80vh] overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-6 mb-8">
              <div className="p-6 bg-black border border-neutral-800 rounded shadow-inner">
                <SuitIcon suit={game.suit} />
                <span className="block text-center font-bold mt-2 text-2xl text-white font-mono">{game.rank}</span>
              </div>
              <div>
                <h2 className="text-4xl font-black text-white tracking-tight uppercase" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{game.title}</h2>
                <span className="inline-block mt-2 px-3 py-1 bg-neutral-800 text-xs uppercase tracking-[0.2em] text-gray-400 rounded font-mono">
                  {game.difficulty}
                </span>
              </div>
            </div>

            <div className="space-y-8 text-gray-300 font-sans">
              <div>
                <h3 className="text-xs uppercase text-gray-500 mb-2 font-bold tracking-widest border-b border-neutral-800 pb-1">Game Description</h3>
                <p className="text-lg leading-relaxed">{game.description}</p>
              </div>

              <div>
                <h3 className="text-xs uppercase text-gray-500 mb-2 font-bold tracking-widest border-b border-neutral-800 pb-1">Operational Procedure</h3>
                {/* ADD whitespace-pre-line HERE 👇 */}
                <p className="text-md leading-relaxed text-gray-400 whitespace-pre-line">
                  {game.gameplay}
                </p>
              </div>

              <div className="p-5 bg-neutral-950 border-l-4 border-red-600 rounded-r">
                <h3 className="text-xs uppercase text-red-500 mb-2 font-bold tracking-widest">Crucial Detail</h3>
                <p className="italic text-gray-400">{game.twist}</p>
              </div>

              <div>
                <h3 className="text-xs uppercase text-gray-500 mb-3 font-bold tracking-widest border-b border-neutral-800 pb-1">Rules</h3>
                <ul className="space-y-3">
                  {game.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 font-mono">
                      <span className="text-neutral-600 mt-1">▶</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-neutral-800 mt-8 gap-4">
                <span className="text-xs uppercase text-red-600 tracking-wider font-mono">
                  FATAL CONDITION: {game.gameOver}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function AbyssEventPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      const imagePromise = new Promise((resolve) => {
        const img = new Image();
        img.src = "/abyss.png";
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to avoid sticking
      });

      // Wait for both the timer AND the image to be ready
      await Promise.all([imagePromise]);
    };

    loadAssets();
  }, []);

  const handleRegister = () => {
    window.location.href = "https://gdg.community.dev/events/details/google-gdg-ludhiana-presents-gdg-abyss-the-depth-stares-back/?code=NITH";
  };

  return (
    <div
      className="min-h-screen bg-[#030303] text-gray-200 selection:bg-red-900 selection:text-white overflow-x-hidden"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      <Head>
        <title>ABYSS | Borderland</title>
      </Head>

      {/* --- ADDED STYLE TO HIDE THE DARK MODE BUTTON --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .theme-toggle,
        .dark-mode-toggle,
        button[aria-label="Toggle theme"],
        button[aria-label="Switch to dark mode"],
        button[aria-label="Switch to light mode"],
        .mode-toggle {
            display: none !important;
        }
      `}} />

      {/* HERO SECTION - UPDATED FOR MOBILE AND LAPTOP RESPONSIVENESS */}
      <header className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">

        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/abyss.png"
            alt="Post-apocalyptic city"
            className="w-full h-full object-cover object-center"
          />

          {/* UPDATED: Vignettes now use Neutral Black/Transparent instead of Reddish-Black */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                  radial-gradient(ellipse at center, 
                    transparent 25%, 
                    rgba(0, 0, 0, 0.25) 50%, 
                    rgba(0, 0, 0, 0.45) 70%, 
                    rgba(0, 0, 0, 0.65) 85%, 
                    rgba(0, 0, 0, 0.8) 100%
                  )
                `
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `
                  radial-gradient(ellipse 70% 70% at 0% 0%, rgba(0, 0, 0, 0.35) 0%, transparent 45%),
                  radial-gradient(ellipse 70% 70% at 100% 0%, rgba(0, 0, 0, 0.35) 0%, transparent 45%),
                  radial-gradient(ellipse 70% 70% at 0% 100%, rgba(0, 0, 0, 0.45) 0%, transparent 45%),
                  radial-gradient(ellipse 70% 70% at 100% 100%, rgba(0, 0, 0, 0.45) 0%, transparent 45%)
                `
            }}
          />

          {/* Text Readability Overlay - Pure Black Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/25 to-black/35" />

          {/* Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-15 mix-blend-overlay"></div>

          {/* SEAMLESS BLEND OVERLAY */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050505] via-[#030303]/95 to-transparent pointer-events-none" />

          {/* Edge Fades - Pure Black */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black/50 via-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 text-center px-4 flex flex-col items-center">

          {/* Countdown Container */}
          <div className="mb-12">
            <Countdown />
          </div>

          {/* Main Title */}
          <h1 className="flex items-center justify-center tracking-tighter leading-none select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            <span className={`${geizer.className} text-[8rem] md:text-[12rem] lg:text-[16rem] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500`}>
              AB
            </span>
            <span className={`${geizer.className} text-[8rem] md:text-[12rem] lg:text-[16rem] text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]`}>
              Y
            </span>
            <span className={`${geizer.className} text-[8rem] md:text-[12rem] lg:text-[16rem] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500`}>
              SS
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="-mt-2 md:-mt-6 lg:-mt-8 text-sm md:text-base tracking-[0.3em] md:tracking-[0.5em] text-gray-100 font-bold uppercase py-4 px-8"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)'
            }}
          >
            THE DEATH STARES BACK
          </p>

          {/* Register Button */}
          <motion.button
            onClick={handleRegister}
            className="mt-8 px-10 md:px-12 py-3 md:py-4 border-2 border-red-600/80 text-red-500 font-bold text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] bg-black/50 backdrop-blur-md rounded-sm relative overflow-hidden group"
            style={{
              boxShadow: '0 0 25px rgba(180, 30, 30, 0.3), inset 0 1px 0 rgba(255,100,100,0.1)'
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 40px rgba(220, 38, 38, 0.5), 0 0 60px rgba(180, 30, 30, 0.3)'
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            animate={{
              boxShadow: [
                '0 0 25px rgba(180, 30, 30, 0.3), inset 0 1px 0 rgba(255,100,100,0.1)',
                '0 0 35px rgba(220, 38, 38, 0.45), inset 0 1px 0 rgba(255,100,100,0.15)',
                '0 0 25px rgba(180, 30, 30, 0.3), inset 0 1px 0 rgba(255,100,100,0.1)'
              ]
            }}
            //@ts-ignore
            transition2={{
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Hover background fill */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Register Now</span>
          </motion.button>

        </div>
      </header>

      {/* EVENTS GRID SECTION */}
      <main id="games-grid" className="relative z-10 py-20 px-3 md:px-8 lg:px-16 bg-[#030303]">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-400 uppercase tracking-widest">
            <span className="text-red-600">///</span> Active Games
          </h2>
        </motion.div>

        <div className="group/grid grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 max-w-7xl mx-auto">
          {games.map((game, index) => (
            <AnimatedCardWrapper key={game.id} index={index}>
              <div className="w-full [--card-height:360px] md:[--card-height:400px] 
                              transition-all duration-500 ease-out
                              group-hover/grid:opacity-60 hover:!opacity-100
                              hover:z-10 hover:-translate-y-2
                              hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
                <TiltedCard
                  imageSrc={game.image}
                  altText={game.title}
                  captionText={game.title}
                  containerHeight="var(--card-height)"
                  containerWidth="100%"
                  imageHeight="var(--card-height)"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent
                  onClick={() => setSelectedGame(game)}
                  overlayContent={
                    <div
                      className="w-full p-3 md:p-4 rounded-b-[15px] font-sans backdrop-blur-[2px]"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="scale-75 origin-left md:scale-100">
                          <SuitIcon suit={game.suit} />
                        </div>
                        <h3
                          className="text-white font-bold text-sm md:text-xl uppercase tracking-wider truncate"
                          style={{
                            fontFamily: '"Times New Roman", Times, serif',
                            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)'
                          }}
                        >
                          {game.title}
                        </h3>
                      </div>
                      <div className="mt-1 md:mt-2 flex justify-between items-end border-t border-white/10 pt-2">
                        <span
                          className="text-white/70 text-[10px] md:text-xs font-mono uppercase truncate max-w-[70%]"
                          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                        >
                          {game.difficulty}
                        </span>
                        <span
                          className="text-red-500 font-bold text-sm md:text-lg font-mono"
                          style={{ textShadow: '0 0 10px rgba(220, 38, 38, 0.5), 0 2px 4px rgba(0,0,0,0.8)' }}
                        >
                          {game.rank}
                        </span>
                      </div>
                    </div>
                  }
                />
              </div>
            </AnimatedCardWrapper>
          ))}
        </div>
      </main>

      <footer className="py-20 text-center text-neutral-600 text-xs border-t border-neutral-900 bg-black">
        <p className="mb-4 text-red-900/50 tracking-[1em]">GAME OVER</p>
        <p>© 2026 NIT HAMIRPUR CHAPTER - GDG LUDHIANA</p>
      </footer>

      {/* Modal Overlay */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
}