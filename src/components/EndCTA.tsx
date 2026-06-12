"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EndCTA() {
  return (
    <section
      id="contact"
      className="relative grid-paper-dark bg-blue text-paper px-5 md:px-10 py-20 md:py-16 md:min-h-screen flex flex-col overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 items-center w-full flex-1 md:py-10">
        {/* phone receiver */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -14 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "backOut" }}
          className="order-2 md:order-1 mx-auto md:mx-0 w-40 sm:w-56 md:w-full max-w-sm"
        >
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [-8, -4, -8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full aspect-[1122/1402]"
          >
            <Image
              src="/images/base/telefono.png"
              alt="Red retro telephone receiver"
              fill
              sizes="(max-width: 768px) 60vw, 480px"
              className="object-contain drop-shadow-[16px_22px_0_rgba(0,0,0,0.25)]"
              priority
            />
          </motion.div>
        </motion.div>

        {/* text content */}
        <div className="order-1 md:order-2 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display uppercase leading-[0.9] text-[18vw] sm:text-[12vw] md:text-[7vw] text-yellow"
          >
            Let&apos;s
            <br />
            Have a call
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif-italic text-2xl md:text-4xl text-paper/90 mt-4"
          >
            ...about your next project
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
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
        </div>
      </div>

      <footer className="relative w-full flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto mt-12 md:mt-6 pt-6 border-t-2 border-paper/15 text-xs md:text-sm font-bold uppercase tracking-widest text-paper/60">
        <span>Dianet Ad&aacute;n &mdash; Product Designer &amp; Visual Systems Thinker</span>
        <span>Designed &amp; built as an interactive prototype</span>
      </footer>
    </section>
  );
}
