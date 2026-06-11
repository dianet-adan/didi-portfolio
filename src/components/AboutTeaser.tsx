"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function AboutTeaser() {
  return (
    <section
      id="about"
      className="relative bg-cream grid-paper px-5 md:px-10 py-24 md:py-32 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 order-2 lg:order-1"
        >
          <div className="relative w-full max-w-sm mx-auto aspect-[4/5] -rotate-2 shadow-[10px_14px_0_rgba(34,28,20,0.15)]">
            <div className="relative w-full h-full overflow-hidden rounded-sm">
              <Image
                src="/images/base/me-portrait.jpg"
                alt="Dianet Adán"
                fill
                sizes="(max-width: 1024px) 70vw, 400px"
                className="object-cover"
              />
            </div>
            <span className="absolute -top-4 -right-4 text-3xl rotate-12">
              📌
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 order-1 lg:order-2"
        >
          <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 -rotate-2 shadow-[2px_2px_0_var(--ink)]">
            Who&apos;s behind the archive
          </span>

          <h2 className="font-display uppercase leading-[0.92] text-[14vw] sm:text-[9vw] md:text-[5.5vw] mt-6">
            Hi, I&apos;m{" "}
            <span className="font-serif-italic text-red normal-case">
              Dianet
            </span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-ink/80 max-w-2xl">
            I&apos;m a Product Designer with a strong visual direction
            background. I design digital products, interfaces and brand-led
            experiences that bring clarity, structure and personality to
            complex ideas.
          </p>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-sm md:text-base border-2 border-ink rounded-full px-6 py-3 bg-yellow shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--ink)] transition-all"
          >
            More about me <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
