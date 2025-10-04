import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Home from "./sections/AboutMe";
import TimeLine from "./sections/TimeLine";
import Portfolio from "./sections/Portfolio";
import Resume from "./sections/Resume";

import ScrollToTop from './Tools/Tools-scrollToTop';


function App() {
  return (
    <Router basename="/portfolio-website">
      {/* Scroll to Top */}
      <ScrollToTop/>

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
          {/* Define routes */}
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