import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  // Get theme from local storage or default to light
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
let navigate = useNavigate()
  return (
    <div className={`min-h-screen p-3 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 rounded-xl`}>
        
        {/* Registration Heading */}
        <h1 className={`text-center text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Register Your Account
        </h1>

        <form>
          <div className="space-y-6">
            {/* name Input */}
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Enter your name</label>
              <input
                type="text"
                className={`w-full px-4 py-3 text-sm ${theme === 'dark' ? 'text-gray-200 bg-gray-700 border-gray-600 outline-none' : 'text-gray-800 bg-white border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your name"
              />
            </div>
            {/* Email Input */}
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Email Address</label>
              <input
                type="email"
                className={`w-full px-4 py-3 text-sm ${theme === 'dark' ? 'text-gray-200 bg-gray-700 border-gray-600 outline-none' : 'text-gray-800 bg-white border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Password</label>
              <input
                type="password"
                className={`w-full px-4 py-3 text-sm ${theme === 'dark' ? 'text-gray-200 bg-gray-700 border-gray-600 outline-none' : 'text-gray-800 bg-white border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Confirm Password</label>
              <input
                type="password"
                className={`w-full px-4 py-3 text-sm ${theme === 'dark' ? 'text-gray-200 bg-gray-700 border-gray-600 outline-none' : 'text-gray-800 bg-white border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Confirm your password"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create an Account
              </button>
            </div>
          </div>
        </form>

        {/* Login Link */}
        <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Already have an account?{' '}
          <button
          onClick={() => navigate('/login')}
            href="javascript:void(0);"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline ml-1"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
