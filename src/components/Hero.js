import React from 'react';

const Hero = () => {
  return (
    <section className="py-16 bg-black min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Praxis logo in top left corner */}
        <h1 className="absolute top-8 left-8 text-2xl md:text-3xl font-bold text-white font-serif tracking-tight animate-fade-in-up">
          Praxis
        </h1>
        
        {/* Prep now tile in right upper corner */}
        <div className="absolute top-8 right-8 bg-white bg-opacity-10 backdrop-blur-md rounded-lg px-4 py-3 border border-white border-opacity-20 flex items-center gap-2">
          <span className="text-white text-sm font-serif font-medium">Prep now</span>
          <span className="text-white text-sm">→</span>
        </div>
        
        {/* Transparent blur tile extending from tagline to top */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-96 h-48 bg-white bg-opacity-5 backdrop-blur-lg rounded-lg" style={{top: '75px'}}>
          {/* Inner rectangular tile */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 bg-black bg-opacity-30 backdrop-blur-md rounded-md flex items-center justify-center" style={{width: '200px'}}>
            <span className="text-white text-sm font-medium">John scored 7/10 this week</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl relative z-10" style={{marginTop: '70px'}}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white mb-8 tracking-wide">
              Confidence starts with practice that <span className="font-serif italic font-normal text-white">feels real</span>.
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              The comprehensive practice management platform designed for modern professionals. 
              Praxis combines powerful analytics, intelligent automation, and seamless collaboration 
              tools to streamline your workflow and maximize productivity.
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-lg text-base font-semibold hover:bg-gray-200 transition-colors shadow-lg">
              Try Praxis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;