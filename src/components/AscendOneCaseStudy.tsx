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

  return (
    <section className="relative grid-paper-dark text-ink px-5 md:px-10 pt-32 pb-24 md:pb-32 overflow-hidden"
      style={{ backgroundColor: "var(--yellow)" }}>
      

      {/* ambient glow from AscendONE cover */}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-soft-light pointer-events-none">
        <Image
          src="/images/ascendone/bg.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-display font-normal text-sm uppercase tracking-widest border-b-2 border-ink/40 pb-0.5 hover:border-ink transition-colors"
        >
          &larr; All projects
        </Link>

        {/* project hero */}
        <motion.div
          {...heroAnim(0.05)}
          className="inline-flex items-center gap-2 -rotate-2 rounded-full border-2 border-ink bg-paper text-ink px-4 py-1.5 font-display text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] shadow-[3px_3px_0_var(--ink)] mt-8"
        >
          ★ Case File &middot; Folder 01
        </motion.div>

        {/* title */}
        <motion.h1
          variants={fadeUp}
          initial={arrivedViaTransition ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          transition={
            arrivedViaTransition
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.1 }
          }
          className="type-hero mt-6"
        >
          {ascendOne.title}
        </motion.h1>

        <motion.p
          {...heroAnim(0.12)}
          className="font-serif-italic text-2xl md:text-4xl text-red mt-2"
        >
          {ascendOne.type}
        </motion.p>

        {/* role */}
        <motion.p
          {...heroAnim(0.18)}
          className="mt-3 text-sm md:text-base font-bold uppercase tracking-wide text-ink/70 max-w-2xl"
        >
          {ascendOne.role}
        </motion.p>

        {/* collaboration */}
        <motion.p
          {...heroAnim(0.22)}
          className="mt-2 text-sm md:text-base italic text-ink/60 max-w-2xl font-serif-italic"
        >
          {ascendOne.collaboration}
        </motion.p>

        {/* cover image */}
        <motion.div
          {...heroAnim(0.28)}
          className="relative w-full aspect-[16/10] mt-12 -rotate-1 shadow-[10px_14px_0_rgba(0,0,0,0.3)]"
        >
          <div className="relative w-full h-full overflow-hidden rounded-sm border border-ink/10">
            <Image
              src={project.image}
              alt={ascendOne.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* scope */}
        <div className="mt-14">
          <h2 className="font-display text-2xl md:text-3xl uppercase mb-4">
            Scope
          </h2>
          <div className="flex flex-wrap gap-2">
            {ascendOne.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] md:text-xs font-bold uppercase tracking-wide border border-ink/30 rounded-full px-3 py-1.5 text-ink/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* brief / context + challenge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-14 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-paper text-ink rounded-sm border-2 border-ink p-5 md:p-6 shadow-[6px_8px_0_rgba(0,0,0,0.25)] -rotate-1">
              <h3 className="font-display text-2xl md:text-3xl uppercase mb-2">
                Brief
              </h3>
              <p className="text-base md:text-lg text-ink/80">
                {project.brief}
              </p>
            </div>
            <div className="bg-paper text-ink rounded-sm border-2 border-ink p-5 md:p-6 shadow-[6px_8px_0_rgba(0,0,0,0.25)] rotate-1">
              <h3 className="font-display text-2xl md:text-3xl uppercase mb-2">
                The Challenge
              </h3>
              <p className="text-base md:text-lg text-ink/80">
                {ascendOne.challenge}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative w-full aspect-[4/3] rotate-1">
              <Image
                src="/images/ascendone/laptop.png"
                alt="AscendONE platform preview"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain drop-shadow-[12px_18px_0_rgba(0,0,0,0.25)]"
              />
            </div>
          </motion.div>
        </div>

        {/* design solution */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-3xl"
        >
          <h2 className="font-display text-2xl md:text-3xl uppercase mb-3">
            Design Solution
          </h2>
          <p className="text-lg md:text-xl text-ink/80">{ascendOne.proposal}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <h3 className="font-display text-3xl md:text-5xl uppercase mb-8">
            Inside the platform
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ascendOne.features.map((feature) => (
              <div
                key={feature.title}
                className="bg-blue-deep border border-paper/20 rounded-sm p-5 hover:border-ink transition-colors"
              >
                <h4 className="font-display text-lg md:text-xl uppercase text-yellow">
                  {feature.title}
                </h4>
                <p className="text-sm md:text-base mt-2 text-paper/80">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* visual gallery */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h2 className="font-display text-2xl md:text-3xl uppercase mb-6">
            Visual gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(project.gallery ?? []).map((src) => (
              <div
                key={src}
                className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-ink/20 bg-paper"
              >
                <Image
                  src={src}
                  alt="AscendONE detail"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* outcome / value */}
        <div className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl uppercase mb-6">
            Outcome &amp; Value
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {ascendOne.valuePoints.map((point, i) => (
              <motion.div
                key={point.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-paper text-ink rounded-sm border-2 border-ink p-5 shadow-[5px_6px_0_rgba(0,0,0,0.2)]"
                style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
              >
                <h4 className="font-display text-xl uppercase">{point.title}</h4>
                <p className="text-sm mt-1 font-medium">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* next project navigation */}
        <div className="mt-24 pt-10 border-t-2 border-ink/15">
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
      </div>
    </section>
  );
}
