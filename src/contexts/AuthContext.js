import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { endpoints, createApiClient } from '../config/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp > currentTime) {
                    setUser(decoded);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const apiClient = createApiClient();
            const response = await apiClient.post(endpoints.auth.login, {
                email,
                password
            });

            // Simplified token extraction logic for text/plain response
            let token = null;

            // Check if response is a string (direct token)
            if (typeof response === 'string') {
                token = response.trim();
                console.log('Token received as string:', token);
            }
            // If response is an object with a data property that's a string
            else if (response && typeof response === 'object') {
                if (response.data && typeof response.data === 'string') {
                    token = response.data.trim();
                    console.log('Token extracted from response.data string');
                }
                // For axios or fetch-like wrappers that might include the response body in .data
                else if (response.data && typeof response.data === 'object') {
                    // If data contains the token directly
                    if (response.data.token && typeof response.data.token === 'string') {
                        token = response.data.token.trim();
                        console.log('Token extracted from response.data.token');
                    }
                }
                // For direct response objects
                else if (response.token && typeof response.token === 'string') {
                    token = response.token.trim();
                    console.log('Token extracted from response.token');
                }
                // Handle case where the entire response might be the token
                else if (response.text && typeof response.text === 'function') {
                    // For fetch API responses that need to be parsed
                    token = await response.text();
                    token = token.trim();
                    console.log('Token extracted using response.text()');
                }
            }

            // Check if we still don't have a token - try to use the entire response
            if (!token && response) {
                // Last resort - try to use the entire response as token
                if (typeof response === 'object' && Object.keys(response).length === 0) {
                    console.log('Response is an empty object');
                    throw new Error('Empty response received from server');
                }

                // Convert to string if it's an object
                if (typeof response === 'object') {
                    try {
                        console.log('Attempting to use stringified response as token');
                        token = JSON.stringify(response);
                    } catch (e) {
                        console.error('Failed to stringify response', e);
                    }
                }
            }

            // Check if we found a valid token
            if (!token) {
                console.error('Token extraction failed:', {
                    responseType: typeof response,
                    hasResponse: !!response,
                });
                throw new Error('No valid token received from server');
            }

            // Additional validation to ensure token is a string
            if (typeof token !== 'string') {
                console.error('Invalid token type:', typeof token);
                throw new Error('Invalid token format received from server');
            }

            // Log token length and format for debugging (don't log the actual token)
            console.log('Token validation check:', {
                length: token.length,
                isJWT: token.split('.').length === 3,
                firstChar: token.charAt(0),
                lastChar: token.charAt(token.length - 1)
            });

            // Validate token format by attempting to decode
            try {
                const decoded = jwtDecode(token);

                // Basic validation of token structure
                if (!decoded) {
                    throw new Error('Token decoded to null or undefined');
                }

                // Store token and set user state
                localStorage.setItem('token', token);
                setUser(decoded);
                return decoded;
            } catch (jwtError) {
                console.error('JWT decode error:', jwtError);
                throw new Error('Invalid token format received from server');
            }
        } catch (error) {
            console.error('Login error:', {
                message: error.message,
                statusCode: error.statusCode,
                response: error.response
            });

            // Handle specific error cases
            if (error.statusCode === 401) {
                throw new Error('Incorrect email or password');
            } else if (error.statusCode === 400) {
                throw new Error('Invalid login data');
            } else if (error.message === 'Failed to fetch') {
                throw new Error('Connection error. Please check your internet connection.');
            } else {
                throw new Error(error.message || 'Login failed. Please try again.');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
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

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        verifyEmail,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};