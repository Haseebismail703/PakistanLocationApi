import React, { useState, useEffect } from "react";
import { Table, Tag, message, Spin } from "antd";
import adminInterceptor from '../../Api/adminInterceptor.js'

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await adminInterceptor.get("/admins/get-users?limit=0");
                let allUser  = response.data.data.users?.map((record, index) => ({
                    key: record._id || index.toString(),
                    no: index + 1,
                    name: record.name,
                    email: record.email,
                    role: record.role,
                    plan: record.plan ,
                    isVerified : record.isVerified || "N\A",
                    // createdAt : record.createdAt
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
            dataIndex: "index",
            key: "index",
            render: (_, __, index) => index + 1, 
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
                <Tag color={isVerified === true ? "green" : "red"}>
                    {isVerified ? "Verified" : "Not Verified"}
                </Tag>
            ),
        },
        // {
        //     title: "Created At",
        //     dataIndex: "createdAt",
        //     key: "createdAt",
        //     render: (date) => new Date(date).toLocaleDateString(),
        // },
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
                <h1 style={{ fontSize: "24px" , marginBottom : 30 }}>All users</h1>
            </center>
        <Table 
                loading={loading}
                    columns={columns} 
                    dataSource={users} 
                    scroll={{"x" : "100%"}}
                    pagination={{ pageSize: 10 }} 
                    bordered
                />
       </>
               
  
    );
};

export default AllUsers;
