import Link from "next/link";

// Footer bar designed to sit on top of the blue contact zone (inside
// ContactTeaser / EndCTA), unified across the site.
export default function SiteFooter() {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm font-display uppercase tracking-widest text-paper/60">
      <span>Dianet Ad&aacute;n &mdash; All rights reserved 2026</span>
      <div className="flex items-center gap-5">
        <Link href="/projects" className="hover:text-paper transition-colors">
          Projects
        </Link>
        <Link href="/about" className="hover:text-paper transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-paper transition-colors">
          Contact
        </Link>
      </div>
    </div>
  );
}
