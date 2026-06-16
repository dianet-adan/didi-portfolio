"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Logical game world (rendered responsively via % of the area).
const W = 400;
const H = 300;
const GROUND = 236; // y of the ground line (phone feet rest here)
const PLAYER_X = 64;
const PLAYER_W = 46;
const PLAYER_H = 46;
const GRAVITY = 2600; // units / s²
const JUMP_V = 760; // units / s
const WIN_SCORE = 1000;

type ObType = "folder" | "clip";
type Obstacle = { id: number; x: number; w: number; h: number; type: ObType };
type Star = { id: number; x: number; y: number };
type Frame = { py: number; obstacles: Obstacle[]; stars: Star[]; score: number };

const OB_DEFS: Record<ObType, { w: number; h: number; src: string }> = {
  folder: { w: 48, h: 42, src: "/images/play-zone/folder.png" },
  clip: { w: 22, h: 54, src: "/images/play-zone/clip.png" },
};

export default function PlayZoneGame({
  playing,
  highScore,
  onEnd,
  onStart,
}: {
  playing: boolean;
  highScore: number;
  onEnd: (score: number, won: boolean) => void;
  onStart: () => void;
}) {
  const [frame, setFrame] = useState<Frame>({
    py: 0,
    obstacles: [],
    stars: [],
    score: 0,
  });

  // loop state held in refs
  const pyRef = useRef(0);
  const vyRef = useRef(0);
  const onGroundRef = useRef(true);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const scoreRef = useRef(0);
  const speedRef = useRef(180);
  const spawnRef = useRef(0);
  const starSpawnRef = useRef(0);
  const idRef = useRef(0);
  const endedRef = useRef(false);

  const jump = useCallback(() => {
    if (onGroundRef.current) {
      vyRef.current = JUMP_V;
      onGroundRef.current = false;
    }
  }, []);

  // input: space / arrow-up — start the game if idle, otherwise jump
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (playing) jump();
        else onStart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, jump, onStart]);

  // game loop
  useEffect(() => {
    if (!playing) return;
    // reset
    pyRef.current = 0;
    vyRef.current = 0;
    onGroundRef.current = true;
    obstaclesRef.current = [];
    starsRef.current = [];
    scoreRef.current = 0;
    speedRef.current = 180;
    spawnRef.current = 1.1;
    starSpawnRef.current = 2.4;
    endedRef.current = false;

    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.045);
      last = now;

      // physics
      vyRef.current -= GRAVITY * dt;
      pyRef.current += vyRef.current * dt;
      if (pyRef.current <= 0) {
        pyRef.current = 0;
        vyRef.current = 0;
        onGroundRef.current = true;
      }

      // difficulty ramps gently with score
      speedRef.current = 180 + Math.min(scoreRef.current * 0.12, 160);
      const dx = speedRef.current * dt;

      // move + cull obstacles
      const obs = obstaclesRef.current
        .map((o) => ({ ...o, x: o.x - dx }))
        .filter((o) => o.x + o.w > -10);

      // spawn obstacles with a safe gap
      spawnRef.current -= dt;
      if (spawnRef.current <= 0) {
        const type: ObType = Math.random() < 0.55 ? "folder" : "clip";
        const def = OB_DEFS[type];
        obs.push({ id: idRef.current++, x: W + 10, w: def.w, h: def.h, type });
        // gap shrinks slightly as it speeds up, with randomness
        const base = 1.05 - Math.min(scoreRef.current * 0.00018, 0.4);
        spawnRef.current = base + Math.random() * 0.7;
      }
      obstaclesRef.current = obs;

      // stars
      starSpawnRef.current -= dt;
      let stars = starsRef.current.map((s) => ({ ...s, x: s.x - dx }));
      if (starSpawnRef.current <= 0) {
        stars.push({
          id: idRef.current++,
          x: W + 10,
          y: GROUND - 70 - Math.random() * 48,
        });
        starSpawnRef.current = 3 + Math.random() * 2.5;
      }
      stars = stars.filter((s) => s.x > -10);

      // score over time
      scoreRef.current += dt * 70;
      const score = Math.floor(scoreRef.current);

      // collision boxes (with forgiveness margin)
      const m = 7;
      const pBox = {
        x: PLAYER_X + m,
        y: GROUND - PLAYER_H - pyRef.current + m,
        w: PLAYER_W - m * 2,
        h: PLAYER_H - m * 2,
      };
      for (const o of obstaclesRef.current) {
        const oBox = { x: o.x + 4, y: GROUND - o.h + 3, w: o.w - 8, h: o.h - 6 };
        if (
          pBox.x < oBox.x + oBox.w &&
          pBox.x + pBox.w > oBox.x &&
          pBox.y < oBox.y + oBox.h &&
          pBox.y + pBox.h > oBox.y
        ) {
          endedRef.current = true;
          starsRef.current = stars;
          onEnd(score, false);
          return;
        }
      }

      // star pickup
      const remaining: Star[] = [];
      for (const s of stars) {
        const hit =
          PLAYER_X < s.x + 26 &&
          PLAYER_X + PLAYER_W > s.x &&
          GROUND - PLAYER_H - pyRef.current < s.y + 26 &&
          GROUND - pyRef.current > s.y;
        if (hit) {
          scoreRef.current += 50;
        } else {
          remaining.push(s);
        }
      }
      starsRef.current = remaining;

      if (scoreRef.current >= WIN_SCORE) {
        endedRef.current = true;
        onEnd(Math.floor(scoreRef.current), true);
        return;
      }

      setFrame({
        py: pyRef.current,
        obstacles: obstaclesRef.current,
        stars: starsRef.current,
        score,
      });
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, onEnd]);

  const pct = (v: number, total: number) => `${(v / total) * 100}%`;
  const displayScore = playing ? frame.score : 0;

  return (
    <div
      onClick={() => (playing ? jump() : onStart())}
      className="relative w-full aspect-[4/3] rounded-[2rem] border-[6px] border-ink overflow-hidden shadow-[10px_12px_0_rgba(0,0,0,0.3)] select-none cursor-pointer"
      style={{
        backgroundImage: "url(/images/play-zone/bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        containerType: "size",
      }}
      aria-label="Play Zone runner game"
    >
      {/* drifting background clouds */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/play-zone/cloud.png"
        alt=""
        aria-hidden="true"
        className="pz-cloud pointer-events-none absolute top-[14%] left-0 w-[26%] opacity-90"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/play-zone/cloud2.png"
        alt=""
        aria-hidden="true"
        className="pz-cloud-2 pointer-events-none absolute top-[30%] left-0 w-[20%] opacity-80"
      />

      {/* score labels */}
      <div className="absolute top-[5%] left-[5%] w-[18%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/play-zone/score.png" alt="Score" className="w-full" />
        <p className="font-display text-yellow text-[4cqw] leading-none mt-1 tabular-nums">
          {String(displayScore).padStart(5, "0")}
        </p>
      </div>
      <div className="absolute top-[5%] right-[5%] w-[22%] text-right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/play-zone/high-score.png"
          alt="High score"
          className="w-full"
        />
        <p className="font-display text-yellow text-[4cqw] leading-none mt-1 tabular-nums">
          {String(Math.max(highScore, displayScore)).padStart(5, "0")}
        </p>
      </div>

      {/* jump hint while playing — the start instructions live on the page */}
      {playing && displayScore < 80 && (
        <div className="absolute top-[33%] left-1/2 -translate-x-1/2 flex items-center gap-[2cqw]">
          <svg viewBox="0 0 30 40" className="w-[4cqw] h-[5cqw] pz-arrow" fill="none" aria-hidden="true">
            <path d="M22 6 C 8 14, 8 26, 20 34" stroke="var(--red)" strokeWidth="3" strokeLinecap="round" />
            <path d="M12 28 L20 34 L24 25" stroke="var(--red)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-display text-paper/90 text-[3.6cqw] tracking-[0.18em] uppercase whitespace-nowrap">
            Press space to jump
          </p>
          <span className="inline-flex -scale-x-100">
            <svg viewBox="0 0 30 40" className="w-[4cqw] h-[5cqw] pz-arrow" fill="none" aria-hidden="true">
              <path d="M22 6 C 8 14, 8 26, 20 34" stroke="var(--red)" strokeWidth="3" strokeLinecap="round" />
              <path d="M12 28 L20 34 L24 25" stroke="var(--red)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      )}

      {/* stars with a tiny animated starburst */}
      {frame.stars.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: pct(s.x, W),
            top: pct(s.y, H),
            width: pct(26, W),
            height: pct(26, H),
          }}
        >
          <svg
            viewBox="0 0 40 40"
            className="pz-burst absolute -inset-[40%] w-[180%] h-[180%]"
            fill="none"
            aria-hidden="true"
          >
            {[0, 45, 90, 135].map((a) => (
              <line
                key={a}
                x1="20"
                y1="6"
                x2="20"
                y2="0"
                stroke="var(--yellow)"
                strokeWidth="1.3"
                strokeLinecap="round"
                transform={`rotate(${a} 20 20)`}
              />
            ))}
            {[180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1="20"
                y1="6"
                x2="20"
                y2="0"
                stroke="var(--yellow)"
                strokeWidth="1.3"
                strokeLinecap="round"
                transform={`rotate(${a} 20 20)`}
              />
            ))}
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/stickers/6.png" alt="" className="relative w-full h-full" />
        </div>
      ))}

      {/* obstacles */}
      {frame.obstacles.map((o) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={o.id}
          src={OB_DEFS[o.type].src}
          alt=""
          className="absolute object-contain"
          style={{
            left: pct(o.x, W),
            top: pct(GROUND - o.h, H),
            width: pct(o.w, W),
            height: pct(o.h, H),
          }}
        />
      ))}

      {/* player phone — idle: centered; on start it slides to the running lane */}
      <div
        className="absolute"
        style={{
          left: pct(playing ? PLAYER_X : (W - PLAYER_W) / 2, W),
          top: pct(GROUND - PLAYER_H - frame.py, H),
          width: pct(PLAYER_W, W),
          height: pct(PLAYER_H, H),
          transition: "left 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        {/* speed lines trailing the phone while running */}
        {playing && (
          <svg
            viewBox="0 0 40 40"
            className="pz-speed absolute top-1/2 -left-[55%] w-[55%] h-[70%] -translate-y-1/2"
            fill="none"
            aria-hidden="true"
          >
            <line x1="2" y1="12" x2="34" y2="12" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="22" x2="28" y2="22" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" />
            <line x1="4" y1="32" x2="32" y2="32" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/play-zone/phone.png"
          alt="Running phone"
          className={`relative w-full h-full object-contain ${
            playing && onGroundRef.current ? "pz-run" : ""
          }`}
        />
      </div>

      <style jsx>{`
        :global(.pz-run) {
          animation: pzbob 0.32s ease-in-out infinite;
        }
        @keyframes pzbob {
          0%,
          100% {
            transform: rotate(-3deg) translateY(0);
          }
          50% {
            transform: rotate(3deg) translateY(-3%);
          }
        }
        :global(.pz-speed) {
          animation: pzspeed 0.4s linear infinite;
        }
        @keyframes pzspeed {
          0% {
            opacity: 0.15;
            transform: translate(6%, -50%);
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.15;
            transform: translate(-12%, -50%);
          }
        }
        :global(.pz-arrow) {
          animation: pzarrow 1s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes pzarrow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(14%);
          }
        }
        :global(.pz-burst) {
          animation: pzburst 0.9s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes pzburst {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.85) rotate(0deg);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1) rotate(20deg);
          }
        }
        :global(.pz-cloud) {
          animation: pzcloud 30s linear infinite;
        }
        :global(.pz-cloud-2) {
          animation: pzcloud2 42s linear infinite;
        }
        @keyframes pzcloud {
          from {
            transform: translateX(120cqw);
          }
          to {
            transform: translateX(-170cqw);
          }
        }
        @keyframes pzcloud2 {
          from {
            transform: translateX(160cqw);
          }
          to {
            transform: translateX(-180cqw);
          }
        }
      `}</style>
    </div>
  );
}
