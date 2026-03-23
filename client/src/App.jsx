import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust this import path if needed
import Home from './pages/Home';
import DiagnosticSolutions from './pages/DiagnosticSolutions';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosticsolutions" element={<DiagnosticSolutions />} />
        <Route path="/membership" element={<div className="pt-32 text-center text-2xl">Membership Page Coming Soon</div>} />
        <Route path="/collaborate" element={<div className="pt-32 text-center text-2xl">Collaborate Page Coming Soon</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;