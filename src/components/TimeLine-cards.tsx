import React, { useEffect, useRef, useState } from "react";
import Particles from './Particles';
import TrueFocus from './TrueFocus';
import timelineData from '../DataSources/TimeLine.json';

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
  // treat 'Present' as future date
  const dateA = a.start_date === 'Present' ? '9999-12' : a.start_date;
  const dateB = b.start_date === 'Present' ? '9999-12' : b.start_date;
  return dateB.localeCompare(dateA); // descending
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


const TimeLineCard: React.FC = () => {
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
const [beamTop, setBeamTop] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const wrapperTop = window.scrollY + rect.top;   // absolute top of wrapper
    const targetTop = window.scrollY + window.innerHeight / 2; // center of viewport

    // compute top relative to wrapper
    const relativeTop = targetTop - wrapperTop;

    // clamp between 0 and wrapper height so it never goes outside
    const clampedTop = Math.max(0, Math.min(relativeTop, rect.height));
    setBeamTop(clampedTop);
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
  };
}, []);


  return (
    <div className="relative w-full h-full max-w-full"> {/* parent */}
      {/* Particles as background */}
      <div className="fixed inset-0 -z-10 max-w-full">
        <Particles
          particleColors={['#ffffff']}
          particleCount={500}
          particleSpread={20}
          speed={0.5}
          particleBaseSize={120}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={true}
        />
      </div>
      
      {/* Content Wrapper */}
      <div className="relative flex flex-col z-10 items-center justify-start py-16 max-w-full">
        <div className="relative w-full" ref={wrapperRef}>
          {/* Center line */}
          <div className="absolute left-1/2 top-0 w-[0.2rem] h-full bg-gradient-to-b from-white/50 to-transparent -translate-x-1/2"></div>

          {/* Light beam */}
          <div
            className="absolute hidden md:block left-1/2 w-4 h-20 bg-gradient-to-b from-[#B9E986] to-[#7E9181] rounded-full shadow-[0_0_20px_#B9E986] -translate-x-1/2 z-50 "
            style={{ top: beamTop }}
          />
          {/* Initial blinking dot */}
          <div className="max-w-full absolute left-1/2 -top-12 w-24 h-24 bg-gradient-to-r from-[#0A2E36] to-[#B9E986] rounded-full flex items-center justify-center animate-pulse -translate-x-1/2 -translate-y-12 z-10">
            <div className="max-w-full w-12 h-12 bg-gray-300 rounded-full opacity-85"></div>
          </div>

          {/* Timeline Rows */}
          <div className="space-y-20 mt-30">
            {combined.map((item, index) => {
              const icon = item.source === 'academic' ? '🎓' : '💼';
              return (
                <div key={index} ref={(el) => { if(el) itemRefs.current[index] = el; }} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center h-auto md:h-screen">

                  {/* LEFT SIDE */}
                  <div className="flex justify-end pr-0 md:pr-[8rem] relative transition-transform duration-300 hover:scale-105">
                    {/* Connector line (center → left) */}
                    <div className="hidden md:flex absolute right-0 top-1/2 flex items-center -translate-y-1/2">
                      {/* Dot */}
                      <div className="bg-gradient-to-r from-[#FFF07C] to-[#80FF72] w-[1rem] h-[1rem] rounded-full ml-[-0.5rem]" />
                      {/* Horizontal line */}
                      <div className="w-[5rem] h-[0.2rem] bg-gradient-to-r from-white/50 to-transparent"></div>
                    </div>

                    {/* Left content */}
                    <div className="relative bg-transparent backdrop-blur-md shadow-lg rounded-2xl w-full max-w-md md:w-[35rem] p-6 hover:shadow-xl transition-shadow duration-300 beam-border">
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
                  <div className="flex justify-start pl-0 md:pl-[4rem] relative">
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


export default TimeLineCard;
