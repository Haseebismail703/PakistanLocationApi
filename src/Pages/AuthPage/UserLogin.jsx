import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { message, Spin } from "antd";
import api from '../../Api/api.js';
import Bacground from '../../Component/BacgroundCom/LoginBacground.jsx'

function UserLogin() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const hideLoadingMessage = message.loading('Logging in...', 0); 
    try {
      const response = await axios.post(`${api}/users/login`, formData, { withCredentials: true });
      if (response.data.success) {
        localStorage.setItem("isVerified", response.data.data?.user?.isVerified);
        localStorage.setItem("user", JSON.stringify(response.data.data?.user));
        localStorage.setItem('accessToken', response.data.data?.accessToken);
        localStorage.setItem('refreshToken', response.data.data?.refreshToken);
        message.success(response.data.message);
        navigate('/user/dashboard');
        setFormData({ email: '', password: '' });
      }
    } catch (error) {
      console.log(error.response.data?.message);
      message.error(error.response.data?.message || "somthing went wrong");
    } finally {
      hideLoadingMessage(); 
      setLoading(false);
    }
  };

  return (
    <>
      <Bacground>
        <div className={`relative ml-5 mr-5 z-10 max-w-md w-full mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 rounded-xl`}>
          <h1 className={`text-center text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Login to Your Account
          </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border ${theme === 'dark' ? 'text-gray-200 bg-gray-700 border-gray-600' : 'text-gray-900 bg-white border-gray-300'}`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border ${theme === 'dark' ? 'text-gray-200 bg-gray-700 border-gray-600' : 'text-gray-900 bg-white border-gray-300'}`}
                  placeholder="Enter your password"
                />
              </div>

              <div className="mt-6">
                <button type="submit" className="w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  {loading ? <Spin /> : 'Login'}
                </button>
              </div>
            </form>
          <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-blue-600 font-semibold hover:underline ml-1">
              Register here
            </button>
          </p>
          <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            Forgot your password?{' '}
            <button onClick={() => navigate('/forgot-password')} className="text-blue-600 font-semibold hover:underline ml-1">
              Click here
            </button>
          </p>
        </div>
      </Bacground>
    </>
  );
}

export default UserLogin;
