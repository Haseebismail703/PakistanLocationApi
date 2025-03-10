import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table, Switch, Select, message } from "antd";
import adminInterceptor from "../../Api/adminInterceptor.js";
import usePermission from '../../Hooks/usePermission.js'

const ManageAdmin = () => {
    const getUser = {
        _id: "67b2f10457c5b0f20e561417",
        name: "admin",
        email: "admin@gmail.com",
        role: "admin",
        permission: [
            // "manage-permissions",
            // "manage-admins",
            // "manage-users",
            "create-operations",
            "read-operations",
            "update-operations",
            "delete-operations",
            // "no-permissions"
        ]
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [tableLoader, setTableLoader] = useState(false)
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();

    const storeAdmin = localStorage.getItem("admin");
    const getAdmin = storeAdmin ? JSON.parse(storeAdmin) : null;


    const create = usePermission("create-operations")
    const read = usePermission("read-operations")
    const update = usePermission('update-operations')


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
        try {
            const response = await adminInterceptor.post(
                `/admins/register`,
                values,);

            if (response.data) {
                message.success(response?.data?.message);
                fetchAdmins(); // Fetch updated list
                setIsModalVisible(false);
                form.resetFields();
            }

        } catch (error) {
            message.error(error.response?.data?.message || "Admin failed!");
            console.log("error: ", error);
        }
    };

    const fetchAdmins = async () => {
        setTableLoader(true);
        try {
            const response = await adminInterceptor.get(`/admins/get-admins`);

            let admins = response.data.data?.admins || [];
            console.log("Admins: ", admins);
            // 🔥 Sirf woh admins rakhna jo logged-in admin na ho
            admins = admins.filter(record => record._id !== getAdmin?._id);

            admins = admins.map((record, index) => ({
                key: record._id || index.toString(),
                no: index + 1,
                name: record.name,
                email: record.email,
                role: record.role,
                status: record.status,
                permissions: record.permissions || []
            }));

            setUsers(admins);

        } catch (error) {
            console.log("Error fetching admins:", error);
        } finally {
            setTableLoader(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    // Close modal for adding user
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Open modal for updating user permissions
    const showUpdateModal = (user) => {
        setSelectedAdmin(user);
        updateForm.setFieldsValue({ permissions: user.permissions || [] });
        setIsUpdateModalVisible(true);
    };

    // Handle form submission for updating permissions
    const handleUpdateSubmit = async (values) => {
        console.log("Selected Permissions:", values.permissions);
        if (!selectedAdmin) return message.error("No admin selected")

        try {
            const response = await adminInterceptor.put(`/admins/update-permissions/${selectedAdmin.key}`,
                { permissions: values.permissions })
            console.log("response: ", response);

            message.success(response?.data?.message);

            // **State Update for Immediate UI Change**
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.key === selectedAdmin.key ? { ...user, permissions: values.permissions } : user
                )
            );

            setIsUpdateModalVisible(false);
            updateForm.resetFields();
        } catch (error) {
            console.log("Permission error: ", error);
            message.error("Failed to update permissions");
        }
    };

    // Close modal for updating permissions
    const handleUpdateCancel = () => {
        setIsUpdateModalVisible(false);
    };

    // Toggle user status
    const toggleStatus = async (item) => {
        try {
            const newStatus = item.status === "active" ? "inactive" : "active";

            const response = await adminInterceptor.put(`/admins/update-status/${item.key}`,
                { status: newStatus }

            );

            if (response.data) {
                // ✅ State ko sahi tarike se update karna
                setUsers((prevUsers) =>
                    prevUsers.map((prevUser) =>
                        prevUser.key === item.key
                            ? { ...prevUser, status: newStatus }
                            : prevUser
                    )
                );

                message.success(`User status updated successfully!`);
            }
        } catch (error) {
            message.error("Failed to update status!");
        }
    };

    // console.log(read)
    // Table columns
    const columns = [
        { title: "No", dataIndex: "no", key: "no" },
        {
            title: "Name", dataIndex: "name", key: "name",
            render: (_, record) => (
                <>
                    <span>
                        {read ? record.name : "_"}
                    </span>
                </>
            )
        },
        {
            title: "Email", dataIndex: "email", key: "email",
            render: (_, record) => (
                <span>
                    {read ? record.email : "_"}
                </span>
            )
        },
        {
            title: "Role", dataIndex: "role", key: "role",
            render: (_, record) => (
                <span>
                    {read ? record.role : "_"}
                </span>
            )
        },
        {
            title: "Status", dataIndex: "status", key: "status",
            render: (status, record) => (
                <span style={{ color: status === "active" ? "green" : "red" }}>
                    {read ? status : "_"}
                </span>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    {update ? (
                        <>
                            <Switch
                                checked={record.status === "active"}
                                onChange={() => toggleStatus(record)}
                            />
                            <Button
                                type="primary"
                                onClick={() => showUpdateModal(record)}
                                style={{ marginLeft: "20px" }}
                            >
                                Update
                            </Button>
                        </>
                    ) : (
                        <p>{"You have no permission"}</p>
                    )}
                </>
            ),
        },
    ];

    return (
        <>
            <br /><br />
            <center>
                <h1 style={{ fontSize: "24px" }}>Manage Admins</h1>
            </center>
            <div style={{ padding: "20px" }}>
                <Button disabled={create ? false : true} type="primary" onClick={showModal}>
                    Create Admin
                </Button>
                <Modal
                    title="Create Admin"
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
                            <Select mode="multiple" placeholder="Select permissions">
                                {
                                    getUser?.permission?.map((perm) => (
                                        <Select.Option key={perm} value={perm}>
                                            {perm}
                                        </Select.Option>
                                    ))
                                }
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
                    scroll={{ x: true }}
                    loading={tableLoader}
                    locale={{ emptyText: "No data available" }}

                />
            </div>
        </>
    );
};

export default ManageAdmin;