import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import AboutSection from "@/components/AboutSection";
import ContactTeaser from "@/components/ContactTeaser";

export default function AboutPage() {
  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main>
        <AboutSection />
        <ContactTeaser />
      </main>
    </>
  );
}
