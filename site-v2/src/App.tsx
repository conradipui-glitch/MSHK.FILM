import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Send } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import About from "./components/About";
import Brief from "./components/Brief";
import Faq from "./components/Faq";
import FocusCursor from "./components/FocusCursor";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Preloader from "./components/Preloader";
import Process from "./components/Process";
import Services from "./components/Services";
import Works from "./components/Works";
import { TG_CONTACT } from "./data/content";

function MobileContactFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          href={TG_CONTACT}
          target="_blank"
          rel="noreferrer"
          aria-label="Написать Михаилу в Telegram"
          className="fixed right-4 bottom-4 z-[75] flex items-center gap-2 rounded-full bg-rec py-3 pr-5 pl-4 text-[12px] font-bold tracking-wider text-white uppercase shadow-[0_10px_30px_rgba(255,59,47,0.35)] lg:hidden"
        >
          <Send className="h-4 w-4" />
          Написать
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const finish = useCallback(() => setLoading(false), []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-screen bg-film-black text-film-paper">
        <a
          href="#works"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[120] focus:bg-rec focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          К работам
        </a>

        <AnimatePresence>
          {loading && <Preloader onDone={finish} />}
        </AnimatePresence>

        <FocusCursor />
        <Header />

        <main>
          <Hero />
          <Marquee />
          <Works />
          <Services />
          <About />
          <Process />
          <Faq />
          <Brief />
        </main>

        <Footer />
        <MobileContactFab />
      </div>
    </MotionConfig>
  );
}
