import React, { useState } from "react";
import Particles from '../components/Particles';
import FuzzyText from '../components/FuzzyText';
import ProjectCard from "../components/ProjectCards";
import projectsData from '../DataSources/Portfolio.json';
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface Tech {
  name: string;
  icon: string;
  color: string;
}

interface TechStack {
  field: string;
  icon: string;
  color: string;
  tech: Tech[];
}

const Portfolio = () => {

    const fontSize = window.innerWidth < 768 ? '30rem' : '6rem';
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const [activeFields, setActiveFields] = useState<string[]>([]);
    const toggleField = (field: string) => {
        setActiveFields((prev) =>
        prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
        );
    };

    return (
        <div className="relative w-full h-full max-w-full ">

            {/* Particles as background */}
            <div className="fixed inset-0 -z-1  0 max-w-full">
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

            {/* Section title */}
            <div className="
                flex flex-col justify-center text-center
                mt-4 mb-8 px-2 
                sm:mt-6 sm:mb-6 sm:px-4
                md:flex-row md:text-left   
                md:px-8                    
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
                            The Woven Stage’
                        </span>
                    </FuzzyText>
                </h1>
            </div>

            {/* Section description */}
            <div className="sectionDes bg-black p-[2rem] sm:p-[8rem]  mt-24 mb-32 sm:mt-8 sm:mb-28 text-[#d8d4c4] text-base sm:text-xl leading-relaxed text-justify">
                <p><strong>“The Woven Stage”</strong> is where skills meet curiosity and imagination, bringing projects to life. Here, <strong>ideas, technologies,</strong> and <strong>abilities</strong> converge into a living showcase of my craft — exploring <strong>diverse fields </strong> and <strong> specific technologies</strong>  while tracing how each strand of experience weaves into real-world creation.</p>
                <p className='mt-14 sm:mt-16'>Invites you to witness not just finished works, but the <strong> steps, experimentation</strong> and <strong>growth</strong> that bring them steps into the light ...<span className="blinking-cursor">▌</span></p>
            </div>

            {/* Tech fields & techs */}
      <div className="px-4 sm:px-12 md:px-20 mt-10 mb-30">
        {/* Fields row */}
        <div className="flex flex-wrap justify-center gap-5 mb-6">
          {projectsData.TechStacks.map((stack: TechStack, i: number) => {
            const FieldIcon = (Icons[stack.icon as keyof typeof Icons] ||
              Icons.Circle) as React.ComponentType<LucideProps>;

            const isActive = activeFields.includes(stack.field);

            return (
              <span
                key={i}
                onClick={() => toggleField(stack.field)}
                className={`
          group flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold
          bg-black/30 backdrop-blur-sm
          transition-all duration-200 cursor-pointer
          ${isActive ? "opacity-100 scale-105" : "opacity-70"}
        `}
        style={{
          border: isActive
            ? `2px solid ${stack.color}` // active border color
            : `2px dashed ${stack.color}80`, // hover/idle border
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLElement).style.border = `2px solid ${stack.color}`;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLElement).style.border = `2px dashed ${stack.color}80`;
          }
        }}
      >
                <FieldIcon
                  size={16}
                  className={`${isActive ? "text-current" : "text-[#d8d4c4]/60"} transition-colors`}
                  style={{ color: stack.color }}
                />
                <span className="text-[#d8d4c4]">{stack.field}</span>
              </span>
            );
          })}
        </div>

        {/* Separator */}
        <div className="border-t-2 border-[#d8d4c4]/60 mx-auto my-8"></div>

        {/* Tech row */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projectsData.TechStacks.flatMap((stack: TechStack) =>
            stack.tech.map((tech: Tech, i: number) => {
              const TechIcon = (Icons[tech.icon as keyof typeof Icons] ||
                Icons.Circle) as React.ComponentType<LucideProps>;

              const isActive = activeFields.includes(stack.field);

              return (
                <span
                  key={i}
                  className={`
            group flex items-center justify-center gap-2
            px-4 py-2 min-w-[120px] rounded-full text-sm font-semibold
            bg-black/30 backdrop-blur-sm
            transition-all duration-200
            ${isActive ? "opacity-100 scale-105" : "opacity-30"}
          `}
          style={{
            border: isActive
              ? `2px solid ${stack.color}` // solid border if active
              : `2px dashed ${stack.color}50`, // dimmed dashed border if inactive
          }}
          onMouseEnter={(e) => {
            if (!isActive) {
              (e.currentTarget as HTMLElement).style.border = `2px solid ${stack.color}`;
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              (e.currentTarget as HTMLElement).style.border = `2px dashed ${stack.color}50`;
            }
          }}
        >
                  <TechIcon
                    size={14}
                    className={`${isActive ? "text-current" : "text-[#d8d4c4]/40"} transition-colors`}
                    style={{ color: tech.color }}
                  />
                  <span className="text-[#d8d4c4]">{tech.name}</span>
                </span>
              );
            })
          )}
        </div>
      </div>

            {/* Project Display */}
            <div className="px-4 sm:px-12 md:px-20 mt-20">
                {projectsData.Projects.map((project, idx) => (
                    <ProjectCard key={idx} entry={project} />
                ))}
            </div>
        </div>
        
    )
}

export default Portfolio;