import React, { useState, useEffect, useRef } from 'react';

const features = [
  { icon: '🚀', title: 'Speed up prep', desc: 'Practice faster with tailored prompts.' },
  { icon: '🧠', title: 'Smart feedback', desc: 'Get actionable suggestions to improve.' },
  { icon: '🎯', title: 'Targeted questions', desc: 'Company-specific and role-focused.' },
  { icon: '📈', title: 'Track progress', desc: 'Visualize improvements over time.' },
  { icon: '🔒', title: 'Privacy first', desc: 'Your data stays with you.' },
  { icon: '⚡', title: 'Instant results', desc: 'Fast generation and quick practice.' }
];

const Features = () => {
  const tiles = [1, 2, 3];
  const slideMeta = [
    { 
      title: 'Company-Specific Question Generator',
      desc: 'Select a company + difficulty, get questions tailored to their real interview style (coding, system design, behavioral).',
      side: 'right' 
    },
    { 
      title: 'Adaptive Mock Interviews (Voice Mode)',
      desc: 'AI asks questions out loud, listens to your answers, and follows up if you stumble—just like a real interviewer.',
      side: 'left' 
    },
    { 
      title: 'Progress Tracking',
      desc: 'Detailed insights on strengths, weaknesses, and improvement areas, with history saved to track growth over time.',
      side: 'right' 
    }
  ];
  const [index, setIndex] = useState(0);
  const length = tiles.length;
  const intervalRef = useRef(null);
  const slideHeight = 354; // px height of each slide

  useEffect(() => {
    const start = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % length);
      }, 3000);
    };
    start();
    return () => clearInterval(intervalRef.current);
  }, [length]);

  const prev = () => setIndex((i) => (i - 1 + length) % length);
  const next = () => setIndex((i) => (i + 1) % length);

  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif italic">Stumble here, not in front of your recruiter.</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6">
            {/* Left panel (outside carousel) */}
            <div className="hidden md:flex items-center w-64 justify-end h-full">
              <div className="w-full overflow-hidden" style={{ height: `${slideHeight}px` }}>
                <div className="transition-transform duration-500" style={{ transform: `translateY(-${index * slideHeight}px)`, height: `${slideMeta.length * slideHeight}px` }}>
                  {slideMeta.map((s, i) => (
                    <div key={i} className="max-w-xs h-[354px] flex items-center justify-end">
                      <h4 className="text-xl font-bold text-white">{s.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Slides container (center) */}
            <div className="flex-1">
              <div className="overflow-hidden mx-auto" style={{ height: `${slideHeight}px`, maxWidth: '240px' }}>
                <div
                  className="transition-transform duration-500"
                  style={{ height: `${length * slideHeight}px`, transform: `translateY(-${index * slideHeight}px)` }}
                >
                  {tiles.map((t) => (
                    <div key={t} className="w-full flex items-center justify-center" style={{ height: `${slideHeight}px` }}>
                      <div className="w-56 h-[354px] rounded-md overflow-hidden shadow-lg flex items-center justify-center">
                        {t === 1 ? (
                          <img src="/first.jpg" alt="first" className="w-full h-full object-cover" />
                        ) : t === 2 ? (
                          <img src="/second.jpg" alt="second" className="w-full h-full object-cover" />
                        ) : t === 3 ? (
                          <img src="/third.jpg" alt="third" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-white/5"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel (outside carousel) */}
            <div className="hidden md:flex items-center w-64 justify-start h-full">
              <div className="w-full overflow-hidden" style={{ height: `${slideHeight}px` }}>
                <div className="transition-transform duration-500" style={{ transform: `translateY(-${index * slideHeight}px)`, height: `${slideMeta.length * slideHeight}px` }}>
                  {slideMeta.map((s, i) => (
                    <div key={i} className="max-w-xs h-[354px] flex items-center justify-start">
                      <p className="text-gray-300 mt-2">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Indicators removed as requested */}
        </div>
      </div>
    </section>
  );
};

export default Features;