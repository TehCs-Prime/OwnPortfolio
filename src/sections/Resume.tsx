import FuzzyText from '../components/FuzzyText';

const Resume = () => {
    // Visibility observer
  const fontSize = window.innerWidth < 768 ? '30rem' : '6rem';
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    return (
        <div className="relative w-full h-full max-w-full ">
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
                            The Next Chapter’
                        </span>
                    </FuzzyText>
                </h1>
            </div>

            {/* Section description */}
            <div className="sectionDes bg-black p-[2rem] sm:p-[8rem]  mt-24 mb-32 sm:mt-8 sm:mb-16 text-[#d8d4c4] text-base sm:text-xl leading-relaxed text-justify">
                <p><strong>“The Next Chapter”</strong> gathers every thread I've spun and weaves them forward into a living tapestry of who I am becoming. Here, I invite you to follow these strands, <strong>exploring my capabilities</strong> in a tangible way.</p>
                <span className="text-sm italic text-[#bfb99f] ml-6">
                    (or perhaps an official way to introduce myself?)
                </span>
                <p className='mt-12 sm:mt-8'>As you read, you witness not only my accomplishments but <strong>the momentum that propels me toward what comes next</strong> ...<span className="blinking-cursor">▌</span></p>
            </div>
            
            {/* Resume Button */}
            <div className="flex justify-center mb-16">
                <a
                    href="/portfolio-website/assets/Resumeeeeeeee-TehChunShen(25-5-25).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    px-8 py-4 text-lg font-semibold sm:font-bold !text-black 
                    bg-[#d8d4c4]/80 rounded-xl 
                    transition-transform duration-300
                    hover:scale-105
                    "
                >
                    My Resume 📄
                </a>
            </div>
        </div>
    )
}

export default Resume;