"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { folders } from "@/lib/projects";

const categoryLabel: Record<string, string> = {
  uxui: "UX/UI",
  branding: "Branding",
  advertising: "Advertising",
};

const featured = folders.map((folder) => folder.projects[0]);

export default function SelectedWork() {
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
          A peek inside
        </span>
        <h2 className="font-display text-5xl md:text-7xl leading-[0.95] uppercase">
          One file from
          <br />
          <span className="font-serif-italic text-red normal-case">
            each
          </span>{" "}
          folder.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featured.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: project.rotate }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group block bg-cream border border-ink/10 rounded-sm shadow-[6px_8px_0_rgba(34,28,20,0.15)] hover:shadow-[10px_14px_0_rgba(34,28,20,0.18)] transition-shadow overflow-hidden"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 bg-paper border border-ink/10 text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                  {categoryLabel[project.category]}
                </span>
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-display text-2xl md:text-3xl leading-none">
                  {project.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-xs md:text-sm border-b-2 border-ink pb-0.5 group-hover:gap-3 transition-all">
                  View case study <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
