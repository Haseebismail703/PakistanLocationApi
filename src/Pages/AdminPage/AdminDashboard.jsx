import React, { useState } from "react";
import { Layout, Card, Row, Col, Table, Switch } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const { Content } = Layout;

// Default Data
const stats = [
  { title: "Total Requests", value: 5000 },
  { title: "Active Users", value: 1200 },
  { title: "Total Locations", value: 800 },
];

const requestData = [
  { date: "Feb 14", requests: 100 },
  { date: "Feb 15", requests: 250 },
  { date: "Feb 16", requests: 400 },
  { date: "Feb 17", requests: 600 },
];

const cityData = [
  { city: "Karachi", queries: 300 },
  { city: "Lahore", queries: 250 },
  { city: "Islamabad", queries: 200 },
  { city: "Peshawar", queries: 180 },
];

const users = [
  { key: "1", name: "John Doe", email: "john@example.com", apiCalls: 300 },
  { key: "2", name: "Alice Smith", email: "alice@example.com", apiCalls: 150 },
];

const locations = [
  { key: "1", name: "Karachi", coordinates: "24.8607° N, 67.0011° E" },
  { key: "2", name: "Lahore", coordinates: "31.5497° N, 74.3436° E" },
];

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh", background: darkMode ? "#001529" : "#f0f2f5" }}>
      <Content style={{ padding: "20px" }}>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          style={{ marginBottom: 20 }}
        />
        
        {/* Stats Cards */}
        <Row gutter={16}>
          {stats.map((stat, index) => (
            <Col span={8} key={index}>
              <Card title={stat.title} bordered style={{ textAlign: "center" }}>
                <h2>{stat.value}</h2>
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Charts */}
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Card title="API Requests Over Time">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={requestData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Most Queried Cities">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cityData}>
                  <XAxis dataKey="city" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="queries" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        
        {/* Tables */}
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Card title="Users">
              <Table columns={[{ title: "Name", dataIndex: "name" }, { title: "Email", dataIndex: "email" }, { title: "API Calls", dataIndex: "apiCalls" }]} dataSource={users} pagination={false} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Locations">
              <Table columns={[{ title: "Name", dataIndex: "name" }, { title: "Coordinates", dataIndex: "coordinates" }]} dataSource={locations} pagination={false} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
