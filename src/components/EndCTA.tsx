"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import SiteFooter from "./SiteFooter";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/hello.dianetadan@gmail.com";

const REASONS = [
  "Project Collaboration",
  "Freelance Inquiry",
  "Full-time Opportunity",
  "Brand / Creative Direction",
  "General Question",
  "Other",
];

// Input styles — full contrast on the dark blue background
const fieldBase =
  "w-full rounded-full border-2 border-paper/50 bg-paper/15 px-5 py-3.5 font-display font-normal text-base text-paper placeholder:text-paper/55 outline-none transition-colors focus:border-yellow focus:bg-paper/20";
const labelBase =
  "block font-display font-normal text-sm uppercase tracking-widest text-paper mb-2";

function SoundArcs({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      aria-hidden="true"
      className={`w-full h-full ${flip ? "-scale-x-100" : ""}`}
    >
      <path
        d="M 38 12 Q 24 38 40 66"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M 24 4 Q 4 38 26 74"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const EMAIL = "hello@dianetadan.com";

export default function EndCTA({ fullHeight = false }: { fullHeight?: boolean }) {
  const [ringing, setRinging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ email: "", reason: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: form.email,
          reason: form.reason,
          phone: form.phone || "Not provided",
          message: form.message,
          _subject: `Portfolio inquiry: ${form.reason || "New message"}`,
        }),
      });
      const data = await res.json();
      if (data.success === "true" || res.ok) setFormSent(true);
    } catch {
      // fallback: open mail client
      const body = [form.message, form.phone ? `\nPhone: ${form.phone}` : "", `\n\nFrom: ${form.email}`].join("");
      window.location.href = `mailto:hello.dianetadan@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry: ${form.reason}`)}&body=${encodeURIComponent(body)}`;
      setFormSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(EMAIL);
      ok = true;
    } catch {
      // clipboard API unavailable (insecure context / iframe) — legacy fallback
      try {
        const ta = document.createElement("textarea");
        ta.value = EMAIL;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <section
      id="contact"
      className={`relative grid-paper-dark bg-blue text-paper px-5 md:px-10 flex flex-col overflow-hidden ${
        fullHeight
          ? "min-h-screen pt-28 pb-12 md:pt-24 md:pb-16"
          : "py-16 md:py-20"
      }`}
    >
      {/* ── Scroll hint — right edge, only on contact page ── */}
      {fullHeight && (
        <div className="pointer-events-none absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3">
          <span
            className="font-display font-normal text-[10px] uppercase tracking-[0.22em] text-paper/50"
            style={{ writingMode: "vertical-rl", letterSpacing: "0.22em" }}
          >
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 20 32" fill="none" className="w-5 h-8 text-paper/50">
              <line x1="10" y1="0" x2="10" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 18 L10 26 L17 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      )}

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-10 md:gap-8 items-center w-full flex-1">
        {/* phone receiver — nudged left and down */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -14 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "backOut" }}
          className="order-2 md:order-1 mx-auto md:mx-0 w-64 sm:w-80 md:w-full max-w-none md:mt-14 md:-ml-12"
        >
          <motion.a
            href="mailto:hello@dianetadan.com"
            aria-label="Email hello@dianetadan.com"
            onHoverStart={() => setRinging(true)}
            onHoverEnd={() => setRinging(false)}
            animate={{ y: [0, -18, 0], rotate: [-8, -4, -8] }}
            whileHover={{
              rotate: [0, -7, 7, -7, 7, -4, 0],
              y: 0,
              transition: { duration: 0.5, repeat: Infinity },
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative block w-full aspect-[1122/1402] cursor-pointer"
          >
            <Image
              src="/images/base/telefono.png"
              alt="Red retro telephone receiver"
              fill
              sizes="(max-width: 768px) 60vw, 480px"
              className="object-contain drop-shadow-[16px_22px_0_rgba(0,0,0,0.25)]"
              priority
            />

            {/* cartoon ringing marks, hand-drawn style */}
            <motion.div
              animate={
                ringing
                  ? { opacity: [0, 1, 0], scale: [0.6, 1.15, 1.3], x: [-2, -8] }
                  : { opacity: 0, scale: 0.6 }
              }
              transition={
                ringing
                  ? { duration: 0.7, repeat: Infinity, ease: "easeOut" }
                  : { duration: 0.15 }
              }
              className="absolute top-[16%] left-[6%] w-[17%] aspect-[60/80] text-yellow drop-shadow-[2px_2px_0_var(--ink)]"
            >
              <SoundArcs />
            </motion.div>
            <motion.div
              animate={
                ringing
                  ? { opacity: [0, 1, 0], scale: [0.6, 1.15, 1.3], x: [2, 8] }
                  : { opacity: 0, scale: 0.6 }
              }
              transition={
                ringing
                  ? { duration: 0.7, repeat: Infinity, ease: "easeOut", delay: 0.15 }
                  : { duration: 0.15 }
              }
              className="absolute top-[2%] right-[2%] w-[22%] aspect-[60/80] text-yellow drop-shadow-[2px_2px_0_var(--ink)]"
            >
              <SoundArcs flip />
            </motion.div>

            {/* little comic stars */}
            <motion.span
              animate={
                ringing
                  ? { opacity: [0, 1, 0], scale: [0.4, 1.2], rotate: [0, 40] }
                  : { opacity: 0, scale: 0.4 }
              }
              transition={
                ringing
                  ? { duration: 0.9, repeat: Infinity, ease: "easeOut", delay: 0.3 }
                  : { duration: 0.15 }
              }
              className="absolute -top-[6%] left-[28%] text-4xl md:text-5xl text-paper drop-shadow-[2px_2px_0_var(--ink)] select-none"
            >
              &#10022;
            </motion.span>
            <motion.span
              animate={
                ringing
                  ? { opacity: [0, 1, 0], scale: [0.4, 1], rotate: [0, -35] }
                  : { opacity: 0, scale: 0.4 }
              }
              transition={
                ringing
                  ? { duration: 0.8, repeat: Infinity, ease: "easeOut", delay: 0.5 }
                  : { duration: 0.15 }
              }
              className="absolute top-[18%] right-[28%] text-2xl md:text-3xl text-yellow drop-shadow-[1px_1px_0_var(--ink)] select-none"
            >
              &#10022;
            </motion.span>
          </motion.a>
        </motion.div>

        {/* text content */}
        <div className="order-1 md:order-2 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display uppercase leading-[0.9] text-yellow text-[15vw] sm:text-[11vw] md:text-[7.2vw] whitespace-nowrap"
          >
            Let&apos;s
            <br />
            Have a call
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif-italic text-2xl md:text-4xl text-paper/90 mt-4"
          >
            ...about your next project
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email ${EMAIL} to clipboard`}
              className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base bg-yellow text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
            >
              {copied ? "Copied to clipboard ✓" : EMAIL}
            </button>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base bg-paper text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all"
            >
              Browse the archive
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Contact form — visible only on the full-height contact page ── */}
      {fullHeight && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-6xl mx-auto w-full mt-6 mb-10"
        >
          <div className="border-t-2 border-paper/15 pt-10">
            <span className="inline-block font-display text-xs uppercase tracking-[0.22em] text-paper/45 mb-8">
              Or send a message directly
            </span>

            {formSent ? (
              <p className="font-display text-2xl md:text-3xl text-yellow">
                Message on its way — I&apos;ll be in touch soon ✦
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid gap-5 sm:grid-cols-2"
              >
                {/* Email */}
                <div className="sm:col-span-1">
                  <label className={labelBase}>Your email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@studio.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={fieldBase}
                  />
                </div>

                {/* Reason */}
                <div className="sm:col-span-1">
                  <label className={labelBase}>Reason for reaching out *</label>
                  <select
                    required
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    className={`${fieldBase} cursor-pointer appearance-none`}
                  >
                    <option value="" disabled>Select a reason…</option>
                    {REASONS.map((r) => (
                      <option key={r} value={r} className="bg-blue text-paper">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone */}
                <div className="sm:col-span-1">
                  <label className={labelBase}>
                    Phone{" "}
                    <span className="text-paper/30 normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 000 000 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={fieldBase}
                  />
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className={labelBase}>Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project or idea…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${fieldBase} rounded-2xl resize-none`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base bg-yellow text-ink border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {submitting ? "Sending…" : "Send message →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      )}

      <SiteFooter />
    </section>
  );
}
