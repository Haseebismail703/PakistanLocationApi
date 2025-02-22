import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button, Switch } from 'antd';
import { FormOutlined, BarChartOutlined, DashboardOutlined, UserAddOutlined, EditOutlined, LogoutOutlined, BulbOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

function Admin_nav() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const items = [
    { label: <Link to="/admin/dashboard">Dashboard</Link>, key: 'Dashboard', icon: <DashboardOutlined /> },
    { label: <Link to="/admin/manage-admin">Manage Admin</Link>, key: 'Manage Admin', icon: <UserAddOutlined /> },
    { label: <Link to="/admin/manage-country">Manage Country</Link>, key: 'Manage Country', icon: <FormOutlined /> },
    { label: <Link to="/admin/manage-province">Manage Province</Link>, key: 'Manage Province', icon: <FormOutlined /> },
    { label: <Link to="/admin/manage-division">Manage Division</Link>, key: 'Manage Division', icon: <FormOutlined /> },
    { label: <Link to="/admin/manage-district">Manage District</Link>, key: 'Manage District', icon: <FormOutlined /> },
    { label: <Link to="/admin/manage-cities">Manage Cities</Link>, key: 'Manage Cities', icon: <FormOutlined /> },
    { label: <Link to="/admin/manage-area">Manage Area</Link>, key: 'Manage Area', icon: <FormOutlined /> },
  ];

  return (
    <div>
      <Header className="bg-base-100 shadow-lg fixed w-full z-10 flex justify-between items-center px-4">
        <div className="flex items-center">
          {/* <div className="text-xl text-primary">Admin Dashboard</div> */}
        </div>
        {/* Dark Mode Toggle Button */}
        <Switch checked={theme === "dark"} onChange={toggleTheme} checkedChildren="🌙" unCheckedChildren="☀️" />
      </Header>
      <div className="h-16" />
    </div>
  );
}

export default Admin_nav;
