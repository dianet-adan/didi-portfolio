"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

function SoundArcs({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      aria-hidden="true"
      className={`w-full h-full ${flip ? "-scale-x-100" : ""}`}
    >
      <path
        d="M 38 12 Q 24 38 40 66"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M 24 4 Q 4 38 26 74"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function EndCTA() {
  const [ringing, setRinging] = useState(false);
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
          <motion.a
            href="mailto:hello@dianetadan.com"
            aria-label="Email hello@dianetadan.com"
            onHoverStart={() => setRinging(true)}
            onHoverEnd={() => setRinging(false)}
            animate={{ y: [0, -18, 0], rotate: [-8, -4, -8] }}
            whileHover={{
              rotate: [0, -7, 7, -7, 7, -4, 0],
              y: 0,
              transition: { duration: 0.5, repeat: Infinity },
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative block w-full aspect-[1122/1402] cursor-pointer"
          >
            <Image
              src="/images/base/telefono.png"
              alt="Red retro telephone receiver"
              fill
              sizes="(max-width: 768px) 60vw, 480px"
              className="object-contain drop-shadow-[16px_22px_0_rgba(0,0,0,0.25)]"
              priority
            />

            {/* cartoon ringing marks, hand-drawn style */}
            <motion.div
              animate={
                ringing
                  ? { opacity: [0, 1, 0], scale: [0.6, 1.15, 1.3], x: [-2, -8] }
                  : { opacity: 0, scale: 0.6 }
              }
              transition={
                ringing
                  ? { duration: 0.7, repeat: Infinity, ease: "easeOut" }
                  : { duration: 0.15 }
              }
              className="absolute top-[16%] left-[6%] w-[17%] aspect-[60/80] text-yellow drop-shadow-[2px_2px_0_var(--ink)]"
            >
              <SoundArcs />
            </motion.div>
            <motion.div
              animate={
                ringing
                  ? { opacity: [0, 1, 0], scale: [0.6, 1.15, 1.3], x: [2, 8] }
                  : { opacity: 0, scale: 0.6 }
              }
              transition={
                ringing
                  ? { duration: 0.7, repeat: Infinity, ease: "easeOut", delay: 0.15 }
                  : { duration: 0.15 }
              }
              className="absolute top-[2%] right-[2%] w-[22%] aspect-[60/80] text-yellow drop-shadow-[2px_2px_0_var(--ink)]"
            >
              <SoundArcs flip />
            </motion.div>

            {/* little comic stars */}
            <motion.span
              animate={
                ringing
                  ? { opacity: [0, 1, 0], scale: [0.4, 1.2], rotate: [0, 40] }
                  : { opacity: 0, scale: 0.4 }
              }
              transition={
                ringing
                  ? { duration: 0.9, repeat: Infinity, ease: "easeOut", delay: 0.3 }
                  : { duration: 0.15 }
              }
              className="absolute -top-[6%] left-[28%] text-4xl md:text-5xl text-paper drop-shadow-[2px_2px_0_var(--ink)] select-none"
            >
              &#10022;
            </motion.span>
            <motion.span
              animate={
                ringing
                  ? { opacity: [0, 1, 0], scale: [0.4, 1], rotate: [0, -35] }
                  : { opacity: 0, scale: 0.4 }
              }
              transition={
                ringing
                  ? { duration: 0.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }
                  : { duration: 0.15 }
              }
              className="absolute top-[18%] right-[28%] text-2xl md:text-3xl text-yellow drop-shadow-[1px_1px_0_var(--ink)] select-none"
            >
              &#10022;
            </motion.span>
          </motion.a>
        </motion.div>

        {/* text content */}
        <div className="order-1 md:order-2 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="type-section text-yellow"
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
              className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base bg-yellow text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
            >
              hello@dianetadan.com
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base bg-paper text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
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
