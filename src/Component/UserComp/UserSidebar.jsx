import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Avatar, Dropdown, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  KeyOutlined
} from "@ant-design/icons";
// import { UserContext } from "../../Context/UserContext";
import userInterceptor from "../../Api/userInterceptor.js";
import logo from "../../assets/logo.png";
const { Header, Sider, Content } = Layout;
import VerifyAlert from '../../Component/PublicCom/VerifyAlert'
const UserSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [verify, setIsVerified] = useState(localStorage.getItem("isVerified") === "true");
  // const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const currentPath = location.pathname.split("/")[2];
    setSelectedKey(currentPath || "dashboard");
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      message.loading("Logging out...", 0); 
  
      // console.log("Logging out...");
      const response = await userInterceptor.get(`/users/logout`, { withCredentials: true });
      // console.log("Logout Response:", response);
  
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem('isVerified');
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
      message.destroy(); // Remove loading message
      message.success("Logged out successfully!"); // Show success message
      navigate("/login");
    } catch (error) {
      message.destroy(); 
      console.error("Logout Error:", error.response?.data.message);
      message.error(error.response?.data.message || "Failed to logout!");
    }
  };
  
  


  const toggleCollapse = () => setCollapsed(!collapsed);

  // Sidebar menu items
  const menuItems = [
    {
      key: "dashboard",
      label: <Link to="/user/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: "profile",
      label: <Link to="/user/profile">My Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "api",
      label: <Link to="/user/api">API Key</Link>,
      icon: <KeyOutlined />,
    },
    {
      key: "support",
      label: <Link to="/user/contact">Admin Contact</Link>,
      icon: <CustomerServiceOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  // User dropdown menu
  const userMenu = {
    items: [
      {
        key: "profile",
        label: <Link to="/user/profile">Profile</Link>,
      },
      {
        key: "logout",
        label: "Logout",
        danger: true,
        onClick: handleLogout,
      },
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
          {/* {!collapsed && ( */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: "50px", height: "auto", marginRight: "10px" }}
              />
              {/* <p style={{ color: "#fff", fontSize: "20px", fontWeight: "bold", margin: "0" }}>
                User dashboard
              </p> */}
            </div>
          {/* )} */}
        </div>



        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
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
           <p style={{ color: "black", fontSize: "20px", fontWeight: "bold", margin: "0" }}>
                User dashboard
              </p>
          <Dropdown menu={userMenu} placement="bottomRight">
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{ cursor: "pointer", backgroundColor: "#000", color: "#fff" }}
            />
          </Dropdown>
        </Header>

        {/* Content Area */}
        {verify ?
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
          </Content> : <VerifyAlert />}

      </Layout>
    </Layout>
  );
};

export default UserSidebar;
