const ITEMS = [
  "Мероприятия",
  "Видео для бизнеса",
  "Блогерам",
  "Reels · Shorts",
  "Монтаж",
  "Оператор в команду",
  "Backstage",
  "Выездные съёмки",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-film-line bg-film-panel" aria-hidden>
      <div className="perf h-3.5 border-b border-film-line/60" />
      <div className="overflow-hidden py-4">
        <div className="flex w-max animate-marquee items-center gap-8 pr-8">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-xl font-medium tracking-wide whitespace-nowrap uppercase sm:text-2xl">
                {item}
              </span>
              <span className="h-2 w-2 shrink-0 rotate-45 bg-rec" />
            </span>
          ))}
        </div>
      </div>
      <div className="perf h-3.5 border-t border-film-line/60" />
    </div>
  );
}
