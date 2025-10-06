import TimeLineTop from "../components/TimeLine-top";
import TimeLineCards from "../components/TimeLine-cards"
import FuzzyText from '../components/FuzzyText';
import useTypewriterlooping from '../Tools/Tools-useTypewriterlooping';

import { useEffect, useRef, useState } from 'react';

const TimeLine = () => {
    // Visibility observer
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartTyping(true); // start typing once visible
          observer.disconnect(); // stop observing after triggered once
        }
      },
      { threshold: 0.3 } // 30% visible triggers it
    );
    if (paragraphRef.current) observer.observe(paragraphRef.current);
    return () => observer.disconnect();
  }, []);

  const fontSize = window.innerWidth < 768 ? '30rem' : '6rem';
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const secEndingDes = useTypewriterlooping(
    [
        'A story still being written, driven by the belief that every experience brings me closer to the person who makes a real impact ...'
    ],
    10,    // typing speed (ms)
    100,   // pause before deleting (ms)
    false,   // don’t loop, just type once
    startTyping // start only when visible
    );
    return (
        <div className="relative w-full h-full max-w-full ">

            {/* Section title */}
            <div className="
                flex flex-col justify-center text-center
                mt-4 mb-8 px-2             /* mobile default */
                sm:mt-6 sm:mb-6 sm:px-4     /* ≥640px */
                md:flex-row md:text-left    /* ≥768px: side by side + left text */
                md:px-8                    /* more padding on larger screens */
            "
            >
                <h1 className="font-bold text-white">
                    <FuzzyText
                    fontWeight="bold"
                    fontSize= {fontSize}
                    color="#d8d4c4"
                    baseIntensity={isMobile ? 0.6 : 0.1}
                    hoverIntensity={isMobile ? 0.9 : 0.2}
                    enableHover={true}
                    >
                        <span>
                            The Story So Far’
                        </span>
                    </FuzzyText>
                </h1>
            </div>
        
            <TimeLineTop />

            {/* Section description */}
            <p className="sectionDes bg-black mt-16 p-[2rem] sm:p-[8rem] mb-32 text-[#d8d4c4] text-base sm:text-xl leading-relaxed text-justify">
                <strong>“The Story So Far”</strong> tells a living tapestry of my journey of how I’ve grown. Structured as a flowing narrative, each thread begins with my <strong>academic profile</strong> and <strong>work experiences</strong> as the milestones, while <strong>participations</strong>, <strong>achievements</strong>, <strong>competitions</strong> and <strong>awards</strong> bloom alongside them. This flowing structure lets every moment breathe in its own time and place, showing not just timeline events but the growth, dreams and challenges behind them. It seeks to draw you into my story - to witness how a spark of initiative grew into contribution, how each contribution rippled into recognition and how that recognition now awakens the path toward my future.
            </p>

            {/* Not directly reusable component as it alrd populate with data ... rushing*/}
            <TimeLineCards/>

            {/* Section description */}
            <p ref={paragraphRef} className="sectionDes bg-black mt-16 p-[2rem] sm:p-[8rem] mb-32 text-[#d8d4c4] text-lg sm:text-xl leading-relaxed text-justify">
                {secEndingDes}
            </p>
        </div>
        
    )
}

export default TimeLine;