"use client";

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

const TransitionContext = createContext<(href: string, color?: string) => void>(
  () => {}
);

const ArrivalContext = createContext<() => boolean>(() => false);

export function useTransitionNav() {
  return useContext(TransitionContext);
}

// True when the current page was entered through the color wipe — the page
// title renders in place (single title, no size change) and the rest of the
// content fades in around it once the wipe has cleared.
export function useTransitionArrival() {
  return useContext(ArrivalContext);
}

const COVER_MS = 600;
const HOLD_MS = 220;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

// idle = unmounted · enter = mounted off-screen bottom · cover = full screen ·
// reveal = wiped off-screen top
type Phase = "idle" | "enter" | "cover" | "reveal";

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [color, setColor] = useState("var(--ink)");
  const pendingRef = useRef(false);
  const arrivedRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef(0);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const navigate = useCallback(
    (href: string, c: string = "var(--ink)") => {
      if (pendingRef.current) return;
      if (href === pathname) return;
      pendingRef.current = true;
      arrivedRef.current = true;
      setColor(c);
      // mount off-screen bottom, then (after the browser commits that state)
      // slide up to cover so the CSS transition actually animates
      setPhase("enter");
      timers.current.push(setTimeout(() => setPhase("cover"), 40));
      timers.current.push(setTimeout(() => router.push(href), COVER_MS - 70));
      // failsafe
      timers.current.push(
        setTimeout(() => {
          setPhase("idle");
          pendingRef.current = false;
          arrivedRef.current = false;
        }, 4500)
      );
    },
    [pathname, router]
  );

  // new route mounted under the plane (page bg = plane color, title already in
  // place): hold briefly, then wipe the plane up to reveal the single title.
  useEffect(() => {
    if (!pendingRef.current) return;
    clearTimers();

    timers.current.push(setTimeout(() => setPhase("reveal"), HOLD_MS));
    timers.current.push(
      setTimeout(() => {
        setPhase("idle");
        pendingRef.current = false;
        arrivedRef.current = false;
      }, HOLD_MS + COVER_MS + 60)
    );

    return clearTimers;
  }, [pathname]);

  const getArrived = useCallback(() => arrivedRef.current, []);

  const translateY =
    phase === "cover" ? "0%" : phase === "reveal" ? "-100%" : "100%";

  return (
    <TransitionContext.Provider value={navigate}>
      <ArrivalContext.Provider value={getArrived}>
        {children}
      </ArrivalContext.Provider>

      {/* color wipe: slides up to cover, then keeps sliding up to reveal the
          new page (its background is the same color, so only the title and
          content appear). Plain CSS transition for reliably smooth motion. */}
      {phase !== "idle" && (
        <div
          aria-hidden
          className="grid-paper-dark fixed inset-0 z-[95]"
          style={{
            backgroundColor: color,
            transform: `translateY(${translateY})`,
            transition: `transform ${COVER_MS}ms ${EASE}`,
          }}
        />
      )}
    </TransitionContext.Provider>
  );
}
