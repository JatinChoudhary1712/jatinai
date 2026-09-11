"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import { technologies, tierWeight, type Technology } from "./technologies";
import { techIcons } from "./tech-icon-paths";

const CELLS = 6;
/** Per-cell base interval (ms); jitter is added on top so it never feels mechanical. */
const BASE_INTERVAL = [3500, 5000, 4000, 6000, 4500, 5500];
const JITTER = 1200;
const FADE_OUT = 300;
const HOLD_COLOR = 900;

const totalWeight = technologies.reduce((sum, t) => sum + tierWeight[t.tier], 0);

/** Weighted pick that never returns a technology currently shown in another cell. */
const pickTech = (taken: (string | null)[]): Technology => {
  const pool = technologies.filter((t) => !taken.includes(t.name));
  const candidates = pool.length ? pool : technologies;
  const weight = pool.length
    ? candidates.reduce((sum, t) => sum + tierWeight[t.tier], 0)
    : totalWeight;

  let roll = Math.random() * weight;
  for (const tech of candidates) {
    roll -= tierWeight[tech.tier];
    if (roll <= 0) return tech;
  }
  return candidates[candidates.length - 1];
};

type Phase = "idle" | "out" | "enter";

/** Brand mark when one exists, lucide glyph otherwise. Both inherit `currentColor`. */
const TechIcon = ({ tech }: { tech: Technology }) => {
  const brand = tech.slug ? techIcons[tech.slug] : undefined;

  if (brand) {
    return (
      <svg viewBox="0 0 24 24" width={32} height={32} fill="currentColor" aria-hidden="true">
        <path d={brand.path} />
      </svg>
    );
  }

  const Fallback = tech.icon;
  return Fallback ? <Fallback size={32} strokeWidth={1.5} aria-hidden="true" /> : null;
};

interface TechCellProps {
  index: number;
  initial: Technology;
  taken: React.MutableRefObject<(string | null)[]>;
  animate: boolean;
}

const TechCell = memo(({ index, initial, taken, animate }: TechCellProps) => {
  const [tech, setTech] = useState<Technology>(initial);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!animate) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const schedule = () => {
      const delay = BASE_INTERVAL[index] + Math.random() * JITTER;
      timers.push(
        setTimeout(() => {
          setPhase("out");
          timers.push(
            setTimeout(() => {
              const next = pickTech(taken.current);
              taken.current[index] = next.name;
              setTech(next);
              setPhase("enter");
              timers.push(setTimeout(() => setPhase("idle"), HOLD_COLOR));
              schedule();
            }, FADE_OUT),
          );
        }, delay),
      );
    };

    schedule();
    return () => timers.forEach(clearTimeout);
  }, [animate, index, taken]);

  const leaving = phase === "out";
  const colored = phase === "enter";

  return (
    <div className="relative flex h-24 items-center justify-center bg-black px-2 sm:h-28">
      <div
        className="flex flex-col items-center gap-2 text-center will-change-[opacity,transform,filter]"
        style={{
          opacity: leaving ? 0 : 1,
          transform: leaving ? "scale(0.96)" : "scale(1)",
          filter: leaving ? "blur(3px)" : "blur(0px)",
          transition: animate
            ? `opacity ${leaving ? FADE_OUT : 400}ms ease-out, transform ${leaving ? FADE_OUT : 400}ms ease-out, filter ${leaving ? FADE_OUT : 400}ms ease-out`
            : "none",
        }}
      >
        <div
          className="flex h-8 items-center justify-center"
          style={{
            color: tech.color,
            // Logo keeps its brand colour; entry just lifts it briefly before settling.
            opacity: colored ? 1 : 0.88,
            transition: animate ? "opacity 800ms ease-out" : "none",
          }}
        >
          <TechIcon tech={tech} />
        </div>
        <span
          className="text-[13px] font-medium leading-tight sm:text-sm"
          style={{
            color: colored ? tech.color : "#F5F5F5",
            transition: animate ? "color 800ms ease-out" : "none",
          }}
        >
          {tech.name}
        </span>
      </div>
    </div>
  );
});
TechCell.displayName = "TechCell";

/** Small "+" at the interior grid intersections, as in the reference layout. */
const Marker = ({ className }: { className: string }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-xs leading-none text-neutral-600 ${className}`}
  >
    +
  </span>
);

export const AnimatedTechGrid = ({ label = "Tech Stack" }: { label?: string }) => {
  const [animate, setAnimate] = useState(false);
  const initial = useRef(technologies.slice(0, CELLS));
  const taken = useRef<(string | null)[]>(initial.current.map((t) => t.name));

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <section className="w-full mt-4 pt-4 border-t border-neutral-800/80">
      <p className="text-[13px] uppercase tracking-wider text-white mb-3 text-center sm:text-left font-mono">
        {label}
      </p>

      <div className="relative">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-neutral-800/60 bg-neutral-800/60 sm:grid-cols-3">
          {initial.current.map((tech, i) => (
            <TechCell key={i} index={i} initial={tech} taken={taken} animate={animate} />
          ))}
        </div>

        {/* 2 cols x 3 rows on mobile, 3 cols x 2 rows from sm up */}
        <Marker className="left-1/2 top-1/3 sm:hidden" />
        <Marker className="left-1/2 top-2/3 sm:hidden" />
        <Marker className="hidden left-1/3 top-1/2 sm:block" />
        <Marker className="hidden left-2/3 top-1/2 sm:block" />
      </div>
    </section>
  );
};

export default AnimatedTechGrid;
