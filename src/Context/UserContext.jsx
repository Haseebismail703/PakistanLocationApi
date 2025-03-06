import React, { createContext, useState, useEffect } from "react";
import userInterceptor from "../Api/userInterceptor.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const getUser = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userInterceptor.get(`/users/profile`, {
                    withCredentials: true,
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
