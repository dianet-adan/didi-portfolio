import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import AboutSection from "@/components/AboutSection";
import ContactTeaser from "@/components/ContactTeaser";
import SiteFooter from "@/components/SiteFooter";

export default function AboutPage() {
  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main className="pt-20">
        <AboutSection />
        <ContactTeaser />
      </main>
      <SiteFooter />
    </>
  );
}
