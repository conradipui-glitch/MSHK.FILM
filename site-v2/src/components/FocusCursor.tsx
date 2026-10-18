import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "../hooks/hooks";
import { cn } from "../utils/cn";

/**
 * Autofocus-point cursor: a corner-bracket square that trails the pointer
 * and "locks focus" (turns green, shows a label) over interactive elements.
 */
export default function FocusCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [locked, setLocked] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("af-cursor");

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-af], input, textarea, select, label"
      );
      setLocked(!!el);
      setLabel(el?.dataset.af ?? null);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;
      if (boxRef.current) {
        boxRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("af-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = label ? 64 : locked ? 30 : 38;
  const corner =
    "absolute h-[10px] w-[10px] border-current transition-all duration-200";

  return (
    <div
      ref={boxRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[100] transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={cn(
          "relative transition-all duration-200 ease-out",
          locked ? "text-af" : "text-film-paper/80",
          pressed && "scale-[0.82]"
        )}
        style={{ width: size, height: size }}
      >
        <span className={cn(corner, "top-0 left-0 border-t-2 border-l-2")} />
        <span className={cn(corner, "top-0 right-0 border-t-2 border-r-2")} />
        <span className={cn(corner, "bottom-0 left-0 border-b-2 border-l-2")} />
        <span className={cn(corner, "right-0 bottom-0 border-r-2 border-b-2")} />
        <span className="absolute top-1/2 left-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rec" />
        {label && (
          <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 font-mono text-[9px] tracking-[0.25em] whitespace-nowrap text-af uppercase">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
