import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { message } from "antd";
import api from '../../Api/api.js';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/users/login`, formData, { withCredentials: true });

      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("user", JSON.stringify(response.data.data?.user));
        localStorage.setItem('accessToken', response.data.data?.accessToken);
        localStorage.setItem('refreshToken', response.data.data?.refreshToken);
        navigate('/user/dashboard');
        setFormData({ email: '', password: '' });
      }
    } catch (error) {
      console.log("Login error: ", error);
      // message.error(response.data.message);    
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 rounded-xl`}>
        
        {/* Heading */}
        <h1 className={`text-center text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Login to Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
                theme === 'dark' ? 'text-gray-200 bg-gray-700 border-gray-600' : 'text-gray-900 bg-white border-gray-300'
              }`}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
                theme === 'dark' ? 'text-gray-200 bg-gray-700 border-gray-600' : 'text-gray-900 bg-white border-gray-300'
              }`}
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button type="submit" className="w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')} className="text-blue-600 font-semibold hover:underline ml-1">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;