"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FolderData } from "@/lib/projects";

export default function FolderCard({
  folder,
  index,
}: {
  folder: FolderData;
  index: number;
}) {
  const baseRotate = index === 0 ? -2 : index === 1 ? 1.5 : -1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${folder.slug}`}
        className="group relative block w-full text-left focus:outline-none pt-8 cursor-pointer"
      >
        {/* peeking documents inside the folder */}
        <div className="absolute top-0 left-5 right-5 h-20 pointer-events-none">
          <div
            className="absolute inset-x-3 top-3 h-full bg-paper border border-ink/10 rounded-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-2.5"
            style={{ rotate: "-6deg" }}
          />
          <div
            className="absolute inset-x-6 top-0 h-full bg-cream border border-ink/10 rounded-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-4"
            style={{ rotate: "4deg", transitionDelay: "30ms" }}
          />
        </div>

        {/* tab */}
        <div
          className="absolute top-0 left-7 px-4 py-1.5 rounded-t-sm border-2 border-b-0 border-ink text-[11px] font-bold uppercase tracking-widest transition-transform duration-300 group-hover:-translate-y-1"
          style={{ background: folder.color, color: folder.textColor }}
        >
          {folder.number}
        </div>

        {/* folder body */}
        <motion.div
          whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
          animate={{ rotate: baseRotate }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="relative aspect-[4/3] md:aspect-[5/4] rounded-sm border-2 border-ink p-5 md:p-7 flex flex-col justify-end overflow-hidden shadow-[6px_8px_0_rgba(34,28,20,0.18)]"
          style={{ background: folder.color, color: folder.textColor }}
        >
          <div className="grid-paper-dark absolute inset-0 opacity-40 pointer-events-none" />
          <h3 className="font-display text-3xl md:text-5xl leading-[0.95] relative">
            {folder.title.replace(/ Projects$/, "")}
          </h3>
          <p className="text-xs md:text-sm font-bold uppercase tracking-wide mt-3 relative opacity-80">
            {folder.subtitle}
          </p>

          {/* hover label */}
          <span className="pointer-events-none absolute top-4 right-4 rounded-full border-2 border-ink bg-paper px-3 py-1.5 font-body text-[11px] font-bold uppercase tracking-widest text-ink shadow-[2px_2px_0_var(--ink)] opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            Open folder
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
