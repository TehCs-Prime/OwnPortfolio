import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TimelineEntry = {
  start_date: string;
  end_date: string;
  title: string;
  heading?: string;
  description: { title?: string; content?: string };
  points: { title?: string; content: string[] };
  media: { type: string; path: string }[];
};

type Props = {
  entry: TimelineEntry;
  width?: string;
  maxWidth?: string;
  height?: string;
  imageDuration?: number; // ms to show image before next
  pauseOnHover?: boolean;
};

function formatDate(dateString: string) {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleString("default", { month: "short", year: "numeric" });
}

export default function AutoMedia({
  entry,
  width = "w-full",
  maxWidth = "max-w-[20rem]",
  height = "h-72",
  imageDuration = 3000,
  pauseOnHover = true,
}: Props) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Build media array from entry, ensure correct base URL (exist in public/assets/)
  const media = (entry.media || []).map((m, i) => ({
    id: i,
    type: m.type as "image" | "video",
    src: `${import.meta.env.BASE_URL}${m.path.replace(/^\/+/, '')}`, 
  }));

  // Show image for fixed duration
  useEffect(() => {
    if (!media.length) return;
    const current = media[mediaIndex];
    if (!current) return;

    // For images, schedule next
    if (current.type === "image" && !isPaused) {
      timerRef.current = window.setTimeout(() => {
        nextMedia();
      }, imageDuration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [mediaIndex, media, isPaused, imageDuration]);

  function nextMedia() {
    setMediaIndex((idx) => (idx + 1) % media.length);
  }

  const startFormatted = formatDate(entry.start_date);
  const endFormatted = formatDate(entry.end_date);

  if (!entry) return null;

  return (
    <div
      className="w-full max-w-[23rem] sm:max-w-[30rem] mx-auto bg-transparent backdrop-blur-md shadow-lg rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 space-y-4"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Date Range Highlight */}
      <div className="inline-block text-gray-300 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md">
        {startFormatted}
        {endFormatted && ` — ${endFormatted}`}
      </div>

      {/* Title */}
      <h2 className="text-softBeige font-extrabold text-xl leading-tight">
        {entry.title}
      </h2>
      {entry.heading && (
        <p className="text-gray-400 text-sm">{entry.heading}</p>
      )}

      {/* Media block right after title */}
      {media.length > 0 && (
        <div className={`${width} ${maxWidth} min-h-[15rem] mx-auto ${height} relative rounded-2xl overflow-hidden shadow-md bg-black/30`}>
          <AnimatePresence initial={false} mode="wait">
            {media.map((m, i) =>
              i === mediaIndex ? (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  {m.type === "image" ? (
                    <img
                      src={m.src}
                      alt="media"
                      className="w-full h-full filter brightness-80 object-contain"
                      draggable={false}
                    />
                  ) : (
                    <video
                      key={m.src}
                      src={m.src}
                      className="w-full h-full filter brightness-80 object-contain"
                      playsInline
                      autoPlay
                      muted
                      onEnded={nextMedia}
                    />
                  )}
                  {/* Slightly darker overlay to reduce brightness even more */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Points + Description below media */}
      <div className="space-y-2 text-left mx-auto">
        {entry.points?.title && (
          <h4 className="text-white font-semibold text-sm mb-3">
            {entry.points.title}
          </h4>
        )}
        {entry.points?.content && entry.points.content.length > 0 && (
          <ul className="space-y-2 text-gray-300 text-sm">
            {entry.points.content.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <div
                  className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r from-green-400 to-teal-600 flex-shrink-0`}
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
        {entry.description?.content && (
          <p className="text-gray-400 text-sm">{entry.description.content}</p>
        )}
      </div>
    </div>
  );
}
