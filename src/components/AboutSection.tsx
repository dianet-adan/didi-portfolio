"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

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

// small tooltip shown above an inline easter egg / highlighted word
function Tip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap rounded-full bg-ink text-paper text-[10px] font-display uppercase tracking-[0.15em] px-2.5 py-1 opacity-0 translate-y-1 transition-all duration-200 group-hover/tip:opacity-100 group-hover/tip:translate-y-0 z-30 shadow-[2px_2px_0_rgba(0,0,0,0.25)]">
      {label}
    </span>
  );
}

// inline visual that wiggles on hover, with an optional tooltip
function Egg({ children, tip }: { children: ReactNode; tip?: string }) {
  return (
    <span className="group/tip relative inline-flex items-center align-[-0.22em] mx-[0.18em]">
      <motion.span
        whileHover={{ rotate: [0, -14, 14, -9, 0], scale: 1.25 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="inline-flex select-none cursor-default"
      >
        {children}
      </motion.span>
      {tip && <Tip label={tip} />}
    </span>
  );
}

// highlighted word: color + underline on hover, with a tooltip
function Mark({
  children,
  tip,
  color,
}: {
  children: ReactNode;
  tip?: string;
  color: string;
}) {
  return (
    <span className="group/tip relative inline-block">
      <span
        className={`font-bold ${color} cursor-help decoration-2 [text-underline-offset:3px] hover:underline transition-colors`}
      >
        {children}
      </span>
      {tip && <Tip label={tip} />}
    </span>
  );
}

function Sticker({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="inline-block w-[1.7em] h-[1.7em] object-contain drop-shadow-[1px_2px_0_rgba(34,28,20,0.18)]"
    />
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[1.55em] h-[1.55em]" aria-hidden="true">
      <path
        d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
        fill="var(--blue)"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[1.4em] h-[1.4em] -rotate-6" aria-hidden="true">
      <path
        d="M5 3l14 7-6 1.5L10 19 5 3z"
        fill="var(--paper)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-cream grid-paper px-5 md:px-10 pt-28 md:pt-36 pb-24 md:pb-32 overflow-hidden"
    >
      <div className="relative max-w-[84rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* portrait — pinned, tilted print */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 order-2 lg:order-1"
        >
          <div className="relative w-full max-w-lg mx-auto lg:mx-0 aspect-[941/1672] -rotate-2">
            <Image
              src="/images/base/me.png"
              alt="Dianet Adán"
              fill
              sizes="(max-width: 1024px) 75vw, 512px"
              className="object-contain drop-shadow-[10px_14px_0_rgba(34,28,20,0.15)]"
            />
          </div>
        </motion.div>

        {/* interactive bio */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 order-1 lg:order-2"
        >
          <span className="inline-block font-display font-normal text-xs md:text-sm uppercase tracking-[0.2em] bg-cream border-2 border-ink rounded-full px-4 py-1.5 -rotate-2 shadow-[2px_2px_0_var(--ink)]">
            About me
          </span>

          <h2 className="type-section mt-6">
            Hi, I&apos;m{" "}
            <span className="font-serif-italic text-red normal-case">
              Dianet
            </span>
          </h2>

          <p className="mt-7 type-body text-ink/85 leading-[1.7]">
            I&apos;m a Product Designer with an art direction brain &mdash;
            working across{" "}
            <Mark color="text-blue" tip="SaaS · dashboards · platforms">
              digital products
            </Mark>
            <Egg tip="SaaS · dashboards · platforms">
              <FolderIcon />
            </Egg>
            ,{" "}
            <Mark color="text-ink" tip="UX flows · UI systems">
              interfaces
            </Mark>
            <Egg tip="UX flows · UI systems">
              <CursorIcon />
            </Egg>
            , visual systems and{" "}
            <Mark color="text-red" tip="identity meets product">
              brand-led experiences
            </Mark>
            <Egg tip="identity meets product">
              <Sticker src="/images/stickers/5.png" alt="" />
            </Egg>
            .
          </p>

          <p className="mt-5 type-body text-ink/85 leading-[1.7]">
            I like turning complex ideas into things that feel{" "}
            <Mark color="text-blue" tip="clear hierarchy">
              clear
            </Mark>
            ,{" "}
            <Mark color="text-brown" tip="rules &amp; rhythm">
              structured
            </Mark>{" "}
            and visually memorable. My work moves between SaaS platforms, mobile
            apps, identity systems and campaign visuals, always looking for the
            balance between logic and{" "}
            <Mark color="text-blue" tip="a memorable voice">
              personality
            </Mark>
            <Egg>
              <Sticker src="/images/stickers/1.png" alt="" />
            </Egg>
            .
          </p>

          <p className="mt-5 type-body text-ink/85 leading-[1.7]">
            Outside the screen, I&apos;m usually collecting{" "}
            <Mark color="text-brown" tip="moodboards &amp; inspiration">
              visual references
            </Mark>
            , taking{" "}
            <Mark color="text-blue" tip="shooting &amp; framing">
              photos
            </Mark>
            , caring for my{" "}
            <Mark color="text-brown" tip="green &amp; growing">
              plants
            </Mark>{" "}
            or spending time with{" "}
            <Mark color="text-red" tip="my Labrador">
              Dal&iacute;
            </Mark>
            , my Labrador, who brings a very real kind of chaos and joy into my
            days.
          </p>

          <p className="mt-5 type-body text-ink/85 leading-[1.7]">
            I guess that&apos;s also how I design: with structure, curiosity and
            a little bit of{" "}
            <Mark color="text-red" tip="a bit of fun">
              play
            </Mark>
            <Egg>
              <Sticker src="/images/stickers/6.png" alt="" />
            </Egg>
            .
          </p>

          {/* skill pills */}
          <div className="flex flex-wrap gap-2.5 mt-9">
            {focusAreas.map((area, i) => (
              <motion.span
                key={area}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -3, rotate: 0 }}
                className="text-xs md:text-sm font-display font-normal uppercase tracking-wide border-2 border-ink rounded-full px-3.5 py-1.5 bg-yellow text-ink shadow-[2px_2px_0_var(--ink)] cursor-default"
                style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
