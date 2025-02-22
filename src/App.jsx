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
import LayoutWrapper from './Component/AdminCom/WrapperLayout'; // Import LayoutWrapper
import AdminLogin from './Pages/AuthPage/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No Layout) */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
    
        {/* Admin Routes (Wrapped in Layout) */}
        <Route path="/admin/*" element={<LayoutWrapper> 
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
        </LayoutWrapper>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
