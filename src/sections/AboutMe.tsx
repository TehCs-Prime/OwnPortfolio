import React, { useState } from "react";
import FuzzyText from '../components/FuzzyText';
import emailjs from 'emailjs-com';


const AboutMe = () => {
    // Visibility observer
  const fontSize = window.innerWidth < 768 ? '30rem' : '6rem';
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

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
            'YOUR_SERVICE_ID', // replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID', // replace with your EmailJS template ID
            formData,
            'YOUR_PUBLIC_KEY' // replace with your EmailJS public key
        ).then(
            () => setStatus('Message sent! Thank you.'),
            () => setStatus('Failed to send. Please try again.')
        );

        setFormData({ name: '', email: '', message: '' });
    };

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
                            About Me’
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

            {/* Contact Form */}
            <div className="bg-black p-8 sm:p-16 mt-24 mb-32 text-[#d8d4c4] max-w-xl mx-auto rounded-lg shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Contact Me</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name (optional)"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-3 rounded bg-[#1a1a1a] text-white placeholder-[#888]"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email (optional)"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 rounded bg-[#1a1a1a] text-white placeholder-[#888]"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="p-3 rounded bg-[#1a1a1a] text-white placeholder-[#888] h-32 resize-none"
                    />
                    <button
                        type="submit"
                        className="bg-[#d8d4c4] text-black font-bold py-3 rounded hover:bg-[#bfb99f] transition"
                    >
                        Send
                    </button>
                    {status && <p className="text-center text-sm mt-2">{status}</p>}
                </form>
            </div>
        </div>
    )
}
export default AboutMe;