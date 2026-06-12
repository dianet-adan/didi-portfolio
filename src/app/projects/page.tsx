import Link from "next/link";
import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectIndex from "@/components/ProjectIndex";
import { folders } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main className="pt-32 md:pt-40">
        <section className="px-5 md:px-10 pb-4">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 -rotate-1 shadow-[2px_2px_0_var(--ink)] mb-6">
              Project index
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] uppercase">
              Six{" "}
              <span className="font-serif-italic text-blue normal-case">
                selected
              </span>{" "}
              files.
            </h1>
            <p className="mt-5 text-lg text-ink/70 max-w-xl">
              Jump directly into a case study, or browse the work by
              discipline.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {folders.map((folder) => (
                <Link
                  key={folder.id}
                  href={`/projects/${folder.slug}`}
                  className="inline-flex items-center gap-2 font-body font-extrabold uppercase tracking-widest text-xs md:text-sm border-2 border-ink rounded-full px-4 py-2 shadow-[2px_2px_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] transition-transform"
                  style={{ background: folder.color, color: folder.textColor }}
                >
                  {folder.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ProjectIndex showHeading={false} />
      </main>
      <SiteFooter />
    </>
  );
}
