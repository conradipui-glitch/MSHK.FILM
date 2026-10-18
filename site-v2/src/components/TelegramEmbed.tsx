import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Official Telegram post embed (telegram-widget.js).
 * Renders the real publication with its video — no CDN tokens involved.
 */
export default function TelegramEmbed({ postId }: { postId: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    setLoading(true);
    container.innerHTML = "";

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-post", `mushkachev/${postId}`);
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-dark", "1");
    script.onload = () => {
      // Widget swaps the script for an iframe asynchronously.
      setTimeout(() => setLoading(false), 600);
    };
    script.onerror = () => setLoading(false);
    container.appendChild(script);

    const fallback = setTimeout(() => setLoading(false), 4000);
    return () => {
      clearTimeout(fallback);
      container.innerHTML = "";
    };
  }, [postId]);

  return (
    <div className="relative min-h-[320px]">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-film-dim">
          <Loader2 className="h-6 w-6 animate-spin text-rec" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
            Загружаю публикацию…
          </span>
        </div>
      )}
      <div ref={ref} className="relative z-[1]" />
    </div>
  );
}
