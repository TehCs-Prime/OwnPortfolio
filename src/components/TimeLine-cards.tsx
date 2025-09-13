import React from "react";
import Particles from './Particles';
import TrueFocus from './TrueFocus';
import AutoMedia from './AutoMedia';


const TimeLineCard: React.FC = () => {
const TestMedia = [
  { type: "image" as const, src: "/src/DataSources/ExpImg1.png", alt: "Test 1" },
  { type: "image" as const, src: "/src/DataSources/ExpImg2.png", alt: "Test 2" },
  { type: "video" as const, src: "/src/DataSources/Expvideo.mp4", poster: "portfolio-website/src/DataSources/ExpImg1.png" },
];
  return (
    <div className="relative w-full h-full"> {/* parent */}
      {/* Particles as background */}
      <div className="fixed inset-0 -z-10">
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
      <div className="relative flex flex-col z-10 items-center justify-start py-16 px-4">
        <div className="relative w-full">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 w-[0.2rem] h-full bg-gradient-to-b from-white/50 to-transparent -translate-x-1/2"></div>

          {/* Initial blinking dot */}
          <div className="absolute left-1/2 -top-12 w-24 h-24 bg-gradient-to-r from-[#0A2E36] to-[#B9E986] rounded-full flex items-center justify-center animate-pulse -translate-x-1/2 -translate-y-12 z-10">
            <div className="w-12 h-12 bg-gray-300 rounded-full opacity-85"></div>
          </div>

          {/* Timeline Rows */}
          <div className="space-y-20 mt-20">
            <div className="grid grid-cols-2 gap-4 items-center">

              {/* LEFT SIDE */}
              <div className="flex justify-end pr-[8rem] relative">
                {/* Connector line (center → left) */}
                <div className="absolute right-0 top-1/2 flex items-center -translate-y-1/2">
                  {/* Horizontal line */}
                  <div className="bg-gradient-to-r from-purple-400 to-pink-600 w-[1rem] h-[1rem] rounded-full ml-[-0.5rem]" />
                  {/* Dot */}
                  <div className="w-[5rem] h-[0.2rem] bg-gradient-to-r from-white/50 to-transparent"></div>
                </div>

                {/* Left content */}
                <div className="bg-transparent backdrop-blur-md shadow-lg rounded-2xl w-[35rem] p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="space-y-3">
                    {/* Date */}
                    <div className="text-xs text-gray-300 font-light tracking-wide">
                      <span className="inline-block">
                        <TrueFocus 
                          sentence="Jul 2023 — Sep 2023"
                          manualMode={true}
                          blurAmount={1.5}
                          borderColor="#5227ff"
                          animationDuration={0.5}
                          pauseBetweenAnimations={1}
                        />
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="flex items-center gap-4 text-2xl font-bold text-transparent bg-clip-text bg-white m-0">
                      <span className="bg-blue-500/20 p-2 rounded-full text-indigo-300 text-2xl">🎓</span>
                      <span className="text-white font-extrabold text-xl leading-tight">Southern University College, Johor, Malaysia</span>
                    </h2>

                    {/* Heading */}
                    <h3 className="text-base text-gray-400 font-medium">
                      Summer Internship | Assistant Executive
                    </h3>
                    {/* Media display */}
                    <div className="mt-5">
                      <AutoMedia
                      media={TestMedia}
                      height="h-[20rem]"
                      autoPlayInterval={5000}
                      pauseOnHover={false}
                      showDots={false}
                      showArrows={false}
                    />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex justify-start pl-[8rem] relative">
                {/* Connector line (center → right) */}
                <div className="absolute left-0 top-1/2 flex items-center -translate-y-1/2">
                  {/* Dot */}
                  <div className="w-[5rem] h-[0.2rem] bg-gradient-to-l from-white/50 to-transparent"></div>
                  {/* Horizontal line */}
                  <div className="bg-gradient-to-r from-purple-400 to-pink-600 w-[1rem] h-[1rem] rounded-full ml-[-0.5rem]" />
                </div>

                {/* Right content */}
                <div className="bg-white/10 p-4 rounded-xl w-64">
                  Right content area
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TimeLineCard;
