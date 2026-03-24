import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import DiagnosticSolutions from './pages/DiagnosticSolutions';
import Footer from './components/Footer';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosticsolutions" element={<DiagnosticSolutions />} />
        
        <Route path="/membership" element={<div className="pt-40 text-center text-3xl font-light min-h-screen">Membership Page Coming Soon</div>} />
        <Route path="/collaborate" element={<div className="pt-40 text-center text-3xl font-light min-h-screen">Collaborate Page Coming Soon</div>} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;