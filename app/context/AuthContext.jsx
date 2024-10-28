// app/context/AuthContext.js
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Import js-cookie for easy cookie management

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for the access token in cookies to set authentication state
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (tokens) => {
        // Set tokens in both cookies and state
        Cookies.set('accessToken', tokens.access, { path: '/' });
        Cookies.set('refreshToken', tokens.refresh, { path: '/' });
        
        // Optional: store chatId or other state variables in localStorage if needed
        localStorage.removeItem('chatId');
        
        // Update auth state and redirect to profile page
        setIsAuthenticated(true);
        router.push('/profile');
    };

    const logout = () => {
        // Clear tokens from cookies
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });

        // Clear any other relevant local storage items
        localStorage.removeItem('chatId');

        // Update auth state and optionally redirect
        setIsAuthenticated(false);
        router.push('/login'); // Redirect to login page on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
