import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import EndCTA from "@/components/EndCTA";
import AscendOneCaseStudy from "@/components/AscendOneCaseStudy";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main>
        {project.slug === "ascendone" ? (
          <AscendOneCaseStudy />
        ) : (
          <ProjectCaseStudy project={project} />
        )}
        <EndCTA />
      </main>
    </>
  );
}
