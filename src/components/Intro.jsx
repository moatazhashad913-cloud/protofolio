import React, { useEffect, useRef } from "react";

export default function Intro({ onFinish = () => {} }) {
  const circleRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const gsap = window?.gsap;
    if (!gsap) {
      const t = setTimeout(() => { if (mounted) onFinish(); }, 800);
      return () => { mounted = false; clearTimeout(t); };
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    gsap.set(circleRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 20,
    });
    gsap.set(nameRef.current, { opacity: 0, y: 6 });

    tl.fromTo(
      circleRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "back.out(1.2)",
      }
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.35 },
        "-=0.18"
      )
      .to({}, { duration: 0.25 })
      .to(nameRef.current, { opacity: 0, y: -6, duration: 0.18 })
      .to(circleRef.current, {
        scale: 14,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      });

    tl.eventCallback("onComplete", () => {
      if (mounted) onFinish();
    });

    return () => {
      mounted = false;
      tl.kill();
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
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
              ref={circleRef}
              className="relative h-28 w-28 md:h-36 md:w-36 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center overflow-hidden"
            >
              <img
                src="/logo.jpg"
                alt="Logo"
                className="intro-letter h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
              />
            </div>
          </div>

          <div
            ref={nameRef}
            className="text-white/80 text-xs md:text-sm uppercase tracking-[0.3em]"
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
