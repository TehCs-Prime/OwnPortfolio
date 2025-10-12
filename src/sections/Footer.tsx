import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const [localTime, setLocalTime] = useState("");
    const [message, setMessage] = useState("");

    // Local time shown
    useEffect(() => {
        const updateTime = () => {
        const now = new Date();
        // Format to 12-hour clock with AM/PM
        const formatted = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        setLocalTime(formatted);
        };

        updateTime(); // set immediately on mount
        const interval = setInterval(updateTime, 1000); // update every second
        return () => clearInterval(interval); // cleanup
    }, []);

    // quick email box to me 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // open email client
        const subject = encodeURIComponent("New message from portfolio website");
        const body = encodeURIComponent(message);
        window.location.href = `mailto:chuns08022101@gmail.com?subject=${subject}&body=${body}`;
    };

  return (
    <footer className="relative flex flex-col items-center justify-center gap-y-16 backdrop-blur-sm py-20 px-8 md:px-20 shadow-xl mt-20" >
        
        {/* Upper Row - Menu + Contact Form, Socials */}
        <div className="grid w-full grid-cols-1 gap-8 sm:gap-16 text-lg md:grid-cols-12"> 

            {/* Left Column - Menu */}
            <div className="flex flex-col md:col-span-6">
                
                {/* Column Title - Menu */}
                <h3 className="mb-6 flex border-b border-gray-300 pb-4 text-xl font-bold tracking-wide text-gray-200">
                    Menu
                </h3>

                {/* Listed Sections */}
                <ul className="flex flex-col gap-y-4">
                {[
                    { name: "About Me", link: "/aboutme" },
                    { name: "Journey", link: "/journey" },
                    { name: "Portfolio", link: "/portfolio" },
                    { name: "Résumé", link: "/resume" },
              ].map((item) => (
                    <li key={item.name}>
                        <Link
                        to={item.link}
                        className="group relative block h-fit overflow-hidden font-light cursor-pointer select-none flex w-fit leading-base text-[var(--color-secondary-100)] sm:leading-snug"
                        >
                            {/* Duplicate becoz of animation effect i imported - the fliping when hovering on it  */}
                            <span className="block w-full transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-0 group-hover:-translate-y-full">
                                {item.name}
                            </span>
                            <span
                                aria-hidden="true"
                                className="absolute top-0 left-0 w-full block transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-full group-hover:translate-y-0"
                            >
                                {item.name}
                            </span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Right Column - Contact Form & Socials */}
            <div className="flex flex-col md:col-span-6">

                {/* Column Title - Drop Mail */}
                <h3 className="mb-6 flex border-b border-gray-300 pb-4 text-xl font-bold tracking-wide text-gray-200">
                    DropMail
                </h3>
                
                {/* Sections - Contact Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
                    <div className="relative w-full">
                        <textarea
                            placeholder="Feel free to send me a message!"
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full rounded-md border border-gray-800 bg-gray-900/40 p-3 text-gray-200 placeholder-gray-400 focus:border-[var(--color-secondary-300)] focus:outline-none resize-none"
                        />

                        {/* Send Icon */}
                        <button
                        type="submit"
                        className="absolute bottom-3 right-3 text-[var(--color-secondary-300)] hover:text-[var(--color-secondary-100)] transition"
                        >
                            <img
                                src="/assets/communication.png" 
                                alt="Send"
                                className="w-6 h-6 " 
                            />
                        </button>
                    </div>
                </form>

                {/* Sections - Socials */}
                <div className="mt-4 flex gap-6">
                    {/* Email */}
                    <a
                        title="Email"
                        href="mailto:chuns08022101@gmail.com"
                        className="flex items-center gap-2 text-gray-300 hover:text-[var(--color-secondary-300)] transition"
                    >
                        {/* Email Icon */}
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        >
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 
                                1.1.9 2 2 2h16c1.1 0 2-.9 
                                2-2V6c0-1.1-.9-2-2-2zm0 
                                4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                        title="LinkedIn"
                        href="https://www.linkedin.com/in/teh-chun-shen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-[var(--color-secondary-300)] transition"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        >
                        <path d="M4.98 3.5C4.98 4.88 3.86 
                                6 2.5 6S0 4.88 0 
                                3.5 1.12 1 2.5 1 4.98 
                                2.12 4.98 3.5zM.5 
                                8h4V24h-4V8zM9 
                                8h3.6v2.17h.05c.5-.95 
                                1.75-1.95 3.6-1.95 
                                3.85 0 4.55 2.53 
                                4.55 5.82V24h-4v-7.17c0-1.7-.03-3.9-2.38-3.9-2.38 
                                0-2.75 1.86-2.75 
                                3.78V24h-4V8z" />
                        </svg>
                        
                    </a>

                    {/* GitHub */}
                    <a
                        title="GitHub"
                        href="https://github.com/TehCs-Prime"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-[var(--color-secondary-300)] transition"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        >
                        <path d="M12 .5C5.73.5.5 5.73.5 
                                12c0 5.09 3.29 9.4 
                                7.84 10.94.57.1.78-.25.78-.55 
                                0-.27-.01-1.17-.02-2.12-3.19.69-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 
                                1.15.08 1.75 1.18 
                                1.75 1.18 1.02 1.75 2.67 1.25 
                                3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 
                                0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 
                                0 0 .96-.31 3.15 
                                1.18A10.9 10.9 0 0 1 
                                12 6.8c.97.01 1.94.13 
                                2.85.38 2.19-1.49 
                                3.15-1.18 3.15-1.18.62 
                                1.59.23 2.76.11 3.05.73.81 
                                1.18 1.83 1.18 3.09 
                                0 4.43-2.69 5.41-5.26 
                                5.69.41.35.78 1.04.78 2.1 
                                0 1.52-.01 2.75-.01 
                                3.12 0 .3.21.65.79.54A10.5 
                                10.5 0 0 0 23.5 12C23.5 5.73 
                                18.27.5 12 .5z" />
                        </svg>
                        
                    </a>

                    {/* WhatsApp */}
                    <a
                        title="WhatsApp"
                        href="https://wa.me/60182794808"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-[var(--color-secondary-300)] transition"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        >
                        <path d="M12 2C6.48 2 2 6.19 
                                2 11.5c0 2.38.94 4.54 
                                2.5 6.17L2 22l4.5-1.43A9.6 
                                9.6 0 0 0 12 21c5.52 
                                0 10-4.19 10-9.5S17.52 
                                2 12 2zm5.1 13.5c-.27.77-1.6 
                                1.47-2.2 1.56-.58.1-1.28.14-2.07-.13-.48-.17-1.1-.36-1.9-.82-3.35-1.95-4.44-4.39-4.57-4.59-.13-.19-1.09-1.45-1.09-2.77 
                                0-1.32.68-1.96.92-2.23.24-.28.53-.35.71-.35.18 
                                0 .35.01.51.02.17.01.38-.06.6.46.23.53.78 
                                1.84.85 1.97.07.13.11.28.02.46-.08.18-.12.28-.24.43-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.25.62 
                                1.03 1.34 1.67.93.84 
                                1.71 1.1 1.95 1.22.24.12.38.1.52-.06.14-.17.6-.7.75-.94.15-.24.31-.2.52-.12.21.08 
                                1.33.63 1.55.75.22.12.36.17.41.26.05.09.05.8-.22 
                                1.57z" />
                        </svg>
                    </a>
                </div>

            </div>
        </div>
        
        {/* Lower Row */}
        <div className="font-mono mt-2 flex w-full flex-col items-center justify-between gap-4 text-sm text-gray-300 md:flex-row">
            <span className="font-bold uppercase text-[var(--color-secondary-300)]">Local Time: {localTime}</span>
            <p>&copy; {new Date().getFullYear()} Maintain & Updated by Teh Chun Shen. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
