import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/PublicPages/Home';
import UserRegister from './Pages/Auth/UserRegister';
import UserLogin from './Pages/Auth/UserLogin';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App