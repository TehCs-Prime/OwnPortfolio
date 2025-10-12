// components/ProjectCard.tsx
import React, { useState, useEffect, useRef } from "react";
import AutoMedia from "./AutoMedia";
import { Github, ArrowUpRight } from "lucide-react"; 

interface TechStackItem {
  field: string;
  tech: string[];
}

interface ProjectEntry {
  start_date?: string;
  end_date?: string;
  title: string;
  heading?: string;
  description: string;
  points: { title?: string; content: string[] };
  media: { type: string; path: string }[];
  date?: string;
  status?: string;
  category?: string;
  techStack: TechStackItem[];
  sourceCode?: string;
  liveSite?: string;
}

interface Props {
  entry: ProjectEntry;
  activeFields: string[];
  activeTechs: string[];
  onFieldClick: (field: string) => void;
  onTechClick: (field: string, tech: string) => void;
}

function formatDate(dateString: string) {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleString("default", { month: "short", year: "numeric" });
}

const ProjectCard: React.FC<Props> = ({ entry, activeFields, activeTechs, onFieldClick, onTechClick }) => {
    
  // Helper function: Map status -> Tailwind styles
  // Define corresponding status color here 
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
        case "deployed":
          return "bg-green-500/20 text-green-300 border-green-400/40";
        case "in progress":
          return "bg-yellow-500/20 text-yellow-300 border-yellow-400/40";
        case "planned":
          return "bg-gray-500/20 text-gray-300 border-gray-400/40";
        case "completed":
          return "bg-cyan-500/20 text-cyan-300 border-cyan-400/40";
        case "paused":
          return "bg-red-500/20 text-red-300 border-red-400/40";
        default:
          return "bg-white/5 text-white border-white/20"; // fallback
    }
  };

  // Horizontal scrolling tools
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Hint that this component is scrollable
  const [showHint, setShowHint] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowHint(true);
            observer.disconnect(); // run only once
          }
        });
      },
      { threshold: 0.9 } // 30% visible triggers
    );

    if (hintRef.current) {
      observer.observe(hintRef.current);
    }

    return () => {
      if (hintRef.current) observer.unobserve(hintRef.current);
    };
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row items-stretch gap-5 md:gap-16 text-[#d8d4c4] mb-24 p-[1rem]">

      {/* Mobile-first Date */}
      {entry.date && (
        <div className="block md:hidden text-center order-1">
            <div className="inline-block text-[#d8d4c4]/90 px-3 py-1 rounded-full text-2xl font-bold tracking-wide shadow-md">
                {formatDate(entry.date)}    
            </div>
        </div>
      )}

      {/* Left section – info */}
      <div className="w-full md:w-1/2 order-2 md:order-1 max-w-screen">
        {/* Project Title + Status*/}
        <div className="flex items-center justify-between mb-2">
          {/* Project Title */}
          <h2 className="text-2xl md:text-4xl font-bold text-left">{entry.title}</h2>

          {/* Project Status - defined color above */}
          {entry.status && (
              <span className={`ml-auto text-sm md:text-base font-medium px-5 py-2 rounded-full  ${getStatusStyle(entry.status)}`}>
              {entry.status}
              </span>
          )}
        </div>

        {/* Project Heading + Category*/}
        {(entry.heading || entry.category) && (
        <div className="flex items-center justify-between mb-6">
          
          {/* Project Heading */}
          {entry.heading && (
          <p className="text-sm md:text-base opacity-80">{entry.heading}</p>
          )}

          {/* Project Category */}
          {entry.category && (
          <span className="ml-auto text-xs md:text-sm font-medium px-3 py-1 opacity-90">
              {entry.category}
          </span>
          )}
        </div>
        )}

        {/* Mobile view - Media display */}
        <div className="mb-6 block md:hidden mb-6">
          <AutoMedia
            entry={{
            start_date: "",
            end_date: "",
            title: "", 
            heading: undefined,
            description: { content: "" }, 
            points: { content: [] }, 
            media: entry.media ?? [],
            }}
            width = "w-full"
            ySpace="p-0"
            maxWidth= ""
            height="h-[20rem] md:h-[25rem]"
            imageDuration={3000}
            pauseOnHover={true}
          />
        </div>
        
        {/* Project involved Techtags  */}
        {/* Later try enhance or replace with the one on filter */}

        {/* Tech tags row */}
        <div className="flex flex-wrap gap-3 mb-8">
          {entry.techStack.flatMap((stack) =>
            stack.tech.map((techItem, i) => {
              // which tech is activated/selected
              const isTechActive = activeTechs.includes(techItem);
              return (
                <span
                  key={`${stack.field}-${i}`}
                  className={`
                    px-4 py-1 text-sm rounded-full border border-[#d8d4c4]/40 cursor-pointer
                    transition-all duration-300 ease-out
                    ${isTechActive 
                      ? "bg-gradient-to-r from-[#d8d4c4] to-[#E4F3B9]/80 border-[#d8d4c4]/70 text-black font-semibold shadow-lg scale-110 animate-pulse" 
                      : "bg-white/5 hover:bg-white/20 text-[#d8d4c4] hover:text-white"
                    }
                  `}
                  data-field={stack.field} // for future filtering
                  onClick={() => onTechClick(stack.field, techItem)}
                >
                  {techItem}
                </span>
              );
            })
          )}
        </div>

        {/* Tech fields row */}
        <div 
          ref={el => {
            scrollContainerRef.current = el;
            // hint scrollable component
            hintRef.current = el; 
          }}
          className="overflow-x-auto mb-4 md:mb-2 scrollbar-hide cursor-grab active:cursor-grabbing hint-bounce"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`flex gap-6 flex-nowrap w-max justify-start max-w-[90vw] pr-12 -mr-6 ${showHint ? "hint-bounce" : ""}`}>
            {entry.techStack.map((stack, i) => {
              // which tech field is selected/associated
              const isActive = activeFields.includes(stack.field);
              return (
                <button
                  key={i}
                  className={`text-sm md:text-base transition-all duration-300 ease-out pb-1 whitespace-nowrap ${
                    isActive
                      ? "text-[#EDDEA4] scale-140 translate-y-[-8px] font-semibold border-b-3 border-[#EDDEA4]"
                      : "text-[#d8d4c4]/70 hover:text-[#646cff]/90 scale-100 translate-y-0 border-b-2 border-transparent"
                  }`}
                  style={{ flex: "0 0 auto" }}
                  onClick={() => onFieldClick(stack.field)}
                >
                  {stack.field}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Description */}
        <p className="text-base md:text-lg leading-relaxed text-justify order-5 md:order-none last:text-left mt-6">
          {entry.description}
        </p>

        {/* Optional Project Points form */}
        {entry.points?.content?.length > 0 && (
        <div className="mt-6 text-left order-6 md:order-none">
            {/* Points Title */}
            {entry.points.title && (
            <h3 className="text-lg font-semibold mb-1 italic">
                {entry.points.title}
            </h3>
            )}

            {/* Points List */}
            <ul className="pl-3 sm:pl-5 opacity-90 space-y-2">
            {entry.points.content.map((point, idx) => (
              <li key={idx} className="flex items-center gap-3">
                {/* Custom Gradient Dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full mt-1 bg-gradient-to-r from-green-400 to-teal-600 flex-shrink-0"
                />
                {/* Point Text */}
                <span className="opacity-90 leading-relaxed">{point}</span>
              </li>
            ))}
            </ul>
        </div>
        )}


        {/* Links Icon*/}
        <div className="mt-10 flex items-center order-7 md:order-none">
          {/* Github */}
          {entry.sourceCode && (
            <a
              href={entry.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 rounded-full border border-[#d8d4c4]/40 bg-black hover:bg-white/10 transition"
            >
              <Github className="w-6 h-6 text-white" />
            </a>
          )}

          {/* Live site */}
          {entry.liveSite && (
            <a
              href={entry.liveSite}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center justify-center w-12 h-12 rounded-full border border-[#d8d4c4]/40 bg-white/80 hover:bg-gray-200 transition"
            >
              <ArrowUpRight  className="w-6 h-6 text-black" />
            </a>
          )}
        </div>
      </div>

      {/* Right section – AutoMedia */}
      <div className="flex-1 flex flex-col self-stretch order-3 md:order-2 hidden md:block">
        {/* Project Date */}
        {entry.date && (
            <div className="hidden md:inline-block text-[#d8d4c4]/90 px-3 py-1 rounded-full text-4xl text-center font-bold tracking-wide shadow-md mb-1">
              {formatDate(entry.date)}
            </div>
        )}

        {/* Reuse AutoMedia component but limit to only date and media shown */}
        <AutoMedia
          entry={{
          start_date: "",
          end_date: "",
          title: "", 
          heading: undefined,
          description: { content: "" }, 
          points: { content: [] }, 
          media: entry.media ?? [],
          }}
          width = "w-full p-0"
          maxWidth= ""
          height="h-[20rem] md:h-[25rem]"
          imageDuration={3000}
          pauseOnHover={true}
        />
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);