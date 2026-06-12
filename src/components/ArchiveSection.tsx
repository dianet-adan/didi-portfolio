"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { folders } from "@/lib/projects";
import FolderCard from "./FolderCard";

export default function ArchiveSection() {
  return (
    <section id="archive" className="relative px-5 md:px-10 py-24 md:py-32 bg-cream grid-paper">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
        {/* text zone, left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4"
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
            platforms, mobile apps, brand systems and digital campaigns. Click a
            folder to step inside.
          </p>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-sm md:text-base border-2 border-ink rounded-full px-6 py-3 bg-paper shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--ink)] transition-all"
          >
            View all projects <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>

        {/* folders zone, right */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 pt-6">
          {folders.map((folder, i) => (
            <div key={folder.id} className={i === 2 ? "sm:col-span-2 sm:max-w-[calc(50%-1rem)] sm:mx-auto sm:w-full" : ""}>
              <FolderCard folder={folder} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
