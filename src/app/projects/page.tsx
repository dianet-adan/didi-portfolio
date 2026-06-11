import Link from "next/link";
import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectDocument from "@/components/ProjectDocument";
import { folders } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main className="pt-32 md:pt-40">
        <section className="px-5 md:px-10 pb-12">
          <div className="max-w-6xl mx-auto">
            <span className="inline-block font-body font-bold text-xs md:text-sm uppercase tracking-[0.2em] bg-paper border-2 border-ink rounded-full px-4 py-1.5 -rotate-1 shadow-[2px_2px_0_var(--ink)] mb-6">
              All projects
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] uppercase">
              The full
              <br />
              <span className="font-serif-italic text-blue normal-case">
                archive
              </span>
              .
            </h1>
            <p className="mt-5 text-lg text-ink/70 max-w-xl">
              Six projects across UX/UI, Branding and Advertising. Jump to a
              category folder or open any project directly.
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

        {folders.map((folder, fi) => (
          <section
            key={folder.id}
            id={folder.slug}
            className={`px-5 md:px-10 py-16 md:py-20 ${fi % 2 === 0 ? "bg-cream" : "bg-paper"}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-baseline gap-4 mb-10">
                <span
                  className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border-2 border-ink"
                  style={{ background: folder.color, color: folder.textColor }}
                >
                  {folder.number}
                </span>
                <h2 className="font-display text-3xl md:text-5xl uppercase leading-none">
                  {folder.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                {folder.projects.map((project, idx) => (
                  <ProjectDocument key={project.slug} project={project} index={idx} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
