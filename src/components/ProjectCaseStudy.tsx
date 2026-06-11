"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project, folders } from "@/lib/projects";

const categoryLabel: Record<Project["category"], string> = {
  uxui: "UX/UI",
  branding: "Branding",
  advertising: "Advertising",
};

const categoryColor: Record<Project["category"], string> = {
  uxui: "bg-yellow text-ink",
  branding: "bg-red text-paper",
  advertising: "bg-blue text-paper",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const folder = folders.find((f) => f.id === project.category);

  return (
    <section className="relative grid-paper px-5 md:px-10 pt-32 pb-24 md:pb-32 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <Link
          href="/#archive"
          className="inline-flex items-center gap-2 font-body font-bold text-sm uppercase tracking-widest border-b-2 border-ink/40 pb-0.5 hover:border-ink transition-colors"
        >
          &larr; Back to archive
        </Link>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 -rotate-2 rounded-full border-2 border-ink px-4 py-1.5 font-body text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] shadow-[3px_3px_0_var(--ink)] mt-8 ${categoryColor[project.category]}`}
        >
          {folder?.number} &middot; {categoryLabel[project.category]}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display uppercase leading-[0.9] mt-6 text-[16vw] sm:text-[12vw] md:text-[8vw]"
        >
          {project.title}
        </motion.h1>

        {project.type && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif-italic text-2xl md:text-4xl text-red mt-2"
          >
            {project.type}
          </motion.p>
        )}

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-3 text-sm md:text-base font-bold uppercase tracking-wide text-ink/60 max-w-2xl"
        >
          {project.role}
        </motion.p>

        {/* cover image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative w-full aspect-[16/10] mt-12 -rotate-1 shadow-[10px_14px_0_rgba(34,28,20,0.15)]"
        >
          <div className="relative w-full h-full overflow-hidden rounded-sm border border-ink/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* brief */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-lg md:text-xl text-ink/80 max-w-3xl"
        >
          {project.brief}
        </motion.p>

        {project.collaboration && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-base md:text-lg italic text-ink/60 max-w-3xl font-serif-italic"
          >
            {project.collaboration}
          </motion.p>
        )}

        {/* gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-14">
            {project.gallery.map((src, i) => (
              <motion.div
                key={src}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 bg-paper"
              >
                <Image
                  src={src}
                  alt={`${project.title} detail`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* tags */}
        <div className="flex flex-wrap gap-2 mt-14">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] md:text-xs font-bold uppercase tracking-wide border border-ink/20 rounded-full px-3 py-1.5 text-ink/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
