import React, { useState, useEffect } from 'react';
import { Table, Input, Row, Col, message, Tag, Empty, Card } from 'antd';
import adminInterceptor from '../../Api/adminInterceptor.js';
import usePermission from "../../Hooks/usePermission";

const AllPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [userIdSearch, setUserIdSearch] = useState('');

    const canRead = usePermission("read-operations");

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const res = await adminInterceptor.get(`/payment/all-payments?limit=0`);
            // console.log(res.data);
            const paymentData = res.data?.data?.payments.map((record, index) => ({
                key: index + 1,
                userName: record?.user?.name || '__',
                userId: record?.user?._id || '__',
                paymentType: record?.paymentType || 'Unknown',
                createdAt: record?.createdAt?.substring(0, 10) || '__',
                amount: `${record?.amount || 0}$`,
                status: record?.status || 'pending',
            }));
            setPayments(paymentData);
        } catch (error) {
            message.error('Failed to fetch payment data.');
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const filteredPayments = payments.filter(record =>
        (record.userName.toLowerCase().includes(userSearch.toLowerCase()) || !userSearch) &&
        (record.userId.includes(userIdSearch) || !userIdSearch)
    );

    const columns = [
        {
            title: "No",
            dataIndex: "key",
            key: "key",
            render: (_, record) => (
                <span>{canRead ? record.key : "_"}</span>
            )
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
            render: (userName) => (
                <span>{canRead ? userName : "_"}</span>
            )
        },
        {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
            render: (userId) => (
                <span>{canRead ? userId : "_"}</span>
            )
        },
        {
            title: "Payment Type",
            dataIndex: "paymentType",
            key: "paymentType",
            render: (paymentType) => (
                <span>{canRead ? paymentType : "_"}</span>
            )
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => (
                <span>{canRead ? createdAt : "_"}</span>
            )
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => (
                <span>{canRead ? amount : "_"}</span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                canRead ? (
                    <Tag color={status === 'Complete' ? 'green' : status === 'Incomplete' ? 'red' : 'orange'}>
                        {status}
                    </Tag>
                ) : "_"
            )
        },
    ];


    return (
        <div style={{ padding: "20px" }}>
            <center>
                <h1 style={{ fontSize: "24px", marginBottom: 20 }}>All Payments</h1>
            </center>

            {canRead &&
                <Card style={{ marginBottom: 20 }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={12}>
                            <Input
                                placeholder="Search by User Name"
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={12}>
                            <Input
                                placeholder="Search by User ID"
                                value={userIdSearch}
                                onChange={(e) => setUserIdSearch(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Card>}

            <Table
                columns={columns}
                dataSource={filteredPayments}
                loading={loading}
                pagination={{ pageSize: 10 }}
                bordered
                scroll={{ x: "100%" }}
            />
        </div>
    );
};

export default AllPayments;
