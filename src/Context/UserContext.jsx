import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import api from "../Api/api.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const getUser = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${api}/users/profile`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getUser?.accessToken}`,
                    },
                });
                setUser(response.data);
                // console.log(response.data)
            } catch (error) {
                console.error("Failed to fetch user", error);
            } finally {
                setLoading(false);
            }
        };
if(getUser){
    fetchUser();
}
        
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
