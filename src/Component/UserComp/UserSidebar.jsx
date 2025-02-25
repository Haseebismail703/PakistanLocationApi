import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Dropdown, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashboardOutlined, UserOutlined, ShoppingCartOutlined, CustomerServiceOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import axios from "axios";
import api from "../../Api/api";

const { Header, Sider, Content } = Layout;

const UserSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const navigate = useNavigate();
  const storeUser = localStorage.getItem("user");
  const user = storeUser ? JSON.parse(storeUser) : null;

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2];
    setSelectedKey(currentPath || "dashboard");
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${api}/users/logout`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      localStorage.removeItem("user");
      message.success(response.data.message);
      navigate("/login");
    } catch (error) {
      message.error("Logout error!");
    }
  };

  const toggleCollapse = () => setCollapsed(!collapsed);

  const menuItems = [
    { label: "Dashboard", key: "dashboard", path: "/user/dashboard", icon: <DashboardOutlined /> },
    { label: "My Profile", key: "profile", path: "/user/profile", icon: <UserOutlined /> },
    { label: "API Key", key: "orders", path: "/user/api", icon: <ShoppingCartOutlined /> },
    { label: "Admin Contact", key: "support", path: "/user/contact", icon: <CustomerServiceOutlined /> },
    { label: "Logout", key: "logout", icon: <LogoutOutlined />, danger: true, onClick: handleLogout },
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/user/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" danger onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse} width={250} style={{ background: "#000", color: "#fff", height: "100vh", overflow: "auto", position: "sticky", top: 0, left: 0 }}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          {!collapsed && <p style={{ color: "#fff", marginTop: "10px", fontSize: "20px", fontWeight: "bold" }}>WELCOME {user?.user?.name}</p>}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} style={{ background: "#000", color: "#fff" }}>
          {menuItems.map(({ label, key, path, icon, danger, onClick }) => (
            <Menu.Item key={key} icon={icon} danger={danger} style={{ transition: "0.3s", padding: "12px", color: "#fff" }} onClick={onClick}>
              {path ? <Link to={path} style={{ color: "#fff" }}>{label}</Link> : label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      
      {/* Main Layout */}
      <Layout>
        {/* Fixed Top Navbar */}
        <Header style={{ position: "fixed", width: "100%", background: "#ffffff", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", zIndex: 1000 }}>
          {collapsed ? (
            <MenuUnfoldOutlined onClick={toggleCollapse} style={{ fontSize: "18px", cursor: "pointer", color: "#000" }} />
          ) : (
            <MenuFoldOutlined onClick={toggleCollapse} style={{ fontSize: "18px", cursor: "pointer", color: "#000" }} />
          )}
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Avatar size={40} icon={<UserOutlined />} style={{ cursor: "pointer", backgroundColor: "#000", color: "#fff" }} />
          </Dropdown>
        </Header>
        
        {/* Content Area */}
        <Content style={{ margin: "80px 16px 16px", padding: "24px", background: "#ffffff", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
  
};

export default UserSidebar;