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
      className={`relative px-5 md:px-10 bg-paper grid-paper overflow-hidden ${
        showHeading ? "py-24 md:py-32" : "pt-10 md:pt-14 pb-24 md:pb-32"
      }`}
    >
      {showHeading && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-cream border-2 border-ink rounded-full px-4 py-1.5 -rotate-1 shadow-[2px_2px_0_var(--ink)] mb-6">
            Project index
          </span>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] uppercase">
            Six <span className="font-serif-italic text-red normal-case">selected</span> files.
          </h2>
        </motion.div>
      )}

      <div className="relative max-w-6xl mx-auto border-t-2 border-ink/60">
        {indexItems.map((item, i) => {
          const { project } = item;
          const isActive = active === item.slug;
          return (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={() => setActive(item.slug)}
                onMouseLeave={() => setActive(null)}
                onClick={(e) => handleClick(e, item.slug)}
                className={`group block border-b-2 border-ink/60 overflow-hidden transition-colors duration-500 ${
                  isActive ? activeRowStyle[project.category] : "bg-transparent"
                }`}
              >
                {/* compressed row header */}
                <div className="relative flex items-center justify-between gap-4 px-2 md:px-6 py-2 md:py-3">
                  <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
                    <span
                      className={`font-body font-bold text-xs md:text-sm tabular-nums flex-shrink-0 transition-opacity duration-300 ${
                        isActive ? "opacity-80" : "opacity-40"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <motion.h3
                      animate={{ x: isActive ? 16 : 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="font-display uppercase leading-[0.82] text-[15vw] sm:text-[11vw] md:text-[7.5vw] lg:text-[6.5vw] -my-1 md:-my-2 whitespace-nowrap"
                    >
                      {project.title}
                    </motion.h3>
                  </div>

                  <div className="hidden sm:flex items-center gap-4 md:gap-6 flex-shrink-0">
                    <motion.span
                      animate={{ y: isActive ? -3 : 0 }}
                      transition={{ duration: 0.4, ease }}
                      className={`font-body font-extrabold text-[10px] md:text-xs uppercase tracking-[0.2em] border-2 rounded-full px-3 py-1.5 transition-colors duration-500 ${
                        isActive
                          ? activePillStyle[project.category]
                          : "border-ink/60 text-ink/70 bg-transparent"
                      }`}
                    >
                      {item.pill}
                    </motion.span>
                    <motion.span
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        x: isActive ? 4 : 0,
                        y: isActive ? -4 : 0,
                      }}
                      transition={{ duration: 0.4, ease }}
                      className="text-2xl md:text-3xl"
                    >
                      &#8599;
                    </motion.span>
                  </div>
                </div>

                {/* mobile pill row */}
                <div className="sm:hidden px-2 pb-2 pl-9">
                  <span
                    className={`inline-block font-body font-extrabold text-[10px] uppercase tracking-[0.2em] border-2 rounded-full px-3 py-1 transition-colors duration-500 ${
                      isActive
                        ? activePillStyle[project.category]
                        : "border-ink/60 text-ink/70"
                    }`}
                  >
                    {item.pill}
                  </span>
                </div>

                {/* expanding reveal */}
                <motion.div
                  initial={false}
                  animate={{ height: isActive ? "auto" : 0 }}
                  transition={{ duration: 0.55, ease }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-10 px-2 md:px-6 pb-6 md:pb-8 pt-2 md:pt-1 md:pl-[7.5rem]">
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 1.06,
                        y: isActive ? 0 : 24,
                      }}
                      transition={{ duration: 0.55, ease }}
                      className="relative w-full md:w-[28rem] aspect-[16/9] flex-shrink-0 -rotate-1 border-2 border-ink/80 rounded-sm overflow-hidden shadow-[8px_10px_0_rgba(34,28,20,0.25)]"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover"
                      />
                    </motion.div>

                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                      transition={{ duration: 0.45, ease, delay: isActive ? 0.12 : 0 }}
                      className="inline-flex items-center gap-2 self-start font-body font-extrabold uppercase tracking-widest text-xs md:text-sm border-b-2 border-current pb-1 mb-1"
                    >
                      View case study <span aria-hidden="true">&rarr;</span>
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
