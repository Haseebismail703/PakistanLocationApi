import React, { createContext, useState, useEffect } from "react";
import userInterceptor from "../Api/userInterceptor.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userInterceptor.get(`/users/profile`, {
                    withCredentials: true,
                });
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data)); // ✅ Save updated user
            } catch (error) {
                console.error("Failed to fetch user", error);
                localStorage.removeItem("user"); // ✅ If API fails, remove old user data
            } finally {
                setLoading(false);
            }
        };

        // ✅ Listen for changes in localStorage
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            setUser(updatedUser);
            if (updatedUser) {
                fetchUser();
            }
        };

        // ✅ Fetch user only if user exists in localStorage
        if (user) {
            fetchUser();
        }

        // ✅ Event Listener for localStorage changes
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
