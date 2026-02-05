import React from "react";
import { motion } from "framer-motion";

export default function ProjectDetails({ project, onBack }) {
  if (!project) return null;

  function goBack() {
    if (window.history && window.history.length > 1) {
      window.history.back();
      return;
    }
    if (onBack) onBack();
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.5 }}
      id={`projects/${project.id}`}
      className="min-h-screen text-white py-16 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-6">
          <button
            onClick={goBack}
            className="text-sm text-white/70 hover:text-white"
          >
            ← Back
          </button>
        </div>

        <motion.h1
          className="text-3xl font-bold"
          initial={{ x: -8, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.36 }}
        >
          {project.title}
        </motion.h1>
        <motion.p
          className="mt-2 text-white/70 max-w-3xl"
          initial={{ x: -6, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.36, delay: 0.06 }}
        >
          {project.desc}
        </motion.p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {project.images && project.images.length > 0 ? (
              project.images.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`${project.title} ${i}`}
                  className="w-full rounded-2xl border border-white/10 object-cover"
                  initial={{ scale: 0.98, opacity: 0.85 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                />
              ))
            ) : (
              <div className="h-48 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-white/50">
                No images
              </div>
            )}
          </div>

          <div>
            {project.video ? (
              <motion.video
                controls
                src={project.video}
                className="w-full rounded-2xl border border-white/10 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            ) : (
              <div className="h-48 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-white/50">
                No video
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3 items-center">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-[#A7F432] text-black font-semibold"
                >
                  Repository
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition-colors"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
