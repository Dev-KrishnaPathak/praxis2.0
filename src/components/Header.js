import React, { useState, useRef, useEffect } from 'react';

const Header = ({ openDashboard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [tileStyle, setTileStyle] = useState({ width: 0, transform: 'translateX(0px)' });
  const navRefs = useRef({});
  const navContainerRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'how-it-works', label: 'How it works', href: '#how-it-works' },
    { id: 'who-its-for', label: 'Who It\'s for', href: '#about' },
    { id: 'features', label: 'Features', href: '#features' }
  ];

  const smoothScrollTo = (hash) => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -80; // offset for fixed header
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    const activeElement = navRefs.current[activeTab];
    const navContainer = navContainerRef.current;
    
    if (activeElement && navContainer) {
      const activeRect = activeElement.getBoundingClientRect();
      const containerRect = navContainer.getBoundingClientRect();
      
      const relativeLeft = activeRect.left - containerRect.left;
      
      setTileStyle({
        width: activeElement.offsetWidth,
        transform: `translateX(${relativeLeft}px)`
      });
    }
  }, [activeTab]);

  return (
    <header className="bg-transparent shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-2 relative">
          <div className="flex items-center" style={{ marginTop: '-16px' }}>
            <h1 className="text-2xl font-bold text-white">Praxis</h1>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center bg-white bg-opacity-10 backdrop-blur-md rounded-full" style={{ padding: '5px 15px 9px 8px' }}>
            <nav ref={navContainerRef} className="flex space-x-2 relative">
              {/* Sliding background tile */}
              <div 
                className="absolute top-0 left-0 bg-white bg-opacity-20 backdrop-blur-md rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${tileStyle.width}px`,
                  height: '40px',
                  transform: tileStyle.transform
                }}
              />
              
              {navItems.map((item) => (
                <a 
                  key={item.id}
                  ref={el => navRefs.current[item.id] = el}
                  href={item.href} 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.id);
                    smoothScrollTo(item.href);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 relative z-10 ${
                    activeTab === item.id 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="ml-auto hidden md:flex items-center">
            <button onClick={() => openDashboard && openDashboard()} className="rounded-full px-6 py-3 border border-white border-opacity-20 flex items-center gap-2 text-sm font-serif font-bold transition-colors hover:bg-opacity-80" style={{backgroundColor: '#FAFE88', color: 'black'}}>
              Prep now
              <span>→</span>
            </button>
          </div>



          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#features" onClick={(e)=>{e.preventDefault(); setIsMenuOpen(false); smoothScrollTo('#features');}} className="text-gray-300 hover:text-white">Features</a>
              <a href="#about" onClick={(e)=>{e.preventDefault(); setIsMenuOpen(false); smoothScrollTo('#about');}} className="text-gray-300 hover:text-white">About</a>
              <a href="#contact" onClick={(e)=>{e.preventDefault(); setIsMenuOpen(false); smoothScrollTo('#contact');}} className="text-gray-300 hover:text-white">Contact</a>
              <div className="flex flex-col space-y-2 pt-4">
                <button className="text-white font-medium text-left">Sign In</button>
                <button onClick={() => openDashboard && openDashboard()} className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;