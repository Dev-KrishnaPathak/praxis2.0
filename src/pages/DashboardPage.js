import React, { useEffect, useState } from 'react';

/**
 * Renders the main dashboard page for the Praxis application, displaying user performance metrics and navigation links.
 * @example
 * DashboardPage()
 * Returns the main structure of the Praxis dashboard with user metrics and navigational components.
 * @param {none} None - This function does not take any arguments.
 * @returns {JSX.Element} The dashboard page component with performance metrics, navigation links, and charts.
 */
const DashboardPage = () => {
  // fixed attempted count for demo
  const [attemptedCount] = useState(64);
  // sample percentage for performance boost
  const [performancePct] = useState(72);
  // overall performance since starting Praxis
  const [overallPct] = useState(68);
  // sample performance history for the line chart (last 10 sessions)
  const [performanceHistory] = useState([55, 72, 48, 80, 60, 90, 45, 78, 63, 85]);

  // helper to convert history to an SVG path
  /**
  * Generates an SVG path data string based on performance history.
  * @example
  * generateSvgPathData([80, 90, 75])
  * 'M 0.00 40.00 L 150.00 10.00 L 300.00 50.00'
  * @param {number[]} performanceHistory - Array of performance metrics history.
  * @returns {string} SVG path data string representing the performance history trend.
  **/
  const historyPath = () => {
    const w = 300; // chart width in viewbox units
    const h = 80; // chart height
    const max = Math.max(...performanceHistory, 100);
    const min = Math.min(...performanceHistory, 0);
    const range = Math.max(1, max - min);
    return performanceHistory.map((v, i) => {
      const x = (i / (performanceHistory.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ');
  };

  const historyAreaPath = () => {
    const w = 300;
    const h = 80;
    const path = historyPath();
    // close the area to the bottom
    return `${path} L ${w} ${h} L 0 ${h} Z`;
  };

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="absolute top-4 left-6">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (window.location.pathname !== '/') {
              window.history.pushState({}, '', '/');
              // notify any listeners
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          className="font-bold text-3xl"
        >
          Praxis
        </a>
      </div>

      {/* Top-right profile */}
      <div className="absolute top-4 right-6 flex items-center gap-3">
  <span className="text-base text-white/90">Profile</span>
        <img src="/pfp.jpg" alt="profile" className="w-10 h-10 rounded-full object-cover" />
      </div>

  {/* Top-middle action buttons (pinned) */}
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
        <div className="btn-glow-wrapper btn-border-glow">
          <span className="btn-glow" />
          <button
            className="rounded-full px-6 py-2 bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname !== '/practise') {
                window.history.pushState({}, '', '/practise');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
          >
            Start Practise
          </button>
        </div>

        <div className="btn-glow-wrapper btn-border-glow">
          <span className="btn-glow" />
          <button
            className="rounded-full px-6 py-2 bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname !== '/interview') {
                window.history.pushState({}, '', '/interview');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }
            }}
          >
            Start Interview
          </button>
        </div>
      </div>

  {/* Centered tiles */}
  <section className="flex items-center justify-center min-h-[60vh] pt-28 md:pt-36">
        <div className="w-full max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
            <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h4 className="text-xl font-semibold">Questions you’ve attempted so far</h4>
              <div className="text-3xl font-bold mt-3"><span className="num-glow">{attemptedCount}</span></div>
            </div>

            <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h4 className="text-xl font-semibold">Correctly solved questions.</h4>
              <div className="text-3xl font-bold mt-3"><span className="num-glow">48</span></div>
            </div>

            <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h4 className="text-xl font-semibold">Performance boost compared to last week.</h4>
              <div className="mt-4">
                <div className="percent-circle">
                  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path className="track" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="2" />
                    <path
                      className="progress"
                      strokeDasharray="100"
                      strokeDashoffset={100 - performancePct}
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="2"
                    />
                    <path
                      className="percent-glow"
                      strokeDasharray="100"
                      strokeDashoffset={100 - performancePct}
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                    />
                  </svg>
                  <div className="percent-label"><span className="num-glow">{performancePct}%</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* second row: two additional tiles */}
          <div className="mt-6 flex flex-col md:flex-row items-stretch justify-center gap-6">
            <div className="flex-1 max-w-md bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h4 className="text-lg font-semibold">Average time per question</h4>
              <div className="text-2xl font-bold mt-3"><span className="num-glow">1m 24s</span></div>
            </div>

            <div className="flex-1 max-w-md bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h4 className="text-lg font-semibold">Weekly streak</h4>
              <div className="text-2xl font-bold mt-3"><span className="num-glow">5</span></div>
            </div>
          </div>
          {/* third row: two more metrics */}
          <div className="mt-6 flex flex-col md:flex-row items-stretch justify-center gap-6">
            <div className="flex-1 max-w-md bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h4 className="text-lg font-semibold">Total mock interviews completed</h4>
              <div className="text-2xl font-bold mt-3"><span className="num-glow">12</span></div>
            </div>

            <div className="flex-1 max-w-md bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <h4 className="text-lg font-semibold">Your performance since you started Praxis</h4>
              <div className="mt-3">
                <div className="percent-circle">
                  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path className="track" d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="2" />
                    <path
                      className="progress"
                      strokeDasharray="100"
                      strokeDashoffset={100 - overallPct}
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="2"
                    />
                    <path
                      className="percent-glow"
                      strokeDasharray="100"
                      strokeDashoffset={100 - overallPct}
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                    />
                  </svg>
                  <div className="percent-label"><span className="num-glow">{overallPct}%</span></div>
                </div>
              </div>
            </div>
          </div>
          {/* fourth row: performance history line chart */}
            <div className="mt-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-4">Performance over time</h4>
              <div className="w-full flex items-center justify-center">
                <svg viewBox="0 0 300 100" className="w-full max-w-xl h-28">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#FAFE88" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#FAFE88" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={historyAreaPath()} fill="url(#areaGrad)" className="opacity-80" />
                  <path d={historyPath()} fill="none" stroke="#FAFE88" strokeWidth="2.5" className="filter blur-sm opacity-60" />
                  <path d={historyPath()} fill="none" stroke="#FAFE88" strokeWidth="2" className="stroke-current" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
