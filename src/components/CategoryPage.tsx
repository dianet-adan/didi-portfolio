"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FolderData } from "@/lib/projects";
import ProjectIndex from "./ProjectIndex";

export default function CategoryPage({ folder }: { folder: FolderData }) {
  return (
    <section className="relative grid-paper pt-32 pb-24 md:pb-32 overflow-hidden">
      <div className="px-5 md:px-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-display font-normal text-base md:text-lg uppercase tracking-widest border-2 border-ink rounded-full px-7 py-3.5 bg-paper shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
        >
          &larr; All projects
        </Link>

        {/* 32px fixed gap between back button and folder badge */}
        <div className="mt-8" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 -rotate-2 rounded-full border-2 border-ink px-4 py-1.5 font-display text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] shadow-[3px_3px_0_var(--ink)] mt-8"
          style={{ background: folder.color, color: folder.textColor }}
        >
          {folder.number}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="type-section mt-6"
        >
          {folder.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 type-body text-ink/70"
        >
          {folder.intro}
        </motion.p>
      </div>

      {/* same full-bleed index rows used across the site, filtered to this discipline */}
      <ProjectIndex showHeading={false} bare category={folder.id} />
    </section>
  );
}
