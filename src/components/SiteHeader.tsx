"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 md:px-10 md:py-6"
    >
      <Link
        href="/"
        className="font-display text-lg md:text-xl tracking-wide bg-paper/90 backdrop-blur border-2 border-ink rounded-full px-4 py-1.5 shadow-[3px_3px_0_var(--ink)] -rotate-1"
      >
        DIDI
      </Link>

      <nav className="hidden md:flex items-center gap-3">
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-body font-semibold text-sm uppercase tracking-wide bg-paper/90 backdrop-blur border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] transition-transform"
            style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
          >
            {link.label}
          </Link>
        ))}
        <a
          href="/cv/dianet-adan-cv.pdf"
          download
          className="font-body font-semibold text-sm uppercase tracking-wide bg-yellow text-ink border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] transition-transform rotate-1"
        >
          Download CV
        </a>
      </nav>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden relative z-10 font-body font-semibold text-sm uppercase tracking-wide bg-red text-paper border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] rotate-1"
      >
        {open ? "Close" : "Menu"}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-0 bg-paper/90 backdrop-blur-sm"
            />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden absolute top-full right-5 mt-2 flex flex-col items-end gap-3"
            >
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-body font-semibold text-sm uppercase tracking-wide bg-paper border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)]"
                style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/cv/dianet-adan-cv.pdf"
              download
              onClick={() => setOpen(false)}
              className="font-body font-semibold text-sm uppercase tracking-wide bg-yellow text-ink border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] rotate-1"
            >
              Download CV
            </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
