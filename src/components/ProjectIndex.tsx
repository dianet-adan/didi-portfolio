"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MouseEvent, useState } from "react";
import { projects, Project } from "@/lib/projects";

const activeRowStyle: Record<Project["category"], string> = {
  uxui: "bg-yellow text-ink",
  branding: "bg-red text-paper",
  advertising: "bg-blue text-paper",
};

const activePillStyle: Record<Project["category"], string> = {
  uxui: "bg-ink text-paper border-ink",
  branding: "bg-paper text-ink border-paper",
  advertising: "bg-paper text-ink border-paper",
};

const indexItems = [
  { slug: "ascendone", pill: "UX/UI · SaaS Platform" },
  { slug: "kiddo", pill: "UX/UI · Mobile App" },
  { slug: "visionary", pill: "Branding · Premium Eyewear" },
  { slug: "rebel-owners", pill: "Branding · Pet Lifestyle" },
  { slug: "beyond-meat", pill: "Advertising · Campaign Design" },
  { slug: "toblerone", pill: "Advertising · Brand Communication" },
].map((item) => ({
  ...item,
  project: projects.find((p) => p.slug === item.slug)!,
}));

const ease = [0.32, 0.72, 0, 1] as const;

export default function ProjectIndex({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);

  // On touch devices the first tap opens the row, the second tap navigates.
  function handleClick(e: MouseEvent, slug: string) {
    if (window.matchMedia("(hover: none)").matches && active !== slug) {
      e.preventDefault();
      setActive(slug);
    }
  }

  return (
    <section
      className={`relative bg-paper grid-paper overflow-hidden ${
        showHeading ? "py-24 md:py-32" : "pt-10 md:pt-14 pb-24 md:pb-32"
      }`}
    >
      {showHeading && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12 md:mb-16 px-5 md:px-10"
        >
          <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-cream border-2 border-ink rounded-full px-4 py-1.5 -rotate-1 shadow-[2px_2px_0_var(--ink)] mb-6">
            Project index
          </span>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] uppercase">
            Six <span className="font-serif-italic text-red normal-case">selected</span> files.
          </h2>
        </motion.div>
      )}

      {/* full-bleed index rows */}
      <div className="border-t-2 border-ink">
        {indexItems.map((item, i) => {
          const { project } = item;
          const isActive = active === item.slug;
          return (
            <Link
              key={item.slug}
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setActive(item.slug)}
              onMouseLeave={() => setActive(null)}
              onClick={(e) => handleClick(e, item.slug)}
              aria-label={`${project.title} — ${item.pill}`}
              className={`relative block w-full overflow-hidden border-b-2 border-ink transition-[height,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isActive
                  ? `h-[62vw] sm:h-[36vw] md:h-[26vw] ${activeRowStyle[project.category]}`
                  : "h-[13vw] sm:h-[9.5vw] md:h-[6.8vw] bg-transparent"
              }`}
            >
              {/* giant cropped title strip */}
              <div className="relative z-10 h-full flex items-center gap-3 md:gap-8 px-4 md:px-10 pointer-events-none">
                <span
                  className={`font-body font-bold text-[10px] md:text-sm tabular-nums flex-shrink-0 transition-opacity duration-300 ${
                    isActive ? "opacity-80" : "opacity-40"
                  }`}
                >
                  0{i + 1}
                </span>
                <motion.h3
                  animate={{ x: isActive ? 18 : 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="font-display uppercase whitespace-nowrap leading-[0.8] text-[15vw] sm:text-[12vw] md:text-[10.5vw]"
                >
                  {project.title}
                </motion.h3>
                <motion.span
                  animate={{ y: isActive ? -6 : 0 }}
                  transition={{ duration: 0.45, ease }}
                  className={`hidden lg:inline-flex font-body font-extrabold text-[10px] md:text-xs uppercase tracking-[0.2em] border-2 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors duration-500 ${
                    isActive
                      ? activePillStyle[project.category]
                      : "border-ink/60 text-ink/70"
                  }`}
                >
                  {item.pill}
                </motion.span>
              </div>

              {/* image revealed inside the opened row, right side */}
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.08,
                  y: isActive ? "-50%" : "-40%",
                }}
                transition={{ duration: 0.55, ease }}
                className="pointer-events-none absolute top-1/2 right-4 md:right-12 w-[58%] sm:w-[40%] md:w-[30%] aspect-[16/10] -rotate-2 rounded-sm overflow-hidden border-2 border-ink shadow-[10px_12px_0_rgba(34,28,20,0.3)]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover"
                />
              </motion.div>

              {/* pill on small screens, shown when the row opens */}
              <motion.span
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                transition={{ duration: 0.4, ease }}
                className={`lg:hidden absolute top-3 left-4 md:left-10 inline-flex font-body font-extrabold text-[10px] uppercase tracking-[0.2em] border-2 rounded-full px-3 py-1 whitespace-nowrap ${activePillStyle[project.category]}`}
              >
                {item.pill}
              </motion.span>

              {/* CTA inside the opened row */}
              <motion.span
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                transition={{ duration: 0.45, ease, delay: isActive ? 0.12 : 0 }}
                className="absolute bottom-3 md:bottom-5 left-4 md:left-[5.5rem] inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-xs md:text-sm border-b-2 border-current pb-0.5"
              >
                View case study <span aria-hidden="true">&rarr;</span>
              </motion.span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
