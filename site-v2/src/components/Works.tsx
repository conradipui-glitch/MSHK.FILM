import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Play,
  Send,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SHULTZ_POSTS, TG_CHANNEL, WORKS, type Work, type WorkRole } from "../data/content";
import { cn } from "../utils/cn";
import TelegramEmbed from "./TelegramEmbed";
import { Reveal, SlateHeading } from "./ui";

type Filter = "all" | WorkRole;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Все кадры" },
  { key: "shoot", label: "Съёмка" },
  { key: "edit", label: "Монтаж" },
  { key: "crew", label: "В команде" },
];

function spanFor(i: number) {
  // 12-col editorial rhythm: wide / narrow alternating pairs
  const m = i % 4;
  if (m === 0) return "lg:col-span-7";
  if (m === 1) return "lg:col-span-5";
  if (m === 2) return "lg:col-span-5";
  return "lg:col-span-7";
}
function aspectFor(i: number) {
  const m = i % 4;
  return m === 0 || m === 3 ? "aspect-[16/10]" : "aspect-[16/10] lg:aspect-auto lg:h-full";
}

function WorkCard({
  work,
  index,
  onOpen,
}: {
  work: Work;
  index: number;
  onOpen: (w: Work) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative", spanFor(index))}
    >
      <button
        onClick={() => onOpen(work)}
        data-af="Смотреть"
        className="block w-full text-left"
        aria-label={`Смотреть: ${work.title}`}
      >
        <div
          className={cn(
            "relative overflow-hidden border border-film-line bg-film-panel",
            aspectFor(index)
          )}
        >
          <img
            src={work.poster}
            alt={`Обложка: ${work.title}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale-[45%] transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />

          {/* Top frame bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-3 font-mono text-[10px] tracking-[0.18em] uppercase">
            <span className="flex items-center gap-2 text-film-paper/90">
              <span className="h-1.5 w-1.5 rounded-full bg-rec" />
              POST /{work.postId}
            </span>
            {work.duration && (
              <span className="flex items-center gap-1.5 bg-black/55 px-2 py-1 text-film-paper backdrop-blur-sm tabular">
                <Clock3 className="h-3 w-3" />
                {work.duration}
              </span>
            )}
          </div>

          {/* Play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 scale-90 items-center justify-center rounded-full border border-white/40 bg-black/35 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Play className="ml-1 h-6 w-6 fill-white text-white" />
            </span>
          </div>

          {/* Bottom info */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <span className="mb-2.5 inline-block border border-rec/70 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-red-200 uppercase">
              {work.roleLabel}
            </span>
            <h3 className="font-display text-2xl leading-tight font-medium uppercase sm:text-[28px]">
              {work.title}
            </h3>
          </div>

          {/* Focus corners on hover */}
          <span className="pointer-events-none absolute top-2 left-2 h-5 w-5 border-t-2 border-l-2 border-af opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="pointer-events-none absolute right-2 bottom-2 h-5 w-5 border-r-2 border-b-2 border-af opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </button>
    </motion.article>
  );
}

function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[96] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
    >
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[92svh] w-full max-w-2xl overflow-y-auto border border-film-line bg-film-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="slate-stripes h-2.5 w-full" aria-hidden />
        <div className="flex items-start justify-between gap-4 p-5 sm:p-7">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
              <span className="border border-rec/70 px-2 py-0.5 text-red-200">
                {work.roleLabel}
              </span>
              <span className="text-film-faint">t.me/mushkachev/{work.postId}</span>
              {work.duration && (
                <span className="text-film-faint tabular">· {work.duration}</span>
              )}
            </div>
            <h3 className="font-display text-3xl leading-tight font-medium uppercase sm:text-4xl">
              {work.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-film-dim">
              {work.note}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-film-line transition-colors hover:border-rec hover:bg-rec"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 sm:px-7">
          <TelegramEmbed postId={work.postId} />
        </div>

        <div className="flex flex-wrap gap-3 p-5 sm:p-7">
          <a
            href={`https://t.me/mushkachev/${work.postId}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-rec px-5 py-3 text-[12px] font-bold tracking-wider text-white uppercase transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4" />
            Открыть в Telegram
          </a>
          {work.extraPostId && (
            <a
              href={`https://t.me/mushkachev/${work.extraPostId}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-film-paper/30 px-5 py-3 text-[12px] font-bold tracking-wider uppercase transition-colors hover:border-film-paper"
            >
              Вторая часть
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Works() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Work | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? WORKS
        : WORKS.filter((w) => w.roles.includes(filter)),
    [filter]
  );

  return (
    <section id="works" className="relative mx-auto max-w-[1500px] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <SlateHeading
        scene="Scene 01 · Работы"
        title="Кадры"
        accent="из ленты"
        aside="Это настоящие публикации из моего Telegram-канала «В тихом омуте»: съёмки, монтаж и backstage. Нажмите на кадр — видео откроется прямо здесь."
      />

      <Reveal className="mb-8 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "border px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-all",
              filter === f.key
                ? "border-rec bg-rec text-white"
                : "border-film-line text-film-dim hover:border-film-paper/50 hover:text-film-paper"
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto hidden font-mono text-[10px] tracking-[0.2em] text-film-faint uppercase sm:block">
          Кадров: {filtered.length} / {WORKS.length}
        </span>
      </Reveal>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((work, i) => (
            <WorkCard key={work.postId} work={work} index={i} onOpen={setActive} />
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-6">
        <p className="font-mono text-[10px] leading-relaxed tracking-[0.08em] text-film-faint uppercase">
          * Обложки кадров — иллюстративное оформление. Сами видео смотрите в
          публикациях канала — они подгружаются при нажатии.
        </p>
      </Reveal>

      {/* Joint projects + channel */}
      <Reveal className="mt-12 grid gap-4 lg:grid-cols-2">
        <div className="border border-film-line bg-film-panel p-6 sm:p-8">
          <div className="mb-3 font-mono text-[10px] tracking-[0.25em] text-rec uppercase">
            Совместные съёмки
          </div>
          <h3 className="font-display text-2xl font-medium uppercase sm:text-3xl">
            Проекты с Мишей Шульцем
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-film-dim">
            Часть совместных съёмок выходит в канале блогера Миши Шульца —
            мы вместе ездили в Приморский край и продолжаем работать.
            Несколько выпусков:
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {SHULTZ_POSTS.map((p) => (
              <a
                key={p.id}
                href={`https://t.me/mishashultz/${p.id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-film-line px-3.5 py-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors hover:border-film-paper/60"
              >
                {p.label}
                <ArrowUpRight className="h-3.5 w-3.5 text-rec" />
              </a>
            ))}
          </div>
        </div>

        <a
          href={TG_CHANNEL}
          target="_blank"
          rel="noreferrer"
          data-af="В канал"
          className="group relative overflow-hidden border border-film-line bg-film-panel p-6 sm:p-8"
        >
          <div
            className="absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-40"
            aria-hidden
          >
            <img
              src="https://images.pexels.com/photos/38383640/pexels-photo-38383640.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1100"
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-film-panel via-film-panel/70 to-transparent" />
          </div>
          <div className="relative">
            <div className="mb-3 font-mono text-[10px] tracking-[0.25em] text-rec uppercase">
              Telegram-канал
            </div>
            <h3 className="font-display text-2xl font-medium uppercase sm:text-3xl">
              «В тихом омуте»
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-film-dim">
              Новые работы, backstage и съёмочные будни появляются в канале
              раньше, чем где-либо ещё.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold tracking-wider uppercase">
              Открыть канал
              <ArrowUpRight className="h-4 w-4 text-rec transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </a>
      </Reveal>

      <AnimatePresence>
        {active && <WorkModal work={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
