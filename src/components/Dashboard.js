import React from 'react';

/**
 * Renders a dashboard modal when open is true.
 * @example
 * renderDashboard({ open: true, onClose: () => console.log('Closed') })
 * // Renders the dashboard modal
 * @param {Object} context - The context object containing function arguments.
 * @param {boolean} context.open - Indicates if the modal should be displayed.
 * @param {Function} context.onClose - Function to call when the modal is closed.
 * @returns {JSX.Element|null} Returns a JSX element of the dashboard modal if open is true, otherwise null.
 **/
const Dashboard = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-60" onClick={onClose} />
      <div className="relative z-70 w-11/12 md:w-3/4 lg:w-2/3 max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold">Your Dashboard</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-black">Close</button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">Welcome — this is a lightweight dashboard placeholder. Add components here (sessions, history, progress, settings).</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">Mock interview sessions</div>
            <div className="p-4 bg-gray-50 rounded-lg">Progress & feedback</div>
            <div className="p-4 bg-gray-50 rounded-lg">Saved questions</div>
            <div className="p-4 bg-gray-50 rounded-lg">Account & settings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
