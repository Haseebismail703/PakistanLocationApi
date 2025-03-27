import React, { useState, useEffect } from "react";
import { Table, Tag, message, Spin, Empty } from "antd";
import adminInterceptor from '../../Api/adminInterceptor.js'
import usePermission from "../../Hooks/usePermission.js";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const canRead = usePermission("read-operations");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await adminInterceptor.get("/admins/get-users?limit=0");
                let allUser = response.data.data.users?.map((record, index) => ({
                    key: record._id || index.toString(),
                    no: index + 1,
                    name: record.name,
                    email: record.email,
                    role: record.role,
                    plan: record.plan,
                    isVerified: record.isVerified === true,
                }));

                setUsers(allUser);
                console.log(response.data)
            } catch (error) {
                message.error("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

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
            title: "Verified",
            dataIndex: "isVerified",
            key: "isVerified",
            render: (isVerified) => (
                <Tag color={isVerified ? "green" : "red"}>
                    {isVerified ? "Verified" : "Not Verified"}
                </Tag>
            ),
        },
        {
            title: "Plan",
            dataIndex: "plan",
            key: "plan",
            render: (plan) => {
                let color = plan === "paid" ? "gold" : plan === "free" ? "blue" : "gray";
                return <Tag color={color}>{plan || "Free"}</Tag>;
            },
        },
    ];

    return (
        <>
            <br /><br />
            <center>
                <h1 style={{ fontSize: "24px", marginBottom: 30 }}>All users</h1>
            </center>
            {canRead ? (
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={users}
                    scroll={{ x: "100%" }}
                    pagination={{ pageSize: 10 }}
                    bordered
                />
            ) : (
                <Empty description="You don't have permission to view this data" />
            )}
        </>
    );
};

export default AllUsers;
