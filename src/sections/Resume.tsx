import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import FuzzyText from '../components/FuzzyText';

import resumePDF from '/assets/Resumeeeeeeee-TehChunShen(25-5-25).pdf';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Resume = () => {
    // Visibility observer
  const fontSize = window.innerWidth < 768 ? '30rem' : '6rem';
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
            <p className="sectionDes bg-black p-[2rem] sm:p-[8rem]  mt-24 mb-32 sm:mt-8 sm:mb-28 text-[#d8d4c4] text-base sm:text-xl leading-relaxed text-justify">
                <p><strong>“The Next Chapter”</strong> gathers every threads I've spun and weaves them forward into a living tapestry of who I am becoming. Here, I invite you to follow these strands, <strong>exploring my capabilities</strong> in a tangible way.</p>
                <p className='mt-12 sm:mt-8'>As you read, you witness not only my accomplishments but <strong>the momentum that propels me toward what comes next</strong> ...<span className="blinking-cursor">▌</span></p>
            </p>
            
            {/* PDF Preview & Download */}
            <div className="max-w-3xl mx-auto mb-16 justify-center items-center px-6 sm:px-6">
                <Viewer
                    fileUrl={resumePDF} 
                    plugins={[defaultLayoutPluginInstance]}
                    defaultScale={isMobile ? 0.5 : 1}
                />
            </div>
        </div>
        
    )
}

export default Resume;