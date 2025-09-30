import Particles from '../components/Particles';
import FuzzyText from '../components/FuzzyText';
import ProjectCard from "../components/ProjectCards";
import projectsData from '../DataSources/Portfolio.json';

const Portfolio = () => {

    const fontSize = window.innerWidth < 768 ? '30rem' : '6rem';
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    return (
        <div className="relative w-full h-full max-w-full ">

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