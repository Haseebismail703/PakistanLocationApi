import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api.js";
import { message, Spin } from "antd";

const UserVerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false); 

    useEffect(() => {
        const verifyEmail = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            const params = new URLSearchParams(location.search);
            const token = params.get("token");

            if (!token) {
                message.error("Token is missing!");
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(`${api}/users/verify-email?token=${encodeURIComponent(token)}`);
                // console.log("User API Response:", response.data);

                if (response.data.success) {
                    localStorage.setItem("isVerified", true);
                    message.success(response.data.message);
                    window.location.href = "/user/dashboard";
                }
            } catch (error) {
                console.error("User API Error:", error.response?.data || error.message);
                message.error(error.response?.data?.message || "Verification failed! Try again.");
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [location]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Spin spinning={loading} size="large">
                <h2 className="text-xl font-semibold">Verifying User Email...</h2>
            </Spin>
        </div>
    );
};

export default UserVerifyEmail;
