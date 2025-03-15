import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Avatar, Dropdown, message, Switch } from "antd";
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
import adminInterceptor from "../../Api/adminInterceptor";
import logo from "../../assets/logo.png";
import VerifyAlert from "../PublicCom/VerifyAlert";
import { AdminContext } from "../../Context/AdminContext";
const { Header, Sider, Content } = Layout;

const AdminSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const { admin } = useContext(AdminContext);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2];
    setSelectedKey(currentPath || "dashboard");
    document.body.style.backgroundColor =  "#f4f6f8";
  }, [location.pathname, darkMode]);

  const handleLogout = async () => {
    try {
      await adminInterceptor.get(`/admins/logout`, { withCredentials: true });
      localStorage.removeItem("admin");
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      message.success("Logged out successfully!");
      navigate("/admin/login");
    } catch (error) {
      message.error("Logout error!");
    }
  };

  const toggleCollapse = () => setCollapsed(!collapsed);

  const handleDarkModeToggle = (checked) => {
    setDarkMode(checked);
    localStorage.setItem("darkMode", checked);
  };


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
console.log(admin)
  const userMenu = {
    items: [
      { key: "profile", label: <Link to="/user/profile">Profile</Link> },
      { key: "logout", label: "Logout", danger: true, onClick: handleLogout },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor:  "#f4f6f8" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapse}
        width={250}
        style={{
          background: darkMode ? "#333" : "#000",
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
                style={{ width: "50px", height: "auto", marginRight: "15px" }}
              />
              {/* <p style={{ color: "#fff", fontSize: "20px", fontWeight: "bold", margin: "0" }}>
                Admin Panel
              </p> */}
            </div>
          {/* )} */}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          style={{ background: "transparent", color: "#fff" }}
          items={menuItems}
        />
      </Sider>

      <Layout>
        
        <Header
          style={{
            position: "fixed",
            width: "100%",
            background: darkMode ? "#333" : "#ffffff",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e2e8f0",
            zIndex: 1000,
          }}
        > 
          {collapsed ? (
            <MenuUnfoldOutlined onClick={toggleCollapse} style={{ fontSize: "18px", cursor: "pointer", color: darkMode ? "#fff" : "#000" }} />
          ) : (
            <MenuFoldOutlined onClick={toggleCollapse} style={{ fontSize: "18px", cursor: "pointer", color: darkMode ? "#fff" : "#000" }} />
          )}
           <p style={{ color: "black", fontSize: "20px", fontWeight: "bold", margin: "0" }}>
                Admin Panel
              </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <Switch
              checked={darkMode}
              onChange={handleDarkModeToggle}
              checkedChildren="Dark"
              unCheckedChildren="Light"
              style={{ marginRight: 40 }}
            /> */}
            
            <Dropdown menu={{ items: userMenu.items }} placement="bottomRight">
              <Avatar
                size={40}
                icon={<UserOutlined />}
                style={{ cursor: "pointer", backgroundColor: "#000", color: "#fff", marginLeft: "10px" }}
              />
            </Dropdown>
          </div>
        </Header>
        {admin?.data?.isVerified === true ?
          <Content
            style={{
              margin: "80px 16px 16px",
              padding: "24px",
              background: darkMode ? "#333" : "#ffffff",
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

export default AdminSidebar;
