import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Typography } from "antd";
import { DollarCircleOutlined, ClockCircleOutlined, StarOutlined, CalendarOutlined } from "@ant-design/icons";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import api from "../../Api/api";

const { Title, Text } = Typography;

const Dashboard = () => {
    const [data, setData] = useState({
        sales: 53000,
        users: 3200,
        newClients: 1200,
        orders: 13200,
        salesGrowth: 30,
        usersGrowth: 20,
        clientsGrowth: -20,
        ordersGrowth: 10,
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const [userData, setUserData] = useState([]);
    const [loader, setLoader] = useState(false);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     setLoader(true)
    //     try {
    //       const response = await axios.get(`${api}/admins/get-users`, {
    //         headers: {
    //           'Authorization': `Bearer ${user.accessToken}`
    //         }
    //       });
    //       setLoader(false)
    //       setUserData(response.data.data);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };
    //   fetchData();
    // }, []);

    const cardData = [
        {
            title: "Today request",
            value: `$${data.sales.toLocaleString()}`,
            growth: data.salesGrowth,
            icon: <DollarCircleOutlined style={{ fontSize: "32px", color: "#3b82f6" }} />,
        },
        {
            title: "Pending request",
            value: data.users.toLocaleString(),
            growth: data.usersGrowth,
            icon: <ClockCircleOutlined style={{ fontSize: "32px", color: "#3b82f6" }} />,
        },
        {
            title: "Plan",
            value: `+${data.newClients.toLocaleString()}`,
            growth: data.clientsGrowth,
            icon: <StarOutlined style={{ fontSize: "32px", color: "#3b82f6" }} />,
        },
        {
            title: "Days left",
            value: `${data.orders.toLocaleString()} Days`,
            growth: data.ordersGrowth,
            icon: <CalendarOutlined style={{ fontSize: "32px", color: "#3b82f6" }} />,
        },
    ];

    const chartData = [
        { name: "Requests", value: data.sales, color: "#3b82f6" },
        { name: "Pending", value: data.users, color: "#ef4444" },
        { name: "Plans", value: data.newClients, color: "#10b981" },
        { name: "Days Left", value: data.orders, color: "#f59e0b" },
    ];

    return (
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Row gutter={[24, 24]} style={{ maxWidth: "1200px", width: "100%" }}>
                {cardData.map((card, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Card
                            bordered={false}
                            style={{ textAlign: "center", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                        >
                            <Title level={5} style={{ color: "#888" }}>{card.title}</Title>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Title level={3}>{card.value}</Title>
                                <div
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "#E5F0FF",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {card.icon}
                                </div>
                            </div>
                            <Text style={{ color: card.growth >= 0 ? "#10b981" : "#ef4444" }}>
                                {card.growth >= 0 ? `+${card.growth}%` : `${card.growth}%`}
                            </Text>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/* 🟡 Graph Section */}
            <Row style={{ marginTop: "24px", width: "100%", maxWidth: "1200px" }}>
                <Col xs={24}>
                    <Card title="Requests & Plans Overview" bordered={false}>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                {chartData.map((entry, index) => (
                                    <Bar key={index} dataKey="value" fill={entry.color} barSize={50} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;