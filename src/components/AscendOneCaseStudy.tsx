"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ascendOne, projects, Project } from "@/lib/projects";
import { useTransitionNav, useTransitionArrival } from "./TransitionProvider";

const transitionColor: Record<Project["category"], string> = {
  uxui: "var(--yellow)",
  branding: "var(--red)",
  advertising: "var(--blue)",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

// full-bleed section graphics designed by the author (16:9)
const sections = [
  { src: "/images/ao/analysis.png", alt: "AscendONE — analysis insights" },
  { src: "/images/ao/system.png", alt: "AscendONE — brand system, typography and palette" },
  { src: "/images/ao/solution.png", alt: "AscendONE — the proposal and value" },
  { src: "/images/ao/features.png", alt: "AscendONE — platform features" },
  { src: "/images/ao/screens.png", alt: "AscendONE — platform screens" },
];

export default function AscendOneCaseStudy() {
  const project = projects.find((p) => p.slug === "ascendone")!;
  const index = projects.findIndex((p) => p.slug === "ascendone");
  const nextProject = projects[(index + 1) % projects.length];
  const transitionNav = useTransitionNav();
  const arrivedViaTransition = useTransitionArrival()();

  const [revealed, setRevealed] = useState(!arrivedViaTransition);
  useEffect(() => {
    if (!arrivedViaTransition) return;
    const id = setTimeout(() => setRevealed(true), 720);
    return () => clearTimeout(id);
  }, [arrivedViaTransition]);

  const heroAnim = (delay: number) =>
    arrivedViaTransition
      ? {
          variants: fadeUp,
          initial: "hidden" as const,
          animate: (revealed ? "show" : "hidden") as const,
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        }
      : {
          variants: fadeUp,
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.6, delay },
        };

  const inView = (delay = 0) => ({
    variants: fadeUp,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay },
  });

  return (
    <section
      className="relative text-ink pb-24 md:pb-32 overflow-hidden"
      style={{ backgroundColor: "var(--yellow)" }}
    >
      {/* hero band: textured yellow paper field; its torn edge hangs over the
          cover below so the two overlap */}
      <div className="relative z-20">
        <Image
          src="/images/ao/paper-field.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top pointer-events-none"
          priority
        />
        <div className="relative max-w-6xl mx-auto px-5 md:px-10 pt-32 pb-16 md:pb-24">
          {/* torn paper edge, overhanging the cover */}
          <div className="pointer-events-none absolute left-1/2 right-1/2 -mx-[50vw] w-screen bottom-0 translate-y-[88%]">
            <div className="relative w-full aspect-[2400/255]">
              <Image
                src="/images/ao/paper-edge.png"
                alt=""
                fill
                sizes="100vw"
                className="object-fill"
              />
            </div>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-display font-normal text-sm uppercase tracking-widest border-b-2 border-ink/40 pb-0.5 hover:border-ink transition-colors"
          >
            &larr; All projects
          </Link>

          <motion.div
            {...heroAnim(0.05)}
            className="inline-flex items-center gap-2 -rotate-2 rounded-full border-2 border-ink bg-red text-paper px-4 py-1.5 font-display text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] shadow-[3px_3px_0_var(--ink)] mt-8 ml-3"
          >
            {project.tags[1]} Project
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial={arrivedViaTransition ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={arrivedViaTransition ? { duration: 0 } : { duration: 0.7, delay: 0.1 }}
            className="type-hero mt-6"
          >
            {ascendOne.title}
          </motion.h1>

          <motion.p
            {...heroAnim(0.14)}
            className="font-serif-italic text-2xl md:text-4xl text-red mt-2"
          >
            {ascendOne.type}
          </motion.p>
        </div>
      </div>

      {/* meta: full-bleed cover (laptop on lilac), tucked under the hero's torn
          edge, with the taped note on top */}
      <div className="relative z-10 w-full">
        <motion.div {...heroAnim(0.2)} className="relative w-full aspect-[1920/1080]">
          <Image
            src="/images/ao/cover.png"
            alt="AscendONE platform on a laptop"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* taped description note: stacked under on mobile, overlapping on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-20 mx-auto -mt-12 w-[86%] max-w-sm px-0 md:mx-0 md:mt-0 md:absolute md:top-1/2 md:right-[4%] md:-translate-y-1/2 md:w-[42%] md:max-w-xl"
        >
          <div className="relative w-full aspect-[1440/1600] -rotate-1 drop-shadow-[14px_18px_0_rgba(0,0,0,0.2)]">
            <Image
              src="/images/ao/description.png"
              alt="Project type, role, collaboration and the challenge"
              fill
              sizes="(max-width: 768px) 86vw, 42vw"
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>

      {/* full-bleed author-designed sections, seamless (no gaps) */}
      <div>
        {sections.map((s) => (
          <motion.div
            key={s.src}
            {...inView()}
            className="relative w-full -mt-px"
          >
            <div className="relative w-full aspect-[2400/1350]">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* next project navigation */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 mt-20 pt-10 border-t-2 border-ink/15">
        <span className="font-display font-normal text-xs md:text-sm uppercase tracking-[0.2em] text-ink/50">
          Next project
        </span>
        <Link
          href={`/projects/${nextProject.slug}`}
          onClick={(e) => {
            e.preventDefault();
            transitionNav(
              `/projects/${nextProject.slug}`,
              transitionColor[nextProject.category]
            );
          }}
          className="group mt-3 flex items-center justify-between gap-4"
        >
          <h3 className="type-section leading-none group-hover:text-red transition-colors">
            {nextProject.title}
          </h3>
          <span className="text-3xl md:text-5xl flex-shrink-0 transition-transform group-hover:translate-x-2">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
