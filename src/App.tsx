import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Home from "./sections/AboutMe";
import TimeLine from "./sections/TimeLine";
import Portfolio from "./sections/Portfolio";
import Resume from "./sections/Resume";

import ScrollToTop from './Tools/Tools-scrollToTop';
import Particles from './components/Particles';


function App() {
  return (
    <Router>
      {/* Reset - Scroll to Top */}
      <ScrollToTop/>

      {/* Particles as background */}
      <div className="fixed inset-0 -z-1  0 max-w-full">
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

      {/* Header always visible */}
      <Header />

      {/* Page content */}
      <main
        className="
          pt-[calc(var(--header-height)+1rem)] 
          sm:pt-[calc(var(--header-height)+1.5rem)]
          md:pt-[calc(var(--header-height)+2rem)]
        "
      >
        <Routes>
          {/* Define routes to sections/pages */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutme" element={<Home />} />
          <Route path="/journey" element={<TimeLine />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;