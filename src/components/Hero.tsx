"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { MouseEvent, useRef, useState } from "react";
import RevealLine from "./RevealLine";
import ParallaxSticker from "./ParallaxSticker";

// hand-made sticker artwork, scattered around the hero
const stickers = [
  {
    src: "/images/stickers/1.png",
    alt: "Blue flower face sticker",
    ratio: "791/727",
    className: "hidden lg:block absolute top-[32%] left-[42%] xl:left-[52%] 2xl:left-[57%] w-24 lg:w-28 z-10",
    rotate: -6,
    depth: 0.8,
    delay: 0.7,
    floatDuration: 4.5,
  },
  {
    src: "/images/stickers/2.png",
    alt: "OK hand sticker",
    ratio: "791/727",
    className: "absolute top-[52%] right-[4%] w-20 md:w-24 z-10",
    rotate: 6,
    depth: 0.5,
    delay: 0.85,
    floatDuration: 6,
  },
  {
    src: "/images/stickers/3.png",
    alt: "Yellow asterisk sticker",
    ratio: "791/795",
    className: "hidden md:block absolute top-[13%] left-[43%] w-16 lg:w-20 z-10",
    rotate: 8,
    depth: 1.4,
    delay: 1.1,
    floatDuration: 4.2,
  },
  {
    src: "/images/stickers/4.png",
    alt: "Yellow cloud face sticker",
    ratio: "960/795",
    className: "hidden lg:block absolute bottom-[8%] left-[41%] w-28 z-10",
    rotate: 4,
    depth: 0.9,
    delay: 1.2,
    floatDuration: 5,
  },
  {
    src: "/images/stickers/5.png",
    alt: "Red heart sticker",
    ratio: "960/795",
    className: "hidden md:block absolute top-[18%] right-[12%] w-24 lg:w-28 z-20",
    rotate: -5,
    depth: 1.1,
    delay: 1,
    floatDuration: 3.8,
  },
  {
    src: "/images/stickers/6.png",
    alt: "Gold star sticker",
    ratio: "797/795",
    className: "hidden md:block absolute bottom-[4%] right-[16%] w-16 lg:w-20 z-20",
    rotate: -10,
    depth: 1.2,
    delay: 1.3,
    floatDuration: 4.6,
  },
];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const cursorSpringX = useSpring(cursorX, { stiffness: 400, damping: 32 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 400, damping: 32 });
  const [dragHover, setDragHover] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX * 40);
    mouseY.set(relY * 40);
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
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
        <span className="inline-block font-display font-normal text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 -rotate-2 shadow-[2px_2px_0_var(--ink)]">
          Portfolio &middot; Selected Works 2026
        </span>
      </motion.div>

      {/* headline */}
      <h1 className="text-ink">
        <RevealLine delay={0.05} className="type-hero">
          Product
        </RevealLine>
        <RevealLine delay={0.18} className="type-hero">
          Designer
        </RevealLine>
        <RevealLine
          delay={0.32}
          className="type-hero-accent mt-2 md:mt-4"
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
        className="mt-8 type-body text-ink/80"
      >
        Hi, I&apos;m Dianet &mdash; I design digital products, interfaces and
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
          className="inline-flex items-center gap-2 font-display font-normal text-sm uppercase tracking-widest border-2 border-ink rounded-full px-5 py-2 bg-red text-paper shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--ink)] transition-all"
        >
          View projects <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 font-display font-normal text-sm uppercase tracking-widest border-2 border-ink rounded-full px-5 py-2 bg-yellow shadow-[3px_3px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--ink)] transition-all"
        >
          About me
        </Link>
      </motion.div>

      {/* floating archive objects */}
      <ParallaxSticker
        mouseX={mouseX}
        mouseY={mouseY}
        dragConstraints={sectionRef}
        depth={-0.6}
        delay={0.5}
        floatDuration={5}
        className="hidden md:block absolute top-16 lg:top-20 right-[10%] lg:right-[14%] w-72 lg:w-[26rem] xl:w-[30rem] z-10"
      >
        <div
          onMouseEnter={() => setDragHover(true)}
          onMouseLeave={() => setDragHover(false)}
          className="relative w-full aspect-[941/1672] cursor-none"
        >
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

      {stickers.map((sticker) => (
        <ParallaxSticker
          key={sticker.src}
          mouseX={mouseX}
          mouseY={mouseY}
          dragConstraints={sectionRef}
          depth={sticker.depth}
          delay={sticker.delay}
          floatDuration={sticker.floatDuration}
          className={sticker.className}
        >
          <div
            onMouseEnter={() => setDragHover(true)}
            onMouseLeave={() => setDragHover(false)}
            className="relative w-full cursor-none drop-shadow-[3px_4px_0_rgba(42,28,14,0.18)]"
            style={{
              aspectRatio: sticker.ratio,
              rotate: `${sticker.rotate}deg`,
            }}
          >
            <Image
              src={sticker.src}
              alt={sticker.alt}
              fill
              sizes="140px"
              className="object-contain select-none"
              draggable={false}
            />
          </div>
        </ParallaxSticker>
      ))}

      {/* "drag me" cursor follower */}
      <motion.div
        style={{ x: cursorSpringX, y: cursorSpringY }}
        className="pointer-events-none absolute top-0 left-0 z-40 hidden md:block"
      >
        <AnimatePresence>
          {dragHover && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -16 }}
              animate={{ scale: 1, opacity: 1, rotate: -6 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "backOut" }}
              className="-ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper font-display text-[10px] uppercase tracking-[0.12em] shadow-[3px_3px_0_rgba(42,28,14,0.25)]"
            >
              Drag me
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
