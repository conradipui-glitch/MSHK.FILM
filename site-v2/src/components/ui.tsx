import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/** Extra two corners for .vf-corners frames (top-right / bottom-left). */
export function Corners() {
  return (
    <>
      <span className="vf-tr" aria-hidden />
      <span className="vf-bl" aria-hidden />
    </>
  );
}

export function RecDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full bg-rec animate-blink",
        className
      )}
      aria-hidden
    />
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Section header styled as a film slate. */
export function SlateHeading({
  scene,
  title,
  accent,
  aside,
}: {
  scene: string;
  title: string;
  accent?: string;
  aside?: string;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal>
        <div className="flex items-center justify-between border-t border-film-line pt-4 font-mono text-[11px] tracking-[0.18em] text-film-dim uppercase">
          <span className="flex items-center gap-2">
            <RecDot />
            {scene}
          </span>
          <span className="hidden sm:block">MSHK.FILM — 25 FPS</span>
          <span className="hidden xl:block">ОМСК · 54.98°N 73.36°E</span>
        </div>
      </Reveal>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <Reveal delay={0.08}>
          <h2 className="font-display text-[13.5vw] leading-[0.92] font-semibold tracking-tight uppercase sm:text-7xl lg:text-8xl">
            {title}{" "}
            {accent && <span className="text-outline-red">{accent}</span>}
          </h2>
        </Reveal>
        {aside && (
          <Reveal delay={0.16} className="max-w-xs pb-2">
            <p className="text-sm leading-relaxed text-film-dim">{aside}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

/** Small mono label used across HUD elements. */
export function HudLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] tracking-[0.22em] uppercase text-film-dim",
        className
      )}
    >
      {children}
    </span>
  );
}
