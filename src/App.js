import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Multiple approaches to ensure page starts at top
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also set on window load
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '0px' }}>
      <Header />
      <Hero />
      <Features />
      <About />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;