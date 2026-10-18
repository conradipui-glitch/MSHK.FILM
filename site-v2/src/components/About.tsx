import { useState } from "react";
import { Corners, Reveal, SlateHeading } from "./ui";

const PORTRAIT = `${import.meta.env.BASE_URL}assets/mikhail-portrait.webp`;

const SPECS = [
  { k: "Камера A", v: "Fujifilm X-H2S" },
  { k: "Камера B", v: "Fujifilm X-T4" },
  { k: "Стабилизация", v: "Электронный стедикам" },
  { k: "Звук", v: "Беспроводные петлички" },
  { k: "Монтаж и цвет", v: "DaVinci Resolve" },
  { k: "База", v: "Омск · выезды по договорённости" },
];

const ISO_STEPS = [100, 200, 400, 800, 1600, 3200, 6400, 12800];

export default function About() {
  const [isoIdx, setIsoIdx] = useState(2);
  const iso = ISO_STEPS[isoIdx];
  const brightness = 0.72 + isoIdx * 0.09;
  const grainOpacity = 0.04 + isoIdx * 0.045;

  return (
    <section id="about" className="mx-auto max-w-[1500px] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <SlateHeading scene="Scene 03 · Кто за камерой" title="Один" accent="человек" />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-display text-3xl leading-[1.15] font-normal uppercase sm:text-4xl lg:text-[2.9rem]">
              MSHK.FILM — это не студия из двадцати человек.{" "}
              <span className="text-rec">Это я.</span> Вы пишете мне — и я же
              приезжаю с камерой.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-2xl space-y-4 text-[15px] leading-relaxed text-film-dim">
              <p>
                Меня зовут Михаил Мушкачев. Я видеограф из Омска: снимаю
                мероприятия, видео для бизнеса и контент для блогеров.
                Сам снимаю и сам монтирую — поэтому уже на площадке держу
                в голове финальный ролик, а не «что-нибудь наснимаю,
                потом разберёмся».
              </p>
              <p>
                Главное удобство работы со мной — прямая связь. Вы общаетесь
                не с менеджером, который передаст задачу дальше, а с человеком,
                который будет стоять за камерой и отвечать за результат.
                А если у вас уже есть команда — спокойно встраиваюсь в неё
                как оператор или монтажёр.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 grid grid-cols-1 border-t border-film-line sm:grid-cols-2">
              {SPECS.map((s) => (
                <div
                  key={s.k}
                  className="flex items-baseline justify-between gap-4 border-b border-film-line py-3.5 sm:odd:pr-6 sm:even:pl-6"
                >
                  <span className="font-mono text-[10px] tracking-[0.22em] text-film-faint uppercase">
                    {s.k}
                  </span>
                  <span className="text-right text-sm font-semibold">{s.v}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-film-faint uppercase">
              Оборудование — не самоцель, а запас прочности: две камеры,
              разные ракурсы и запись звука с учётом условий площадки.
            </p>
          </Reveal>
        </div>

        {/* Camera monitor with ISO control */}
        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="border border-film-line bg-film-panel p-3">
            <div className="vf-corners relative overflow-hidden">
              <Corners />
              <img
                src={PORTRAIT}
                alt="Михаил Мушкачев, автор проекта MSHK.FILM"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-[filter] duration-200"
                style={{ filter: `brightness(${brightness}) contrast(1.05)` }}
              />
              <div
                className="pointer-events-none absolute inset-0 mix-blend-overlay"
                style={{
                  opacity: grainOpacity,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  backgroundSize: "160px 160px",
                }}
                aria-hidden
              />
              <div className="absolute top-4 left-4 z-[6] flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="h-2 w-2 rounded-full bg-rec animate-blink" />
                Монитор · CAM A
              </div>
              <div className="absolute right-4 bottom-4 z-[6] bg-black/60 px-2.5 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase backdrop-blur-sm tabular">
                ISO <span className="text-af">{iso}</span>
              </div>
              <div className="absolute bottom-4 left-4 z-[6] font-mono text-[9px] tracking-[0.2em] text-film-paper/70 uppercase">
                Михаил Мушкачев
              </div>
            </div>

            <div className="px-2 pt-4 pb-2">
              <label
                htmlFor="iso"
                className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-film-dim uppercase"
              >
                <span>Покрутите ISO</span>
                <span className="tabular">{iso} · шум растёт, кадр светлеет</span>
              </label>
              <input
                id="iso"
                type="range"
                min={0}
                max={ISO_STEPS.length - 1}
                step={1}
                value={isoIdx}
                onChange={(e) => setIsoIdx(Number(e.target.value))}
                className="mt-3 w-full accent-[#ff3b2f]"
                aria-valuetext={`ISO ${iso}`}
              />
              <div className="mt-1.5 flex justify-between font-mono text-[9px] text-film-faint tabular">
                {ISO_STEPS.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-film-faint uppercase">
            Это настоящий портрет Михаила. Управление ISO выше — художественная демонстрация изменения яркости и зерна, а не настройка камеры.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
