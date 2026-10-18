import { ArrowUp, ArrowUpRight, Send } from "lucide-react";
import { NAV, TG_CHANNEL, TG_CONTACT } from "../data/content";
import { useOmskClock } from "../hooks/hooks";
import { RecDot, Reveal } from "./ui";

export default function Footer() {
  const omskTime = useOmskClock();

  return (
    <footer className="relative overflow-hidden border-t border-film-line">
      <div className="perf h-3.5 border-b border-film-line/60" aria-hidden />
      <div className="mx-auto max-w-[1500px] px-4 pt-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src={`${import.meta.env.BASE_URL}assets/mshk-logo.webp`} width="74" height="74" alt="Фирменный знак Михаила Мушкачева" loading="lazy" className="mb-5 h-[74px] w-[74px] border border-film-line object-cover" />
            <Reveal>
              <p className="font-display text-3xl leading-tight font-medium uppercase sm:text-4xl">
                Есть что снять?
                <br />
                <span className="text-rec">Камера уже включена.</span>
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-film-dim">
                Напишите пару слов о вашей задаче — обсудим формат, сроки и
                бюджет. Отвечаю лично я, Михаил.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={TG_CONTACT}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-rec px-5 py-3 text-[12px] font-bold tracking-wider text-white uppercase transition-transform hover:-translate-y-0.5"
                >
                  <Send className="h-4 w-4" />
                  @mmushkachev
                </a>
                <a
                  href={TG_CHANNEL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-film-line px-5 py-3 text-[12px] font-bold tracking-wider uppercase transition-colors hover:border-film-paper/60"
                >
                  Канал «В тихом омуте»
                  <ArrowUpRight className="h-4 w-4 text-rec" />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.08}>
              <div className="mb-4 font-mono text-[10px] tracking-[0.25em] text-film-faint uppercase">
                Навигация · сцены
              </div>
              <ul className="space-y-2.5">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="group flex items-baseline gap-3 text-sm font-semibold text-film-dim transition-colors hover:text-film-paper"
                    >
                      <span className="font-mono text-[10px] tracking-[0.15em] text-rec">
                        {n.scene}
                      </span>
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={0.14}>
              <div className="border border-film-line bg-film-panel p-5">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase">
                  <span className="flex items-center gap-2 text-film-dim">
                    <RecDot />
                    Часы камеры
                  </span>
                  <span className="text-film-faint">UTC+6</span>
                </div>
                <div className="mt-3 font-mono text-4xl tracking-wider tabular">
                  {omskTime}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-film-dim">
                  Сейчас в Омске. Город — база, выезды на проекты — по
                  договорённости: уже снимал в Приморском крае и Татарстане.
                </div>
                <div className="mt-4 flex justify-between border-t border-film-line pt-3 font-mono text-[10px] tracking-[0.15em] text-film-faint uppercase">
                  <span>54.9885° N</span>
                  <span>73.3242° E</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative select-none" aria-hidden>
          <div className="text-center font-display text-[18.5vw] leading-[0.82] font-semibold tracking-tight uppercase">
            <span className="text-outline">MSHK</span>
            <span className="text-rec">.</span>
            <span className="text-outline">FILM</span>
          </div>
          <a
            href="#top"
            aria-label="Наверх"
            className="absolute right-0 bottom-6 flex h-12 w-12 items-center justify-center border border-film-line bg-film-black/60 backdrop-blur-sm transition-colors hover:border-rec hover:bg-rec hover:text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </a>
        </div>

        <div className="flex flex-col gap-3 border-t border-film-line py-6 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-film-faint uppercase md:flex-row md:items-center md:justify-between">
          <span>© 2026 MSHK.FILM — Михаил Мушкачев · Омск</span>
          <span className="max-w-xl md:text-right">
            Видео в разделе «Работы» — настоящие публикации из Telegram-канала
            автора. Фотографии оформления — Pexels, иллюстративные.
          </span>
        </div>
      </div>
    </footer>
  );
}
