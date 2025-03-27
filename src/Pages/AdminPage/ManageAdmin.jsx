import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table, Switch, Select, message, Pagination,Spin, Tag } from "antd";
import adminInterceptor from "../../Api/adminInterceptor.js";
import usePermission from '../../Hooks/usePermission.js'
import { useNavigate, useSearchParams } from "react-router-dom";
const ManageAdmin = () => {
    const getUser = {
        permission: [
            // "manage-permissions",
            "manage-admins",
            // "manage-admin",
            "create-operations",
            "read-operations",
            "update-operations",
            "delete-operations",
            // "no-permissions"
        ]
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [admin, setAdmin] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [tableLoader, setTableLoader] = useState(false)
    const [loader,setLoader] = useState(false)
    const [totalItems, setTotalItems] = useState(0);
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const storeAdmin = localStorage.getItem("admin");
    const getAdmin = storeAdmin ? JSON.parse(storeAdmin) : null;
    // Get currentPage and pageSize from URL or default to 1 and 10
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("size")) || 10;

    const create = usePermission("create-operations")
    const read = usePermission("read-operations")
    const update = usePermission('update-operations')
    const manageAdmin = usePermission('manage-admins')

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
        setLoader(true)
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
            setLoader(false)
            message.error(error.response?.data?.message || "Admin failed!");
            console.log("error: ", error);
        } finally{
            setLoader(false)
        }
    };

    const fetchAdmins = async () => {
        setTableLoader(true);
        try {
            const response = await adminInterceptor.get(`/admins/get-admins?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}`);

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
                permissions: record.permissions || [],
                isVerified : record.isVerified
                
            }));

            setAdmin(admins);
            setTotalItems(admins?.total || 1000);
        } catch (error) {
            console.log("Error fetching admins:", error);
        } finally {
            setTableLoader(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, [currentPage, pageSize]);

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
        setLoader(true)
        console.log("Selected Permissions:", values.permissions);
        if (!selectedAdmin) return message.error("No admin selected")

        try {
            const response = await adminInterceptor.put(`/admins/update-permissions/${selectedAdmin.key}`,
                { permissions: values.permissions })
            console.log("response: ", response);

            message.success(response?.data?.message);

            // **State Update for Immediate UI Change**
            setAdmin((prevadmin) =>
                prevadmin.map((user) =>
                    user.key === selectedAdmin.key ? { ...user, permissions: values.permissions } : user
                )
            );

            setIsUpdateModalVisible(false);
            updateForm.resetFields();
        } catch (error) {
            setLoader(false)
            console.log(error.response.data.message || "Permission error: ");
            message.error(error.response.data.message || "Permission error: ");
        } finally{
            setLoader(false)
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
                setAdmin((prevadmin) =>
                    prevadmin.map((prevUser) =>
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
        {
            title: "No", dataIndex: "no", key: "no",
            render: (_, record) => (
                <>
                    <span >
                        {read ? record.no : "_"}
                    </span>
                </>
            )
        },
        {
            title: "Name", dataIndex: "name", key: "name",
            render: (_, record) => (
                <>
                    <span >
                        {read ? record.name : "_"}
                    </span>
                </>
            )
        },
        {
            title: "Email", dataIndex: "email", key: "email",
            render: (_, record) => (
                <span >
                    {read ? record.email : "_"}
                </span>
            )
        },
        {
            title: "Role", dataIndex: "role", key: "role",
            render: (_, record) => (
                <span >
                    {read ? record.role : "_"}
                </span>
            )
        },
        {
            title: "Verified", dataIndex: "isVerified", key: "isVerified",
            render: (isVerified) => (
                <Tag color={isVerified ? "green" : "red"}>
                    {isVerified ? "Verified" : "Not Verified"}
                </Tag>
            ),
        },
        {
            title: "Status",
            key: "status",
            render: (_, record) => (
                <Spin spinning={record.loading || false}>
                    <Switch
                        checked={record.status === "active"}
                        onChange={async () => {
                            setAdmin((prevAdmin) =>
                                prevAdmin.map((user) =>
                                    user.key === record.key ? { ...user, loading: true } : user
                                )
                            );
                            await toggleStatus(record);
                            setAdmin((prevAdmin) =>
                                prevAdmin.map((user) =>
                                    user.key === record.key ? { ...user, loading: false } : user
                                )
                            );
                        }}
                        checkedChildren="Active"
                        unCheckedChildren="Inactive"
                        style={{
                            backgroundColor: record.status === "active" ? "green" : "red",
                        }}
                    />
                </Spin>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    {update ? (
                        <Button
                            type="primary"
                            onClick={() => showUpdateModal(record)}
                        >
                            Update
                        </Button>
                    ) : (
                        <p>{"You have no permission"}</p>
                    )}
                </>
            )
        }
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
                            <Button loading={loader} disabled={manageAdmin ? false : true} type="primary" htmlType="submit">
                            Create now
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
                            <Button type="primary" htmlType="submit" loading={loader}>
                            Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Table to display admin */}
                <Table
                    columns={columns}
                    dataSource={admin}
                    pagination={false}
                    style={{ marginTop: "20px" }}
                    scroll={{ x: true }}
                    loading={tableLoader}
                    locale={{ emptyText: "No data available" }}

                />
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={(page, size) => {
                        if (page < currentPage || admin.length === pageSize) {
                            navigate(`?page=${page}&size=${size}`);
                        } else {
                            message.warning("No more data to display.");
                        }
                    }}
                    showSizeChanger
                    pageSizeOptions={["10", "20", "50", "100",totalItems.toString()]}
                    className="responsive-pagination"
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    hideOnSinglePage={true}
                    showLessItems={true}
                    responsive // ✅ Automatically adjusts layout for smaller screens
                    simple={window.innerWidth < 768} // ✅ Shows compact pagination on small screens
                />

            </div>
        </>
    );
};

export default ManageAdmin;