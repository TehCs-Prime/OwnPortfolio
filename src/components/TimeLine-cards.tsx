import React, { useEffect, useRef, useState } from "react";
import TrueFocus from './TrueFocus';
import timelineData from '../DataSources/TimeLine.json';
import HorizontalGallery from "./HorizontalGallery";
import GalleryDiv from "./GalleryDiv";
import AutoMedia from "./AutoMedia";

// Props same as in local JSON
type TimelineItem = {
  start_date: string;
  end_date: string;
  title: string;
  heading: string;
  description: {
    title: string;
    content: string;
  };
  points: {
    title: string;
    content: string[];
  },
  media: { type: string; path: string }[];
  source?: 'academic' | 'work';
};

const academic = (timelineData.academic_profile as TimelineItem[]).map(item => ({
  ...item,
  source: 'academic' as const
}));

const work = (timelineData.work_experience as TimelineItem[]).map(item => ({
  ...item,
  source: 'work' as const
}));

// combine only academic + work
const combined = [...academic, ...work];

// sort newest first based on start_date (YYYY-MM format)
combined.sort((a, b) => {
  // Handle ongoing/current entries first
  const aIsCurrent = a.end_date.toLowerCase() === 'present';
  const bIsCurrent = b.end_date.toLowerCase() === 'present';

  if (aIsCurrent && !bIsCurrent) return -1; // a first
  if (!aIsCurrent && bIsCurrent) return 1;  // b first

  // Otherwise sort by start_date descending
  return b.start_date.localeCompare(a.start_date);
});

const formatDate = (dateStr: string) => {
  if (!dateStr || dateStr.toLowerCase() === 'present') return 'Present';
  // dateStr is "YYYY-MM"
  const [year, month] = dateStr.split('-').map(Number);
  // month - 1 because Date months are 0-indexed
  const date = new Date(year, month - 1);
  // "Jul 2023"
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

// all participations, achievements, competitions, awards as events
const allEvents = [
  ...timelineData.participations_achievements,
  ...timelineData.competitions_awards
];

// Format Date
function parseDate(str: string) {
  if (!str || str.toLowerCase() === 'present') return new Date(); // now
  const [y, m] = str.split('-').map(Number);
  return new Date(y, (m || 1) - 1);
}

// check if this event belong to which milestone(academic / work)
function isEventInRange(eventStart: string, eventEnd: string, itemStart: string, itemEnd: string) {
  const evStart = parseDate(eventStart).getTime();
  const evEnd = eventEnd ? parseDate(eventEnd).getTime() : evStart;
  const itStart = parseDate(itemStart).getTime();
  const itEnd = itemEnd ? parseDate(itemEnd).getTime() : Date.now();

  return evStart <= itEnd && evEnd >= itStart; // overlaps
}


const TimeLineCard: React.FC = () => {
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Full row = left + right
  const fullRowRefs = useRef<HTMLDivElement[]>([]);
  const leftRefs = useRef<HTMLDivElement[]>([]);
  const rightRefs = useRef<HTMLDivElement[]>([]);

  // Central following light beam
  const [beamOpacity, setBeamOpacity] = useState(1); 
  const [beamTop, setBeamTop] = useState(0);

  // Mobile responsive
  const [isMobile, setIsMobile] = useState(false);

  // Milestone Counter
  const [showCounter, setShowCounter] = useState(false);
  const [currentCounter, setCurrentCounter] = useState(0);

useEffect(() => {
  // Only if current viewport is on this container wrapper then shows
  const handleVisibility = () => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();

    const viewportMid = window.innerHeight / 2;

    // Show only if midpoint of viewport is inside wrapper
    const isVisible = viewportMid >= rect.top && viewportMid <= rect.bottom;

    setShowCounter(isVisible);
  };

  handleVisibility();
  window.addEventListener('scroll', handleVisibility, { passive: true });
  window.addEventListener('resize', handleVisibility);

  return () => {
    window.removeEventListener('scroll', handleVisibility);
    window.removeEventListener('resize', handleVisibility);
  };
}, []);

useEffect(() => {
  // Responsive design
  const checkScreen = () => setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
  checkScreen();
  window.addEventListener('resize', checkScreen);
  return () => window.removeEventListener('resize', checkScreen);
}, []);

useEffect(() => {
  // Central beam visibility control- not covering cards
  let ticking = false;
  const handleScroll = () => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const wrapperTop = window.scrollY + rect.top;   
    const targetTop = window.scrollY + window.innerHeight / 2; 

    // beam top relative to wrapper
    const relativeTop = targetTop - wrapperTop;
    const clampedTop = Math.max(0, Math.min(relativeTop, rect.height));
    setBeamTop(clampedTop);

    const beamAbsoluteTop = wrapperTop + clampedTop;
    let opacity = 1;

    // helper to fade gradually within a zone
    const fadeAmount = (start:number, end:number, y:number) => {
    const buffer = 200; // bigger buffer = earlier fade
    // Beam fully visible above start-buffer
    if (y < start - buffer) return 1;
    // Fade down to 0 from start-buffer to start
    if (y >= start - buffer && y < start) {
      return (start - y) / buffer; // 1 → 0
    }
    // Fully invisible over the element
    if (y >= start && y <= end) return 0;
    // Fade back in after element
    if (y > end && y <= end + buffer) {
      return (y - end) / buffer; // 0 → 1
    }
    return 1;
  };

    // check full-width row overlap
    fullRowRefs.current.forEach(row => {
      if (row) {
        const rowRect = row.getBoundingClientRect();
        const rowTop = window.scrollY + rowRect.top;
        const rowBottom = rowTop + rowRect.height;
        opacity = Math.min(opacity, fadeAmount(rowTop, rowBottom, beamAbsoluteTop));
      }
    });

    if (isMobile) {
      // check left cards
      leftRefs.current.forEach(left => {
        if (left) {
          const leftRect = left.getBoundingClientRect();
          const leftTop = window.scrollY + leftRect.top;
          const leftBottom = leftTop + leftRect.height;
          opacity = Math.min(opacity, fadeAmount(leftTop, leftBottom, beamAbsoluteTop));
        }
      });

      // check right cards
      rightRefs.current.forEach(right => {
        if (right) {
          const rightRect = right.getBoundingClientRect();
          const rightTop = window.scrollY + rightRect.top;
          const rightBottom = rightTop + rightRect.height;
          opacity = Math.min(opacity, fadeAmount(rightTop, rightBottom, beamAbsoluteTop));
        }
      });
    }

    setBeamOpacity(opacity);
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll(); // run your logic at next repaint
        ticking = false;
      });
      ticking = true;
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  window.addEventListener("scroll", onScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
    window.removeEventListener("scroll", onScroll);
  };
}, [isMobile]);

useEffect(() => {
  // Milestone counter tracking - only pass >50% of item viewpoint then update it
  let ticking = false;

  const handleScroll = () => {
    if (!wrapperRef.current) return;

    const mid = window.innerHeight / 2; // viewport midpoint (y)
    const mainRows = itemRefs.current.filter(Boolean);
    let found = false;

    for (let i = 0; i < mainRows.length; i++) {
      const rect = mainRows[i].getBoundingClientRect();
      // check if viewport midpoint lies inside this row (viewport coords)
      if (rect.top <= mid && rect.bottom >= mid) {
        setCurrentCounter(prev => (prev !== i + 1 ? i + 1 : prev));
        found = true;
        break;
      }
    }

    if (!found && mainRows.length) {
      const firstRectTop = mainRows[0].getBoundingClientRect().top;
      // Only reset to 0 when the midpoint is ABOVE the first row
      if (mid < firstRectTop) {
        setCurrentCounter(prev => (prev !== 0 ? 0 : prev));
      }
      // if midpoint is below last row => do nothing (keep last counter)
    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  handleScroll(); // run once on mount to set initial counter
  return () => window.removeEventListener('scroll', onScroll);
}, []);

// Preprocess events so each belongs only to the OLDEST overlapping milestone
const assignedEvents = new Set<typeof allEvents[number]>();
const eventsPerItem: (typeof allEvents[number])[][] = Array(combined.length)
  .fill(null)
  .map(() => []);

// Process from oldest → newest (reverse of visual order)
[...combined].reverse().forEach((item, reverseIndex) => {
  const itemIndex = combined.length - 1 - reverseIndex; // real index (for render order)
  for (const ev of allEvents) {
    if (assignedEvents.has(ev)) continue; // already assigned to older milestone
    if (isEventInRange(ev.start_date, ev.end_date, item.start_date, item.end_date)) {
      eventsPerItem[itemIndex].push(ev);
      assignedEvents.add(ev);
    }
  }
});

  return (
    <div className="relative w-full h-full max-w-full"> 
      {/* Timeline Event Counter */}
      <div
        className={`fixed top-12 sm:top-48 left-4 sm:left-12 z-50 
          text-[6rem] font-extrabold pointer-events-none select-none
          transition-all duration-500 
          ${showCounter ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ color: '#d8d4c4' }}
      >
        {String(currentCounter).padStart(2, '0')}
      </div> 
      
      {/* Content Wrapper */}
      <div className="relative flex flex-col z-10 items-center justify-start py-16 max-w-full">
        <div className="relative w-full" ref={wrapperRef}>
          {/* Center line */}
          <div className="absolute left-1/2 top-0 w-[0.2rem] h-full bg-gradient-to-b from-white/50 to-transparent -translate-x-1/2"></div>

          {/* Central Light beam */}
          <div
            className="absolute left-1/2 w-4 h-20 bg-gradient-to-b from-[#B9E986] to-[#7E9181] rounded-full shadow-[0_0_20px_#B9E986] -translate-x-1/2 z-50 transition-opacity duration-300"
            style={{ top: beamTop, opacity: beamOpacity }}
          />

          {/* Initial blinking dot */}
          <div className="max-w-full absolute left-1/2 -top-12 w-24 h-24 bg-gradient-to-r from-[#0A2E36] to-[#B9E986] rounded-full flex items-center justify-center animate-pulse -translate-x-1/2 -translate-y-12 z-10">
            <div className="max-w-full w-12 h-12 bg-gray-300 rounded-full opacity-85"></div>
          </div>

          {/* Timeline Rows */}
          <div className="space-y-32 mt-[15rem]">
            {combined.map((item, index) => {
              const icon = item.source === 'academic' ? '🎓' : '💼';
              return (
                <div key={index} className="space-y-[12rem]"> 
                  {/* Row 1 : */}
                  <div ref={(el) => { if(el) itemRefs.current[index] = el; }} className="grid mt-[20rem] grid-cols-1 md:grid-cols-2 gap-4 items-center">

                    {/* LEFT SIDE */}
                    <div ref={el => { if (el) leftRefs.current[index] = el; }} className="flex justify-end pr-0 md:pr-[8rem] relative transition-transform duration-300 hover:scale-105">
                      {/* Connector line (center → left) */}
                      <div className="hidden md:flex absolute right-0 top-1/2 flex items-center -translate-y-1/2">
                        {/* Dot */}
                        <div className="bg-gradient-to-r from-[#FFF07C] to-[#80FF72] w-[1rem] h-[1rem] rounded-full ml-[-0.5rem]" />
                        {/* Horizontal line */}
                        <div className="w-[5rem] h-[0.2rem] bg-gradient-to-r from-white/50 to-transparent"></div>
                      </div>

                      {/* Left content */}
                      <div className="relative bg-transparent backdrop-blur-md shadow-lg rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[35rem] p-6 hover:shadow-xl mx-auto item-center transition-shadow duration-300 beam-border">
                        <div className="space-y-3">
                          <div className="flex items-center gap-1 w-full">
                            {/* Icon + Date + Title + Headings */}
                            <div className="flex flex-col flex-1 text-center items-center">

                              {/* Icon */}
                              <div className="relative inline-flex items-center justify-center 
                                              p-4 rounded-full text-4xl text-indigo-200
                                              aspect-square w-fit h-fit mb-[2rem]
                                              bg-indigo-500/25 shadow-[0_0_15px_#6366f1] hover:shadow-[0_0_25px_#6366f1] 
                                              transition-shadow duration-300">
                                {icon}
                              </div>
                              
                              {/* Date */}
                              <div className="text-xs text-gray-300 font-light tracking-wide mb-[1.1rem]">
                                <span className="inline-block">
                                  <TrueFocus 
                                    sentence={`${formatDate(item.start_date)} — ${formatDate(item.end_date)}`}
                                    manualMode={true}
                                    blurAmount={1.9}
                                    borderColor="#5227ff"
                                    animationDuration={0.5}
                                    pauseBetweenAnimations={1}
                                  />
                                </span>
                              </div>

                              {/* Title */}
                              <h2 className="text-white font-extrabold text-xl leading-tight">
                                {item.title}
                              </h2>

                              {/* Heading */}
                              <h3 className="text-base text-gray-400 font-medium">
                                {item.heading}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div ref={el => { if (el) rightRefs.current[index] = el; }} className="flex justify-start pl-0 md:pl-[4rem] relative">
                      {/* Right content */}
                      <div className="p-4 rounded-xl w-full max-w-lg md:w-[40rem]">
                        <div className="text-left backdrop-blur-sm rounded-xl p-6">

                          {/* Description */}
                          <h4 className="text-white font-semibold text-sm mb-3">{item.description.title}</h4>
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed text-justify">
                            {item.description.content}
                          </p>

                          {/* Points */}
                          {item.points.content.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-white font-semibold text-sm mb-3">{item.points.title}</h4>
                              {item.points.content.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r from-green-400 to-teal-600 flex-shrink-0`} />
                                        <p className="text-gray-300 text-sm leading-relaxed text-justify">
                                          {point}
                                        </p>
                                </div>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: New row under the above two columns - Events row */}
                    {(() => {
                      // Filter events under this row
                      const eventsForThisItem = eventsPerItem[index];

                    if (eventsForThisItem.length === 0) return null; // nothing at all

                      return (
                        // If any events to be populated, call it as horizontal scrolable component
                        <div
                          ref={el => { if (el) fullRowRefs.current[index] = el; }}
                          className="relative w-full items-stretch bg-black/30 item-start backdrop-blur-md rounded-xl p-0 sm:p-6"
                        >
                          <HorizontalGallery >
                            <GalleryDiv galleryItemsAspectRatio="square">
                              {eventsForThisItem.map((ev, idx) => (
                                <AutoMedia
                                  key={idx}
                                  entry={ev}       // single entry now
                                  height="h-full min-h-[15rem]"
                                  imageDuration={3500}
                                  pauseOnHover={false}
                                />
                              ))}
                            </GalleryDiv>
                          </HorizontalGallery>
                        </div>
                      );
                    })()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


export default TimeLineCard;
