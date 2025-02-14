import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Apidoc from './Pages/Apidoc/Apidoc';
import Admin from './Pages/AdminPages/AdminDashboard';
import AdminLogin from './Pages/AdminPages/AdminLogin';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apidoc" element={<Apidoc />} />
          {/* Admin Route */}
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
