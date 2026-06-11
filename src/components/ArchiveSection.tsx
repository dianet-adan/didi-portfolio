"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { folders } from "@/lib/projects";
import FolderCard from "./FolderCard";
import ProjectDocument from "./ProjectDocument";

export default function ArchiveSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openFolder = folders.find((f) => f.id === openId);

  return (
    <section id="archive" className="relative px-5 md:px-10 py-24 md:py-32 bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mb-16 md:mb-24"
      >
        <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 rotate-1 shadow-[2px_2px_0_var(--ink)] mb-6">
          The Archive
        </span>
        <h2 className="font-display text-5xl md:text-7xl leading-[0.95] uppercase">
          Three folders.
          <br />
          <span className="font-serif-italic text-blue normal-case">
            Selected
          </span>{" "}
          works.
        </h2>
        <p className="mt-5 text-lg text-ink/70 max-w-xl">
          This portfolio brings together selected projects across SaaS
          platforms, mobile apps, brand systems and digital campaigns. Open a
          folder to pull out the files.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 max-w-6xl mx-auto pt-6">
        {folders.map((folder, i) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            index={i}
            isOpen={openId === folder.id}
            dimmed={openId !== null && openId !== folder.id}
            onClick={() => setOpenId(openId === folder.id ? null : folder.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {openFolder && (
          <motion.div
            key={openFolder.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 pt-20 md:pt-28 pb-4">
              {openFolder.projects.map((project, idx) => (
                <ProjectDocument key={project.slug} project={project} index={idx} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
