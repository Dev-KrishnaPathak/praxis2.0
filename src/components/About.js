import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Built for Modern Professionals
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Praxis was created by professionals, for professionals. We understand the unique 
              challenges you face and have built a platform that adapts to your workflow, 
              not the other way around.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-gray-800 rounded-full p-2 mr-4 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Intuitive Design</h3>
                  <p className="text-gray-300">Clean, modern interface that's easy to learn and use</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-800 rounded-full p-2 mr-4 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Scalable Solution</h3>
                  <p className="text-gray-300">Grows with your practice from solo to enterprise</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-800 rounded-full p-2 mr-4 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Continuous Innovation</h3>
                  <p className="text-gray-300">Regular updates and new features based on user feedback</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg h-96 overflow-hidden glow-prep-yellow">
            <img src="/four.jpg" alt="four" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;