import { motion } from "framer-motion";
import { PROCESS } from "../data/content";
import { Reveal, SlateHeading } from "./ui";

export default function Process() {
  return (
    <section id="process" className="bg-film-panel/40 py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <SlateHeading
          scene="Scene 04 · Процесс"
          title="От заявки"
          accent="до ролика"
          aside="Четыре шага без бюрократии: никаких брифов на десять страниц и созвонов ради созвонов."
        />

        {/* Timecode ruler */}
        <Reveal>
          <div className="relative mb-4 hidden md:block" aria-hidden>
            <div
              className="h-5 w-full opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, #3a3a40 0 1px, transparent 1px 48px)",
              }}
            />
            <div className="flex justify-between font-mono text-[9px] tracking-[0.15em] text-film-faint tabular">
              <span>00:00:00:00</span>
              <span>00:00:15:00</span>
              <span>00:00:30:00</span>
              <span>00:00:45:00</span>
              <span>ФИНАЛ</span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 left-0 h-0.5 w-full origin-left bg-rec"
            />
          </div>
        </Reveal>

        <div className="grid gap-px border border-film-line bg-film-line sm:grid-cols-2 xl:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal key={step.tc} delay={i * 0.12} className="bg-film-black">
              <div className="group flex h-full flex-col p-6 transition-colors duration-500 hover:bg-film-panel sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-film-faint tabular">
                    TC {step.tc}
                  </span>
                  <span className="h-2 w-2 rotate-45 border border-film-faint transition-colors duration-300 group-hover:border-rec group-hover:bg-rec" />
                </div>
                <div className="mt-8 font-display text-6xl font-light text-film-paper/25 transition-colors duration-500 group-hover:text-rec">
                  0{i + 1}
                </div>
                <h3 className="mt-4 font-display text-2xl font-medium uppercase">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-film-dim">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
