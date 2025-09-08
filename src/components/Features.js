import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Smart Analytics",
      description: "Get deep insights into your practice with advanced analytics and reporting tools.",
      icon: "📊"
    },
    {
      title: "Workflow Automation",
      description: "Streamline repetitive tasks and focus on what matters most to your clients.",
      icon: "⚡"
    },
    {
      title: "Secure Platform",
      description: "Enterprise-grade security ensures your data and client information stays protected.",
      icon: "🔒"
    },
    {
      title: "Team Collaboration",
      description: "Work seamlessly with your team through integrated collaboration tools.",
      icon: "👥"
    },
    {
      title: "Mobile Access",
      description: "Access your practice management tools anywhere with our mobile-optimized platform.",
      icon: "📱"
    },
    {
      title: "24/7 Support",
      description: "Get help when you need it with our dedicated customer support team.",
      icon: "🎧"
    }
  ];

  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif italic">
            Stumble here, not in front of your recruiter.
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful features designed to help you manage, grow, and optimize your practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-800">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;