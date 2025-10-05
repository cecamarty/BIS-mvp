import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { login as apiLogin, register as apiRegister } from '@/services/api';
import type { AuthRequest } from '@/dto/AuthRequest.ts';

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: AuthRequest) => Promise<void>;
    register: (credentials: AuthRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt_token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (credentials: AuthRequest) => {
        try {
            const response = await apiLogin(credentials);
            const newToken = response.data.token || response.data.jwt || response.data;
            localStorage.setItem('jwt_token', newToken);
            setToken(newToken);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (credentials: AuthRequest) => {
        try {
            await apiRegister(credentials);
            // After successful registration, you might want to auto-login
            // or just redirect to login page
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
