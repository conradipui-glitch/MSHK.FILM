import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, BatteryFull, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useTimecode } from "../hooks/hooks";
import { Corners, RecDot } from "./ui";

const WORDS = ["СОБЫТИЯ", "БИЗНЕС", "БЛОГИ", "ЛЮДЕЙ"];

/** Autonomous "subject tracking" AF box drifting inside the frame. */
function TrackingBox({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-[6] hidden md:block"
      initial={{ top: "22%", left: "58%" }}
      animate={{
        top: ["22%", "38%", "30%", "46%", "22%"],
        left: ["58%", "66%", "52%", "62%", "58%"],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      <div className="relative h-28 w-28 lg:h-36 lg:w-36">
        <span className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-af" />
        <span className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-af" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-af" />
        <span className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-af" />
        <span className="absolute -top-5 left-0 font-mono text-[9px] tracking-[0.2em] text-af uppercase">
          AF · слежение
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const tc = useTimecode();
  const reduced = useReducedMotion();
  const [wordIdx, setWordIdx] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % WORDS.length),
      2300
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden"
      aria-label="Михаил Мушкачев — видеограф и оператор"
    >
      {/* Background footage stand-in (photo with slow push-in) */}
      <motion.div style={{ y: bgY, opacity: fade }} className="absolute inset-0">
        <div
          className={`absolute inset-0 ${reduced ? "" : "animate-kenburns"}`}
        >
          <img
            src="https://images.pexels.com/photos/29224578/pexels-photo-29224578.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920"
            alt="Оператор с камерой на стабилизаторе за работой"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-film-black via-film-black/72 to-film-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-film-black via-transparent to-film-black/60" />
        <div className="scanlines absolute inset-0" />
      </motion.div>

      {/* Viewfinder frame */}
      <div className="vf-corners pointer-events-none absolute inset-3 z-[5] sm:inset-5">
        <Corners />
      </div>

      <TrackingBox reduced={reduced} />

      {/* Top HUD inside frame */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-24 font-mono text-[10px] tracking-[0.2em] uppercase sm:px-10">
        <div className="flex items-center gap-2 text-film-paper">
          <RecDot className="h-2.5 w-2.5" />
          <span className="text-xs tabular sm:text-sm">REC {tc}</span>
        </div>
        <div className="hidden text-film-dim sm:block">CAM A · X-H2S</div>
        <div className="flex items-center gap-2 text-film-dim">
          <span className="hidden min-[400px]:inline">4K 25P</span>
          <BatteryFull className="h-4 w-4" aria-hidden />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-10 pb-8 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.28em] text-film-dim uppercase"
        >
          <span className="text-film-paper">Михаил Мушкачев</span>
          <span className="text-rec">/</span>
          <span>видеограф · оператор · монтаж</span>
          <span className="text-rec">/</span>
          <span>Омск</span>
        </motion.p>

        <h1 className="font-display leading-[0.9] font-semibold uppercase">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[17vw] sm:text-[13vw] lg:text-[10.5rem]"
          >
            Снимаю
          </motion.span>
          <span className="relative block h-[1em] text-[17vw] sm:text-[13vw] lg:text-[10.5rem]">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y: "55%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-55%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 text-rec"
              >
                {WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-film-paper/85 sm:text-lg"
        >
          Мероприятия, видео для бизнеса и контент для блогеров. Веду проект
          от первого дубля до готового ролика — сам снимаю и сам монтирую.
          Или присоединяюсь к вашей команде как оператор.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <a
            href="#brief"
            className="flex items-center gap-2 bg-rec px-6 py-3.5 text-sm font-bold tracking-wider text-white uppercase transition-transform duration-300 hover:-translate-y-0.5"
          >
            Обсудить проект
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#works"
            className="flex items-center gap-2.5 border border-film-paper/35 px-6 py-3.5 text-sm font-bold tracking-wider uppercase backdrop-blur-sm transition-colors hover:border-film-paper hover:bg-film-paper hover:text-film-black"
          >
            <Play className="h-4 w-4 fill-current" />
            Смотреть работы
          </a>
        </motion.div>
      </div>

      {/* Bottom HUD */}
      <div className="relative z-10 flex items-end justify-between gap-4 px-6 pb-7 font-mono text-[9px] tracking-[0.2em] text-film-dim uppercase sm:px-10 sm:text-[10px]">
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <span>Fujifilm X-H2S / X-T4</span>
          <span className="hidden sm:inline">Стабилизатор · беспроводной звук</span>
          <span className="hidden md:inline">DaVinci Resolve</span>
        </div>
        <div className="hidden lg:block">54.9885° N · 73.3242° E</div>
        <a
          href="#works"
          className="group flex items-center gap-2 text-film-paper"
          aria-label="Прокрутить к работам"
        >
          <span className="hidden sm:inline">Листайте вниз</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4 text-rec" />
          </motion.span>
        </a>
      </div>
    </section>
  );
}
