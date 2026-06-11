import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative px-5 md:px-10 py-10 bg-cream">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t-2 border-ink/10 text-xs md:text-sm font-bold uppercase tracking-widest text-ink/50">
        <span>Dianet Ad&aacute;n &mdash; Product Designer &amp; Visual Systems Thinker</span>
        <div className="flex items-center gap-4">
          <Link href="/projects" className="hover:text-ink transition-colors">
            Projects
          </Link>
          <Link href="/about" className="hover:text-ink transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-ink transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
