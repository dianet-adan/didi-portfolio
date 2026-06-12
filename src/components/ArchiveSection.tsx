"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { folders } from "@/lib/projects";
import FolderCard from "./FolderCard";

export default function ArchiveSection() {
  return (
    <section id="archive" className="relative px-5 md:px-10 pt-24 md:pt-32 pb-10 md:pb-14 bg-cream grid-paper">
      {/* horizontal text zone, top */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 rotate-1 shadow-[2px_2px_0_var(--ink)] mb-6">
          The Archive
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] uppercase">
          Selected work. Sorted by{" "}
          <span className="font-serif-italic text-blue normal-case">
            thinking
          </span>
        </h2>
        <p className="mt-5 text-lg text-ink/70 max-w-2xl mx-auto">
          A curated archive of digital products, brand systems and campaign
          work. Open each folder to explore the ideas, process and decisions
          behind the projects.
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-sm md:text-base border-2 border-ink rounded-full px-6 py-3 bg-yellow shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--ink)] transition-all"
        >
          View all projects <span aria-hidden="true">&rarr;</span>
        </Link>
      </motion.div>

      {/* folders side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-16 max-w-7xl mx-auto mt-8 md:mt-10 items-start">
        {folders.map((folder, i) => (
          <div
            key={folder.id}
            className={`relative hover:z-20 sm:-mx-10 lg:-mx-20 ${i === 1 ? "sm:mt-12" : ""}`}
          >
            <FolderCard folder={folder} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
