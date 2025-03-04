// ForgotPassword.js
import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Typography } from 'antd';
import api from '../../Api/api.js'

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Form submit hone par
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/forgot-password', { email: values.email });
      setSuccessMessage(response.data.message || 'Password change ho gaya hai. Gmail check karo!');
      message.success(response.data.message || 'Password change ho gaya hai. Gmail check karo!');
    } catch (error) {
      message.error(error.response?.data?.message || 'Email verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ maxWidth: 400, width: '100%', padding: '20px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>Forgot Password</Title>
        {!successMessage ? (
          <Form name="forgotPassword" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Send Password Reset Email
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Text type="success">{successMessage}</Text>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
