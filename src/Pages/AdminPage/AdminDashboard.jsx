import React, { useState, useEffect } from "react";
import { Card, Col, Row, Typography, Spin } from "antd";
import {
  UsergroupAddOutlined,
  UserSwitchOutlined,
  IdcardOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import adminInterceptor from "../../Api/adminInterceptor";

const { Title, Text } = Typography;

function Home() {
  const [userData, setUserData] = useState(0);
  const [adminData, setAdminData] = useState(0);
  const [freePlan, setFreePlan] = useState(0);
  const [paidPlan, setPaidPlan] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminsData = async () => {
      try {
        const adminsResponse = await adminInterceptor.get(`/admins/get-admins`);
        setAdminData(adminsResponse.data.data?.totalAdmins || 0);
      } catch (error) {
        console.error("Error fetching admins data:", error);
      }
    };

    const fetchUsersData = async () => {
      try {
        const usersResponse = await adminInterceptor.get(`/admins/get-users`);
        const users = usersResponse.data.data?.users || [];
        setUserData(users.length);
        setFreePlan(users.filter((item) => item.plan === "free").length);
        setPaidPlan(users.filter((item) => item.plan === "paid").length);
        // console.log(usersResponse)
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchAdminsData(), fetchUsersData()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const graphData = [
    { name: "Users", value: userData },
    { name: "Admins", value: adminData },
    { name: "Free Users", value: freePlan },
    { name: "Paid Users", value: paidPlan },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <>
        <Row
          gutter={[16, 16]}
          justify="center"
          style={{ flexWrap: "wrap", marginBottom: "30px" }}
        >
          {[
            {
              icon: <UsergroupAddOutlined />,
              color: "#1890ff",
              title: "Total Users",
              value: userData,
            },
            {
              icon: <UserSwitchOutlined />,
              color: "#52c41a",
              title: "Total Admins",
              value: adminData,
            },
            {
              icon: <IdcardOutlined />,
              color: "#faad14",
              title: "Free Users",
              value: freePlan,
            },
            {
              icon: <CrownOutlined />,
              color: "#eb2f96",
              title: "Paid Users",
              value: paidPlan,
            },
          ].map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                loading={loading}
                hoverable
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    color: item.color,
                    marginBottom: "10px",
                  }}
                >
                  {item.icon}
                </div>
                <Title level={4} style={{ margin: 0 }}>
                  {item.title}
                </Title>
                <Text strong style={{ fontSize: "20px" }}>
                  {item.value}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>

        <Card loading={loading} style={{ marginTop: "40px", padding: "0 20px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#1890ff"
                barSize={50}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </>
    </div>
  );
}

export default Home;
