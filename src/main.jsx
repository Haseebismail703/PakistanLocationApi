import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@ant-design/v5-patch-for-react-19";
import UserProvider from "./Context/UserContext.jsx";
import AdminProvider from "./Context/AdminContext.jsx";

const userData = localStorage.getItem("user");
const adminData = localStorage.getItem("admin");

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {userData ? (
      <UserProvider>
        <App />
      </UserProvider>
    ) : adminData ? (
      <AdminProvider>
        <App />
      </AdminProvider>
    ) : (
      <App />
    )}
  </StrictMode>
);
