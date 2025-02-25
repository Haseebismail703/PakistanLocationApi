import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import api from '../../Api/api'

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const storeData = localStorage.getItem("user")
  const user = storeData ? JSON.parse(storeData) : null;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${api}/user`);
      message.success("Message sent successfully!");
    } catch (error) {
      message.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Card title="Contact Us" style={{ width: 600, padding: 30, boxShadow: "0 6px 12px rgba(0,0,0,0.1)", borderRadius: 8 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Your name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
          >
            <Input placeholder="Your email" size="large" />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please enter a subject" }]}
          >
            <Input placeholder="Subject" size="large" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea rows={4} placeholder="Your message" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ContactForm;
