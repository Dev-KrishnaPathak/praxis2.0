import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <About />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;