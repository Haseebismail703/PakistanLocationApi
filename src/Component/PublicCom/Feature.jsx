import React from "react";

const cards = [
  {
    title: "Learn React",
    description: "Perfect for learning how the framework works.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-10 w-10 text-white transition-all"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    ),
  },
  {
    title: "Accurate Location Data",
    description: "Get precise city, district, and postal code details across Pakistan.",
    icon: "🤖",
  },
  {
    title: "Nationwide Coverage",
    description: "Covers all major cities, districts, and remote areas.",
    icon: "🌍",
  },
  {
    title: "Fast API Response",
    description: "Optimized for speed and efficiency, ensuring quick results.",
    icon: "📊",
  },
  {
    title: "Secure & Reliable",
    description: "High-end security to protect data privacy and integrity.",
    icon: "🔒",
  },
  {
    title: "Developer Friendly",
    description: "Easy-to-use API with clear documentation and examples.",
    icon: "📱",
  },
];

function Feature() {
  return (
    <div className="min-h-screen bg-base-100 py-12">
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
              <div className="pt-5 text-base font-semibold leading-7">
                <p>
                  <a
                    href="#"
                    className="text-primary transition-all duration-300 group-hover:text-white"
                  >
                    Read more →
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
