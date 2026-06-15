"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { projects, Project } from "@/lib/projects";
import { useTransitionNav, useTransitionArrival } from "./TransitionProvider";

const transitionColor: Record<Project["category"], string> = {
  uxui: "var(--yellow)",
  branding: "var(--red)",
  advertising: "var(--blue)",
};

const categoryLabel: Record<Project["category"], string> = {
  uxui: "UX/UI",
  branding: "Branding",
  advertising: "Advertising",
};

// hero text / subtitle / pill colors + page background per discipline
const theme: Record<
  Project["category"],
  { bg: string; heroText: string; subtitle: string; pill: string; backBorder: string }
> = {
  uxui: {
    bg: "var(--yellow)",
    heroText: "text-ink",
    subtitle: "text-red",
    pill: "bg-red text-paper border-ink",
    backBorder: "border-ink/40 hover:border-ink",
  },
  branding: {
    bg: "var(--red)",
    heroText: "text-ink",
    subtitle: "text-yellow",
    pill: "bg-yellow text-ink border-ink",
    backBorder: "border-ink/40 hover:border-ink",
  },
  advertising: {
    bg: "var(--blue)",
    heroText: "text-paper",
    subtitle: "text-yellow",
    pill: "bg-yellow text-ink border-ink",
    backBorder: "border-paper/50 hover:border-paper",
  },
};

type Config = {
  type: string;
  dir: string;
  noteSide: "left" | "right";
  descAspect: string;
  sections: string[];
};

function sec(dir: string, n: number) {
  return Array.from({ length: n }, (_, i) => `/images/${dir}/section-${i + 1}.png`);
}

const configs: Record<string, Config> = {
  ascendone: {
    type: "Omnichannel SaaS platform",
    dir: "ao",
    noteSide: "right",
    descAspect: "1440/1600",
    sections: ["analysis", "system", "solution", "features", "screens"].map(
      (s) => `/images/ao/${s}.png`
    ),
  },
  kiddo: {
    type: "Learning platform",
    dir: "kiddo",
    noteSide: "right",
    descAspect: "1449/1500",
    sections: sec("kiddo", 5),
  },
  visionary: {
    type: "Multidisciplinary brand",
    dir: "visionary",
    noteSide: "right",
    descAspect: "1500/1487",
    sections: sec("visionary", 3),
  },
  "rebel-owners": {
    type: "A brand for pets and their owners",
    dir: "rebel-owners",
    noteSide: "left",
    descAspect: "1500/1487",
    sections: sec("rebel-owners", 3),
  },
  "beyond-meat": {
    type: "Food brand · social media",
    dir: "beyond-meat",
    noteSide: "left",
    descAspect: "1460/1500",
    sections: sec("beyond-meat", 2),
  },
  toblerone: {
    type: "Chocolate Brand",
    dir: "toblerone",
    noteSide: "left",
    descAspect: "1460/1500",
    sections: sec("toblerone", 3),
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function ImageCaseStudy({ project }: { project: Project }) {
  const cfg = configs[project.slug];
  const t = theme[project.category];
  const index = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const transitionNav = useTransitionNav();

  // True when this page was entered through the color wipe (project → project).
  // Read once on mount: in that case the wipe already provides the motion, so
  // the hero renders settled instead of fading up underneath the lifting plane
  // — which is what made the project-to-project transition feel jittery.
  const arrived = useRef(useTransitionArrival()()).current;

  // hero (above the fold): skip the entrance when arriving via the wipe so the
  // reveal shows settled content; animate normally on a direct visit.
  const heroAnim = (delay: number) =>
    arrived
      ? {}
      : {
          variants: fadeUp,
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.6, delay },
        };

  // below-the-fold sections always reveal on scroll — they never overlap the
  // wipe, so this stays consistent whether arrived or not.
  const inView = (delay = 0) => ({
    variants: fadeUp,
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay },
  });

  if (!cfg) return null;

  const notePos =
    cfg.noteSide === "right"
      ? "md:right-[3.5%]"
      : "md:left-[3.5%]";

  return (
    <section
      className={`relative pb-10 md:pb-14 overflow-hidden ${t.heroText}`}
      style={{ backgroundColor: t.bg }}
    >
      {/* hero band: textured paper field with a torn edge overhanging the cover */}
      <div className="relative z-20">
        <Image
          src={`/images/${cfg.dir}/paper-field.png`}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top pointer-events-none"
          priority
        />
        <div className="relative max-w-6xl mx-auto px-5 md:px-10 pt-32 pb-16 md:pb-24">
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 font-display font-normal text-sm uppercase tracking-widest border-b-2 pb-0.5 transition-colors ${t.backBorder}`}
          >
            &larr; All projects
          </Link>

          {/* torn paper edge, overhanging the cover */}
          <div className="pointer-events-none absolute left-1/2 right-1/2 -mx-[50vw] w-screen bottom-0 translate-y-[88%]">
            <div className="relative w-full aspect-[2400/255]">
              <Image
                src={`/images/${cfg.dir}/paper-edge.png`}
                alt=""
                fill
                sizes="100vw"
                className="object-fill"
              />
            </div>
          </div>

          <motion.div
            {...heroAnim(0.05)}
            className={`inline-flex items-center gap-2 -rotate-2 rounded-full border-2 px-4 py-1.5 font-display text-xs md:text-sm font-extrabold uppercase tracking-[0.2em] shadow-[3px_3px_0_var(--ink)] mt-8 ml-3 ${t.pill}`}
          >
            {categoryLabel[project.category]} Project
          </motion.div>

          <motion.h1 {...heroAnim(0.1)} className="type-hero mt-6">
            {project.title}
          </motion.h1>

          <motion.p
            {...heroAnim(0.14)}
            className={`font-serif-italic text-2xl md:text-4xl mt-2 ${t.subtitle}`}
          >
            {cfg.type}
          </motion.p>
        </div>
      </div>

      {/* meta: full-bleed cover, tucked under the torn edge, note on top */}
      <div className="relative w-full">
        <motion.div
          {...heroAnim(0.2)}
          className="relative z-10 w-full aspect-[16/9]"
        >
          <Image
            src={`/images/${cfg.dir}/cover.png`}
            alt={`${project.title} cover`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          {...(arrived
            ? {}
            : {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true, amount: 0.25 },
                transition: { duration: 0.7, delay: 0.1 },
              })}
          className={`relative z-[40] mx-auto -mt-14 w-[92%] max-w-lg px-0 md:mx-0 md:mt-0 md:absolute md:top-[36%] md:-translate-y-1/2 md:w-[47%] md:max-w-2xl ${notePos}`}
        >
          <div
            className="relative w-full -rotate-1 drop-shadow-[12px_16px_0_rgba(0,0,0,0.18)]"
            style={{ aspectRatio: cfg.descAspect }}
          >
            <Image
              src={`/images/${cfg.dir}/description.png`}
              alt="Project type, role, collaboration and the challenge"
              fill
              sizes="(max-width: 768px) 90vw, 42vw"
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>

      {/* full-bleed author-designed sections, seamless */}
      <div>
        {cfg.sections.map((src, i) => (
          <motion.div key={src} {...inView(i === 0 ? 0 : 0.05)} className="relative w-full -mt-px">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={src}
                alt={`${project.title} — section ${i + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* next project navigation */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 mt-10 pt-8 border-t-2 border-current/20">
        <span className="font-display font-normal text-xs md:text-sm uppercase tracking-[0.2em] opacity-60">
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
          <h3 className="type-section leading-none transition-opacity group-hover:opacity-70">
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
