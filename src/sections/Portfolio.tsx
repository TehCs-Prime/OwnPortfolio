import React, { useState } from "react";
import FuzzyText from '../components/FuzzyText';
import ProjectCard from "../components/ProjectCards";
import projectsData from '../DataSources/Portfolio.json';
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import TechLogoMarquee from '../components/TechLogoMarquee';

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

    // Mobile responsiveness
    const fontSize = window.innerWidth < 768 ? '30rem' : '6rem';
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // Selected tech/field = activated
    const [activeFields, setActiveFields] = useState<string[]>([]);
    const [activeTechs, setActiveTechs] = useState<string[]>([]);

    const toggleField = (field: string, techs: string[]) => {
        const allSelected = techs.every((t) => activeTechs.includes(t));

        if (allSelected) {
            // deselect all
            setActiveFields((prev) => prev.filter((f) => f !== field));
            setActiveTechs((prev) => prev.filter((t) => !techs.includes(t)));
        } else {
            // select all
            setActiveFields((prev) =>
            prev.includes(field) ? prev : [...prev, field]
            );
            setActiveTechs((prev) => [...new Set([...prev, ...techs])]);
        }
    };

    const toggleTech = (field: string, techName: string, allTechs: string[]) => {
        setActiveTechs((prev) => {
            const newTechs = prev.includes(techName)
            ? prev.filter((t) => t !== techName) // deselect tech
            : [...prev, techName]; // add tech

            // check if all techs for this field are active
            const allSelected = allTechs.every((t) => newTechs.includes(t));

            setActiveFields((prev) =>
            allSelected
                ? [...new Set([...prev, field])] // activate field if all techs selected
                : prev.filter((f) => f !== field) // deactivate if not all selected
            );

            return newTechs;
        });
    };

    return (
        <div className="relative w-full h-full max-w-full ">

            {/* Section title */}
            <div className="
                flex flex-col justify-center text-center
                mt-20 px-2 
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

            {/* Filter - Tech fields & techs */}
            <div className="px-4 sm:px-12 md:px-20 mt-10 mb-20">
                {/* Fields row */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-6">
                {projectsData.TechStacks.map((stack: TechStack) => {
                    const FieldIcon = (Icons[stack.icon as keyof typeof Icons] ||
                    Icons.Circle) as React.ComponentType<LucideProps>;
                    
                    // if activated will shows color and border
                    // semiactivated (not all associated tech selected) will animate-pulse
                    // if not selected, remain dashed border and dim in color
                    const isActive = activeFields.includes(stack.field);
                    const techNames = stack.tech.map(t => t.name);
                    const activeCount = activeTechs.filter(t => techNames.includes(t)).length;

                    const isPartial = activeCount > 0 && activeCount < techNames.length;

                    return (
                    <span
                        key={stack.field}
                        onClick={() => toggleField(stack.field, techNames)}
                        className={`
                            group flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-4 rounded-full text-sm font-semibold
                            bg-black/30 backdrop-blur-sm transition-all duration-200 cursor-pointer
                            ${isActive ? "opacity-100 scale-105" 
                            : isPartial ? "opacity-100 scale-103 animate-pulse" 
                            : "opacity-70"}
                        `}
                        style={{
                            border: isActive
                            ? `2px solid ${stack.color}` 
                            : isPartial
                            ? `2px solid ${stack.color}90`      
                            : `2px dashed ${stack.color}80`,   
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive && !isPartial) {
                            (e.currentTarget as HTMLElement).style.border = `2px solid ${stack.color}`;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive && !isPartial) {
                            (e.currentTarget as HTMLElement).style.border = `2px dashed ${stack.color}80`;
                            }
                        }}
                    >
                        <FieldIcon
                        size={16}
                        className={`
                            ${isActive ? "text-current" 
                                : isPartial ? "text-current opacity-80" 
                                : "text-[#d8d4c4]/60"} transition-colors
                        `}
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
                <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
                    {projectsData.TechStacks.flatMap((stack: TechStack) =>
                        stack.tech.map((tech: Tech) => {
                            const TechIcon = (Icons[tech.icon as keyof typeof Icons] ||
                            Icons.Circle) as React.ComponentType<LucideProps>;

                            const isFieldActive = activeFields.includes(stack.field);
                            const isTechActive = activeTechs.includes(tech.name);

                        return (
                            <span
                                key={`${stack.field}-${tech.name}`}
                                onClick={() => toggleTech(stack.field, tech.name, stack.tech.map(t => t.name))}
                                className={`
                                group flex items-center justify-center gap-2
                                px-2 py-2 sm:px-4 sm:py-2 min-w-[120px] rounded-full text-xs sm:text-sm font-semibold
                                bg-black/30 backdrop-blur-sm cursor-pointer
                                transition-all duration-200
                                ${isFieldActive || isTechActive ? "opacity-100 scale-105" : "opacity-50"}
                                `}
                                style={{
                                border:
                                    isFieldActive || isTechActive
                                    ? `2px solid ${stack.color}`
                                    : `2px dashed ${stack.color}50`,
                                }}
                                onMouseEnter={(e) => {
                                if (!isFieldActive && !isTechActive) {
                                    (e.currentTarget as HTMLElement).style.border = `2px solid ${stack.color}`;
                                }
                                }}
                                onMouseLeave={(e) => {
                                if (!isFieldActive && !isTechActive) {
                                    (e.currentTarget as HTMLElement).style.border = `2px dashed ${stack.color}50`;
                                }
                                }}
                            >
                            <TechIcon
                                size={14}
                                className={`${
                                isFieldActive || isTechActive
                                    ? "text-current"
                                    : "text-[#d8d4c4]/40"
                                } transition-colors`}
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
                {/* --- Filter Projects --- */}
                {(() => {
                const filteredProjects = projectsData.Projects.filter((project) => {
                const projectFields =
                    project.techStack?.map((stack: { field: string; tech: string[] }) => stack.field) || [];

                const projectTechs =
                    project.techStack?.flatMap((stack: { field: string; tech: string[] }) => stack.tech) || [];

                if (activeFields.length === 0 && activeTechs.length === 0) return true;

                const matchesField = projectFields.some((field: string) =>
                    activeFields.includes(field)
                );

                const matchesTech = projectTechs.some((tech: string) =>
                    activeTechs.some(
                    (active) =>
                        tech.toLowerCase().includes(active.toLowerCase()) ||
                        active.toLowerCase().includes(tech.toLowerCase())
                    )
                );

                return matchesField || matchesTech;
                });

                return filteredProjects.length > 0 ? (
                    filteredProjects.map((filteredProject, idx) => (
                        <div key={idx} className="animate-fadeIn">
                            <ProjectCard
                            entry={filteredProject}
                            activeFields={activeFields}
                            activeTechs={activeTechs}
                            onFieldClick={(field) => toggleField(field, [])}
                            onTechClick={(field, tech) => toggleTech(field, tech, [])}
                            />
                        </div>
                        ))
                        ) : (
                            // fall back if not project appear under current filters
                            <div className="text-center text-gray-400 py-16 animate-fadeIn flex flex-col items-center">
                            <p className="text-lg md:text-xl font-medium">No projects match your current filters 😢</p>
                            <p className="text-sm md:text-base mt-2">Try adjusting or clearing your filters.</p>
                            <p className="text-sm md:text-base mt-8 opacity-80">You've selected techs I learned, but I don't have a project to show for them    //yet 😉.</p>
                            </div>
                        );
                    })()
                }   
            </div>

            {/* Tech Logo loop - only in mobile */}
            {/* as replacement to shows what skill/tech we had as i hide the tech filter on mobile (too messy to show) */}
            <div className="mt-50 sm:hidden">
                <TechLogoMarquee techStacks={projectsData.TechStacks} />
            </div>
        </div>
    )
}

export default Portfolio;