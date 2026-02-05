"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Instagram, Twitter, Github } from "lucide-react";
import TapeSection from "./home/sections/TapeSection";
import { ApplicationInfo } from "./logo";
import { smoothScrollTo } from "@/app/lib/utils";


const lists = {
  "ABOUT US": [
    { title: "Home", anchorId: "home" },
    { title: "Team", anchorId: "team" },
    { title: "Events", anchorId: "events" },
  ],
  "GET INVOLVED": [
    { title: "GitHub", link: "https://github.com/GDSC-NITH" },
    { title: "Instagram", link: "https://www.instagram.com/nith_gdgl?igsh=MXNkODU4bGh1eGo1NQ==" },
    { title: "Our Projects", link: "/coming-soon" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  const handleFooterNavClick = (item: any) => {
    if (item.anchorId) {
      // About Us links with anchor IDs
      if (pathname === "/") {
        // On home page - smooth scroll
        smoothScrollTo(item.anchorId, 600);
      } else {
        // Not on home page - navigate to home then scroll
        window.location.href = "/?section=" + item.anchorId;
      }
    }
  };

  const footerScale = useTransform(scrollYProgress, [0.9, 1], [0.95, 1]);
  const footerOpacity = useTransform(scrollYProgress, [0.9, 0.98], [0, 1]);

  return (
    <>
      <div className="h-px md:h-screen -z-1" /> {/* Reduced spacer on mobile since footer is static */}

      <footer
        className="relative md:fixed z-0 bottom-0 left-0 w-full h-auto md:h-[400px] text-foreground flex flex-col justify-end"
      >
        <motion.div
          style={{ scale: footerScale, opacity: footerOpacity }}
          className="bg-neutral-50/50 dark:bg-black/40 border-t border-neutral-200 dark:border-white/5 pt-10 pb-8 px-6 md:pt-16 md:px-8"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">

            {/* Branding Column */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <Link href="/" className="group flex items-center gap-4 w-fit">
                <div className="relative w-10 h-8">

                </div>


                <div className="flex flex-col">
                  <ApplicationInfo />
                </div>
              </Link>

              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-light">
                Community of student developers at NIT Hamirpur. Affiliated with GDG Ludhiana.
              </p>

              {/* SOCIAL BUTTONS with Hover Effects */}
              <div className="flex gap-4">
                {[
                  { Icon: Linkedin, href: "https://www.linkedin.com/company/dsc-nit-hamirpur/" },
                  { Icon: Instagram, href: "https://www.instagram.com/nith_gdgl?igsh=MXNkODU4bGh1eGo1NQ==" },
                  { Icon: Github, href: "https://github.com/GDSC-NITH" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl border border-neutral-200 dark:border-white/5 text-muted-foreground hover:text-[#4285F4] hover:border-[#4285F4]/30 hover:bg-white dark:hover:bg-neutral-800 transition-all shadow-sm"
                  >
                    <social.Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Column */}
            <div className="md:col-span-7 grid grid-cols-2 gap-8 md:ml-auto">
              {Object.entries(lists).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-4">
                  <span className="text-muted-foreground text-[10px] tracking-[0.4em] font-black uppercase opacity-50">{key}</span>
                  <ul className="flex flex-col gap-3">
                    {value.map((item: any) => {
                      // Check if it's an ABOUT US item (with anchorId) or GET INVOLVED item (with link)
                      if (item.anchorId) {
                        return (
                          <li key={item.title}>
                            <button
                              onClick={() => handleFooterNavClick(item)}
                              className="text-foreground/70 text-xs font-light hover:text-[#4285F4] transition-all hover:pl-1 inline-block cursor-pointer bg-none border-none p-0"
                            >
                              {item.title}
                            </button>
                          </li>
                        );
                      } else {
                        return (
                          <li key={item.title}>
                            <Link
                              href={item.link}
                              className="text-foreground/70 text-xs font-light hover:text-[#4285F4] transition-all hover:pl-1 inline-block"
                            >
                              {item.title}
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar Links */}

          <TapeSection />
        </motion.div>
      </footer>
  </>
  );
}