import React from "react";
import { useNavigate } from "react-router-dom";

const pricingPlans = [
  {
    title: "Free Plan",
    price: "$0",
    duration: "Month",
    icons: "🆓", 
    features: [
      { text: "Basic location access", icon: "📍" },
      { text: "Standard API response time", icon: "⏳" },
      { text: "1,000 API requests per day", icon: "📊" },
    ],
    button: "Get Started",
    path : "/register"
  },
  {
    title: "Basic Plan",
    price: "$9",
    duration: "Month",
    icons: "⭐", 
    features: [
      { text: "Expanded location coverage", icon: "🗺️" },
      { text: "Faster API response time", icon: "⚡" },
      { text: "5,000 API requests per day", icon: "📈" },
    ],
    button: "Purchase Plan",
    path : "/"
  },
  {
    title: "Pro Plan",
    price: "$49",
    duration: "Month",
    icons: "🚀",
    features: [
      { text: "Full location database access", icon: "🌍" },
      { text: "Ultra-fast API response", icon: "🚀" },
      { text: "Unlimited API requests", icon: "♾️" },
    ],
    button: "Purchase Plan",
    path : "/"
  },
];

function Pricing() {
  const navigate = useNavigate()
  return (
    <div id="pricing">
      <section className="py-24 relative">
        <div className="absolute h-[36.5rem] w-full top-0  to-violet-600 -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-manrope text-5xl text-center font-bold text-white mb-4">
              Suitable Pricing Plans
            </h2>
          </div>

          {/* Grid */}
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center">
            {/* Pricing Cards */}
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="group relative flex flex-col mx-auto w-full max-w-sm bg-white rounded-2xl shadow-2xl transition-all duration-300 p-8 xl:p-12"
              >
                <div className="border-b border-solid border-gray-200 pb-9 mb-9">
                  {/* Updated Icon Section */}
                  <div className="w-16 h-16 rounded-full bg-indigo-50 mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-indigo-600 text-3xl">
                    {plan.icons}
                  </div>

                  <h3 className="font-manrope text-2xl font-bold my-7 text-center text-indigo-600">
                    {plan.title}
                  </h3>
                  <div className="flex items-center justify-center">
                    <span className="font-manrope text-4xl font-medium text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-xl text-gray-500 ml-3">
                      |&nbsp; {plan.duration}
                    </span>
                  </div>
                </div>

                {/* List */}
                <ul className="mb-12 space-y-6 text-left text-lg text-gray-600 group-hover:text-gray-900">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3.5">
                      <span className="text-xl">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate(plan.path)} className="py-2.5 px-5 bg-indigo-50 shadow-sm rounded-full transition-all duration-500 text-base text-indigo-600 font-semibold text-center w-fit mx-auto group-hover:bg-indigo-600 group-hover:text-white" >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
