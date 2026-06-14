"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MouseEvent, useState } from "react";
import { projects, Project } from "@/lib/projects";
import { useTransitionNav } from "./TransitionProvider";

const activeRowStyle: Record<Project["category"], string> = {
  uxui: "bg-yellow text-ink",
  branding: "bg-red text-paper",
  advertising: "bg-blue text-paper",
};

const categoryColor: Record<Project["category"], string> = {
  uxui: "var(--yellow)",
  branding: "var(--red)",
  advertising: "var(--blue)",
};

const activePillStyle: Record<Project["category"], string> = {
  uxui: "bg-ink text-paper border-ink",
  branding: "bg-paper text-ink border-paper",
  advertising: "bg-paper text-ink border-paper",
};

const categoryPill: Record<Project["category"], string> = {
  uxui: "UX/UI",
  branding: "Branding",
  advertising: "Advertising",
};

const indexItems = [
  "ascendone",
  "kiddo",
  "visionary",
  "rebel-owners",
  "beyond-meat",
  "toblerone",
].map((slug) => {
  const project = projects.find((p) => p.slug === slug)!;
  return { slug, project, pill: categoryPill[project.category] };
});

// one project per discipline, used on the homepage teaser index
const featuredSlugs = ["ascendone", "visionary", "beyond-meat"];

const ease = [0.32, 0.72, 0, 1] as const;

export default function ProjectIndex({
  showHeading = true,
  featured = false,
  bare = false,
}: {
  showHeading?: boolean;
  featured?: boolean;
  bare?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);
  const transitionNav = useTransitionNav();
  const items = featured
    ? indexItems.filter((item) => featuredSlugs.includes(item.slug))
    : indexItems;

  // On touch devices the first tap opens the row, the second tap navigates.
  // Navigation expands the clicked row's color plane to fill the screen.
  function handleClick(
    e: MouseEvent,
    slug: string,
    category: Project["category"]
  ) {
    e.preventDefault();
    if (window.matchMedia("(hover: none)").matches && active !== slug) {
      setActive(slug);
      return;
    }
    transitionNav(`/projects/${slug}`, categoryColor[category]);
  }

  return (
    <section
      className={`relative overflow-hidden ${bare ? "" : "bg-cream grid-paper"} ${
        showHeading ? "pt-4 md:pt-6 pb-24 md:pb-32" : "pt-10 md:pt-14 pb-24 md:pb-32"
      }`}
    >
      {showHeading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10 px-5 md:px-10"
        >
          <span className="inline-block font-display font-normal text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 -rotate-1 shadow-[2px_2px_0_var(--ink)]">
            Project index
          </span>
        </motion.div>
      )}

      {/* full-bleed index rows */}
      <div className="border-t-2 border-ink">
        {items.map((item, i) => {
          const { project } = item;
          const isActive = active === item.slug;
          return (
            <div
              key={item.slug}
              className={`relative ${isActive ? "z-20" : "z-0"}`}
            >
              <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={() => setActive(item.slug)}
                onMouseLeave={() => setActive(null)}
                onClick={(e) =>
                  handleClick(e, item.slug, project.category)
                }
                aria-label={`${project.title} — ${item.pill}`}
                className={`relative block w-full overflow-hidden border-b-2 border-ink transition-[height,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isActive
                    ? `h-[calc(20vw+44px)] sm:h-[calc(9.5vw+40px)] md:h-[calc(7.5vw+40px)] ${activeRowStyle[project.category]}`
                    : "h-[calc(8.2vw+24px)] sm:h-[calc(6.6vw+24px)] md:h-[calc(5.6vw+26px)] bg-transparent"
                }`}
              >
                {/* giant title strip: air on top, glyphs crossing the bottom rule */}
                <div className="relative z-10 h-full flex items-end px-4 md:px-10 pointer-events-none">
                  <span
                    className={`self-center mr-3 md:mr-6 font-display font-normal text-[10px] md:text-sm tabular-nums flex-shrink-0 transition-opacity duration-300 ${
                      isActive ? "opacity-80" : "opacity-40"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {/* title + pill move together so their 24px gap never changes */}
                  <motion.div
                    animate={{ x: isActive ? 18 : 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex items-center gap-6 -mb-[0.1em]"
                  >
                    <h3 className="font-display uppercase whitespace-nowrap leading-[0.78] text-[12vw] sm:text-[9.5vw] md:text-[8vw]">
                      {project.title}
                    </h3>
                    <span
                      className={`hidden sm:inline-flex font-display font-normal text-[11px] md:text-xs uppercase tracking-[0.2em] border-2 rounded-full px-3.5 py-1.5 whitespace-nowrap transition-colors duration-500 ${
                        isActive
                          ? activePillStyle[project.category]
                          : "border-ink/60 text-ink/70"
                      }`}
                    >
                      {item.pill}
                    </span>
                  </motion.div>
                </div>

                {/* pill on small screens, shown when the row opens */}
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                  transition={{ duration: 0.4, ease }}
                  className={`sm:hidden absolute top-3 left-4 inline-flex font-display font-normal text-[10px] uppercase tracking-[0.2em] border-2 rounded-full px-3 py-1 whitespace-nowrap ${activePillStyle[project.category]}`}
                >
                  {item.pill}
                </motion.span>
              </Link>

              {/* image breaks out of the row lines, right side */}
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.9,
                  y: isActive ? "-50%" : "-42%",
                }}
                transition={{ duration: 0.55, ease }}
                className="pointer-events-none absolute top-1/2 right-4 md:right-12 w-[40%] sm:w-[25%] md:w-[20%] aspect-[16/10] -rotate-2 rounded-sm overflow-hidden shadow-[10px_12px_0_rgba(34,28,20,0.3)]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
