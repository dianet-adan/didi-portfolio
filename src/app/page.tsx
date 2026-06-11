import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import ArchiveSection from "@/components/ArchiveSection";
import AboutSection from "@/components/AboutSection";
import EndCTA from "@/components/EndCTA";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main>
        <Hero />
        <ArchiveSection />
        <AboutSection />
        <EndCTA />
      </main>
    </>
  );
}
