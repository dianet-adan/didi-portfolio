"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function EndCTA() {
  return (
    <section
      id="contact"
      className="relative grid-paper-dark bg-blue text-paper px-5 md:px-10 py-16 md:py-24 overflow-hidden"
    >
      {/* top row */}
      <div className="relative max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-body font-extrabold text-xs md:text-sm uppercase tracking-widest max-w-xs"
        >
          Because every project deserves to be discussed.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body font-extrabold text-xs md:text-sm uppercase tracking-widest sm:text-right max-w-xs"
        >
          Let&apos;s start the conversation.
        </motion.p>
      </div>

      {/* headline */}
      <div className="relative max-w-6xl mx-auto text-center mt-6 md:mt-10">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display uppercase leading-[0.9] text-[18vw] sm:text-[14vw] md:text-[10vw] text-yellow"
        >
          Can we talk?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif-italic text-2xl md:text-4xl text-paper/90 mt-2"
        >
          ...about your next project
        </motion.p>
      </div>

      {/* illustration */}
      <div className="relative max-w-6xl mx-auto flex justify-center my-10 md:my-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -16 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "backOut" }}
          className="relative w-40 sm:w-48 md:w-56"
        >
          <svg viewBox="0 0 240 420" className="w-full h-auto" aria-hidden="true">
            {/* cord */}
            <path
              d="M120 320 C 160 345, 80 365, 120 390 C 160 415, 90 430, 130 450"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* earpiece */}
            <rect x="50" y="10" width="140" height="110" rx="26" fill="var(--red)" stroke="var(--ink)" strokeWidth="4" />
            {/* handle */}
            <rect x="93" y="100" width="54" height="130" fill="var(--red)" stroke="var(--ink)" strokeWidth="4" />
            {/* mouthpiece */}
            <rect x="50" y="210" width="140" height="110" rx="26" fill="var(--red)" stroke="var(--ink)" strokeWidth="4" />
            {/* speaker holes */}
            {[0, 1, 2, 3].map((col) =>
              [0, 1, 2].map((row) => (
                <circle
                  key={`top-${col}-${row}`}
                  cx={75 + col * 30}
                  cy={42 + row * 18}
                  r="4"
                  fill="var(--yellow)"
                />
              ))
            )}
            {[0, 1, 2, 3].map((col) =>
              [0, 1, 2].map((row) => (
                <circle
                  key={`bottom-${col}-${row}`}
                  cx={75 + col * 30}
                  cy={242 + row * 18}
                  r="4"
                  fill="var(--yellow)"
                />
              ))
            )}
          </svg>

          {/* ring sticker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
            className="absolute -top-2 -right-10 sm:-right-14 rotate-12 rounded-full border-2 border-ink bg-yellow text-ink font-body font-extrabold uppercase text-xs md:text-sm px-3 py-2 shadow-[3px_3px_0_var(--ink)]"
          >
            Ring ring!
          </motion.div>

          {/* star */}
          <motion.span
            initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
            className="absolute -bottom-4 -left-8 sm:-left-12 text-4xl md:text-5xl text-yellow"
          >
            &#9733;
          </motion.span>
        </motion.div>
      </div>

      {/* body copy */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl mx-auto text-center text-yellow font-bold text-sm md:text-base uppercase tracking-wide"
      >
        In a world full of noise, taking a moment to have a real conversation
        can make all the difference. Whether you have a project in mind, a
        question, or just want to say hi &mdash; let&apos;s create something
        clear, structured and memorable together.
      </motion.p>

      {/* buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a
          href="mailto:hello@dianetadan.com"
          className="inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-sm md:text-base bg-yellow text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
        >
          hello@dianetadan.com
        </a>
        <Link
          href="/#archive"
          className="inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-sm md:text-base bg-paper text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
        >
          Back to the archive
        </Link>
      </motion.div>

      <footer className="relative mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto pt-8 border-t-2 border-paper/15 text-xs md:text-sm font-bold uppercase tracking-widest text-paper/60">
        <span>Dianet Ad&aacute;n &mdash; Product Designer &amp; Visual Systems Thinker</span>
        <span>Designed &amp; built as an interactive prototype</span>
      </footer>
    </section>
  );
}
