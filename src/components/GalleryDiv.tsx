import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GalleryDivProps {
  children: ReactNode[];
  galleryItemsAspectRatio: "video" | "square" | "regular";
}

export default function GalleryDiv({
  children,
  galleryItemsAspectRatio,
}: GalleryDivProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateConstraints = () => {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const maxDrag = scrollWidth - clientWidth;
      setConstraints({ left: -maxDrag, right: 0 }); // negative because drag moves child left
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [children]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowHint(true);
          setTimeout(() => setShowHint(false), 1500); // stop after one loop
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
        col-span-full 
        overflow-hidden
        relative
        cursor-grab active:cursor-grabbing
        ${showHint ? "hint-bounce" : ""}
      `}
    >
      <motion.div
        className="flex gap-4"
        drag="x"
        dragConstraints={constraints}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30, power: 0.8 }}
        dragElastic={0.2} // allows slight stretch at edges
      >
        {children.map((child, i) => (
          <div
            key={i}
            className={`
              flex-shrink-0 snap-center overflow-visible object-cover
              ${
                galleryItemsAspectRatio === "video"
                  ? "aspect-video"
                  : galleryItemsAspectRatio === "square"
                  ? "aspect-square"
                  : ""
              }
            `}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
