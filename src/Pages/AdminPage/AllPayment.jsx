import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Row, Col, message, Tag, Empty } from 'antd';
import adminInterceptor from '../../Api/adminInterceptor.js';
import usePermission from "../../Hooks/usePermission";
const { Option } = Select;

const AllPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [userIdSearch, setUserIdSearch] = useState('');
    const [planFilter, setPlanFilter] = useState('');
    let canRead = usePermission("read-operations");
    const fetchPayments = async () => {
        setLoading(true);
        try {
            const response = await adminInterceptor.get(`/payment/all-payments?limit=0`);


            const paymentData = response.data?.data.map((record, index) => ({
                key: index + 1,
                userName: record?.user?.name || 'N/A',
                userId: record?.user?._id || 'N/A',
                plan: record?.user?.plan || 'Free',
                paymentType: record?.paymentType || 'Unknown',
                createdAt: record?.createdAt?.substring(0, 10) || 'N/A',
                amount: `${record?.amount}$` || '0$',
                status: record?.status || 'pending',
            }));
            console.log(paymentData);
            setPayments(paymentData);
        } catch (error) {
            message.error('Failed to fetch payment data.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPayments();
    }, []);

    const filteredPayments = payments.filter((record) =>
        (record.userName.toLowerCase().includes(userSearch.toLowerCase()) || !userSearch) &&
        (record.userId.includes(userIdSearch) || !userIdSearch) &&
        (planFilter ? record.plan === planFilter : true)
    );

    const columns = [
        {
            title: "No",
            dataIndex: "key",
            key: "key",
            render: (_, record) => (
                <>
                    <span>
                        {canRead ? record.key : "_"}
                    </span>
                </>
            ),
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
            render: (_, record) => (
                <>
                    <span>
                        {canRead ? record.userName : "_"}
                    </span>
                </>
            ),
        },
        {
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
            render: (_, record) => (
                <>
                    <span>
                        {canRead ? record.userId : "_"}
                    </span>
                </>
            ),
        },
        {
            title: "Plan",
            dataIndex: "plan",
            key: "plan",
            render: (plan) => (
                <Tag color={canRead ? (plan === 'Paid' ? 'gold' : 'blue') : 'gray'}>
                    {canRead ? plan : "_"}
                </Tag>
            ),
        },
        {
            title: "Payment Type",
            dataIndex: "paymentType",
            key: "paymentType",
            render: (_, record) => (
                <>
                    <span>
                        {canRead ? record.paymentType : "_"}
                    </span>
                </>
            ),
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_, record) => (
                <>
                    <span>
                        {canRead ? record.createdAt : "_"}
                    </span>
                </>
            ),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (_, record) => (
                <>
                    <span>
                        {canRead ? record.amount : "_"}
                    </span>
                </>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={canRead ? (status === 'Complete' ? 'green' : status === 'Incomplete' ? 'red' : 'orange') : 'gray'}>
                    {canRead ? status : "_"}
                </Tag>
            ),
        },
    ];

    return (
        <div>
            <center>
                <h1 style={{ fontSize: "24px", margin: 10 }}>All Payments</h1>
            </center>
            <div style={{ padding: '20px' }}>
                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col xs={24} sm={12} md={8}>
                        <Input
                            placeholder="Search User Name"
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Input
                            placeholder="Search User ID"
                            value={userIdSearch}
                            onChange={(e) => setUserIdSearch(e.target.value)}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Select
                            placeholder="Select Plan"
                            onChange={(value) => setPlanFilter(value)}
                            style={{ width: '100%' }}
                            allowClear
                        >
                            <Option value="">All</Option>
                            <Option value="Free">Free</Option>
                            <Option value="Paid">Paid</Option>
                        </Select>
                    </Col>
                </Row>
                <Table
                    dataSource={filteredPayments}
                    columns={columns}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    bordered
                    style={{ width: '100%' }}
                    scroll={{ "x": "100%" }}
                />
            </div>
        </div>
    );
};

export default AllPayments;
