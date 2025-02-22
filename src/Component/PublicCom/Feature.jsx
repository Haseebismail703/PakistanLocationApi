import React from "react";

const cards = [
  {
    title: "Accurate Location Data",
    description: "Get exact city, district, and postal code details in Pakistan.",
    icon: "📍",
  },
  {
    title: "Nationwide Coverage",
    description: "Works for all cities, districts, and  areas.",
    icon: "🌎",
  },
  {
    title: "Fast & Responsive",
    description: "Quickly delivers location data with low response time.",
    icon: "⚡",
  },
  {
    title: "Secure & Reliable",
    description: "Keeps your data safe with strong security measures.",
    icon: "🔒",
  },
  {
    title: "Easy to Use",
    description: "Simple API with clear documentation for easy setup.",
    icon: "📖",
  },
  {
    title: "Always Updated",
    description: "Provides the latest location data in real-time.",
    icon: "📡",
  },
];

function Feature() {
  return (
    <div id="feature" className="min-h-screen bg-base-100 py-12">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-base-content mb-12">
        Explore Our Features 🚀
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden bg-base-200 text-base-content px-6 pt-10 pb-8 shadow-xl ring-1 ring-base-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl rounded-lg"
          >
            <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]" />
            <div className="relative z-10 mx-auto max-w-md">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-primary text-white text-3xl transition-all duration-300 group-hover:bg-primary-focus">
                {typeof card.icon === "string" ? <span>{card.icon}</span> : card.icon}
              </span>
              <div className="space-y-6 pt-5 text-base leading-7 text-base-content transition-all duration-300 group-hover:text-white/90">
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
