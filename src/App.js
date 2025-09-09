import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import CTA from './components/CTA';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import PractisePage from './pages/PractisePage';
import InterviewPage from './pages/InterviewPage';

function App() {
  // simple client-side route state
  const [route, setRoute] = useState(window.location.pathname || '/');

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

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname === path) return;
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '0px' }}>
  {route !== '/dashboard' && route !== '/practise' && route !== '/interview' && <Header openDashboard={() => navigate('/dashboard')} />}
      {route === '/dashboard' ? (
        <DashboardPage />
      ) : route === '/practise' ? (
        <PractisePage />
      ) : route === '/interview' ? (
        <InterviewPage />
      ) : (
        <>
          <Hero openDashboard={() => navigate('/dashboard')} />
          <Features />
          <About />
          <CTA />
          <HowItWorks />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;