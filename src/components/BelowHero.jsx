import React from "react";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BelowHero() {
  return (
    <section className="relative text-white py-24 lazy-section">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 text-xs md:text-sm px-3 py-1 rounded-full border border-white/15 bg-white/5 w-fit">
          <span className="h-2 w-2 rounded-full bg-[#A7F432]" />
          Why work with me
        </div>

        <h3 className="mt-6 text-2xl md:text-3xl font-semibold">
          A focused approach that blends design and engineering
        </h3>
        <p className="mt-3 text-white/70 max-w-3xl">
          A clean, minimal aesthetic with strong structure and measurable
          results. Every detail is intentional.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Strategy",
              body: "Align the product vision with user needs and business goals.",
            },
            {
              title: "Execution",
              body: "Ship polished interfaces with reliable, scalable code.",
            },
            {
              title: "Impact",
              body: "Deliver outcomes you can measure and build on.",
            },
          ].map((c, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.18 }}
            >
              <h4 className="font-medium text-white">{c.title}</h4>
              <p className="text-sm text-white/65 mt-2">{c.body}</p>
              <div className="mt-4 h-0.5 bg-white/10 rounded">
                <div className="h-0.5 w-10 bg-[#A7F432] rounded" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
