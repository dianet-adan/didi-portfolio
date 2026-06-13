"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Overlay = { color: string } | null;

const TransitionContext = createContext<(href: string, color?: string) => void>(
  () => {}
);

// Navigate with a full-screen color sweep. Falls back to a plain push
// if a transition is already running.
export function useTransitionNav() {
  return useContext(TransitionContext);
}

const COVER_MS = 600;

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [overlay, setOverlay] = useState<Overlay>(null);
  const pendingRef = useRef(false);

  const navigate = useCallback(
    (href: string, color: string = "var(--ink)") => {
      if (pendingRef.current) return;
      if (href === pathname) return;
      pendingRef.current = true;
      setOverlay({ color });
      // push once the screen is almost covered
      setTimeout(() => router.push(href), COVER_MS - 100);
    },
    [pathname, router]
  );

  // the new route has mounted under the curtain — let it continue upwards
  useEffect(() => {
    if (!pendingRef.current) return;
    const t = setTimeout(() => {
      setOverlay(null);
      pendingRef.current = false;
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <AnimatePresence>
        {overlay && (
          <motion.div
            key="page-transition"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: COVER_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
            style={{
              background: overlay.color,
              borderRadius: "50% / 7vh",
            }}
            className="fixed top-[-6vh] left-[-10vw] h-[112vh] w-[120vw] z-[90]"
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
