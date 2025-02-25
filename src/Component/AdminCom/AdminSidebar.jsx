import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Dropdown, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  GlobalOutlined,
  ApartmentOutlined,
  ClusterOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import axios from "axios";
import api from "../../Api/api";

const { Header, Sider, Content } = Layout;

const AdminSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const storeUser = localStorage.getItem("user");
  const user = storeUser ? JSON.parse(storeUser) : null;

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2];
    setSelectedKey(currentPath || "dashboard");
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.get(`${api}/admins/logout`, { withCredentials: true });
      localStorage.removeItem("user");

      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      message.success("Logged out successfully!");
      navigate("/admin/login");
    } catch (error) {
      message.error("Logout error!");
    }
  };

  const toggleCollapse = () => setCollapsed(!collapsed);

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: "manage-admin",
      icon: <UserAddOutlined />,
      label: <Link to="/admin/manage-admin">Manage Admin</Link>,
    },
    {
      key: "manage-country",
      icon: <GlobalOutlined />,
      label: <Link to="/admin/manage-country">Manage Country</Link>,
    },
    {
      key: "manage-province",
      icon: <ApartmentOutlined />,
      label: <Link to="/admin/manage-province">Manage Province</Link>,
    },
    {
      key: "manage-division",
      icon: <ClusterOutlined />,
      label: <Link to="/admin/manage-division">Manage Division</Link>,
    },
    {
      key: "manage-district",
      icon: <EnvironmentOutlined />,
      label: <Link to="/admin/manage-district">Manage District</Link>,
    },
    {
      key: "manage-cities",
      icon: <ApartmentOutlined />,
      label: <Link to="/admin/manage-cities">Manage Cities</Link>,
    },
    {
      key: "manage-area",
      icon: <ClusterOutlined />,
      label: <Link to="/admin/manage-area">Manage Area</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
      danger: true,
    },
  ];

  const userMenu = {
    items: [
      { key: "profile", label: <Link to="/user/profile">Profile</Link> },
      { key: "logout", label: "Logout", danger: true, onClick: handleLogout },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapse}
        width={250}
        style={{
          background: "#000",
          color: "#fff",
          height: "100vh",
          overflow: "auto",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          {!collapsed && (
            <p
              style={{
                color: "#fff",
                marginTop: "10px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Admin panel
            </p>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          style={{ background: "#000", color: "#fff" }}
          items={menuItems}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Fixed Top Navbar */}
        <Header
          style={{
            position: "fixed",
            width: "100%",
            background: "#ffffff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e2e8f0",
            zIndex: 1000,
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={toggleCollapse}
              style={{ fontSize: "18px", cursor: "pointer", color: "#000" }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={toggleCollapse}
              style={{ fontSize: "18px", cursor: "pointer", color: "#000" }}
            />
          )}
          <Dropdown menu={{ items: userMenu.items }} placement="bottomRight">
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{ cursor: "pointer", backgroundColor: "#000", color: "#fff" }}
            />
          </Dropdown>
        </Header>

        {/* Content Area */}
        <Content
          style={{
            margin: "80px 16px 16px",
            padding: "24px",
            background: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminSidebar;
