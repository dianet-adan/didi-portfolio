"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Archive", href: "#archive" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:px-10 md:py-6"
    >
      <a
        href="#top"
        className="font-display text-lg md:text-xl tracking-wide bg-paper/90 backdrop-blur border-2 border-ink rounded-full px-4 py-1.5 shadow-[3px_3px_0_var(--ink)] -rotate-1"
      >
        DIANET AD&Aacute;N
      </a>

      <nav className="hidden md:flex items-center gap-3">
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="font-body font-semibold text-sm uppercase tracking-wide bg-paper/90 backdrop-blur border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] transition-transform"
            style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="md:hidden font-body font-semibold text-sm uppercase tracking-wide bg-red text-paper border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] rotate-1"
      >
        Contact
      </a>
    </motion.header>
  );
}
