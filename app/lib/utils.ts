import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smoothScrollTo(elementId: string, duration: number = 1000) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const start = window.scrollY;
  const target = element.getBoundingClientRect().top + window.scrollY;
  const distance = target - start;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const scroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
}
