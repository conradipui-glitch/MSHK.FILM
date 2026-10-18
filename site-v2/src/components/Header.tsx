import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV, TG_CONTACT } from "../data/content";
import { useTimecode } from "../hooks/hooks";
import { cn } from "../utils/cn";
import { RecDot } from "./ui";

export default function Header() {
  const tc = useTimecode();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-colors duration-500",
          scrolled
            ? "border-b border-film-line/80 bg-film-black/85 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        {/* Scroll progress as timecode ruler */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-film-line/40">
          <motion.div
            className="h-full origin-left bg-rec"
            style={{ scaleX: progress }}
          />
        </div>

        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <a
            href="#top"
            className="flex items-baseline gap-2"
            aria-label="MSHK.FILM — наверх"
          >
            <img src={`${import.meta.env.BASE_URL}assets/mshk-logo.webp`} alt="" className="h-9 w-9 shrink-0 border border-white/20 object-cover" width="36" height="36" />
            <span className="font-display text-[22px] font-semibold tracking-wide uppercase">
              MSHK<span className="text-rec">.</span>FILM
            </span>
            <span className="hidden font-mono text-[9px] tracking-[0.25em] text-film-faint uppercase xl:block">
              Мушкачев · Омск
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная">
            {NAV.slice(0, 5).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[13px] font-semibold tracking-wide text-film-dim uppercase transition-colors hover:text-film-paper"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-rec transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-2 font-mono text-[11px] text-film-dim tabular md:flex" aria-hidden>
              <RecDot />
              <span className="tracking-widest">REC {tc}</span>
            </div>
            <a
              href="#brief"
              className="hidden items-center gap-1.5 border border-film-paper/25 px-4 py-2 text-[12px] font-bold tracking-wider uppercase transition-all hover:border-rec hover:bg-rec hover:text-white sm:flex"
            >
              Обсудить проект
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center border border-film-line lg:hidden"
              aria-label="Открыть меню"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] flex flex-col bg-film-black"
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
          >
            <div className="slate-stripes h-3 w-full shrink-0" aria-hidden />
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <span className="font-display text-[22px] font-semibold tracking-wide uppercase">
                MSHK<span className="text-rec">.</span>FILM
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center border border-film-line"
                aria-label="Закрыть меню"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-4 sm:px-6" aria-label="Мобильная">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  className="group flex items-baseline gap-4 border-b border-film-line/70 py-4"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-rec">
                    {item.scene}
                  </span>
                  <span className="font-display text-4xl font-medium uppercase transition-colors group-hover:text-rec sm:text-5xl">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-8 sm:px-6">
              <span className="font-mono text-[10px] tracking-[0.25em] text-film-faint uppercase">
                REC {tc} · Омск
              </span>
              <a
                href={TG_CONTACT}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-rec px-5 py-3 text-[12px] font-bold tracking-wider text-white uppercase"
              >
                Написать в Telegram
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
