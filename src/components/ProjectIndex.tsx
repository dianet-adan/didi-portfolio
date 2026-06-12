"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects, Project } from "@/lib/projects";

const categoryPillHover: Record<Project["category"], string> = {
  uxui: "group-hover:bg-yellow group-hover:text-ink group-hover:border-yellow",
  branding: "group-hover:bg-red group-hover:text-paper group-hover:border-red",
  advertising: "group-hover:bg-blue group-hover:text-paper group-hover:border-blue",
};

const indexItems = [
  { slug: "ascendone", pill: "UX/UI · SaaS Platform" },
  { slug: "kiddo", pill: "UX/UI · Mobile App" },
  { slug: "visionary", pill: "Branding · Premium Eyewear" },
  { slug: "rebel-owners", pill: "Branding · Pet Lifestyle" },
  { slug: "beyond-meat", pill: "Advertising · Campaign Design" },
  { slug: "toblerone", pill: "Advertising · Brand Communication" },
].map((item) => ({
  ...item,
  project: projects.find((p) => p.slug === item.slug)!,
}));

export default function ProjectIndex() {
  const [hovered, setHovered] = useState<string | null>(null);
  const previewItem = indexItems.find((item) => item.slug === hovered);

  return (
    <section className="relative px-5 md:px-10 py-24 md:py-32 bg-paper grid-paper overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mb-14 md:mb-20"
      >
        <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-cream border-2 border-ink rounded-full px-4 py-1.5 -rotate-1 shadow-[2px_2px_0_var(--ink)] mb-6">
          Project index
        </span>
        <h2 className="font-display text-5xl md:text-7xl leading-[0.95] uppercase">
          Six files.
          <br />
          <span className="font-serif-italic text-red normal-case">Selected</span> works.
        </h2>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <div className="border-t-2 border-ink/15">
          {indexItems.map((item, i) => {
            const { project } = item;
            return (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  onMouseEnter={() => setHovered(item.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 border-b-2 border-ink/15 py-6 md:py-9 px-2 -mx-2 md:px-4 md:-mx-4 transition-colors duration-300 hover:bg-cream/70"
                >
                  <div className="flex items-center gap-4 md:gap-8 min-w-0">
                    <span className="font-body font-bold text-xs md:text-sm text-ink/40 tabular-nums flex-shrink-0">
                      0{i + 1}
                    </span>
                    <h3 className="font-display uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] transition-all duration-300 group-hover:translate-x-3 md:group-hover:translate-x-6 group-hover:text-red">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-6 flex-shrink-0 pl-12 sm:pl-0">
                    <span
                      className={`font-body font-extrabold text-[10px] md:text-xs uppercase tracking-[0.2em] border-2 border-ink rounded-full px-3 py-1.5 bg-paper transition-colors duration-300 ${categoryPillHover[project.category]}`}
                    >
                      {item.pill}
                    </span>
                    <span className="text-2xl md:text-3xl transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1.5">
                      &#8599;
                    </span>
                  </div>

                  {/* mobile inline preview */}
                  <div className="relative w-full aspect-[16/9] sm:hidden rounded-sm overflow-hidden border border-ink/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* floating preview, follows hovered row */}
      <div className="hidden lg:block pointer-events-none fixed top-1/2 right-10 -translate-y-1/2 w-72 h-96 z-30">
        <AnimatePresence mode="wait">
          {previewItem && (
            <motion.div
              key={previewItem.slug}
              initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              exit={{ opacity: 0, scale: 0.9, rotate: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full h-full rounded-sm overflow-hidden border-2 border-ink bg-cream shadow-[12px_16px_0_rgba(34,28,20,0.2)]"
            >
              <Image
                src={previewItem.project.image}
                alt={previewItem.project.title}
                fill
                sizes="320px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
