import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api.js";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values.password);
    setLoading(true);
    try {
      await axios.post(`${api}/admins/reset-password/${token}`, {password : values.password});
      message.success("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <Card title="Reset Password" style={{ width: 400, margin: "auto", marginTop: 50 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="New Password" name="password" rules={[{ required: true, message: "Enter new password!" }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Reset Password
        </Button>
      </Form>
    </Card>
  );
};

export default ResetPassword;
