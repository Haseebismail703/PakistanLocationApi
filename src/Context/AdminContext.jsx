import React, { createContext, useState, useEffect } from "react";
import adminInterceptor from "../Api/adminInterceptor";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await adminInterceptor.get(`/admins/profile`);
                localStorage.setItem("isVerified", response.data?.data?.isVerified);
                localStorage.setItem("admin", JSON.stringify(response.data?.data));
                setAdmin(response.data);
                
                // console.log(response.data)
                
            } catch (error) {
                console.error("Failed to fetch Admin", error);
            } finally {
                setLoading(false);
            }
        };

            fetchAdmin();


    }, []);

    return (
        <AdminContext.Provider value={{ admin, loading }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
