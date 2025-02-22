import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserAddOutlined,
  GlobalOutlined,
  ApartmentOutlined,
  ClusterOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import AdminNavbar from "../../Component/AdminCom/AdminNavbar";

const { Header, Sider, Content } = Layout;

const items = [
  { label: "Dashboard", key: "Dashboard", path: "/admin/dashboard", icon: <DashboardOutlined /> },
  { label: "Manage Admin", key: "ManageAdmin", path: "/admin/manage-admin", icon: <UserAddOutlined /> },
  { label: "Manage Country", key: "ManageCountry", path: "/admin/manage-country", icon: <GlobalOutlined /> },
  { label: "Manage Province", key: "ManageProvince", path: "/admin/manage-province", icon: <ApartmentOutlined /> },
  { label: "Manage Division", key: "ManageDivision", path: "/admin/manage-division", icon: <ClusterOutlined /> },
  { label: "Manage District", key: "ManageDistrict", path: "/admin/manage-district", icon: <EnvironmentOutlined /> },
  { label: "Manage Cities", key: "ManageCities", path: "/admin/manage-cities", icon: <ApartmentOutlined /> },
  { label: "Manage Area", key: "ManageArea", path: "/admin/manage-area", icon: <ClusterOutlined /> },
];

const WrapperLayout = ({ children }) => {
  const location = useLocation(); 
  
  const activeKey = items.find(item => item.path === location.pathname)?.key || "Dashboard";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} style={{ background: "#001529", color: "#fff" }} collapsible>
        <div style={{ color: "#fff", fontSize: "18px", textAlign: "center", padding: "10px 0" }}>
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]} 
          items={items.map(({ label, key, path, icon }) => ({
            key,
            icon,
            label: <Link to={path}>{label}</Link>
          }))}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <AdminNavbar />
        </Header>

        <Content style={{ margin: "16px", padding: "24px", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default WrapperLayout;
