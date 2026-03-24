import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import DiagnosticSolutions from './pages/DiagnosticSolutions';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const RouteCleanupAndScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const pinSpacers = document.querySelectorAll('.pin-spacer');
    pinSpacers.forEach(spacer => spacer.remove());

    window.scrollTo(0, 0);
    
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <RouteCleanupAndScroll />
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosticsolutions" element={<DiagnosticSolutions />} />
        <Route path="/membership" element={<div className="pt-32 text-center text-2xl min-h-screen">Membership Page Coming Soon</div>} />
        <Route path="/collaborate" element={<div className="pt-32 text-center text-2xl min-h-screen">Collaborate Page Coming Soon</div>} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;