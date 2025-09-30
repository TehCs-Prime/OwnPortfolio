import { useEffect, useRef, useState } from "react";
import AutoMedia from "./AutoMedia";

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
  entries: TimelineEntry[];
  cardGap?: number; // px
  cardWidth?: number; // px - used for scroll amount calculation
  autoScrollInterval?: number | null; // ms; null = disabled
  pauseOnHover?: boolean;
};

export default function HorizontalGallery({
  entries,
  cardGap = 16,
  cardWidth = 480,
  autoScrollInterval = 4000,
  pauseOnHover = true,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll
  useEffect(() => {
    if (!autoScrollInterval) return;
    if (!scrollerRef.current) return;

    const id = setInterval(() => {
      if (pauseOnHover && isHovering) return;
      scrollToIndex((activeIndex + 1) % entries.length);
    }, autoScrollInterval);

    return () => clearInterval(id);
  }, [activeIndex, entries.length, autoScrollInterval, isHovering, pauseOnHover]);

  function scrollToIndex(index: number) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const child = scroller.children[index] as HTMLElement | undefined;
    if (child) {
      child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      setActiveIndex(index);
    }
  }

  function scrollByDirection(dir: -1 | 1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    // scroll by card width + gap
    scroller.scrollBy({ left: dir * (cardWidth + cardGap), behavior: "smooth" });

    // compute new active index approximately
    const children = Array.from(scroller.children) as HTMLElement[];
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    const nearest = children.reduce((best, el, i) => {
      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const prevDiff = Math.abs((children[best].offsetLeft + children[best].clientWidth / 2) - center);
      const curDiff = Math.abs(elCenter - center);
      return curDiff < prevDiff ? i : best;
    }, 0);
    setTimeout(() => setActiveIndex(nearest), 350);
  }

  // Update active index on manual scroll
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!scroller) return;
        const children = Array.from(scroller.children) as HTMLElement[];
        if (!children.length) return;
        const center = scroller.scrollLeft + scroller.clientWidth / 2;
        const nearestIndex = children.reduce((best, el, i) => {
          const elCenter = el.offsetLeft + el.clientWidth / 2;
          const prevDiff = Math.abs((children[best].offsetLeft + children[best].clientWidth / 2) - center);
          const curDiff = Math.abs(elCenter - center);
          return curDiff < prevDiff ? i : best;
        }, 0);
        setActiveIndex(nearestIndex);
      });
    }

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  if (!entries || entries.length === 0) return null;

  return (
    <div className="w-full relative">
      {/* Prev/Next buttons */}
      <button
        aria-label="Previous"
        onClick={() => scrollByDirection(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white shadow-lg"
      >
        ‹
      </button>

      <button
        aria-label="Next"
        onClick={() => scrollByDirection(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white shadow-lg"
      >
        ›
      </button>

      {/* Horizontal scroller */}
      <div
        ref={scrollerRef}
        onMouseEnter={() => pauseOnHover && setIsHovering(true)}
        onMouseLeave={() => pauseOnHover && setIsHovering(false)}
        className="w-full overflow-x-auto scroll-smooth py-4 md:py-6 px-4 md:px-8"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div
          className="flex items-stretch gap-4 md:gap-6"
          style={{ paddingBottom: 8 }}
        >
          {entries.map((e, i) => (
            <div
              key={i}
              className={`flex-shrink-0 snap-center w-full sm:w-[23rem] md:w-[30rem]`}
              style={{scrollSnapAlign: "center" }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${entries.length}`}
            >
              <AutoMedia entry={e} pauseOnHover={false} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {entries.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-transform focus:outline-none ${
              i === activeIndex ? "scale-110 bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
