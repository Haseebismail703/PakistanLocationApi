import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/PublicPages/Home';
import UserRegister from './Pages/Auth/UserRegister';
import UserLogin from './Pages/Auth/UserLogin';
import ManageAdmin from './Pages/Admin/ManageAdmin';
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App