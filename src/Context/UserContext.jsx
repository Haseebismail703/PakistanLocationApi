import React, { createContext, useState, useEffect } from "react";
import userInterceptor from "../Api/userInterceptor.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userInterceptor.get(`/users/profile`);
                localStorage.setItem("isVerified", response.data?.data?.isVerified);
                localStorage.setItem("user", JSON.stringify(response.data?.data));
                // console.log(response.data)
                setUser(response.data);
                
            } catch (error) {
                console.error("Failed to fetch user", error);
                localStorage.removeItem("user"); // ✅ If API fails, remove old user data
            } finally {
                setLoading(false);
            }
        };

        

            fetchUser();

    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
