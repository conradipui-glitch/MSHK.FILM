import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FAQ } from "../data/content";
import { cn } from "../utils/cn";
import { Reveal, SlateHeading } from "./ui";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-[1500px] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SlateHeading scene="Scene 05 · Вопросы" title="Спрашивали?" accent="Отвечаю" />
          <Reveal className="-mt-4 max-w-sm">
            <p className="text-[15px] leading-relaxed text-film-dim">
              Собрал то, о чём спрашивают перед первой съёмкой. Не нашли свой
              вопрос — просто напишите мне, отвечу лично и без скриптов продаж.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-24">
          <div className="border-t border-film-line">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={i * 0.04}>
                  <div className="border-b border-film-line">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-4 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "font-mono text-[11px] tracking-[0.15em] tabular",
                          isOpen ? "text-rec" : "text-film-faint"
                        )}
                      >
                        Q.{String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-base font-bold transition-colors sm:text-lg",
                          isOpen ? "text-film-paper" : "text-film-paper/75 group-hover:text-film-paper"
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-400",
                          isOpen
                            ? "rotate-45 border-rec bg-rec text-white"
                            : "border-film-line text-film-dim"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-6 pl-11 text-sm leading-relaxed text-film-dim sm:text-[15px]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
