import React, { useState } from "react";
import { Input, Button, Card, Form, message, Typography } from "antd";
import axios from "axios";
import api from '../../Api/api.js'
const { Title } = Typography;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState("John Doe");
  const [email] = useState("johndoe@example.com");
  const user = JSON.parse(localStorage.getItem("user")); 
  // Function to update name via API
  const handleUpdateName = async () => {
    try {
     let res = await axios.put(`${api}/users/update`, { name },{
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      // console.log(res.data)
      message.success(res.data?.message);
    } catch (error) {
      message.error("Failed to update name. Try again!");
      console.log(error)
    }
  };

  // Function to change password via API
const handleChangePassword = async (values) => {
    try {
        await axios.put(`${api}/users/change-password`, values, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
        message.success("Password changed successfully!");
        form.resetFields();
    } catch (error) {
        message.error("Failed to change password. Try again!");
    }
};

  return (
    <div className="flex flex-col items-center justify-center  p-6  overflow-hidden">
      {/* Settings Heading */}
      <Title level={2} className="mb-6 text-center">Settings</Title>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <Button 
          type={activeTab === "profile" ? "primary" : "default"} 
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </Button>
        <Button 
          type={activeTab === "changePassword" ? "primary" : "default"} 
          onClick={() => setActiveTab("changePassword")}
        >
          Change Password
        </Button>
      </div>

      <div className="w-full max-w-2xl">
        {activeTab === "profile" && (
          <Card className="shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <Form layout="vertical">
              <Form.Item label="Name">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Email">
                <Input value={email} disabled />
              </Form.Item>
              <Button type="primary" onClick={handleUpdateName} block>
                Update Name
              </Button>
            </Form>
          </Card>
        )}

        {activeTab === "changePassword" && (
          <Card className="shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <Form layout="vertical" form={form} onFinish={handleChangePassword}>
              <Form.Item 
                label="Old Password" 
                name="oldPassword" 
                rules={[{ required: true, message: "Please enter old password!" }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item 
                label="New Password" 
                name="newPassword" 
                rules={[{ required: true, message: "Please enter new password!" }]}>
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Change Password
              </Button>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
