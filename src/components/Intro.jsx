import React, { useEffect, useRef } from "react";

export default function Intro({ onFinish = () => {} }) {
  const doneRef = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const totalMs = prefersReduced ? 0 : 1600;
    const timer = setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      onFinish();
    }, totalMs);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black intro-wrap">
      {/* background shapes */}
      <div className="absolute left-1/3 top-1/3 w-28 h-28 rounded-lg bg-white/5 -z-10" />
      <div className="absolute right-1/3 top-1/4 w-24 h-24 rounded-lg bg-white/5 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(167,244,50,0.15),_transparent_55%)] -z-20" />

      <div className="relative z-20 text-center px-6">
        <div className="inline-flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-[#A7F432]/20 blur-2xl" />
            <div
              aria-hidden
              className="relative h-28 w-28 md:h-36 md:w-36 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center overflow-hidden intro-circle"
            >
              <img
                src="/logo.jpg"
                alt="Logo"
                className="intro-letter h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
                decoding="async"
              />
            </div>
          </div>

          <div
            className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] intro-name"
          >
            Moataz Hashad
          </div>
        </div>

        {/* keep it for GSAP, but empty */}
        <div />
      </div>
    </div>
  );
}
