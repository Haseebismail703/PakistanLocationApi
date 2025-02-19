import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import api from '../../Api/api.js'

function UserLogin() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For button loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(email, password)
    try {
      const response = await axios.post(`${api}/admins/login`, { email, password }, {
        withCredentials: true
      });
      localStorage.setItem("user", JSON.stringify(response.data?.data));
      if (response.data.success) {
        message.success("Login successful!");
        // navigate("/dashboard"); 
        // console.log(response.data?.data.admin)  
      } else {
        message.error(response.data.message || "Invalid email or password");
      }
    } catch (error) {
      message.error("Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6">Login to Your Account</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-md text-sm border ${theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-md text-sm border ${theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Forgot Password & Register Link */}
        <div className="text-center mt-5 text-sm">
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
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
