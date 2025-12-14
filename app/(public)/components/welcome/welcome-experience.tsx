"use client";

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useShowOncePerTab } from "./utils";

const STORAGE_KEY = "psoc-welcome-shown";
const DISPLAY_MS = 900;

const GREETINGS: Array<{ text: string; locale: string }> = [
  { text: "Hello", locale: "English" },
  { text: "Namaste", locale: "Hindi" },
  { text: "Konnichiwa", locale: "Japanese" },
];

export default function WelcomeExperience({ children }: PropsWithChildren) {
  const shouldAnimate = useShowOncePerTab("psoc-welcome-shown");

  const [renderOverlay, setRenderOverlay] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldAnimate) return;
    const referrer = document.referrer;
    let isInternalNavigation = false;

    if (referrer) {
      try {
        const referrerUrl = new URL(referrer);
        isInternalNavigation = referrerUrl.origin === window.location.origin;
      } catch (error) {}
    }

    if (isInternalNavigation) {
      return;
    }

    setRenderOverlay(true);
    setVisible(true);
    setActiveIndex(0);

    let index = 0;
    const stepTimer = window.setInterval(() => {
      index += 1;
      if (index < GREETINGS.length) {
        setActiveIndex(index);
      } else {
        window.clearInterval(stepTimer);
      }
    }, DISPLAY_MS);

    const totalDuration = GREETINGS.length * DISPLAY_MS + 500;
    const exitTimer = window.setTimeout(() => {
      setVisible(false);
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch (error) {}
    }, totalDuration);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(exitTimer);
    };
  }, [shouldAnimate]);

  useEffect(() => {
    if (!renderOverlay || visible) return;
    const timeout = window.setTimeout(() => {
      setRenderOverlay(false);
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [renderOverlay, visible]);

  const activeGreeting = useMemo(
    () => GREETINGS[activeIndex] ?? GREETINGS[0],
    [activeIndex]
  );

  return (
    <div className="relative">
      {renderOverlay && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={!visible}
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(91,147,100,0.6),rgba(16,20,24,0.95))]" />
          <div className="absolute inset-0 -z-20 bg-black" />
          <div className="flex flex-col items-center gap-6 text-center text-white">
            <span className="tracking-[0.65em] text-xs uppercase text-white/70">
              Welcome
            </span>
            <h1 className="text-5xl font-light italic drop-shadow-sm sm:text-6xl md:text-7xl lg:text-8xl">
              {activeGreeting?.text}
            </h1>
            <span className="text-sm uppercase tracking-[0.4em] text-white/60">
              {activeGreeting?.locale}
            </span>
          </div>
        </div>
      )}

      <div
        className={`transition-opacity duration-700 ${renderOverlay && visible ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </div>
    </div>
  );
}
