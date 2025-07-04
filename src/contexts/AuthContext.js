// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { endpoints, createApiClient } from "../config/api";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp > currentTime) {
                        await refreshUser(); // Fetch latest user data on mount
                    } else {
                        localStorage.removeItem("token");
                    }
                } catch (error) {
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const apiClient = createApiClient();
            const response = await apiClient.post(endpoints.auth.login, credentials);
            console.log("Login API Response:", response.data);

            const { token, model } = response.data;
            if (!token || typeof token !== "string") {
                throw new Error("Invalid token format");
            }
            const decoded = jwtDecode(token);
            if (!decoded || !decoded.exp || decoded.exp < Date.now() / 1000) {
                throw new Error("Invalid or expired token");
            }

            localStorage.setItem("token", token);
            setUser({
                ...decoded,
                ...model, // Merge model data (including isLawyer)
                userId: model.id, // Use id as userId
            });
            await refreshUser(); // Ensure latest data
            return { success: true, user: model };
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
            throw new Error(error.message || "Login failed. Please try again.");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const register = async (userData) => {
        const apiClient = createApiClient();
        const response = await apiClient.post(endpoints.auth.register, userData);
        return response;
    };

    const verifyEmail = async (email, token) => {
        const apiClient = createApiClient();
        const response = await apiClient.post(endpoints.auth.verifyEmail, { email, token });
        return response;
    };

    const refreshUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const apiClient = createApiClient();
                const response = await apiClient.get(endpoints.user.getUser, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("Refresh API Response:", response.data);
                const { id, isLawyer, email, location, specialization } = response.data;
                setUser((prevUser) => ({
                    ...prevUser,
                    userId: id,
                    isLawyer,
                    email,
                    location,
                    specialization,
                }));
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error("Error refreshing user:", error);
            return { success: false };
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        verifyEmail,
        refreshUser,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};