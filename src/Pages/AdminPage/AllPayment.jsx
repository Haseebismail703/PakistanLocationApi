import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Row, Col, message, Tag, Pagination } from 'antd';
import adminInterceptor from '../../Api/adminInterceptor.js';
import { useNavigate, useSearchParams } from "react-router-dom";
const { Option } = Select;

const AllPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [planFilter, setPlanFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [totalItems, setTotalItems] = useState(0);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get currentPage and pageSize from URL or default to 1 and 10
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("size")) || 10;

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                const response = await adminInterceptor.get(`/payment/all-payments?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}`);
                console.log(response.data.data);

                const paymentData = response.data?.data.map((record, index) => ({
                    key: index.toString(),
                    userName: record?.user?.name || 'N/A',
                    userId: record?.user?._id || 'N/A',
                    plan: record?.user?.plan || 'Free', // Default to 'Free' if plan is missing
                    paymentType: record?.paymentType || 'Unknown',
                    createdAt: record?.createdAt?.substring(0, 10) || 'N/A',
                    amount: `${record?.amount}$` || '0$',
                    status: record?.status || 'pending',
                }));

                setPayments(paymentData);
                setTotalItems(paymentData?.total || 1000);
            } catch (error) {
                message.error('Failed to fetch payment data.');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [currentPage, pageSize]);

    // **Filtering Logic**
    const filteredPayments = payments.filter((record) =>
        (record.userName.toLowerCase().includes(searchText.toLowerCase()) ||
            record.userId.includes(searchText) || !searchText) &&
        (planFilter ? record.plan === planFilter : true) &&
        (statusFilter ? record.status.toLowerCase() === statusFilter.toLowerCase() : true)
    );

    return (
        <>
            <center>
                <h1 style={{ fontSize: "24px", margin: 10 }}>All Payments</h1>
            </center>
            <div style={{ padding: '20px' }}>

                <Row gutter={16} style={{ marginBottom: 16 }}>
                    {/* Search by User Name or ID */}
                    <Col xs={24} sm={12} md={8}>
                        <Input
                            placeholder="Search User Name or ID"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>

                    {/* Filter by Plan (Free / Paid) */}
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

                    {/* Filter by Status (Complete / Incomplete) */}
                    <Col xs={24} sm={12} md={8}>
                        <Select
                            placeholder="Select Status"
                            onChange={(value) => setStatusFilter(value)}
                            style={{ width: '100%' }}
                            allowClear
                        >
                            <Option value="">All</Option>
                            <Option value="Complete">Complete</Option>
                            <Option value="Incomplete">Incomplete</Option>
                        </Select>
                    </Col>
                </Row>

                {/* Payment Table */}
                <Table
                    dataSource={filteredPayments}
                    loading={loading}
                    pagination={false}
                    bordered
                    style={{ width: '100%' }}
                    scroll={{"x" : "100%"}}
                >
                    <Pagination
                        current={currentPage}
                        total={totalItems}
                        pageSize={pageSize}
                        onChange={(page, size) => {
                            if (page < currentPage || payments.length === pageSize) {
                                navigate(`?page=${page}&size=${size}`);
                            } else {
                                message.warning("No more data to display.");
                            }
                        }}
                        showSizeChanger
                        pageSizeOptions={["10", "20", "50", "100", totalItems.toString()]}
                        className="responsive-pagination"
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        hideOnSinglePage
                        showLessItems
                        simple={window.innerWidth < 768} // ✅ Compact pagination on small screens
                    />
                    <Table.Column title="User Name" dataIndex="userName" key="userName" />
                    <Table.Column title="User ID" dataIndex="userId" key="userId" />
                    <Table.Column
                        title="Plan"
                        dataIndex="plan"
                        key="plan"
                        render={(plan) => (
                            <Tag color={plan === 'Paid' ? 'gold' : 'blue'}>
                                {plan}
                            </Tag>
                        )}
                    />
                    <Table.Column title="Payment Type" dataIndex="paymentType" key="paymentType" />
                    <Table.Column title="Date" dataIndex="createdAt" key="createdAt" />
                    <Table.Column title="Amount" dataIndex="amount" key="amount" />
                    <Table.Column
                        title="Status"
                        dataIndex="status"
                        key="status"
                        render={(status) => (
                            <Tag color={status === 'Complete' ? 'green' : status === 'Incomplete' ? 'red' : 'orange'}>
                                {status}
                            </Tag>
                        )}
                    />
                </Table>
            </div>
        </>
    );
};

export default AllPayments;
