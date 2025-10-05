import React, { useState } from "react";
import FuzzyText from '../components/FuzzyText';
import emailjs from 'emailjs-com';
import WordsTyping from '../Tools/Tools-useTypewriterlooping'

import HomeCodingPic from '/assets/Code typing-amico.png'


const AboutMe = () => {
    // Visibility observer
    const fontSize = window.innerWidth < 768 ? '20rem' : '4rem';
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const typingWords = WordsTyping(['Developer','Tech Passionalist', 'Freelancer'],80,2200);

    const [formData, setFormData] = useState({
            name: '',
            email: '',
            message: '',
        });

    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.message.trim()) {
            setStatus('Message cannot be empty.');
            return;
        }

        emailjs.send(
            'service_ffk5zh2', // replace with your EmailJS service ID
            'template_p0kl9q7', // replace with your EmailJS template ID
            formData,
            'fNXYRihJir0rMc9he' // replace with your EmailJS public key
        ).then(
            () => setStatus('✅ Message sent! Thank you.'),
            () => setStatus('Failed to send. Please try again.')
        );

        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="relative w-full h-full max-w-full ">

            {/* Opening */}
            <div className="w-full max-w-[100vw] mx-auto font-mono flex flex-col text-[#d8d4c4] md:flex-row items-center justify-between gap-8 md:gap-16 text-center md:text-left">
                <div className="flex-1 sm:ml-30">
                    <h1>
                        <span className='home-content-fixed'>I am&nbsp;</span>
                        <span className="home-content-keyword">{typingWords}</span>
                    </h1>
                    <h2>Jun'25</h2>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img
                    src={HomeCodingPic}
                    alt="Coding illustration"
                    className="max-w-[80%] h-auto animate-[float_4s_ease-in-out_infinite]"
                    />
                </div>
            </div>

            {/* Section description */}
            <div className="sectionDes bg-black p-[2rem] sm:p-[8rem]  mt-12 mb-32 sm:mt-8 sm:mb-16 text-[#d8d4c4] text-base sm:text-xl leading-relaxed text-justify">
                <p>This <strong>Portfolio Website</strong> serves as my personal tech identity to represent me in digital space. It's built to <strong>scale</strong>, <strong>structured with maintainable code</strong>  so it can grow alongside my career, with room for future updates and new additions.</p>
                <span className="text-sm italic text-[#bfb99f] ml-6">
                    (Not just something to show off! Gotta make it worth building, right?)
                </span>
                <p className='mt-12 sm:mt-24'>As a passionate tech enthusiast, I began my journey by <strong>realizing the real-life challenges and inefficiencies</strong> around me. And that <strong>curiosity</strong> soon grew into a drive to solve them through my profession. Over time, this grew into a genuine love for crafting innovative software solutions that <strong>build meaningful</strong> and <strong>problem-solving digital experiences</strong>.</p>
                <p className='mt-12 sm:mt-8'>Beyond coding, I thrive in collaborative environments and enjoy <strong>presenting clear, creative solutions to complex problems</strong> and contributing to impactful projects that <strong>truly make a difference!</strong> <span className="blinking-cursor">▌</span>🚀</p>
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
                            Let’s Make It Real 💡’
                        </span>
                    </FuzzyText>
                </h1>
            </div>

            {/* Contact Form */}
            <div className="relative bg-black/40 backdrop-blur-lg border border-[#d8d4c4]/40 rounded-2xl shadow-[0_0_20px_rgba(216,212,196,0.2)] 
            p-6 sm:p-10 mt-16 sm:mt-24 mb-24 sm:mb-32 text-[#d8d4c4] w-[90%] sm:max-w-lg mx-auto transition-all duration-500 overflow-hidden animate-neon-glow">

                <h2 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center text-[#f1f0eb] tracking-tight leading-snug">
                    🧩 Connect ?!
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 relative z-10">
                    <input
                    type="text"
                    name="name"
                    placeholder="What should I call you?"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 rounded-lg sm:rounded-xl bg-[#1a1a1a]/80 text-white placeholder-[#888]
                        border border-transparent focus:border-[#d8d4c4]/60 outline-none transition-all duration-300 text-sm sm:text-base"
                    />

                    <input
                    type="email"
                    name="email"
                    placeholder="Your Email (if you want to hear response...)"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3 rounded-lg sm:rounded-xl bg-[#1a1a1a]/80 text-white placeholder-[#888]
                        border border-transparent focus:border-[#d8d4c4]/60 outline-none transition-all duration-300 text-sm sm:text-base"
                    />

                    <textarea
                    name="message"
                    placeholder="Tell me what's on your mind?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="p-3 rounded-lg sm:rounded-xl bg-[#1a1a1a]/80 text-white placeholder-[#888]
                        border border-transparent focus:border-[#d8d4c4]/60 outline-none transition-all duration-300 h-32 sm:h-36 resize-none text-sm sm:text-base"
                    />

                    <span className="text-sm italic text-[#bfb99f]">
                    (No sharing. No tracking. My code simply doesn’t allow it.)
                    </span>

                    <button
                    type="submit"
                    className="bg-gradient-to-r from-[#d8d4c4] to-[#bfb99f] text-black font-semibold py-3 rounded-lg sm:rounded-xl
                        hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(216,212,196,0.3)] transition-all duration-300 text-sm sm:text-base"
                    >
                    Send Message
                    </button>

                    {status && (
                    <p className="text-center text-xs sm:text-sm mt-2 sm:mt-3 text-[#bfb99f] animate-fadeIn">
                        {status}
                    </p>
                    )}
                </form>
            </div>
        </div>
    )
}
export default AboutMe;