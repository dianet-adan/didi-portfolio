"use client";

import { motion } from "framer-motion";

export default function EndCTA() {
  return (
    <section
      id="contact"
      className="relative grid-paper bg-cream px-5 md:px-10 py-24 md:py-36 overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 -rotate-2 shadow-[2px_2px_0_var(--ink)] mb-8"
        >
          Selected Works &middot; 2026
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display uppercase leading-[0.92] text-[16vw] md:text-[9vw]"
        >
          Thank you
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif-italic text-2xl md:text-4xl text-blue mt-2"
        >
          let&apos;s connect
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@dianetadan.com"
            className="inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-sm md:text-base bg-blue text-paper border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
          >
            hello@dianetadan.com
          </a>
          <a
            href="#archive"
            className="inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-sm md:text-base bg-paper border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
          >
            Back to the archive
          </a>
        </motion.div>

        {/* sticky note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
          className="hidden md:block absolute -top-4 right-0 lg:right-10 bg-yellow border-2 border-ink rounded-sm px-5 py-4 shadow-[4px_4px_0_var(--ink)] font-body"
        >
          <p className="font-bold text-ink">Thanks for stopping by!</p>
          <p className="text-2xl mt-1">🙂</p>
        </motion.div>

        {/* star */}
        <motion.span
          initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
          className="hidden md:inline-block absolute -bottom-2 left-0 lg:left-10 text-6xl text-red"
        >
          &#9733;
        </motion.span>
      </div>

      <footer className="relative mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto pt-8 border-t-2 border-ink/10 text-xs md:text-sm font-bold uppercase tracking-widest text-ink/60">
        <span>Dianet Ad&aacute;n &mdash; Product Designer &amp; Visual Systems Thinker</span>
        <span>Designed &amp; built as an interactive prototype</span>
      </footer>
    </section>
  );
}
