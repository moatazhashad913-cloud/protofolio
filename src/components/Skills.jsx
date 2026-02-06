import React from "react";
import { motion } from "framer-motion";
import {
  SiBootstrap,
  SiCss3,
  SiDocker,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostman,
  SiPython,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

const skills = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Java", icon: FaJava },
  { name: "Python", icon: SiPython },
  { name: "Laravel", icon: SiLaravel },
  { name: "React", icon: SiReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Bootstrap", icon: SiBootstrap },
  { name: "Swing", icon: FaJava },
  { name: "Postman", icon: SiPostman },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Git", icon: SiGit },
  { name: "REST APIs", icon: SiOpenapiinitiative },
  { name: "SQL", icon: SiMysql },
  { name: "Docker", icon: SiDocker },
  { name: "Figma", icon: SiFigma },
];

export default function Skills() {
  const gridVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section id="skills" className="relative text-white py-20 lazy-section">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Skills</h2>
        <p className="mt-2 text-white/70 max-w-2xl">
          A quick overview of tools and strengths.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Frontend Craft",
              body: "Clean UI systems with fast, accessible interactions.",
            },
            {
              title: "Backend Reliability",
              body: "Solid APIs, predictable performance, and clean data flow.",
            },
            {
              title: "Product Mindset",
              body: "Focus on outcomes and measurable impact.",
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

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          variants={gridVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((s) => (
            <motion.span
              key={s.name}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-white/85 backdrop-blur"
              variants={itemVariant}
              whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
            >
              <s.icon className="h-4 w-4" aria-hidden="true" />
              {s.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
