import React, { useState, useContext, useEffect } from "react";
import { Input, Button, Card, Form, message, Typography, Spin } from "antd";
import userInterceptor from "../../Api/userInterceptor.js";
import { UserContext } from "../../Context/UserContext";

const { Title } = Typography;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState(user?.data?.name || "");
  const [loader, setLoader] = useState(false);

  // Ensure name updates when user data changes
  useEffect(() => {
    if (user?.data?.name) {
      setName(user.data.name);
    }
    if(user){
      setLoader(false)
    } else{
      setLoader(true)
    }
  }, [user]);

  const handleUpdateName = async () => {
    setLoader(true);
    try {
      const res = await userInterceptor.put(`/users/update`, { name });
      message.success(res.data?.message);
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to update name!");
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const handleChangePassword = async (values) => {
    setLoader(true);
    try {
      const res = await userInterceptor.put(`/users/change-password`, values);
      message.success(res.data?.message);
      form.resetFields();
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to change password!");
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 overflow-hidden">
      <Title level={2} className="mb-6 text-center">
        Settings
      </Title>

      <div className="flex gap-4 mb-6">
        <Button type={activeTab === "profile" ? "primary" : "default"} onClick={() => setActiveTab("profile")}>
          Profile
        </Button>
        <Button type={activeTab === "changePassword" ? "primary" : "default"} onClick={() => setActiveTab("changePassword")}>
          Change Password
        </Button>
      </div>

      <div className="w-full max-w-2xl">
        {activeTab === "profile" && (
          <Card  className=" p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <Form  layout="vertical">
              <Form.Item label="Name">
                <Input  value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Email">
                <Input value={user?.data?.email} disabled />
              </Form.Item>
              <Button loading={loader} type="primary" onClick={handleUpdateName} block>
                Update Name
              </Button>
            </Form>
          </Card>
        )}

        {activeTab === "changePassword" && (
          <Card className=" p-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <Form layout="vertical" form={form} onFinish={handleChangePassword}>
              <Form.Item label="Old Password" name="oldPassword" rules={[{ required: true, message: "Please enter old password!" }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: "Please enter new password!" }]}>
                <Input.Password />
              </Form.Item>
              <Button loading={loader} type="primary" htmlType="submit" block>
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
