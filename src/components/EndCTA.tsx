"use client";

import Image from "next/image";
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

      {/* photo */}
      <div className="relative max-w-6xl mx-auto flex justify-center my-10 md:my-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "backOut" }}
          className="relative w-56 sm:w-64 md:w-80 aspect-[4/5] border-4 border-paper shadow-[10px_14px_0_rgba(0,0,0,0.3)] overflow-hidden"
        >
          <Image
            src="/images/base/phone-call.jpg"
            alt="Orange retro telephone receiver against a blue sky"
            fill
            sizes="(max-width: 768px) 60vw, 320px"
            className="object-cover"
          />

          {/* ring sticker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
            className="absolute -top-3 -right-8 sm:-right-10 rotate-12 rounded-full border-2 border-ink bg-yellow text-ink font-body font-extrabold uppercase text-xs md:text-sm px-3 py-2 shadow-[3px_3px_0_var(--ink)]"
          >
            Ring ring!
          </motion.div>

          {/* star */}
          <motion.span
            initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
            className="absolute -bottom-5 -left-6 sm:-left-8 text-4xl md:text-5xl text-yellow drop-shadow-[2px_2px_0_var(--ink)]"
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
          href="/projects"
          className="inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-sm md:text-base bg-paper text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
        >
          Browse the archive
        </Link>
      </motion.div>

      <footer className="relative mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto pt-8 border-t-2 border-paper/15 text-xs md:text-sm font-bold uppercase tracking-widest text-paper/60">
        <span>Dianet Ad&aacute;n &mdash; Product Designer &amp; Visual Systems Thinker</span>
        <span>Designed &amp; built as an interactive prototype</span>
      </footer>
    </section>
  );
}
