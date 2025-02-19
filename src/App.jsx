import React from 'react'
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
           {/* Admin route */}
          <Route path="/admin/manage-admin" element={<ManageAdmin/>} />
          <Route path="/admin/manage-country" element={<ManageCountry/>} />
          <Route path="/admin/manage-province" element={<ManageProvince/>} />
          <Route path="/admin/manage-division" element={<ManageDivision/>} />
          <Route path="/admin/manage-cities" element={<ManageCity/>} />
         <Route path='/admin/manage-district' element={<ManageDistrics/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App