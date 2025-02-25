import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/PublicPages/Home';
import UserRegister from './Pages/AuthPage/UserRegister';
import UserLogin from './Pages/AuthPage/UserLogin';
import ManageAdmin from './Pages/AdminPage/ManageAdmin';
import ManageCountry from './Pages/AdminPage/ManageCountry';
import ManageProvince from './Pages/AdminPage/ManageProvince';
import ManageDivision from './Pages/AdminPage/ManageDivision';
import ManageCity from './Pages/AdminPage/ManageCity';
import ManageDistrics from './Pages/AdminPage/ManageDistrics';
import ManageArea from './Pages/AdminPage/ManageArea';
import AdminDashboard from './Pages/AdminPage/AdminDashboard';
import AdminSidebar from './Component/AdminCom/AdminSidebar'; 
import AdminLogin from './Pages/AuthPage/AdminLogin';
import UserSidebar from './Component/UserComp/UserSidebar'
import UserForm from './Pages/PublicPages/UserForm'
import Profile from './Pages/UserPages/Profile'
import GenerateApiKey from './Pages/UserPages/ApiKey';
import UserDashboard from './Pages/UserPages/UserDashboard';
import UserContact from './Pages/UserPages/Contact';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No Layout) */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/form" element={<UserForm />} />

        {/* Admin Routes (Wrapped in Layout) */}
        <Route path="/admin/*" element={<AdminSidebar>
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-admin" element={<ManageAdmin />} />
            <Route path="manage-country" element={<ManageCountry />} />
            <Route path="manage-province" element={<ManageProvince />} />
            <Route path="manage-division" element={<ManageDivision />} />
            <Route path="manage-cities" element={<ManageCity />} />
            <Route path="manage-district" element={<ManageDistrics />} />
            <Route path="manage-area" element={<ManageArea />} />
          </Routes>
        </AdminSidebar>} />

        <Route path="/user/*" element={<UserSidebar>
          <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="api" element={<GenerateApiKey />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="contact" element={<UserContact />} />

          </Routes>
        </UserSidebar>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
