import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import ArchiveSection from "@/components/ArchiveSection";
import ProjectIndexTeaser from "@/components/ProjectIndexTeaser";
import ContactTeaser from "@/components/ContactTeaser";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main>
        <Hero />
        <ArchiveSection />
        <ProjectIndexTeaser />
        <ContactTeaser />
      </main>
      <SiteFooter />
    </>
  );
}
