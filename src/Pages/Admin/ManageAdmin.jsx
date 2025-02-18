import React, { useState } from "react";
import { Button, Modal, Form, Input, Table, Switch, Space, Select } from "antd";
import AdminNavbar from "../../Component/AdminCom/AdminNavbar";
const ManageAdmin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();

  // Open modal for adding user
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle form submission for adding user
  const handleSubmit = (values) => {
    const newUser = {
      key: users.length + 1,
      no: users.length + 1,
      name: values.name,
      email: values.email,
      password: values.password,
      status: "Active", // Default status
    };
    setUsers([...users, newUser]);
    setIsModalVisible(false);
    form.resetFields();
  };

  // Close modal for adding user
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Open modal for updating user permissions
  const showUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalVisible(true);
  };

  // Handle form submission for updating permissions
  const handleUpdateSubmit = (values) => {
    console.log("Selected Permissions:", values.permissions);
    setIsUpdateModalVisible(false);
    updateForm.resetFields();
  };

  // Close modal for updating permissions
  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  // Toggle user status
  const toggleStatus = (key) => {
    const updatedUsers = users.map((user) =>
      user.key === key
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    );
    setUsers(updatedUsers);
  };

  // Table columns
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Switch
            checked={record.status === "Active"}
            onChange={() => toggleStatus(record.key)}
          />
          <Button type="primary" onClick={() => showUpdateModal(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <AdminNavbar />
      <br /><br />
      <center>
        <h1>Add admin</h1>
      </center>
      <div style={{ padding: "20px" }}>
        {/* Button to open modal for adding user */}
        <Button type="primary" onClick={showModal}>
          Create Admin</Button>

        {/* Modal for adding user */}
        <Modal
          title="Create admin"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">


            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter the email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter the password" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>



          </Form>
        </Modal>

        {/* Modal for updating user permissions */}
        <Modal
          title="Update Permissions"
          open={isUpdateModalVisible}
          onCancel={handleUpdateCancel}
          footer={null}
        >
          <Form layout="vertical" form={updateForm} onFinish={handleUpdateSubmit}>
            <Form.Item
              name="permissions"
              label="Permissions"
              rules={[{ required: true, message: "Please select permissions" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select permissions"
                style={{ width: "100%" }}
              >
                <Select.Option value="read">Read</Select.Option>
                <Select.Option value="write">Write</Select.Option>
                <Select.Option value="delete">Delete</Select.Option>
                <Select.Option value="update">Update</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Table to display users */}
        <Table
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 5 }}
          style={{ marginTop: "20px" }}
          scroll={{ x: true }} // Make table responsive
        />
      </div>
    </>
  );
};

export default ManageAdmin;