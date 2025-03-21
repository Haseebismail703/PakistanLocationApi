import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spin } from "antd";
import DivisionTable from "./Pages/PublicPages/Tab";
// Auth pages
const UserRegister = lazy(() => import("./Pages/AuthPage/UserRegister"));
const UserLogin = lazy(() => import("./Pages/AuthPage/UserLogin"));
const AdminLogin = lazy(() => import("./Pages/AuthPage/AdminLogin"));

// public pages 
const Home = lazy(() => import("./Pages/PublicPages/Home"));
const AdminForm = lazy(() => import("./Pages/AdminPage/AdminForm"));
const NotFound = lazy(() => import("./Pages/PublicPages/NotFound"));
const AdminForgotPassword = lazy(() => import("./Pages/PublicPages/AdminForgotPass"));
const AdminResetPassword = lazy(() => import("./Pages/PublicPages/AdminResetPass"));
const UserResetPass = lazy(() => import("./Pages/PublicPages/UserResetPass"));
const UserForgotPass = lazy(() => import("./Pages/PublicPages/UserForgotPass"));
const UserVerifyEmail = lazy(() => import("./Pages/UserPages/UserVerifyEmail"));
const AdminVerifyEmail = lazy(() => import("./Pages/AdminPage/AdminVerifyEmail"));

// Admin Pages
const AdminSidebar = lazy(() => import("./Component/AdminCom/AdminSidebar"));
const AdminDashboard = lazy(() => import("./Pages/AdminPage/AdminDashboard"));
const ManageAdmin = lazy(() => import("./Pages/AdminPage/ManageAdmin"));
const ManageCountry = lazy(() => import("./Pages/AdminPage/ManageCountry"));
const ManageProvince = lazy(() => import("./Pages/AdminPage/ManageProvince"));
const ManageDivision = lazy(() => import("./Pages/AdminPage/ManageDivision"));
const ManageCity = lazy(() => import("./Pages/AdminPage/ManageCity"));
const ManageDistrics = lazy(() => import("./Pages/AdminPage/ManageDistrics"));
const ManageArea = lazy(() => import("./Pages/AdminPage/ManageArea"));
const AdminPageNotFound = lazy(() => import("./Pages/AdminPage/AdminPageNotFound"));
const AllPayments = lazy(() => import("./Pages/AdminPage/AllPayment"));

// User Pages
const UserSidebar = lazy(() => import("./Component/UserComp/UserSidebar"));
const Profile = lazy(() => import("./Pages/UserPages/Profile"));
const GenerateApiKey = lazy(() => import("./Pages/UserPages/ApiKey"));
const UserDashboard = lazy(() => import("./Pages/UserPages/UserDashboard"));
const UserContact = lazy(() => import("./Pages/UserPages/Contact"));
const Payment = lazy(() => import("./Pages/UserPages/Payment"));
const UserPageNotFound = lazy(() => import("./Pages/UserPages/UserPageNotFound"));
//context user and admin
import UserProvider from "./Context/UserContext";
import AdminProvider from "./Context/AdminContext";

// Authentication Check
const isAdminAuthenticated = () => {
  const admin = localStorage.getItem("admin");
  return admin ? JSON.parse(admin) : null;
};

const isUserAuthenticated = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Protected Routes
const AdminProtectedRoute = ({ children }) => {
  return isAdminAuthenticated() ?<AdminProvider>{ children }</AdminProvider>  : <Navigate to="/" />;
};

const UserProtectedRoute = ({ children }) => {
  return isUserAuthenticated() ?<UserProvider>{children}</UserProvider> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><Spin size="large" /></div>}>
        <Routes>
          {/* Public Routes (No Layout) */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin forgot , verify email and reset Route */}
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admins/reset-password/:token" element={<AdminResetPassword />} />
          <Route path="/admins/verify-email" element={<AdminVerifyEmail />} />
          {/* User forgot , verify email and  reset route */}
          <Route path="/forgot-password" element={<UserForgotPass />} />
          <Route path="/users/reset-password/:token" element={<UserResetPass />} />
          <Route path="/users/verify-email" element={<UserVerifyEmail />} />
          {/* payment */}
          <Route path="/payment" element={<Payment />} />

          <Route path="/table" element={<DivisionTable />} />
          {/* <Route path="/form" element={<UserForm />} /> */}
          {/* Admin Routes (Protected) */}
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminSidebar>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="manage-admin" element={<ManageAdmin />} />
                    <Route path="manage-country" element={<ManageCountry />} />
                    <Route path="manage-province" element={<ManageProvince />} />
                    <Route path="manage-division" element={<ManageDivision />} />
                    <Route path="manage-cities" element={<ManageCity />} />
                    <Route path="manage-district" element={<ManageDistrics />} />
                    <Route path="manage-area" element={<ManageArea />} />
                    <Route path="all-payment" element={<AllPayments/>} />
                    <Route path="*" element={<AdminPageNotFound />} />
                    <Route path="/form" element={<AdminForm />} />
                  </Routes>
                </AdminSidebar>
              </AdminProtectedRoute>
            }
          />

          {/* User Routes (Protected) */}
          <Route
            path="/user/*"
            element={
              <UserProtectedRoute>
                <UserSidebar>
                  <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="api" element={<GenerateApiKey />} />
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="contact" element={<UserContact />} />
                    <Route path="*" element={<UserPageNotFound />} />
                  </Routes>
                </UserSidebar>
              </UserProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
