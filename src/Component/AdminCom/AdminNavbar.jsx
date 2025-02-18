import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { FormOutlined, BarChartOutlined, DashboardOutlined, UserAddOutlined, EditOutlined ,LogoutOutlined} from '@ant-design/icons';
import { Link ,useNavigate} from 'react-router-dom';
const { Header } = Layout;
function Admin_nav() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate()
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  let logout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  const items = [
    {
      label: <Link to="/admin/dashboard">Dashboard</Link>,
      key: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      label: <Link to="/admin/manage-admin">Manage Admin</Link>,
      key: 'Manage Admin',
      icon: <UserAddOutlined />,
    },
    {
      label: <Link to="/admin/manage-country">Manage Country</Link>,
      key: 'Manage Country',
      icon: <FormOutlined />,
    },
    {
      label: <Link to="/admin/manage-province">Manage Province</Link>,
      key: 'Manage Province',
      icon: <FormOutlined />,
    },
    {
      label: <Link to="/admin/manage-division">Manage Division</Link>,
      key: 'Manage Division',
      icon: <FormOutlined />,
    },
    {
      label: <Link to="/admin/manage-district">Manage District</Link>,
      key: 'Manage District',
      icon: <FormOutlined />,
    },
    {
      label: <Link to="/admin/manage-cities">Manage Cities</Link>,
      key: 'Manage Cities',
      icon: <FormOutlined />,
    },
    {
      label: <Link to="/admin/manage-area">Manage Area</Link>,
      key: 'Manage Area',
      icon: <FormOutlined />,
    },
  ];
  return (
    <div>
      <Header style={{ backgroundColor: '#ffffff', padding: '0 16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', position: 'fixed', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="primary"
            onClick={showDrawer}
            icon={<BarChartOutlined />}
            style={{ marginRight: '16px' }}
          />
          <div style={{ fontSize: '24px', color: '#1890ff' }}>Admin Dashboard</div>
        </div>
      </Header>

      <Drawer
        width={240}
        title="Menu"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          items={items}
        />

        <div style={{ position: 'absolute', bottom: '16px', marginLeft: 40 }}>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            style={{ width: '90%', backgroundColor: 'red' }}
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </Drawer>
      <div style={{ height: '64px' }} />
    </div>
  )
}

export default Admin_nav