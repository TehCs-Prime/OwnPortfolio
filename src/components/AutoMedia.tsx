import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type MediaItem = {
  id?: string | number;
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string; // for videos
};

type Props = {
  media: MediaItem[];
  height?: string; // Tailwind-friendly height (e.g. 'h-72' or 'h-80')
  autoPlayInterval?: number; // ms
  pauseOnHover?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
};

export default function AutoMedia({
  media,
  height = "h-72",
  autoPlayInterval = 4000,
  pauseOnHover = true,
  showDots = true,
  showArrows = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const length = media.length;
  useEffect(() => {
    if (length <= 1) return;
    if (isPaused) return;
    // auto advance
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused, autoPlayInterval, length]);

  function go(n: number) {
    setIndex((i) => {
      const next = (i + n + length) % length;
      return next;
    });
  }

  if (!media || media.length === 0) return null;

  return (
    <div
      className={`w-full ${height} relative rounded-2xl overflow-hidden shadow-md bg-black/30`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* media slides */}
      <AnimatePresence initial={false} mode="wait">
        {media.map((m, i) =>
          i === index ? (
            <motion.div
              key={m.id ?? i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {m.type === "image" ? (
                <img
                  src={m.src}
                  alt={m.alt ?? "media"}
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              ) : (
                <video
                  key={m.src}
                  src={m.src}
                  poster={m.poster}
                  className="object-cover w-full h-full"
                  playsInline
                  autoPlay
                  muted
                  loop
                />
              )}

              {/* soft gradient overlay to keep headings readable */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* arrows */}
      {showArrows && length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-sm p-2 rounded-full hover:scale-105 transition-transform"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 backdrop-blur-sm p-2 rounded-full hover:scale-105 transition-transform"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </>
      )}

      {/* dots */}
      {showDots && length > 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 z-30 flex gap-2">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === index ? "scale-125 bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
