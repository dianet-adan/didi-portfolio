import Link from "next/link";
import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import ContactTeaser from "@/components/ContactTeaser";
import ProjectIndex from "@/components/ProjectIndex";
import { folders } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main className="pt-32 md:pt-40 bg-cream grid-paper">
        <section className="px-5 md:px-10 pb-4">
          <div>
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
              Jump directly into a case study, or browse the work by
              discipline.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {folders.map((folder) => (
                <Link
                  key={folder.id}
                  href={`/projects/${folder.slug}`}
                  className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
                  style={{ background: folder.color, color: folder.textColor }}
                >
                  {folder.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ProjectIndex showHeading={false} bare />
        <ContactTeaser />
      </main>
    </>
  );
}
