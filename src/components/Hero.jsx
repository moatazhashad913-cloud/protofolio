import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Shuffle from "./Shuffle";

const LazyThreadsBackground = React.lazy(() => import("./ThreadsBackground"));

const stats = [
  { label: "Years", value: "3+" },
  { label: "Projects", value: "18+" },
  { label: "Clients", value: "10+" },
];

const tech = [
  "React",
  "Laravel",
  "APIs",
  "Node.js",
  "PostgreSQL",
  "AWS",
];

export default function Hero({
  showBackground = true,
  onBackgroundReady,
  scrollReady = true,
}) {
  return (
    <section
      id="about"
      className="relative min-h-screen px-6 pt-28 pb-16 text-white overflow-hidden"
    >
      <Suspense fallback={null}>
        {showBackground ? (
          <LazyThreadsBackground onReady={onBackgroundReady} />
        ) : null}
      </Suspense>

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <motion.div
            className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#A7F432]" />
            Available for new projects
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            <Shuffle
              text="MOATAZ HASHAD"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover
              respectReducedMotion={true}
              loop={false}
              loopDelay={0}
              tag="h1"
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
              enabled={scrollReady}
            />
          </motion.div>

          <motion.p
            className="mt-5 text-lg md:text-xl text-white/70 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Software Engineer focused on crafting resilient web systems, clean
            UX, and measurable business outcomes.
          </motion.p>

          <motion.div
            className="mt-4 flex items-center gap-2 text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </span>
            Tripoli, Libya · Remote worldwide
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-[#A7F432] text-black px-5 py-2.5 text-sm font-semibold shadow-[0_10px_25px_rgba(167,244,50,0.18)]"
            >
              Explore Work
              <span className="text-base">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-white/80"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="absolute -inset-8 bg-gradient-to-br from-[#A7F432]/30 via-transparent to-white/10 blur-3xl" />

          <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary via-black to-black p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(167,244,50,0.35),_transparent_60%)]" />
              <img
                src="/logo.jpg"
                alt="Moataz Hashad logo"
                className="relative h-24 w-24 md:h-28 md:w-28 rounded-2xl object-cover shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
              />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-black/40 p-3 text-center"
                >
                  <div className="text-lg font-semibold text-white">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
