import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Row, Col, message, Tag, Empty, Card } from 'antd';
import adminInterceptor from '../../Api/adminInterceptor.js';
import usePermission from "../../Hooks/usePermission";

const { Option } = Select;

const AllPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [userIdSearch, setUserIdSearch] = useState('');
    const [planFilter, setPlanFilter] = useState('');

    const canRead = usePermission("read-operations");

    useEffect(() => {
        if (canRead) fetchPayments();
    }, [canRead]);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const { data } = await adminInterceptor.get(`/payment/all-payments?limit=0`);
            const paymentData = data?.data.map((record, index) => ({
                key: index + 1,
                userName: record?.user?.name || 'N/A',
                userId: record?.user?._id || 'N/A',
                plan: record?.user?.plan || 'Free',
                paymentType: record?.paymentType || 'Unknown',
                createdAt: record?.createdAt?.substring(0, 10) || 'N/A',
                amount: `${record?.amount || 0}$`,
                status: record?.status || 'pending',
            }));
            setPayments(paymentData);
        } catch (error) {
            message.error('Failed to fetch payment data.');
        } finally {
            setLoading(false);
        }
    };

    const filteredPayments = payments.filter(record =>
        (record.userName.toLowerCase().includes(userSearch.toLowerCase()) || !userSearch) &&
        (record.userId.includes(userIdSearch) || !userIdSearch) &&
        (planFilter ? record.plan === planFilter : true)
    );

    const columns = [
        { title: "No", dataIndex: "key", key: "key" },
        { title: "User Name", dataIndex: "userName", key: "userName" },
        { title: "User ID", dataIndex: "userId", key: "userId" },
        {
            title: "Plan", dataIndex: "plan", key: "plan",
            render: (plan) => <Tag color={plan === 'Paid' ? 'gold' : 'blue'}>{plan}</Tag>
        },
        { title: "Payment Type", dataIndex: "paymentType", key: "paymentType" },
        { title: "Date", dataIndex: "createdAt", key: "createdAt" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
        {
            title: "Status", dataIndex: "status", key: "status",
            render: (status) => (
                <Tag color={status === 'Complete' ? 'green' : status === 'Incomplete' ? 'red' : 'orange'}>
                    {status}
                </Tag>
            )
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <center>
                <h1 style={{ fontSize: "24px", marginBottom: 20 }}>All Payments</h1>
            </center>

            {/* ========== Filters Section ========== */}
            {canRead && 
            <Card  style={{ marginBottom: 20 }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <Input
                            placeholder="Search by User Name"
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Input
                            placeholder="Search by User ID"
                            value={userIdSearch}
                            onChange={(e) => setUserIdSearch(e.target.value)}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Select
                            placeholder="Filter by Plan"
                            value={planFilter}
                            onChange={value => setPlanFilter(value)}
                            allowClear
                            style={{ width: "100%" }}
                        >
                            <Option value="">All</Option>
                            <Option value="Free">Free</Option>
                            <Option value="Paid">Paid</Option>
                        </Select>
                    </Col>
                </Row>
            </Card>}

            {/* ========== Table Section ========== */}
            {canRead ? (
                <Table
                    columns={columns}
                    dataSource={filteredPayments}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    bordered
                    scroll={{ x: "100%" }}
                />
            ) : (
                <Empty description="You don't have permission to view this data" />
            )}
        </div>
    );
};

export default AllPayments;
