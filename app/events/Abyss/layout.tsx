"use client";

import { useEffect } from "react";

export default function AbyssLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Find and hide the navbar
        const navbar = document.querySelector('.fixed.inset-x-0.top-5') as HTMLElement;
        if (navbar) {
            navbar.style.display = 'none';
        }

        // Also try to find by z-index pattern
        const allFixed = document.querySelectorAll('[class*="fixed"][class*="z-40"]') as NodeListOf<HTMLElement>;
        allFixed.forEach((el) => {
            el.style.display = 'none';
        });

        // Cleanup - restore navbar when leaving the page
        return () => {
            if (navbar) {
                navbar.style.display = '';
            }
            allFixed.forEach((el) => {
                el.style.display = '';
            });
        };
    }, []);

    return (
        <div className="abyss-layout">
            <style jsx global>{`
        /* Fallback CSS to hide navbar */
        .fixed.inset-x-0.top-5.z-40.w-full {
          display: none !important;
        }
      `}</style>
            {children}
        </div>
    );
}
