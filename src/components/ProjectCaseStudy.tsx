"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Project, folders, projects } from "@/lib/projects";
import { useTransitionNav, useTransitionArrival } from "./TransitionProvider";

const categoryLabel: Record<Project["category"], string> = {
  uxui: "UX/UI",
  branding: "Branding",
  advertising: "Advertising",
};

// Each case study page lives on its category color, matching the
// expanding color plane of the page transition.
const theme: Record<
  Project["category"],
  {
    bg: string;
    text: string;
    soft60: string;
    soft75: string;
    accent: string;
    hoverAccent: string;
    borderSoft: string;
    divider: string;
    backBorder: string;
  }
> = {
  uxui: {
    bg: "var(--yellow)",
    text: "text-ink",
    soft60: "text-ink/60",
    soft75: "text-ink/80",
    accent: "text-red",
    hoverAccent: "group-hover:text-red",
    borderSoft: "border-ink/30",
    divider: "border-ink/15",
    backBorder: "border-ink/40 hover:border-ink",
  },
  branding: {
    bg: "var(--red)",
    text: "text-paper",
    soft60: "text-paper/70",
    soft75: "text-paper/85",
    accent: "text-yellow",
    hoverAccent: "group-hover:text-yellow",
    borderSoft: "border-paper/40",
    divider: "border-paper/25",
    backBorder: "border-paper/50 hover:border-paper",
  },
  advertising: {
    bg: "var(--blue)",
    text: "text-paper",
    soft60: "text-paper/70",
    soft75: "text-paper/85",
    accent: "text-yellow",
    hoverAccent: "group-hover:text-yellow",
    borderSoft: "border-paper/40",
    divider: "border-paper/25",
    backBorder: "border-paper/50 hover:border-paper",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function OMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={className}
    >
      <rect x="2.5" y="1.5" width="19" height="27" rx="9.5" />
      <rect x="8" y="32" width="8" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

const transitionColor: Record<Project["category"], string> = {
  uxui: "var(--yellow)",
  branding: "var(--red)",
  advertising: "var(--blue)",
};

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const folder = folders.find((f) => f.id === project.category);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const transitionNav = useTransitionNav();
  const arrivedViaTransition = useTransitionArrival()();
  const t = theme[project.category];

  // When arriving through the color plane, hold the hero content hidden and
  // fade it in (staggered) only after the plane has cleared, so nothing pops.
  const [revealed, setRevealed] = useState(!arrivedViaTransition);
  useEffect(() => {
    if (!arrivedViaTransition) return;
    const id = setTimeout(() => setRevealed(true), 720);
    return () => clearTimeout(id);
  }, [arrivedViaTransition]);

  // hero-cluster entrance: controlled on transition arrival, scroll-based otherwise
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
    <section
      className={`relative grid-paper-dark px-5 md:px-10 pt-32 pb-24 md:pb-32 overflow-hidden ${t.text}`}
      style={{ backgroundColor: t.bg }}
    >
      <div className="relative max-w-5xl mx-auto">
        <Link
          href="/projects"
          className={`inline-flex items-center gap-2 font-display font-normal text-sm uppercase tracking-widest border-b-2 pb-0.5 transition-colors ${t.backBorder}`}
        >
          &larr; All projects
        </Link>

        {/* project hero */}
        <motion.div
          {...heroAnim(0.05)}
          className="inline-flex items-center gap-2 -rotate-2 rounded-full border-2 border-ink px-4 py-1.5 font-display text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] shadow-[3px_3px_0_var(--ink)] mt-8 bg-paper text-ink"
        >
          {folder?.number} &middot; {categoryLabel[project.category]}
        </motion.div>

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
          {project.title}
        </motion.h1>

        {project.type && (
          <motion.p
            {...heroAnim(0.12)}
            className={`font-serif-italic text-2xl md:text-4xl mt-2 ${t.accent}`}
          >
            {project.type}
          </motion.p>
        )}

        {/* role */}
        <motion.p
          {...heroAnim(0.18)}
          className={`mt-3 text-sm md:text-base font-bold uppercase tracking-wide max-w-2xl ${t.soft60}`}
        >
          {project.role}
        </motion.p>

        {/* cover image */}
        <motion.div
          {...heroAnim(0.24)}
          className="relative w-full aspect-[16/10] mt-12 -rotate-1 shadow-[10px_14px_0_rgba(34,28,20,0.25)]"
        >
          <div className="relative w-full h-full overflow-hidden rounded-sm border border-ink/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* brief / context */}
        <div className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl uppercase mb-3">
            Brief
          </h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className={`type-body ${t.soft75}`}
          >
            {project.brief}
          </motion.p>
        </div>

        {/* collaboration */}
        {project.collaboration && (
          <div className="mt-10 max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl uppercase mb-3">
              Collaboration
            </h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-base md:text-lg italic font-serif-italic ${t.soft60}`}
            >
              {project.collaboration}
            </motion.p>
          </div>
        )}

        {/* scope */}
        <div className="mt-14">
          <h2 className="font-display text-2xl md:text-3xl uppercase mb-4">
            Scope
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[11px] md:text-xs font-bold uppercase tracking-wide border rounded-full px-3 py-1.5 ${t.borderSoft} ${t.soft75}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* brand showcase bento */}
        {project.bento && (
          <div className="mt-16">
            <h2 className="font-display text-2xl md:text-3xl uppercase mb-6">
              Brand showcase
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 md:gap-5 md:h-[640px]">
              {/* large mockup */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="relative md:row-span-2 rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-full bg-paper border border-ink/10"
              >
                <Image
                  src={project.bento.large}
                  alt={`${project.title} product mockup`}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>

              {/* brand identity card */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-auto md:h-full"
              >
                <Image
                  src={project.bento.brandCard.background}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative h-full flex flex-col items-center justify-center text-center text-paper px-6 py-8 gap-3 md:gap-4">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-paper/60">
                    {project.bento.brandCard.eyebrow}
                  </span>
                  <div>
                    <h3 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl">
                      {project.bento.brandCard.title}
                    </h3>
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] mt-2 text-paper/80">
                      {project.bento.brandCard.tagline}
                    </p>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-paper/60 mt-2">
                    {project.bento.brandCard.groupLabel}
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                    {project.bento.brandCard.items.map(([line1, line2]) => (
                      <div key={`${line1}-${line2}`} className="flex items-center gap-2">
                        <OMark className="w-4 h-6 md:w-5 md:h-7 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-bold uppercase leading-tight text-left">
                          {line1}
                          <br />
                          {line2}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* bottom row */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid grid-cols-2 gap-4 md:gap-5 md:h-full"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-full bg-paper border border-ink/10">
                  <Image
                    src={project.bento.bottomMiddle}
                    alt={`${project.title} packaging detail`}
                    fill
                    sizes="(max-width: 768px) 50vw, 27vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-full bg-paper border border-ink/10">
                  <Image
                    src={project.bento.bottomRight}
                    alt={`${project.title} product detail`}
                    fill
                    sizes="(max-width: 768px) 50vw, 27vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* visual gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl md:text-3xl uppercase mb-6">
              Visual gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 bg-paper"
                >
                  <Image
                    src={src}
                    alt={`${project.title} detail`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* next project navigation */}
        <div className={`mt-24 pt-10 border-t-2 ${t.divider}`}>
          <span
            className={`font-display font-normal text-xs md:text-sm uppercase tracking-[0.2em] ${t.soft60}`}
          >
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
            <h3
              className={`type-section leading-none transition-colors ${t.hoverAccent}`}
            >
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
