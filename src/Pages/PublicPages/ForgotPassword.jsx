import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import axios from "axios";
import api from '../../Api/api.js'
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    setLoading(true);
    try {
     let res =  await axios.post(`${api}/admins/forgot-password`, { email: values.email })
     console.log(res.data)
      message.success("Password reset link sent to your email!");
    } catch (error) {
      console.error("Backend error:", error.response?.data);
      message.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <Card title="Forgot Password" style={{ width: 400, margin: "auto", marginTop: 50 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Send Reset Link
        </Button>
      </Form>
    </Card>
  );
};

export default ForgotPassword;
