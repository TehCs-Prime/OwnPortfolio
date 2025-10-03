import React from 'react';
import * as Icons from 'lucide-react';

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

interface TechLogoMarqueeProps {
  techStacks: TechStack[];
}

const TechLogoMarquee: React.FC<TechLogoMarqueeProps> = ({ techStacks }) => {
  // Flatten all tech items from all stacks
  const allTechs = techStacks.flatMap(stack => 
    stack.tech.map(tech => ({
      ...tech,
      fieldColor: stack.color
    }))
  );

  // Duplicate the array for seamless loop
  const duplicatedTechs = [...allTechs, ...allTechs];

  return (
    <div className="block sm:hidden w-screen max-w-full overflow-hidden bg-black/40 backdrop-blur-sm py-6 my-8 -mx-4">
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee min-w-max">
          {duplicatedTechs.map((tech, idx) => {
            const TechIcon = (Icons[tech.icon as keyof typeof Icons] || Icons.Circle) as React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
            
            return (
              <div
                key={idx}
                className="flex items-center gap-2 mx-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border-2 whitespace-nowrap"
                style={{ borderColor: tech.color }}
              >
                <TechIcon
                  size={20}
                  style={{ color: tech.color }}
                />
                <span className="text-[#d8d4c4] text-sm font-semibold">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TechLogoMarquee;