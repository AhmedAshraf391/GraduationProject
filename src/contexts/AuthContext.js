"use client"
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
                        setUser({
                            ...decoded,
                            userId: decoded.sub || decoded.id,
                            isLawyer: localStorage.getItem("isLawyer") === "true",
                        });
                    } else {
                        console.log("Token expired, removing from localStorage");
                        localStorage.removeItem("token");
                        localStorage.removeItem("isLawyer");
                    }
                } catch (error) {
                    console.error("Error initializing auth:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("isLawyer");
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            if (!credentials.email || !credentials.password) {
                console.error("Invalid credentials:", credentials);
                throw new Error("Email and password are required");
            }

            const apiClient = createApiClient();
            console.log("Sending login request with credentials:", credentials);
            const response = await apiClient.post(endpoints.auth.login, credentials);
            console.log("Full login API response:", response);

            if (!response || typeof response !== "object") {
                console.error("Invalid response format:", response);
                throw new Error("Invalid API response format");
            }

            const { success, message, model } = response;
            if (!success || !model) {
                console.error("Login response missing success or model:", { success, message, model });
                throw new Error(message || "Login failed: Invalid response structure");
            }

            const { token, isLawyer, id, email, location, specialization } = model;
            if (!token || typeof token !== "string") {
                console.error("Invalid or missing token in model:", model);
                throw new Error("Invalid token format");
            }

            const decoded = jwtDecode(token);
            if (!decoded || !decoded.exp || decoded.exp < Date.now() / 1000) {
                console.error("Invalid or expired token:", decoded);
                throw new Error("Invalid or expired token");
            }

            console.log("Storing token and setting user:", { token, isLawyer, id, email, location, specialization });
            localStorage.setItem("token", token);
            localStorage.setItem("isLawyer", isLawyer);
            setUser({
                ...decoded,
                userId: id,
                isLawyer,
                email: email || decoded.email || credentials.email,
                location: location || "",
                specialization: specialization || "",
            });
            return { success: true, user: { token, isLawyer, id, email, location, specialization } };
        } catch (error) {
            console.error("Login error:", error.message, "Response:", error.response);
            localStorage.removeItem("token");
            localStorage.removeItem("isLawyer");
            setUser(null);
            throw new Error(error.message || "Login failed. Please try again.");
        }
    };

    const logout = () => {
        console.log("Logging out, removing token");
        localStorage.removeItem("token");
        localStorage.removeItem("isLawyer");
        setUser(null);
    };

    const register = async (userData) => {
        const apiClient = createApiClient();
        console.log("Sending register request with data:", userData);
        const response = await apiClient.post(endpoints.auth.register, userData);
        console.log("Register API response:", response);
        return response;
    };

    const verifyEmail = async (email, token) => {
        const apiClient = createApiClient();
        console.log("Sending verify email request:", { email, token });
        const response = await apiClient.post(endpoints.auth.verifyEmail, { email, token });
        console.log("Verify email API response:", response);
        return response;
    };

    const value = {
        user,
        setUser,
        loading,
        login,
        logout,
        register,
        verifyEmail,
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