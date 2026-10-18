import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion, useTimecode } from "../hooks/hooks";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const tc = useTimecode();
  const [bars, setBars] = useState(0);

  useEffect(() => {
    const total = reduced ? 250 : 1500;
    const step = total / 5;
    const timers = [1, 2, 3, 4, 5].map((i) =>
      setTimeout(() => setBars(i), step * i * 0.8)
    );
    const done = setTimeout(onDone, total);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [onDone, reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-film-black"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label="Загрузка сайта"
    >
      <motion.div
        initial={{ scale: 1.25, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="vf-corners relative flex flex-col items-center px-12 py-10 sm:px-20"
      >
        <span className="vf-tr" aria-hidden />
        <span className="vf-bl" aria-hidden />
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-film-dim uppercase">
          <span className="h-2 w-2 rounded-full bg-rec animate-blink" />
          Rec · {tc}
        </div>
        <div className="font-display text-5xl font-semibold tracking-wide uppercase sm:text-6xl">
          MSHK<span className="text-rec">.</span>FILM
        </div>
        <div className="mt-4 font-mono text-[10px] tracking-[0.3em] text-film-dim uppercase">
          Михаил Мушкачев · Омск
        </div>
      </motion.div>

      <div className="mt-8 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-film-faint uppercase">
          Камера
        </span>
        <div className="flex gap-1" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-3.5 w-2 transition-colors duration-200 ${
                i < bars ? "bg-af" : "bg-film-line"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-[0.25em] text-film-faint uppercase">
          {bars === 5 ? "Готово" : "Старт…"}
        </span>
      </div>
    </motion.div>
  );
}
