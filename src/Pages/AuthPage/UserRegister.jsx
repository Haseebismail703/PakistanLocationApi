import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message, Spin } from "antd";
import api from "../../Api/api";
import ParticleImage from '../../Component/BacgroundCom/ParticleImage'
function UserRegister() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hideLoadingMessage = message.loading("Registering...", 0);
    
    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(`${api}/users/register`, formData, { withCredentials: true });
      if (response.data.success) {
        localStorage.setItem("isVerified", response.data.data?.user?.isVerified);
        localStorage.setItem("user", JSON.stringify(response.data.data?.user));
        localStorage.setItem("accessToken", response.data.data?.accessToken);
        localStorage.setItem("refreshToken", response.data.data?.refreshToken);
        message.success(response.data.message);
        navigate("/user/dashboard");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (error) {
      console.log("Registration error: ", error);
      message.error(error.response?.data?.message || "Registration failed.");
    } finally {
      hideLoadingMessage();
      setLoading(false);
    }
  };

  return (

    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side */}
        {windowWidth > 768 && (
        <div className="w-full md:w-1/2 mt-20">
          <div className=" rounded-xl overflow-hidden">
            <div className="flex justify-center items-center  ">
                <ParticleImage/>
            </div>
          </div> 
        </div>
)}
 {/* <ParticleImage/> */}
        {/* Right Side */}
        <div className="w-full md:w-1/2">
          <div className={`shadow-lg rounded-xl overflow-hidden p-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <h1 className={`text-center text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "password", "confirmPassword"].map((field, index) => (
                <div key={index}>
                  <label className={`block text-sm mb-2 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                    {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field.includes("password") ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
                      theme === "dark" ? "text-gray-200 bg-gray-700 border-gray-600" : "text-gray-900 bg-white border-gray-300"
                    }`}
                    placeholder={`Enter your ${field}`}
                  />
                </div>
              ))}
              <button type="submit" className="w-full py-3 px-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none" disabled={loading}>
                {loading ? <Spin /> : "Register"}
              </button>
            </form>
            <p className={`text-center text-sm mt-6 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-blue-600 font-semibold hover:underline ml-1">
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
