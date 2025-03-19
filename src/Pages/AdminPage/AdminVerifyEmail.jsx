import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api.js";
import { message, Spin } from "antd";

const AdminVerifyEmail = () => {
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
                navigate("/admin/login");
                return;
            }

            try {
                const response = await axios.get(`${api}/admins/verify-email?token=${encodeURIComponent(token)}`);
                console.log("Admin API Response:", response.data);

                if (response.data.success) {
                    message.success(response.data.message);
                    localStorage.setItem("isVerified", true);
                    window.location.href = "/admin/dashboard";
                }
            } catch (error) {
                console.error("Admin API Error:", error.response?.data || error.message);
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
                <h2 className="text-xl font-semibold">Verifying Admin Email...</h2>
            </Spin>
        </div>
    );
};

export default AdminVerifyEmail;
