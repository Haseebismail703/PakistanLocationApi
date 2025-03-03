import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../Api/api.js";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const getAdmin = JSON.parse(localStorage.getItem("admin"));
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get(`${api}/admins/profile`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getAdmin?.accessToken}`,
                    },
                });
                setAdmin(response.data);
                // console.log(response.data)
            } catch (error) {
                console.error("Failed to fetch Admin", error);
            } finally {
                setLoading(false);
            }
        };
        if (getAdmin) {
            fetchAdmin();
        }

    }, []);

    return (
        <AdminContext.Provider value={{ admin, loading }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
