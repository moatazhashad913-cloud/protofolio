import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navItems = ["About", "Projects", "Skills", "Contact"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  const idMap = {
    About: "about",
    Projects: "projects",
    Skills: "skills",
    Contact: "contact",
  };

  function handleNav(item, idx) {
    setActiveIndex(idx);
    const id = idMap[item];
    if (id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: isMobile ? "auto" : "smooth", block: "start" });
    }
    if (item === "About") {
      window.scrollTo({ top: 0, behavior: isMobile ? "auto" : "smooth" });
    }
  }

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(idMap[item]))
      .filter(Boolean);

    if (!sections.length) return;

    const getActiveIndex = () => {
      const offset = 120; // roughly navbar height + spacing
      let bestIdx = 0;
      let bestTop = -Infinity;

      sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top - offset;
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          const idx = navItems.findIndex((item) => idMap[item] === sec.id);
          if (idx >= 0) bestIdx = idx;
        }
      });

      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (scrolledToBottom) {
        bestIdx = navItems.findIndex((item) => item === "Contact");
      }

      setActiveIndex(bestIdx);
    };

    const onScroll = () => {
      window.requestAnimationFrame(getActiveIndex);
    };

    getActiveIndex();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [navItems]);

  const navMotionProps = isMobile
    ? { initial: false, animate: false }
    : {
        initial: { y: -60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, type: "spring", stiffness: 140 },
      };

  return (
    <motion.nav
      {...navMotionProps}
      className="fixed top-4 left-4 right-4 z-50"
      aria-label="Main navigation"
    >
      <div
        className={`mx-auto max-w-5xl px-4 py-3 flex items-center justify-between rounded-3xl transition-all duration-300 border border-white/10 bg-black/60 backdrop-blur
          ${scrolled ? "shadow-[0_14px_40px_rgba(0,0,0,0.45)]" : "shadow-[0_6px_20px_rgba(0,0,0,0.25)]"}`}
      >
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Moataz Hashad logo"
            className="h-8 w-8 rounded-full object-cover border border-white/10"
          />
          <span className="text-white font-semibold text-sm md:text-lg tracking-wide">
            Moataz
          </span>
        </div>

        <ul className="hidden md:flex gap-6 text-white/80 font-medium text-sm md:text-base relative">
          {navItems.map((item, idx) => (
            <motion.li key={idx} className="cursor-pointer relative">
              <button
                onClick={() => handleNav(item, idx)}
                className={`relative z-10 px-3 py-1 rounded-lg transition-colors duration-200 ${
                  activeIndex === idx
                    ? "text-black"
                    : "text-white/80 hover:bg-white/10"
                }`}
                aria-current={activeIndex === idx ? "page" : undefined}
              >
                {item}
              </button>

              {activeIndex === idx && (
                <motion.span
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-[#A7F432] rounded-lg z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                />
              )}
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={isMobile ? undefined : { scale: 1.03 }}
            whileTap={isMobile ? undefined : { scale: 0.98 }}
            transition={isMobile ? undefined : { duration: 0.18 }}
            className="hidden md:inline-flex text-sm bg-[#A7F432] text-black px-4 md:px-6 py-1.5 md:py-2 rounded-2xl font-semibold shadow-[0_10px_24px_rgba(167,244,50,0.2)]"
          >
            Get In Touch
          </motion.a>

          <button
            className="md:hidden p-2 rounded-md bg-white/10 border border-white/15"
            onClick={() => setMobileOpen((s) => !s)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobile ? (
        mobileOpen ? (
          <div className="md:hidden mt-2 mx-auto max-w-3xl px-4">
            <div className="bg-black/80 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 text-white font-medium shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur">
              {navItems.map((it, i) => (
                <button
                  key={i}
                  className={`text-left py-2 px-3 rounded-md ${
                    i === activeIndex ? "bg-[#A7F432] text-black" : ""
                  }`}
                  onClick={() => {
                    handleNav(it, i);
                    setMobileOpen(false);
                  }}
                >
                  {it}
                </button>
              ))}
              <a
                href="#contact"
                className="mt-1 inline-block text-center bg-[#A7F432] text-black px-4 py-2 rounded-lg font-semibold shadow-[0_10px_24px_rgba(167,244,50,0.2)]"
              >
                Get In Touch
              </a>
            </div>
          </div>
        ) : null
      ) : (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="md:hidden mt-2 mx-auto max-w-3xl px-4"
            >
              <motion.div
                className="bg-black/80 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 text-white font-medium shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {navItems.map((it, i) => (
                  <motion.button
                    key={i}
                    className={`text-left py-2 px-3 rounded-md transition-colors duration-150 ${
                      i === activeIndex ? "bg-[#A7F432] text-black" : "hover:bg-white/10"
                    }`}
                    onClick={() => {
                      handleNav(it, i);
                      setMobileOpen(false);
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {it}
                  </motion.button>
                ))}
                <a
                  href="#contact"
                  className="mt-1 inline-block text-center bg-[#A7F432] text-black px-4 py-2 rounded-lg font-semibold shadow-[0_10px_24px_rgba(167,244,50,0.2)]"
                >
                  Get In Touch
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.nav>
  );
}
