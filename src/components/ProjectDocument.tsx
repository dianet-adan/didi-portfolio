"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/lib/projects";

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

export default function ProjectDocument({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotate: project.rotate, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.02, y: -8, zIndex: 20 }}
      className="group relative w-full bg-paper border border-ink/10 rounded-sm shadow-[6px_8px_0_rgba(34,28,20,0.15)] hover:shadow-[10px_14px_0_rgba(34,28,20,0.18)] transition-shadow"
    >
      {/* paperclip / pin */}
      <span className="absolute -top-4 left-6 text-2xl -rotate-12 select-none">
        📎
      </span>

      <div className="p-4 md:p-5">
        {/* image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm border border-ink/10 bg-cream">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute top-2 right-2 ${categoryColor[project.category]} text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full border border-ink/10`}
          >
            {categoryLabel[project.category]}
          </span>
        </div>

        {/* title */}
        <h3 className="font-display text-3xl md:text-4xl mt-4 leading-none">
          {project.title}
        </h3>
        {project.type && (
          <p className="text-xs uppercase tracking-widest font-bold text-ink/50 mt-1">
            {project.type}
          </p>
        )}

        {/* role */}
        <p className="text-sm font-bold uppercase tracking-wide mt-3 text-ink/70">
          {project.role}
        </p>

        {/* brief */}
        <p className="text-base mt-2 text-ink/80">{project.brief}</p>

        {project.collaboration && (
          <p className="text-sm italic text-ink/60 mt-2 font-serif-italic">
            {project.collaboration}
          </p>
        )}

        {/* tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold uppercase tracking-wide border border-ink/20 rounded-full px-2.5 py-1 text-ink/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* link */}
        <Link
          href={`/work/${project.slug}`}
          className="mt-5 inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-sm border-b-2 border-ink pb-0.5 hover:gap-3 transition-all"
        >
          View case study <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </motion.div>
  );
}
