import { ArrowUpRight, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { TG_CONTACT } from "../data/content";
import { useTimecode } from "../hooks/hooks";
import { cn } from "../utils/cn";
import { Corners, Reveal, SlateHeading } from "./ui";

const TASKS = [
  "Мероприятие",
  "Видео для бизнеса",
  "Контент для блога",
  "Нужен оператор в команду",
  "Только монтаж",
  "Что-то другое",
];

const FORMATS = [
  "Готовый ролик",
  "Полная запись",
  "Вертикальные видео",
  "Исходники",
  "Пока не знаю",
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3.5 py-2 text-[13px] font-semibold transition-all",
        active
          ? "border-rec bg-rec text-white"
          : "border-film-line bg-film-black/40 text-film-dim hover:border-film-paper/50 hover:text-film-paper"
      )}
    >
      {children}
    </button>
  );
}

function MenuRow({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-film-line/70 py-5 first:pt-1 last:border-b-0">
      <div className="mb-3 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
        <span className="text-rec tabular">{index}</span>
        <span className="text-film-dim">{label}</span>
        <span className="h-px flex-1 bg-film-line/60" aria-hidden />
      </div>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-film-line bg-film-black/50 px-4 py-3 text-[15px] text-film-paper placeholder:text-film-faint outline-none transition-colors focus:border-rec";

export default function Brief() {
  const tc = useTimecode();
  const [task, setTask] = useState(TASKS[0]);
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [formats, setFormats] = useState<string[]>(["Готовый ролик"]);
  const [comment, setComment] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const toggleFormat = (f: string) =>
    setFormats((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const message = useMemo(() => {
    const lines = [
      "Здравствуйте, Михаил! Пишу с сайта MSHK.FILM.",
      `Задача: ${task.toLowerCase()}.`,
    ];
    if (when.trim()) lines.push(`Когда: ${when.trim()}.`);
    lines.push(`Где: ${where.trim() || "Омск"}.`);
    if (formats.length)
      lines.push(`Нужно на выходе: ${formats.join(", ").toLowerCase()}.`);
    if (comment.trim()) lines.push(comment.trim());
    return lines.join("\n");
  }, [task, when, where, formats, comment]);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus("Текст заявки скопирован. Теперь откройте Telegram и вставьте его в чат.");
    } catch {
      setCopyStatus("Выделите текст в блоке выше и скопируйте его вручную.");
    }
  };

  return (
    <section id="brief" className="bg-film-panel/40 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SlateHeading
          scene="Scene 06 · Контакт"
          title="Настройте"
          accent="съёмку"
          aside="Как в меню камеры: выберите режим, укажите дату и место — я получу готовое сообщение в Telegram и отвечу лично."
        />

        <Reveal>
          <div className="overflow-hidden border border-film-line bg-film-panel">
            <div className="slate-stripes h-3 w-full" aria-hidden />
            <div className="flex items-center justify-between border-b border-film-line px-5 py-3 font-mono text-[10px] tracking-[0.25em] uppercase sm:px-8">
              <span className="flex items-center gap-2 text-film-dim">
                <span className="h-2 w-2 rounded-full bg-rec animate-blink" />
                Меню проекта
              </span>
              <span className="text-film-faint tabular">REC {tc}</span>
            </div>

            <div className="grid lg:grid-cols-12">
              {/* Settings */}
              <div className="px-5 py-6 sm:px-8 lg:col-span-7 lg:border-r lg:border-film-line">
                <MenuRow index="01" label="Режим — что снимаем">
                  <div className="flex flex-wrap gap-2">
                    {TASKS.map((t) => (
                      <Chip key={t} active={task === t} onClick={() => setTask(t)}>
                        {t}
                      </Chip>
                    ))}
                  </div>
                </MenuRow>

                <MenuRow index="02" label="Дата и место">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={when}
                      onChange={(e) => setWhen(e.target.value)}
                      placeholder="Когда? Например: 14 июня, вечер"
                      className={inputCls}
                      aria-label="Когда нужна съёмка"
                    />
                    <input
                      value={where}
                      onChange={(e) => setWhere(e.target.value)}
                      placeholder="Где? По умолчанию — Омск"
                      className={inputCls}
                      aria-label="Где будет съёмка"
                    />
                  </div>
                </MenuRow>

                <MenuRow index="03" label="Выходной формат — что нужно в итоге">
                  <div className="flex flex-wrap gap-2">
                    {FORMATS.map((f) => (
                      <Chip
                        key={f}
                        active={formats.includes(f)}
                        onClick={() => toggleFormat(f)}
                      >
                        {f}
                      </Chip>
                    ))}
                  </div>
                </MenuRow>

                <MenuRow index="04" label="Комментарий — необязательно">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder="Пара слов о задаче: что за событие, сколько людей, есть ли референсы…"
                    className={cn(inputCls, "resize-none")}
                    aria-label="Комментарий к заявке"
                  />
                </MenuRow>
              </div>

              {/* Monitor preview */}
              <div className="flex flex-col px-5 py-6 sm:px-8 lg:col-span-5">
                <div className="font-mono text-[10px] tracking-[0.25em] text-film-dim uppercase">
                  Монитор · текст сообщения
                </div>
                <div className="vf-corners scanlines relative mt-4 flex-1 border border-film-line bg-film-black/70 p-6">
                  <Corners />
                  <p className="relative z-[6] text-[15px] leading-relaxed whitespace-pre-wrap text-film-paper/90">
                    {message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copyMessage}
                  data-af="Скопировать"
                  className="mt-6 flex items-center justify-center gap-2.5 bg-rec px-6 py-4 text-sm font-bold tracking-wider text-white uppercase transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Send className="h-4 w-4" />
                  Скопировать заявку
                </button>
                <p className="mt-3 text-center text-xs leading-relaxed text-film-faint">
                  {copyStatus || "Сначала скопируйте текст заявки, затем откройте чат Михаила. Сайт не отправляет заявки автоматически."}
                </p>
                <a
                  href={TG_CONTACT}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 text-[12px] font-bold tracking-wider text-film-dim uppercase transition-colors hover:text-film-paper"
                >
                  Открыть Telegram и написать Михаилу
                  <ArrowUpRight className="h-3.5 w-3.5 text-rec" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
