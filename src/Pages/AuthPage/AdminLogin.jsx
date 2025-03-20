import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { message, Spin } from "antd";
import api from '../../Api/api.js';
import Bacground from '../../Component/BacgroundCom/LoginBacground.jsx';
function AdminLogin() {
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
        try {
            const response = await axios.post(`${api}/admins/login`, formData, { withCredentials: true });

            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("isVerified",response.data.data?.admin?.isVerified );
                localStorage.setItem("admin", JSON.stringify(response.data.data?.admin));
                localStorage.setItem('accessToken', response.data.data?.accessToken);
                localStorage.setItem('refreshToken', response.data.data?.refreshToken);
                // window.location.href = '/admin/dashboard';
                navigate("/admin/dashboard")
                setFormData({ email: '', password: '' });
            }
        } catch (error) {
            console.log("Login error: ", error);
            message.error(error?.response.data.message);    
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Bacground>
        <div className={`relative ml-5 mr-5 z-10 max-w-md w-full mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 rounded-xl`}>
            <div className={`text-center text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {/* <Spin spinning={loading}> */}
                    {/* Heading */}
                    <h1 className={`text-center text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Admin login
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
                              {loading ? <Spin/> : "Login"}  
                            </button>
                        </div>
                    </form>

                    {/* Forgot Password Link */}
                    <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        Forgot your password?{' '}
                        <button onClick={() => navigate('/admin/forgot-password')} className="text-blue-600 font-semibold hover:underline ml-1">
                            Click here
                        </button>
                    </p>
                {/* </Spin> */}
            </div>
        </div>
        </Bacground>
        </>
    );
}

export default AdminLogin;