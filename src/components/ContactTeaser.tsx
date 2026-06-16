"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SiteFooter from "./SiteFooter";
import DownloadCVButton from "./DownloadCVButton";

export default function ContactTeaser() {
  return (
    <section className="relative grid-paper-dark bg-blue text-paper px-5 md:px-10 py-16 md:py-20 overflow-hidden flex flex-col">
      <div className="relative max-w-6xl mx-auto text-center w-full">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-normal text-xs md:text-sm uppercase tracking-widest"
        >
          Have a product, brand or idea?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="type-section text-yellow mt-2"
        >
          Let&apos;s give it shape.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base bg-yellow text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
          >
            Get in touch <span aria-hidden="true">&rarr;</span>
          </Link>
          <DownloadCVButton className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base bg-paper text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all" />
        </motion.div>
      </div>

      <SiteFooter />
    </section>
  );
}
