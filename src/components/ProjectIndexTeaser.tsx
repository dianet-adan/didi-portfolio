"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";

const names = projects.map((p) => p.title);

export default function ProjectIndexTeaser() {
  return (
    <section className="relative bg-paper grid-paper border-y-2 border-ink/10 py-14 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="px-5 md:px-10 max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <span className="inline-block self-start font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-cream border-2 border-ink rounded-full px-4 py-1.5 -rotate-1 shadow-[2px_2px_0_var(--ink)]">
          Project index
        </span>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 self-start font-body font-extrabold uppercase tracking-widest text-sm md:text-base border-2 border-ink rounded-full px-6 py-3 bg-yellow shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--ink)] transition-all"
        >
          Browse all six files <span aria-hidden="true">&rarr;</span>
        </Link>
      </motion.div>

      {/* scrolling ticker of project names */}
      <Link href="/projects" aria-label="View all projects" className="group block">
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex flex-shrink-0"
          >
            {[0, 1].map((copy) => (
              <span key={copy} aria-hidden={copy === 1} className="flex">
                {names.map((name) => (
                  <span
                    key={`${copy}-${name}`}
                    className="font-display uppercase leading-none text-5xl md:text-7xl text-ink/80 group-hover:text-red transition-colors flex items-center"
                  >
                    <span className="px-4 md:px-6">{name}</span>
                    <span className="text-2xl md:text-4xl text-yellow drop-shadow-[1px_1px_0_var(--ink)]">
                      &#9733;
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </Link>
    </section>
  );
}
