"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import RevealLine from "./RevealLine";
import ParallaxSticker from "./ParallaxSticker";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX * 40);
    mouseY.set(relY * 40);
  }

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] grid-paper overflow-hidden flex flex-col justify-center px-5 pt-28 pb-20 md:px-10"
    >
      {/* top label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 md:mb-10"
      >
        <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 -rotate-2 shadow-[2px_2px_0_var(--ink)]">
          Portfolio &middot; Selected Works 2026
        </span>
      </motion.div>

      {/* headline */}
      <h1 className="font-display uppercase leading-[0.92] text-ink">
        <RevealLine delay={0.05} className="text-[15vw] sm:text-[13vw] md:text-[10vw]">
          Product
        </RevealLine>
        <RevealLine delay={0.18} className="text-[15vw] sm:text-[13vw] md:text-[10vw]">
          Designer
        </RevealLine>
        <RevealLine
          delay={0.32}
          className="text-[8vw] sm:text-[6vw] md:text-[4.4vw] mt-2 md:mt-4 normal-case"
        >
          <span className="text-ink">&amp; </span>
          <span className="font-serif-italic text-red">Visual Systems</span>
          <span className="text-ink"> Thinker</span>
        </RevealLine>
      </h1>

      {/* supporting line */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-8 max-w-xl text-xl md:text-2xl font-medium text-ink/80"
      >
        Hi, I&apos;m Dianet and I design digital products, interfaces and
        brand-led experiences that bring clarity, structure and personality to
        complex ideas.
      </motion.p>

      {/* main CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-12 flex flex-wrap items-center gap-4 self-start"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-body font-bold text-sm uppercase tracking-widest border-2 border-ink rounded-full px-5 py-2 bg-red text-paper shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--ink)] transition-all"
        >
          View all projects <span aria-hidden="true">&rarr;</span>
        </Link>
        <a
          href="#archive"
          className="inline-flex items-center gap-2 font-body font-bold text-sm uppercase tracking-widest border-2 border-ink rounded-full px-5 py-2 bg-yellow shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--ink)] transition-all"
        >
          Open the archive
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            &darr;
          </motion.span>
        </a>
      </motion.div>

      {/* floating archive objects */}
      <ParallaxSticker
        mouseX={mouseX}
        mouseY={mouseY}
        depth={-0.6}
        delay={0.5}
        floatDuration={5}
        className="hidden md:block absolute top-16 lg:top-20 right-[10%] lg:right-[14%] w-72 lg:w-[26rem] xl:w-[30rem] z-10"
      >
        <div className="relative w-full aspect-[941/1672]">
          <Image
            src="/images/base/me-portrait-framed.png"
            alt="Dianet Adán"
            fill
            sizes="480px"
            className="object-contain"
            priority
          />
        </div>
      </ParallaxSticker>

      <ParallaxSticker
        mouseX={mouseX}
        mouseY={mouseY}
        depth={0.8}
        delay={0.7}
        floatDuration={4.5}
        className="hidden lg:block absolute top-[40%] left-[37%] z-10"
      >
        <div className="flex h-20 w-20 md:h-24 md:w-24 -rotate-6 items-center justify-center rounded-full border-2 border-ink bg-red text-center font-body font-extrabold uppercase leading-tight text-paper shadow-[4px_4px_0_var(--ink)] text-sm md:text-base">
          Good
          <br />
          Ideas
          <br />
          Matter
        </div>
      </ParallaxSticker>

      <ParallaxSticker
        mouseX={mouseX}
        mouseY={mouseY}
        depth={0.5}
        delay={0.85}
        floatDuration={6}
        className="absolute bottom-10 right-[6%] sm:right-[8%] z-10"
      >
        <div className="rotate-3 rounded-full border-2 border-ink bg-yellow px-5 py-3 font-body font-extrabold uppercase tracking-wide text-ink shadow-[4px_4px_0_var(--ink)] text-sm md:text-base">
          Make it meaningful
        </div>
      </ParallaxSticker>

      <ParallaxSticker
        mouseX={mouseX}
        mouseY={mouseY}
        depth={1.1}
        delay={1}
        floatDuration={3.8}
        className="hidden md:block absolute bottom-32 right-[8%] z-10"
      >
        <div className="-rotate-3 rounded-sm border-2 border-ink bg-blue px-4 py-2 font-body font-bold uppercase tracking-widest text-paper shadow-[3px_3px_0_var(--ink)] text-xs md:text-sm">
          Projects &rarr; 2026
        </div>
      </ParallaxSticker>

      <ParallaxSticker
        mouseX={mouseX}
        mouseY={mouseY}
        depth={1.4}
        delay={1.1}
        floatDuration={4.2}
        className="hidden md:block absolute top-[14%] left-[42%] z-10"
      >
        <span className="block text-5xl text-yellow drop-shadow-[2px_2px_0_var(--ink)]">
          &#9733;
        </span>
      </ParallaxSticker>
    </section>
  );
}
