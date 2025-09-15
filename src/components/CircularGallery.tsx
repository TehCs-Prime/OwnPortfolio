import React, { useRef, useState } from "react";
import AutoMedia from "./AutoMedia";

type Props = {
  entries: any[];            // array of TimelineEntry objects
  itemWidth?: string;        // e.g. 'w-[22rem]'
  gap?: string;              // e.g. 'gap-6'
};

export default function CircularGallery({
  entries,
  itemWidth = "w-[22rem]",
  gap = "gap-6",
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // handle mouse drag scrolling
  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }
  function handleMouseLeave() {
    setIsDown(false);
  }
  function handleMouseUp() {
    setIsDown(false);
  }
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1; // scroll-fast multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }

  return (
    <div
      ref={scrollRef}
      className={`flex ${gap} overflow-x-auto no-scrollbar cursor-grab py-4`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {entries.map((entry, i) => (
        <div key={i} className={`${itemWidth} flex-shrink-0`}>
          <AutoMedia
            entry={entry}
            height="h-56"
            imageDuration={3000}
            pauseOnHover={false}
          />
        </div>
      ))}
    </div>
  );
}
