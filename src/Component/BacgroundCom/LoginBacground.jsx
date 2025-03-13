import React from "react";

const Background = ({ children }) => {
  return (
    <div className="relative w-full h-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex items-center justify-center">
      
     {/* Animated Background Effects */}
     <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl bottom-20 right-20 animate-pulse"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-2 h-2 bg-white/20 rounded-full absolute top-10 left-1/4 animate-float"></div>
        <div className="w-3 h-3 bg-blue-300/20 rounded-full absolute top-1/3 right-1/4 animate-float delay-200"></div>
        <div className="w-1 h-1 bg-purple-300/20 rounded-full absolute bottom-10 right-10 animate-float delay-500"></div>
      </div>

      {/* Wrapped Content */}
        {children}
       {/* Tailwind Keyframes */}
       <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); opacity: 0.7; }
            50% { transform: translateY(-10px); opacity: 1; }
            100% { transform: translateY(0); opacity: 0.7; }
          }

          .animate-float {
            animation: float 4s ease-in-out infinite alternate;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }
          
          .delay-500 {
            animation-delay: 0.5s;
          }
        `}
      </style>
    </div>
  );
};

export default Background;
