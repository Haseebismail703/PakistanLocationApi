import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../../Api/api.js'
const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log("values: ", values);
        setLoading(true);
        try {
            const response = await axios.post(`${api}/admins/login`,
                values,
                {
                    withCredentials: true
                },
            );

            localStorage.setItem("admin", JSON.stringify(response.data.data?.admin));
            localStorage.setItem('accessToken', response.data.data?.accessToken);
            localStorage.setItem('refreshToken', response.data.data?.refreshToken);
            message.success("Login successful!");
            form.resetFields();



            navigate("/admin/dashboard");
        } catch (error) {
            message.error(error.response?.data?.message || "Login failed!");
        }
        setLoading(false);
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <Card className="w-96 shadow-lg rounded-xl">
                <h2 className="text-center text-2xl font-semibold mb-4">Admin Login</h2>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Password is required!" }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default AdminLogin;