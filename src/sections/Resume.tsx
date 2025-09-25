import React from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
import FuzzyText from '../components/FuzzyText';

// Core viewer
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Styles
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
                            The Next Chapter’
                        </span>
                    </FuzzyText>
                </h1>
            </div>

            {/* Section description */}
            <p className="sectionDes bg-black mt-16 p-[2rem] sm:p-[8rem] mb-32 text-[#d8d4c4] text-base sm:text-xl leading-relaxed text-justify">
                This is my resume             
            </p>
            
            {/* PDF Preview & Download */}
            <div className="max-w-3xl mx-auto mb-16 justify-center items-center px-6 sm:px-6">
                <Viewer
                    fileUrl="public/assets/Resumeeeeeeee-TehChunShen(25-5-25).pdf" 
                    plugins={[defaultLayoutPluginInstance]}
                />
            </div>
        </div>
        
    )
}

export default Resume;