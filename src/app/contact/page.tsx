import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import EndCTA from "@/components/EndCTA";

export default function ContactPage() {
  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main className="pt-20">
        <EndCTA />
      </main>
    </>
  );
}
