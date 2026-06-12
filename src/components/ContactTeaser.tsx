"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactTeaser() {
  return (
    <section className="relative grid-paper-dark bg-blue text-paper px-5 md:px-10 py-20 md:py-28 overflow-hidden">
      <div className="relative max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-normal text-xs md:text-sm uppercase tracking-widest"
        >
          Got a project in mind?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="type-section text-yellow mt-2"
        >
          Can we talk?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base bg-yellow text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
          >
            Let&apos;s talk <span aria-hidden="true">&rarr;</span>
          </Link>
          <a
            href="/cv/dianet-adan-cv.pdf"
            download
            className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base bg-paper text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
          >
            Download CV <span aria-hidden="true">&darr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
