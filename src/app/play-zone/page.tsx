"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import GrainOverlay from "@/components/GrainOverlay";
import SiteHeader from "@/components/SiteHeader";
import PlayZoneGame from "@/components/PlayZoneGame";

type Status = "intro" | "playing" | "lost" | "won";

const btn =
  "inline-flex items-center gap-2 font-display font-normal uppercase tracking-widest text-sm md:text-base border-2 border-ink rounded-full px-7 py-3.5 shadow-[4px_4px_0_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--ink)] transition-all";

// little curved arrow doodle that floats near the joke note
function NoteDoodle() {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute -top-10 -right-6 w-16 h-16"
      animate={{ y: [0, -5, 0], rotate: [0, -4, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M10 16 C 40 2, 66 14, 60 46"
        stroke="var(--yellow)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M50 40 L60 48 L70 38"
        stroke="var(--yellow)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export default function PlayZonePage() {
  const [status, setStatus] = useState<Status>("intro");
  const [runId, setRunId] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem("pz-highscore") || 0);
    if (saved) setHighScore(saved);
  }, []);

  const start = useCallback(() => {
    setRunId((r) => r + 1);
    setStatus("playing");
  }, []);

  const onEnd = useCallback((score: number, won: boolean) => {
    setHighScore((hs) => {
      const next = Math.max(hs, score);
      localStorage.setItem("pz-highscore", String(next));
      return next;
    });
    setStatus(won ? "won" : "lost");
  }, []);

  return (
    <>
      <GrainOverlay />
      <SiteHeader />
      <main className="relative min-h-screen bg-blue grid-paper-dark text-paper overflow-hidden">
        <div className="relative max-w-[1640px] mx-auto px-5 md:px-12 pt-24 md:pt-28 pb-10 grid grid-cols-1 lg:grid-cols-[1fr_1.12fr] gap-10 lg:gap-16 items-center lg:min-h-[calc(100vh-1rem)]">
          {/* left: intro copy + notes */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative z-10 w-72 md:w-[26rem] -rotate-2 -mb-4 md:-mb-7">
              <Image
                src="/images/play-zone/welcome.png"
                alt="Welcome to"
                width={722}
                height={240}
                className="w-full h-auto drop-shadow-[3px_4px_0_rgba(0,0,0,0.25)]"
                priority
              />
            </div>

            <h1 className="relative font-display uppercase leading-[0.9] text-yellow text-[16vw] sm:text-[11vw] lg:text-[6.6vw]">
              The Play Zone
            </h1>
            <p className="font-serif-italic text-3xl md:text-5xl text-paper/90 mt-4">
              a tiny break from the archive.
            </p>
            <p className="mt-5 max-w-md text-base md:text-lg text-paper/80 leading-relaxed">
              Click the game screen to start. Press{" "}
              <span className="font-semibold text-paper">space</span> &mdash; or
              click &mdash; to jump. Dodge the archive clutter and grab as many{" "}
              <span className="font-semibold text-yellow">stars</span> as you can.
            </p>

            {/* contextual CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-9">
              {status === "intro" || status === "playing" ? (
                <>
                  <motion.button
                    onClick={start}
                    animate={{ rotate: [-1.5, 1.5, -1.5], y: [0, -3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.06, rotate: 0 }}
                    whileTap={{ scale: 0.97 }}
                    className={`${btn} bg-red text-paper`}
                  >
                    {status === "playing" ? "Restart" : "Let's play"}{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </motion.button>
                  <Link
                    href="/"
                    className={`${btn} bg-paper text-ink`}
                  >
                    Return to archive
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/contact" className={`${btn} bg-yellow text-ink`}>
                    Contact me <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <button onClick={start} className={`${btn} bg-red text-paper`}>
                    Play again
                  </button>
                </>
              )}
            </div>

            {/* notes + stickers */}
            <div className="relative mt-12 flex flex-wrap items-start gap-6">
              <div className="relative w-56 md:w-72 -rotate-3">
                <Image
                  src="/images/play-zone/note-intro.png"
                  alt="This secret corner is for curiosity, creativity and a bit of joy."
                  width={903}
                  height={653}
                  className="w-full h-auto"
                />
              </div>
              <div className="group/note relative w-64 md:w-80 rotate-1">
                <Image
                  src="/images/play-zone/note-joke.png"
                  alt="If you lose: contact me. If you win: contact me too."
                  width={1320}
                  height={750}
                  className="w-full h-auto"
                />
                <NoteDoodle />
              </div>

              {/* stickers overlapping the paper notes */}
              <motion.div
                animate={{ rotate: [-12, -6, -12], y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-5 z-20 w-16 md:w-20 drop-shadow-[2px_3px_0_rgba(0,0,0,0.2)]"
              >
                <Image src="/images/stickers/6.png" alt="" width={120} height={120} className="w-full h-auto" />
              </motion.div>
              <motion.div
                animate={{ rotate: [6, 12, 6], y: [0, -3, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute -bottom-7 left-[38%] z-20 w-16 md:w-20 drop-shadow-[2px_3px_0_rgba(0,0,0,0.2)]"
              >
                <Image src="/images/stickers/5.png" alt="" width={120} height={120} className="w-full h-auto" />
              </motion.div>
            </div>
          </motion.div>

          {/* right: game screen */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            {/* tight wrapper so the lose/win overlay matches the game screen
                exactly instead of spilling past it */}
            <div className="relative">
              <PlayZoneGame
                key={runId}
                playing={status === "playing"}
                highScore={highScore}
                onEnd={onEnd}
                onStart={start}
              />

              {/* state overlays — only on lose / win, clipped to the screen */}
              <AnimatePresence>
                {(status === "lost" || status === "won") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center p-6 overflow-hidden rounded-[2rem]"
                  >
                    <div className="absolute inset-0 bg-ink/82" />
                  <div className="relative text-center max-w-sm">
                    {status === "lost" && (
                      <>
                        <h2 className="font-display uppercase text-yellow text-4xl md:text-5xl leading-[0.95]">
                          You crashed.
                        </h2>
                        <p className="mt-3 text-paper/90">
                          Good thing design projects are easier with help.
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-6">
                          <Link
                            href="/contact"
                            className={`${btn} bg-yellow text-ink`}
                          >
                            Contact me
                          </Link>
                          <button
                            onClick={start}
                            className={`${btn} bg-paper text-ink`}
                          >
                            Play again
                          </button>
                        </div>
                      </>
                    )}
                    {status === "won" && (
                      <>
                        <h2 className="font-display uppercase text-yellow text-4xl md:text-5xl leading-[0.95]">
                          You win.
                        </h2>
                        <p className="mt-3 text-paper/90">
                          Nice reflexes. Now let&apos;s build something together.
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-6">
                          <Link
                            href="/contact"
                            className={`${btn} bg-yellow text-ink`}
                          >
                            Contact me too
                          </Link>
                          <button
                            onClick={start}
                            className={`${btn} bg-paper text-ink`}
                          >
                            Play again
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* collect stars note */}
            <div className="relative w-80 md:w-[28rem] mx-auto mt-7 -rotate-1">
              <Image
                src="/images/play-zone/note-stars.png"
                alt="Collect stars for extra points!"
                width={1425}
                height={241}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
