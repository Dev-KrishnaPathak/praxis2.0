import React from 'react';

/**
 * Renders a homepage section with animated text and a button to open the dashboard.
 * @example
 * Hero({ openDashboard: () => console.log('Dashboard opened') })
 * // Returns JSX for the home section with styled components and animations.
 * @param {Object} props - Component properties.
 * @param {Function} props.openDashboard - Callback function to open the dashboard.
 * @returns {JSX.Element} The JSX for the home section with provided props.
 */
const Hero = ({ openDashboard }) => {
  return (
  <section id="home" className="pt-0 pb-16 bg-black min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Very subtle green light in bottom left corner */}
  <div className="absolute w-20 h-20 bg-green-400 opacity-10 blur-2xl rounded-full" style={{top: '330px', left: 'calc(50% - 168px)'}}></div>

    {/* Transparent blur tile extending from tagline to top */}
  <div className="absolute left-1/2 transform -translate-x-1/2 w-96 h-48 bg-white bg-opacity-5 backdrop-blur-lg rounded-lg" style={{top: '125px'}}>
      {/* Mixed yellow + green glow centered in the tile */}
    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} aria-hidden>
  <div className="glow-yellow" style={{position: 'relative', top: 0}}></div>
      </div>
      {/* Small green accent tile in the top-right of the large blur tile */}
      <div className="absolute" style={{top: '14px', left: '107px'}}>
          <div className="h-6 rounded-full bg-green-500 shadow-lg flex items-center justify-center px-1.5 w-auto border border-white" aria-hidden style={{transform: 'rotate(10deg)', transformOrigin: 'center', borderWidth: '0.5px'}}>
          <span className="text-[10px] font-bold text-black" style={{lineHeight: '1'}}>{'Cameron'}</span>
        </div>
        {/* small arrow head pointing inward toward the inner tile */}
  <svg aria-hidden className="absolute" width="12" height="12" viewBox="0 0 24 24" style={{left: '43px', top: '26px', transform: 'rotate(220deg) scale(0.9)'}}>
          <path d="M12 2 L19 21 L12 17 L5 21 Z" fill="#059669" />
        </svg>
      </div>
  {/* Arrow removed */}
      
          {/* Inner rectangular tile */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 bg-black bg-opacity-30 backdrop-blur-md rounded-full flex items-center justify-center" style={{width: '200px'}}>
            {/* Profile image placed in the left corner of the inner tile (from public/pfp.jpg) */}
            <img src="/pfp.jpg" alt="profile" className="h-12 w-12 rounded-full object-cover absolute left-3" style={{top: '50%', transform: 'translateY(-50%)'}} />
            {/* Small label text inside the same inner tile, positioned right of the image */}
            <span className="text-sm text-white absolute font-semibold" style={{left: '68px', top: '50%', transform: 'translateY(-50%)'}}>Cat is selected at Apple</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl relative z-10" style={{marginTop: '270px'}}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white mb-8 tracking-wide">
              {"Confidence starts with practice that feels real.".split(' ').map((word, i) => {
                // keep punctuation attached but still animate; add a tiny stagger
                const delay = `${i * 60}ms`;
                const clean = word.replace(/[.,!?]/g, '');
                const isFeelsReal = clean.toLowerCase() === 'feels' || clean.toLowerCase() === 'real';
                return (
                  <span key={i} className={`word-slide ${isFeelsReal ? 'font-serif italic font-normal text-white' : ''}`} style={{animationDelay: delay, marginRight: '6px'}}>
                    {word}
                  </span>
                );
              })}
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              {(() => {
                const words = "Confidence starts with practice that feels real.".split(' ');
        const headingDelayTotal = words.length * 60; // ms
        const startDelay = headingDelayTotal + 80; // smaller buffer after heading
                return (
                  <>
          <span className="line-slide" style={{animationDelay: `${startDelay}ms`}}>Praxis makes interview prep simple and effective.</span>
          <span className="line-slide" style={{animationDelay: `${startDelay + 80}ms`}}>AI questions, real-time feedback, and progress insights.</span>
                  </>
                );
              })()}
            </p>
            <button onClick={() => openDashboard && openDashboard()} className="text-black px-6 py-3 rounded-full text-base font-semibold hover:bg-opacity-90 transition-colors shadow-lg" style={{backgroundColor: '#FAFE88'}}>
              Try Praxis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;