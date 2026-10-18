import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { useState } from "react";
import { SERVICES } from "../data/content";
import { cn } from "../utils/cn";
import { Reveal, SlateHeading } from "./ui";

const FORMATS = [
  "Горизонтальные ролики 16:9",
  "Вертикаль 9:16 для Reels и Shorts",
  "Полная запись события",
  "Короткие тизеры",
  "Ролики из ваших исходников",
];

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="relative bg-film-panel/40 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SlateHeading
          scene="Scene 02 · Услуги"
          title="Что я"
          accent="снимаю"
          aside="Пять направлений — от семейного праздника до операторской смены в чужой команде. Нажмите, чтобы развернуть детали."
        />

        <div className="border-t border-film-line">
          {SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s.num} delay={i * 0.05}>
                <div className="border-b border-film-line">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-5 text-left sm:gap-8 sm:py-7"
                  >
                    <span
                      className={cn(
                        "font-mono text-xs tracking-[0.2em] tabular transition-colors",
                        isOpen ? "text-rec" : "text-film-faint"
                      )}
                    >
                      /{s.num}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-display text-[7.5vw] leading-none font-medium uppercase transition-all duration-500 sm:text-5xl lg:text-6xl",
                          isOpen
                            ? "translate-x-1 text-film-paper sm:translate-x-3"
                            : "text-film-paper/55 group-hover:text-film-paper"
                        )}
                      >
                        {s.title}
                      </span>
                      <span className="mt-1.5 block text-[13px] text-film-dim">
                        {s.tagline}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center border transition-all duration-500",
                        isOpen
                          ? "rotate-45 border-rec bg-rec text-white"
                          : "border-film-line text-film-dim group-hover:border-film-paper/50"
                      )}
                    >
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-8 pl-8 sm:pl-[4.5rem] lg:grid-cols-12 lg:gap-10">
                          <div className="relative overflow-hidden border border-film-line lg:col-span-5">
                            <img
                              src={s.img}
                              alt={s.title}
                              loading="lazy"
                              className="aspect-[16/10] w-full object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-black/60 px-2 py-1 font-mono text-[9px] tracking-[0.2em] uppercase backdrop-blur-sm">
                              Дубль {s.num}
                            </span>
                          </div>
                          <div className="lg:col-span-7">
                            <p className="max-w-xl text-[15px] leading-relaxed text-film-paper/85">
                              {s.desc}
                            </p>
                            <div className="mt-6 font-mono text-[10px] tracking-[0.25em] text-film-faint uppercase">
                              На выходе
                            </div>
                            <ul className="mt-3 space-y-2.5">
                              {s.output.map((o) => (
                                <li key={o} className="flex items-start gap-2.5 text-sm text-film-dim">
                                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-af" />
                                  {o}
                                </li>
                              ))}
                            </ul>
                            <a
                              href="#brief"
                              className="mt-7 inline-flex items-center gap-2 border border-film-paper/30 px-5 py-2.5 text-[12px] font-bold tracking-wider uppercase transition-colors hover:border-rec hover:bg-rec hover:text-white"
                            >
                              Обсудить такую задачу
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex flex-col gap-4 border border-film-line bg-film-panel p-6 sm:flex-row sm:items-center sm:p-7">
          <span className="font-mono text-[10px] tracking-[0.25em] text-film-faint uppercase sm:shrink-0">
            Форматы на выходе
          </span>
          <div className="flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <span
                key={f}
                className="border border-film-line bg-film-black/50 px-3 py-1.5 text-[12px] text-film-dim"
              >
                {f}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
