import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6">Login to Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button type="submit" className="w-full py-3 px-4 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none">
              Login
            </button>
          </div>
        </form>

        {/* Forgot Password & Register Link */}
        <div className="text-center mt-5 text-sm">
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-500 font-semibold hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
