"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FolderData } from "@/lib/projects";
import { useTransitionNav } from "./TransitionProvider";

export default function FolderCard({
  folder,
  index,
}: {
  folder: FolderData;
  index: number;
}) {
  const baseRotate = index === 0 ? -2 : index === 1 ? 1.5 : -1;
  const transitionNav = useTransitionNav();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${folder.slug}`}
        onClick={(e) => {
          e.preventDefault();
          transitionNav(`/projects/${folder.slug}`, folder.color);
        }}
        className="group relative block w-full text-left focus:outline-none pt-6 cursor-pointer"
      >
        {/* the whole folder moves as one object */}
        <motion.div
          whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
          animate={{ rotate: baseRotate }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="relative"
        >
          {/* documents peeking out from behind the folder */}
          <div className="absolute top-[1%] left-[16%] right-[16%] h-[24%] pointer-events-none">
            <div
              className="absolute inset-x-4 top-[35%] h-full bg-paper border border-ink/20 rounded-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-4"
              style={{
                rotate: "-4deg",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(34,28,20,0.1) 8px)",
              }}
            />
            <div
              className="absolute inset-x-8 top-[12%] h-full bg-cream border border-ink/20 rounded-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-6"
              style={{
                rotate: "3deg",
                transitionDelay: "30ms",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(34,28,20,0.1) 8px)",
              }}
            />
          </div>

          {/* real folder artwork (texture, tab and labels baked in) */}
          <div className="relative w-full aspect-[1448/1086] drop-shadow-[8px_10px_0_rgba(34,28,20,0.22)]">
            <Image
              src={folder.image}
              alt={folder.title}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-contain"
            />
          </div>

          {/* hover label */}
          <span className="pointer-events-none absolute top-[16%] right-[8%] rounded-full border-2 border-ink bg-paper px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-widest text-ink shadow-[2px_2px_0_var(--ink)] opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            Open folder
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
