import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  let navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (user) {
      setIsUser(true);
    } else if (admin) {
        setIsAdmin(true);
    }
  }, []);

  const handleStartTrial = () => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    }  else if (isUser) {
      navigate('/user/dashboard');
    } else{
      navigate('/register');  
    }
  };

  return (
    <div id='home' className="font-sans mt-24 mb-24" style={{ marginTop: 200 }} >
      <div className="text-center max-w-2xl max-md:max-w-md mx-auto">
        <div>
          <h2 className=" md:text-4xl text-3xl font-extrabold mb-4 md:!leading-[45px]">
            Pakistan{" "}
            <span className="text-blue-600">Location </span>
            Api
          </h2>
          <p className="mt-6 text-sm leading-relaxed max-sm:text-center">
            Our Pakistan Location API provides precise and comprehensive location data for users across Pakistan. Whether you need details about cities, provinces, our API ensures fast, reliable, and up-to-date results. Easily integrate our service to access accurate area-based information, making location-based applications seamless and efficient.
          </p>
          <div className="mt-20 flex gap-x-6 gap-y-4 justify-center max-sm:flex-col max-sm:mx-4">
            <button
              onClick={handleStartTrial}
              type="button"
              className={`bg-blue-600 hover:bg-transparent hover:text-blue-600 border border-blue-600 transition-all text-white font-bold text-sm rounded px-6 py-3 max-sm:w-full`}
            >
              {isAdmin ? 'Go to Dashboard' : isUser ? 'Go to Dashboard' : 'Start a free trial'}
            </button>
            <button
              type="button"
              className="bg-transparent hover:bg-gray-800 hover:text-white border border-gray-800 transition-all font-bold text-sm rounded px-6 py-3 max-sm:w-full"
            >
              API documentation
            </button>
          </div>
        </div>
      </div>
      <br /><br />
    </div>
  );
}

export default HeroSection;
