import React from "react";
import Particles from './Particles';

const TimeLineCard: React.FC = () => {
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
        <div className="relative w-full max-w-5xl">
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
                <div className="bg-white/10 p-4 rounded-xl w-64">
                  Left content area
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
