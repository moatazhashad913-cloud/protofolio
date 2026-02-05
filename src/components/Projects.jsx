import React from "react";
import { motion } from "framer-motion";
import projects from "../data/projects.js";

export default function Projects({ onSelect }) {
  return (
    <section id="projects" className="relative text-white py-20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Selected Projects</h2>
        <p className="mt-2 text-white/70 max-w-2xl">
          Handpicked work emphasizing design, performance, and clarity.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.article
              key={p.title}
              className="rounded-3xl bg-white/5 border border-white/10 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.18 }}
            >
              <div className="h-40 rounded-2xl bg-black/40 mb-4 flex items-center justify-center border border-white/10">
                <div className="text-white/45 text-sm">Preview</div>
              </div>
              <h3 className="font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-white/65">{p.desc}</p>

              <div className="mt-4 flex items-center gap-3">
                <motion.button
                  onClick={() => {
                    try {
                      window.history.pushState(
                        { projectId: p.id },
                        "",
                        `/projects/${p.id}`
                      );
                    } catch (e) {}
                    onSelect && onSelect(p);
                  }}
                  className="text-sm px-3 py-1 rounded-full bg-[#A7F432] text-black font-semibold"
                  whileHover={{ scale: 1.03 }}
                  style={{ boxShadow: "0 10px 24px rgba(167,244,50,0.18)" }}
                >
                  View
                </motion.button>
                <span className="text-sm text-white/40">•</span>
                <span className="text-xs text-white/50">Design • Frontend</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
