import React, { useContext } from "react";
import { Card, Row, Col, Typography } from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  SyncOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../Context/UserContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user, loading } = useContext(UserContext);

  const cardData = [
    {
      title: "Daily Requests",
      value: user.data?.dailyRequest.count || 0,
      resetTime: user.data?.dailyRequest.lastReset?.substring(0, 10) || "12:00 AM",
      icon: <ClockCircleOutlined style={{ fontSize: "36px", color: "#2563eb" }} />,
      bgColor: "#eff6ff",
    },
    {
      title: "Monthly Requests",
      value: user.data?.monthlyRequest.count || 0,
      resetTime: user.data?.monthlyRequest.lastReset?.substring(0, 10) || "1st of Every Month",
      icon: <CalendarOutlined style={{ fontSize: "36px", color: "#dc2626" }} />,
      bgColor: "#fee2e2",
    },
    {
      title: "Yearly Requests",
      value: user.data?.yearlyRequest.count || 0,
      resetTime: user.data?.yearlyRequest.lastReset?.substring(0, 10) || "Jan 1st",
      icon: <SyncOutlined style={{ fontSize: "36px", color: "#facc15" }} />,
      bgColor: "#fef9c3",
    },
    {
      title: "Plan",
      value: user.data?.plan || "Free",
      resetTime: "No Reset",
      icon: <CrownOutlined style={{ fontSize: "36px", color: "#10b981" }} />,
      bgColor: "#d1fae5",
    },
  ];

  // ✅ Exclude "Plan" from the chart data since it's not numeric
  const chartData = cardData
    .filter((item) => item.title !== "Plan")
    .map((item) => ({
      name: item.title,
      value: item.value || 0,
    }));

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Cards */}
      <Row gutter={[16, 16]} style={{ maxWidth: "1200px", width: "100%" }}>
        {cardData.map((card, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              loading={loading}
              style={{
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                padding: "16px",
                background: "#ffffff",
              }}
              hoverable
            >
              <Title level={5} style={{ color: "#6b7280", marginBottom: "8px" }}>
                {card.title}
              </Title>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: card.bgColor,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px auto",
                }}
              >
                {card.icon}
              </div>
              <Title level={3} style={{ margin: "10px 0", color: "#333" }}>
                {card.value}
              </Title>
              <Text style={{ color: "#6b7280" }}>Reset Time: {card.resetTime}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ Bar Chart */}
      <Card loading={loading} style={{ width: "100%", marginTop: "40px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#2563eb" }}
            />
            <Bar dataKey="value" fill="#10b981" barSize={40} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;
