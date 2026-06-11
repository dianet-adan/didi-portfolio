import { notFound } from "next/navigation";
import { projects, folders } from "@/lib/projects";
import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EndCTA from "@/components/EndCTA";
import AscendOneCaseStudy from "@/components/AscendOneCaseStudy";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import CategoryPage from "@/components/CategoryPage";

export function generateStaticParams() {
  return [
    ...folders.map((folder) => ({ slug: folder.slug })),
    ...projects.map((project) => ({ slug: project.slug })),
  ];
}

export default async function ProjectsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const folder = folders.find((f) => f.slug === slug);
  if (folder) {
    return (
      <>
        <GrainOverlay />
        <SiteHeader />
        <main>
          <CategoryPage folder={folder} />
        </main>
        <SiteFooter />
      </>
    );
  }

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
