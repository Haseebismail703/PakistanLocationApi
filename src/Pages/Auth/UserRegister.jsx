import React, { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
const UserRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Form Submit Function
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${api}/users/register`, values);
      message.success("Registration successful!");
      form.resetFields();
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed!");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <Card className="w-96 shadow-lg rounded-xl">
        <h2 className="text-center text-2xl font-semibold mb-4">Register</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

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

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            Register
          </Button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => navigate("/login")}>
              Login here
            </span>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default UserRegister;