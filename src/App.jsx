import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/PublicPages/Home';
import UserRegister from './Pages/Auth/UserRegister';
import UserLogin from './Pages/Auth/UserLogin';
import ManageAdmin from './Pages/Admin/ManageAdmin';
import ManageCountry from './Pages/Admin/ManageCountry';
import ManageProvince from './Pages/Admin/ManageProvince';
import ManageDivision from './Pages/Admin/ManageDivision';
import ManageCity from './Pages/Admin/ManageCity';
import ManageDistrics from './Pages/Admin/ManageDistrics';
import ManageArea from './Pages/Admin/ManageArea';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import LayoutWrapper from './Component/AdminCom/WrapperLayout'; // Import LayoutWrapper

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (No Layout) */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />

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
