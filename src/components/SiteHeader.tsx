"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DownloadCVButton from "./DownloadCVButton";

const links = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Play Zone ✦", href: "/play-zone" },
];

// the Play Zone link is accented red but navigates like every other page
const PLAY_ZONE = "/play-zone";

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
        aria-label="Dianet Adán — home"
        className="bg-paper/90 backdrop-blur border-2 border-ink rounded-full px-4 py-2 shadow-[3px_3px_0_var(--ink)] -rotate-1 hover:-translate-y-0.5 transition-transform"
      >
        <Image
          src="/images/base/logo-didi.png"
          alt="DIDI"
          width={677}
          height={412}
          priority
          className="h-5 md:h-6 w-auto"
        />
      </Link>

      <nav className="hidden md:flex items-center gap-3">
        {links.map((link, i) => {
          const isPlayZone = link.href === PLAY_ZONE;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display font-normal text-sm uppercase tracking-wide backdrop-blur border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] transition-transform ${
                isPlayZone ? "bg-red text-paper" : "bg-paper/90"
              }`}
              style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
            >
              {link.label}
            </Link>
          );
        })}
        <DownloadCVButton className="font-display font-normal text-sm uppercase tracking-wide bg-yellow text-ink border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] transition-transform rotate-1" />
      </nav>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden relative z-10 font-display font-normal text-sm uppercase tracking-wide bg-red text-paper border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] rotate-1"
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
                className={`font-display font-normal text-sm uppercase tracking-wide border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] ${
                  link.href === PLAY_ZONE ? "bg-red text-paper" : "bg-paper"
                }`}
                style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
              >
                {link.label}
              </Link>
            ))}
            <DownloadCVButton
              onClick={() => setOpen(false)}
              className="font-display font-normal text-sm uppercase tracking-wide bg-yellow text-ink border-2 border-ink rounded-full px-4 py-1.5 shadow-[2px_2px_0_var(--ink)] rotate-1"
            />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
