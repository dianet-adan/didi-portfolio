"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { folders } from "@/lib/projects";

const focusAreas = [
  "Product Design",
  "UX/UI Design",
  "Visual Systems",
  "Brand Identity",
  "Art Direction",
  "Campaign Design",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-paper grid-paper px-5 md:px-10 py-24 md:py-32 overflow-hidden"
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
          <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-cream border-2 border-ink rounded-full px-4 py-1.5 -rotate-2 shadow-[2px_2px_0_var(--ink)]">
            About me
          </span>

          <h2 className="font-display uppercase leading-[0.92] text-[14vw] sm:text-[9vw] md:text-[5.5vw] mt-6">
            Hi, I&apos;m{" "}
            <span className="font-serif-italic text-red normal-case">
              Dianet
            </span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-ink/80 max-w-2xl">
            I&apos;m a Product Designer with a strong visual direction
            background. I design digital products, interfaces and
            brand-led experiences that bring clarity, structure and
            personality to complex ideas.
          </p>

          <p className="mt-4 text-lg md:text-xl text-ink/80 max-w-2xl">
            My work sits at the intersection of UX/UI, visual systems, art
            direction and brand identity — across SaaS platforms, mobile
            apps, brand systems and digital campaigns. I care most about
            products that need to feel clear, scalable and visually
            memorable.
          </p>

          <div className="flex flex-wrap gap-2 mt-8">
            {focusAreas.map((area, i) => (
              <motion.span
                key={area}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-xs md:text-sm font-bold uppercase tracking-wide border-2 border-ink rounded-full px-3 py-1.5 bg-yellow text-ink shadow-[2px_2px_0_var(--ink)]"
                style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* selected experience */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-6xl mx-auto mt-20 md:mt-28"
      >
        <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-cream border-2 border-ink rounded-full px-4 py-1.5 rotate-1 shadow-[2px_2px_0_var(--ink)] mb-8">
          Selected experience
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {folders.map((folder, i) => (
            <motion.div
              key={folder.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-2 border-ink rounded-sm p-5 md:p-6 bg-cream shadow-[5px_6px_0_rgba(34,28,20,0.12)]"
              style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
            >
              <span
                className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border-2 border-ink mb-3"
                style={{ background: folder.color, color: folder.textColor }}
              >
                {folder.number}
              </span>
              <h4 className="font-display text-xl md:text-2xl uppercase leading-tight">
                {folder.title}
              </h4>
              <p className="text-sm md:text-base text-ink/70 mt-2">
                {folder.intro}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
