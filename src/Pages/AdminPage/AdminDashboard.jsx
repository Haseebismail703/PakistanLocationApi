import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Typography, Spin } from "antd";
import { UsergroupAddOutlined, UserSwitchOutlined, IdcardOutlined, CrownOutlined } from "@ant-design/icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from '../../Api/api';

const { Title, Text } = Typography;

function Home() {
  const [userData, setUserData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [freePlan, setFreePlan] = useState(0);
  const [paidPlan, setPaidPlan] = useState(0);
  const [loading, setLoading] = useState(true);

  const storeAdmin = localStorage.getItem("admin");
  const getAdmin = storeAdmin ? JSON.parse(storeAdmin) : null;

  useEffect(() => {
    const fetchAdminsData = async () => {
      try {
        const [adminsResponse, usersResponse] = await Promise.all([
          axios.get(`${api}/admins/get-admins`, {
            headers: { Authorization: `Bearer ${getAdmin?.accessToken}` },
          }),
          axios.get(`${api}/admins/get-users`, {
            headers: { Authorization: `Bearer ${getAdmin?.accessToken}` },
          }),
        ]);

        const user = usersResponse.data.data;
        setUserData(user);
        setFreePlan(user.filter((item) => item.plan === "free").length);
        setPaidPlan(user.filter((item) => item.plan === "pro").length);
        setAdminData(adminsResponse?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminsData();
  }, []);

  const graphData = [
    { name: "Users", value: userData?.length || 0 },
    { name: "Admins", value: adminData?.length || 0 },
    { name: "Free Users", value: freePlan },
    { name: "Paid Users", value: paidPlan }
  ];

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <Row justify="center" style={{ marginTop: "50px" }}>
          <Spin size="large" />
        </Row>
      ) : (
        <>
          <Row gutter={[16, 16]} justify="center" style={{ flexWrap: "wrap" }}>
            {[ 
              { icon: <UsergroupAddOutlined />, color: "#1890ff", title: "Total Users", value: userData?.length || 0 },
              { icon: <UserSwitchOutlined />, color: "#52c41a", title: "Total Admins", value: adminData?.length || 0 },
              { icon: <IdcardOutlined />, color: "#faad14", title: "Free Users", value: freePlan },
              { icon: <CrownOutlined />, color: "#eb2f96", title: "Paid Users", value: paidPlan }
            ].map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card hoverable style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center" }}>
                  <div style={{ fontSize: "40px", color: item.color, marginBottom: "10px" }}>
                    {item.icon}
                  </div>
                  <Title level={4} style={{ margin: 0 }}>{item.title}</Title>
                  <Text strong style={{ fontSize: "20px" }}>{item.value}</Text>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Bar Chart Section */}
                <ResponsiveContainer style={{marginTop : 80}} width="100%" height={300}>
                  <BarChart data={graphData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1890ff" barSize={40} radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default Home;
