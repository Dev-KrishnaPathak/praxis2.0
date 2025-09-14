import React from 'react';

/**
 * Renders the "How it works" section for a web page, detailing the steps involved in the process.
 * @example
 * HowItWorksComponent()
 * //<section>...</section>
 * @returns {JSX.Element} A section element containing the how-it-works steps with specified titles and descriptions.
 */
const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 rounded-lg bg-white bg-opacity-5 backdrop-blur-sm glow-prep-yellow">
            <h3 className="text-xl font-semibold mb-2 text-white">Choose Your Company & Level</h3>
            <p className="text-gray-300">Select the company you’re targeting and the difficulty of practice.</p>
          </div>
          <div className="p-6 rounded-lg bg-white bg-opacity-5 backdrop-blur-sm glow-prep-yellow">
            <h3 className="text-xl font-semibold mb-2 text-white">Get Tailored Questions</h3>
            <p className="text-gray-300">AI generates interview questions based on that company’s style and role.</p>
          </div>
          <div className="p-6 rounded-lg bg-white bg-opacity-5 backdrop-blur-sm glow-prep-yellow">
            <h3 className="text-xl font-semibold mb-2 text-white">Start Mock Interview</h3>
            <p className="text-gray-300">Practice in voice mode; answer in real time as the system adapts and probes deeper.</p>
          </div>
          <div className="p-6 rounded-lg bg-white bg-opacity-5 backdrop-blur-sm glow-prep-yellow">
            <h3 className="text-xl font-semibold mb-2 text-white">Receive Feedback</h3>
            <p className="text-gray-300">Get personalized insights and track your progress across sessions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
