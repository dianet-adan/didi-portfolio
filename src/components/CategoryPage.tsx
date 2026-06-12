"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FolderData } from "@/lib/projects";
import ProjectDocument from "./ProjectDocument";

export default function CategoryPage({ folder }: { folder: FolderData }) {
  return (
    <section className="relative grid-paper px-5 md:px-10 pt-32 pb-24 md:pb-32 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-display font-normal text-sm uppercase tracking-widest border-b-2 border-ink/40 pb-0.5 hover:border-ink transition-colors"
        >
          &larr; All projects
        </Link>

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

        {/* opened folder composition: documents inside */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 mt-20 md:mt-28">
          {folder.projects.map((project, idx) => (
            <ProjectDocument key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
