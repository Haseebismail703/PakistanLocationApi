import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { message } from "antd";
import api from '../../Api/api';

function UserRegister() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(`${api}/users/register`, formData, { withCredentials: true });
      if (response.data.success) {
        message.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log("Registration error: ", error);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md w-full mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 rounded-xl`}>
        <h1 className={`text-center text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'password', 'confirmPassword'].map((field, index) => (
            <div key={index}>
              <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
                  theme === 'dark' ? 'text-gray-200 bg-gray-700 border-gray-600' : 'text-gray-900 bg-white border-gray-300'
                }`}
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}
          <button type="submit" className="w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Register
          </button>
        </form>
        <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Already have an account? 
          <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline ml-1">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
