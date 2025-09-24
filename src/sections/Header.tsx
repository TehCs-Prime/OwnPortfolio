import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
  if (isMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}, [isMenuOpen]);

  // set CSS var for header height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`
        );
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // scroll hide/show header on desktop
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY === 0) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Desktop Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 z-40 w-full backdrop-blur-2xl bg-[var(--color-primary-900)/60] shadow-md transition-transform duration-500 hidden md:block ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6 sm:px-8 lg:px-12 flex flex-row items-center justify-between py-4 lg:grid lg:grid-cols-12 lg:items-center">
          {/* Title */}
          <div className="col-span-7 flex flex-col items-start lg:flex-row lg:items-center">
            <span className="block w-fit font-bold tracking-wide text-[#d8d4c4] text-xl md:text-2xl">
              Teh Chun Shen ©
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="col-span-5 flex justify-end">
            <ul className="m-0 flex flex-col px-1 py-1 items-start gap-3 md:flex-row md:items-center md:gap-8 font-semibold text-[#d8d4c4]">
              {[
                { name: "About Me", link: "/aboutme" },
                { name: "Journey", link: "/journey" },
                { name: "Portfolio", link: "/portfolio" },
                { name: "Resume", link: "/resume" },
              ].map((item) => (
                <li
                  key={item.name}
                  className="flex leading-normal md:leading-snug transition-all duration-500 ease-in transform opacity-100"
                >
                  <Link
                    className="group relative block h-fit px-3 overflow-hidden font-semibold cursor-pointer select-none text-[#d8d4c4] text-lg md:text-xl"
                    to={item.link}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="block w-full transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-0 group-hover:-translate-y-full text-[#d8d4c4]">
                      {item.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 w-full block transition-transform duration-[0.4s] ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-full group-hover:translate-y-0 text-[#d8d4c4]"
                    >
                      {item.name}
                    </span>
                    <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-[#d8d4c4] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

        {/* Floating Hamburger for Mobile */}
        <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`fixed bottom-10 right-6 z-60 md:hidden flex flex-col items-center justify-center
                w-16 aspect-square rounded-full
                bg-[#d8d4c4]/70 backdrop-blur-md
                shadow-lg
                hover:scale-105 hover:shadow-xl active:scale-95
                border-[4px] border-[#333]
                transition-opacity duration-500 ease-in-out
                ${showHeader ? "opacity-100" : "opacity-0"} 
                ${showHeader ? "" : "pointer-events-none"}`}
            >

            {/* Top bar */}
            <span
                className={`block w-7 h-[3px] rounded-full bg-[#222] transition-all duration-300 
                ${isMenuOpen ? "rotate-45 translate-y-[2px]" : "translate-y-[-6px]"}`}
            ></span>

            {/* Middle bar */}
            <span
                className={`block w-7 h-[3px] rounded-full bg-[#222] transition-all duration-300 
                ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>

            {/* Bottom bar */}
            <span
                className={`block w-7 h-[3px] rounded-full bg-[#222] transition-all duration-300 
                ${isMenuOpen ? "-rotate-45 -translate-y-[8px]" : "translate-y-[6px]"}`}
            ></span>

        </button>

        {/* Mobile menu overlay */}
        <div
        //z-51 to set below Hamburger menu and above event counter
            className={`fixed inset-0 md:hidden z-51 transform transition-all duration-500 ease-in-out 
            ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} 
            bg-[var(--color-primary-900)/95] backdrop-blur-2xl`}
        >
            {/* faded background svg */}
            <div className="absolute right-0 bottom-0 opacity-25 ">
                <img
                src="/portfolio-website/assets/menu.svg"
                alt="Menu Background"
                loading="lazy"
                width={245}
                height={327}
                decoding="async"
                draggable="false"
                className="scale-y-[-1]"
                />
            </div>

            {/* nav links */}
            <nav className="relative h-full flex flex-col justify-center px-12 leading-tight">
                <ul className="flex flex-col justify-center gap-y-10 text-4xl font-black">
                {[
                    { name: "About Me", link: "/#AboutMe" },
                    { name: "Journey", link: "/#Journey" },
                    { name: "Portfolio", link: "/#Portfolio" },
                    { name: "Resume", link: "/#Resume" },
                ].map((item) => (
                    <li
                    key={item.name}
                    className="relative flex w-fit cursor-pointer items-center"
                    >
                    <a
                        href={item.link}
                        onClick={() => setIsMenuOpen(false)}
                        className="relative inline-block text-[var(--color-accent-200)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[var(--color-accent-200)] after:transition-all after:duration-500 hover:after:w-full"
                    >
                        {item.name}
                    </a>
                    </li>
                ))}
                </ul>

                {/* Small Footer Section */}
                <div className="flex flex-col items-start justify-start gap-y-4 pb-6 sm:pb-12 mt-40">
                    <div className="flex flex-col">
                        <span className="text-left text-sm font-bold text-gray-200 2xl:text-sm">
                        Email Address
                        </span>
                        <a
                        href="mailto:chuns08022101@gmail.com"
                        className="group relative block h-fit overflow-hidden font-mono font-medium mt-1"
                        >
                            <span className="relative block h-fit overflow-hidden select-none">
                                <span className="block w-full opacity-70 transition-transform duration-400 ease-[cubic-bezier(.51,.92,.24,1.15)] translate-y-0 group-hover:-translate-y-full">
                                chuns08022101@gmail.com
                                </span>
                            </span>
                        </a>
                    </div>

                    <ul className="flex flex-nowrap justify-start gap-x-2 mt-4">
                        <li>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/teh-chun-shen/"
                            className="hover:underline text-gray-200"
                        >
                            LinkedIn
                        </a>
                        </li>
                        <li>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/TehCs-Prime"
                            className="hover:underline text-gray-200"
                        >
                            Github
                        </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    </>
  );
};

export default Header;
