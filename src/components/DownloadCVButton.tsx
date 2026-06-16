"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

// Download-CV link that briefly flips to a "Downloaded ✓" confirmation after
// the click. Shared by the header and the contact teaser so the behaviour and
// the little label swap stay consistent everywhere.
export default function DownloadCVButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  return (
    <a
      href="/cv/dianet-adan-cv.pdf"
      download
      onClick={() => {
        onClick?.();
        setDone(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setDone(false), 2400);
      }}
      className={className}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={done ? "done" : "idle"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-2"
        >
          {done ? (
            <>
              Downloaded <span aria-hidden="true">&#10003;</span>
            </>
          ) : (
            <>
              Download CV <span aria-hidden="true">&darr;</span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </a>
  );
}
