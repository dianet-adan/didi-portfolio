"use client";

import { motion } from "framer-motion";
import { useState, MouseEvent } from "react";
import { FolderData } from "@/lib/projects";

export default function FolderCard({
  folder,
  index,
  isOpen,
  dimmed,
  onClick,
}: {
  folder: FolderData;
  index: number;
  isOpen: boolean;
  dimmed: boolean;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const baseRotate = index === 0 ? -2 : index === 1 ? 1.5 : -1;

  function handleMove(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.button
      layout
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{
        y: isOpen ? -14 : dimmed ? 10 : 0,
        scale: isOpen ? 1.03 : dimmed ? 0.96 : 1,
        opacity: dimmed ? 0.5 : 1,
        rotate: isOpen ? 0 : baseRotate,
      }}
      whileHover={{ y: -10, rotate: 0, scale: isOpen ? 1.03 : 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative w-full text-left focus:outline-none pt-8"
    >
      {/* peeking documents inside the folder */}
      <div className="absolute top-0 left-5 right-5 h-20 pointer-events-none">
        <motion.div
          animate={{ y: isOpen ? -16 : 0, rotate: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute inset-x-3 top-3 h-full bg-paper border border-ink/10 rounded-sm shadow-sm"
        />
        <motion.div
          animate={{ y: isOpen ? -26 : 0, rotate: 4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.03 }}
          className="absolute inset-x-6 top-0 h-full bg-cream border border-ink/10 rounded-sm shadow-sm"
        />
      </div>

      {/* tab */}
      <div
        className="absolute top-0 left-7 px-4 py-1.5 rounded-t-sm border-2 border-b-0 border-ink text-[11px] font-bold uppercase tracking-widest"
        style={{ background: folder.color, color: folder.textColor }}
      >
        {folder.number}
      </div>

      {/* folder body */}
      <div
        className="relative aspect-[4/3] md:aspect-[5/4] rounded-sm border-2 border-ink p-5 md:p-7 flex flex-col justify-end overflow-hidden shadow-[6px_8px_0_rgba(34,28,20,0.18)]"
        style={{ background: folder.color, color: folder.textColor }}
      >
        <div className="grid-paper-dark absolute inset-0 opacity-40 pointer-events-none" />
        <h3 className="font-display text-3xl md:text-5xl leading-[0.95] relative">
          {folder.title}
        </h3>
        <p className="text-xs md:text-sm font-bold uppercase tracking-wide mt-3 relative opacity-80">
          {folder.subtitle}
        </p>
        <p className="mt-5 text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] relative">
          {isOpen ? "Close folder ↑" : `${folder.projects.length} files inside →`}
        </p>
      </div>

      {/* cursor-follow label */}
      {hover && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="pointer-events-none absolute z-30 hidden md:inline-block -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink px-3 py-1.5 font-body text-xs font-bold uppercase tracking-widest text-paper shadow-md"
          style={{ left: pos.x, top: pos.y }}
        >
          {isOpen ? "Close" : "Open"}
        </motion.span>
      )}
    </motion.button>
  );
}
