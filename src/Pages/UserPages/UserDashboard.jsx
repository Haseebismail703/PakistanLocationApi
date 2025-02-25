import React, { useState } from "react";
import { Card, Row, Col, Typography } from "antd";
import {
  DollarCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

const { Title } = Typography;

const Dashboard = () => {
  const [data] = useState({
    todayRequest: 53000,
    remainingRequest: 3200,
    plan: "Pro",
    dayLeft: 25,
  });

  const cardData = [
    {
      title: "Today Request",
      value: data.todayRequest.toLocaleString(),
      icon: <DollarCircleOutlined style={{ fontSize: "32px", color: "#2563eb" }} />,
      bgColor: "#eff6ff",
    },
    {
      title: "Remaining Request",
      value: data.remainingRequest.toLocaleString(),
      icon: <ClockCircleOutlined style={{ fontSize: "32px", color: "#dc2626" }} />,
      bgColor: "#fee2e2",
    },
    {
      title: "Plan",
      value: data.plan,
      icon: <StarOutlined style={{ fontSize: "32px", color: "#facc15" }} />,
      bgColor: "#fef9c3",
    },
    {
      title: "Days Left",
      value: `${data.dayLeft} Days`,
      icon: <CalendarOutlined style={{ fontSize: "32px", color: "#10b981" }} />,
      bgColor: "#d1fae5",
    },
  ];

  const chartData = cardData.slice(0, 4).map((card) => ({
    name: card.title,
    value: parseInt(card.value.replace(/,/g, "")) || 0,
    color: card.icon.props.style.color,
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
      <Row gutter={[16, 16]} style={{ maxWidth: "1200px", width: "100%" }}>
        {cardData.map((card, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              style={{
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
              hoverable
            >
              <Title level={5} style={{ color: "#6b7280" }}>
                {card.title}
              </Title>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Title level={3} style={{ margin: 0 }}>
                  {card.value}
                </Title>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: card.bgColor,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {card.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chart Section */}
      <Row style={{ marginTop: "24px", width: "100%", maxWidth: "1200px" }}>
        <Col xs={24}>
          <Card title="Requests & Plans Overview" style={{ borderRadius: "12px" }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} barSize={50}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Bar key={index} dataKey="value" fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
