"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import ContactTeaser from "@/components/ContactTeaser";
import ProjectIndex from "@/components/ProjectIndex";
import { type CategoryId } from "@/lib/projects";

type Tab = "all" | CategoryId;

const TABS: { id: Tab; label: string; activeBg: string; activeText: string }[] =
  [
    { id: "all",         label: "All Projects", activeBg: "bg-ink",    activeText: "text-paper" },
    { id: "uxui",        label: "UX/UI",        activeBg: "bg-yellow", activeText: "text-ink"   },
    { id: "branding",    label: "Branding",     activeBg: "bg-red",    activeText: "text-paper" },
    { id: "advertising", label: "Advertising",  activeBg: "bg-blue",   activeText: "text-paper" },
  ];

export default function ProjectsPage() {
  const [active, setActive] = useState<Tab>("all");

  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main className="pt-32 md:pt-40 bg-cream grid-paper">
        <section className="px-5 md:px-10 pb-4">
          <span className="inline-block font-display font-normal text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 -rotate-1 shadow-[2px_2px_0_var(--ink)] mb-6">
            Project index
          </span>
          <h1 className="type-section">
            Selected{" "}
            <span className="font-serif-italic text-red normal-case">
              projects
            </span>
          </h1>
          <p className="mt-5 type-body text-ink/70 max-w-2xl">
            Jump directly into a case study, or browse the work by discipline.
          </p>
        </section>

        {/* ── Sticky tab bar ── */}
        <div className="sticky top-[72px] z-40 bg-cream/90 backdrop-blur-sm border-b-2 border-ink/10 px-5 md:px-10 py-3 mt-6">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`shrink-0 font-display font-normal text-xs md:text-sm uppercase tracking-widest rounded-full border-2 border-ink px-5 py-2 shadow-[2px_2px_0_var(--ink)] transition-all hover:-translate-y-0.5 ${
                    isActive
                      ? `${tab.activeBg} ${tab.activeText}`
                      : "bg-transparent text-ink/55 hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Project rows — re-animate on tab change ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectIndex
              showHeading={false}
              bare
              category={active === "all" ? undefined : active}
            />
          </motion.div>
        </AnimatePresence>

        <ContactTeaser />
      </main>
    </>
  );
}
