import { useEffect, useRef, useState } from "react";

/** Session timecode HH:MM:SS:FF at 25 fps — the site is "recording" you. */
export function useTimecode(fps = 25) {
  const [tc, setTc] = useState("00:00:00:00");
  const start = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const loop = (t: number) => {
      if (start.current === null) start.current = t;
      const elapsed = (t - start.current) / 1000;
      const totalFrames = Math.floor(elapsed * fps);
      const ff = totalFrames % fps;
      const totalSec = Math.floor(elapsed);
      const ss = totalSec % 60;
      const mm = Math.floor(totalSec / 60) % 60;
      const hh = Math.floor(totalSec / 3600);
      const p = (n: number) => String(n).padStart(2, "0");
      const next = `${p(hh)}:${p(mm)}:${p(ss)}:${p(ff)}`;
      setTc((prev) => (prev === next ? prev : next));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fps]);

  return tc;
}

/** Live clock in Omsk (Asia/Omsk, UTC+6). */
export function useOmskClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Omsk",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return fine;
}
