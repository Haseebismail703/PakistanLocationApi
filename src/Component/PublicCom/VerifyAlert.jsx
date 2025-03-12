import React, { useState } from "react";
import { message, Button, Alert, Card } from "antd";
import api from "../../Api/api.js"; 
import adminInterceptor from "../../Api/adminInterceptor.js";
import userInterceptor from "../../Api/userInterceptor.js";

const VerifyAlert = () => {
    const [loading, setLoading] = useState(false);

   
    const getApiClient = () => {
        const user = localStorage.getItem("user");
        const admin = localStorage.getItem("admin");

        if (user) {
            return { client: userInterceptor, url: `${api}/users/send-verification-email` };
        } else if (admin) {
            return { client: adminInterceptor, url: `${api}/admins/send-verification-email` };
        } else {
            return null; 
        }
    };

    const handleVerify = async () => {
      

        const apiData = getApiClient();
        if (!apiData) {
            message.error("No user found! Please log in first.");
            return;
        }

        setLoading(true);
        try {
            const response = await apiData.client.post(apiData.url); 
            if (response.data.success) {
                message.success(response.data?.message);
            } else {
                message.error(response.data.message || "Verification failed!");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-white text-center">
                <Alert
                    message="Email Verification Required"
                    description="Your email is not verified. Click the button below to verify now."
                    type="warning"
                    showIcon
                    className="mb-4"
                />
                <Button
                    type="primary"
                    block
                    onClick={handleVerify}
                    loading={loading} 
                >
                    Verify Now
                </Button>
            </Card>
        </div>
    );
};

export default VerifyAlert;
