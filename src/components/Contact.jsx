import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative text-white py-24">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 text-xs md:text-sm px-3 py-1 rounded-full border border-white/15 bg-white/5 w-fit">
          <span className="h-2 w-2 rounded-full bg-[#A7F432]" />
          Contact
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Let’s build something strong together
            </h2>
            <p className="mt-3 text-white/70 max-w-xl">
              Share a quick brief and I’ll reply with timeline, budget range,
              and next steps.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Fast Replies",
                  body: "Usually within 24–48 hours.",
                },
                {
                  title: "Clear Scope",
                  body: "We define goals, timeline, and deliverables.",
                },
                {
                  title: "Remote Ready",
                  body: "Flexible for teams worldwide.",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 backdrop-blur"
                >
                  <div className="text-white font-medium">{c.title}</div>
                  <div className="mt-1 text-white/60">{c.body}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:moatazhashad913@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#A7F432] text-black px-5 py-2.5 text-sm font-semibold shadow-[0_10px_24px_rgba(167,244,50,0.2)]"
              >
                Email Me
              </a>
              <a
                href="https://github.com/moatazhashad913-cloud"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          <motion.div
            className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-sm text-white/60">Quick Contact</div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <div className="text-xs text-white/50 uppercase tracking-[0.2em]">
                  Email
                </div>
                <div className="text-white">moatazhashad913@gmail.com</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <div className="text-xs text-white/50 uppercase tracking-[0.2em]">
                  Location
                </div>
                <div className="text-white">Tripoli, Libya · Remote</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <div className="text-xs text-white/50 uppercase tracking-[0.2em]">
                  Availability
                </div>
                <div className="text-white">Open for new work</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
