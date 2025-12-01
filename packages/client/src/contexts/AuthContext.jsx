// packages/client/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login for testing
    const mockUser = {
      id: 1,
      email: email,
      username: 'testuser',
      full_name: 'Test User',
      profile_picture: 'https://via.placeholder.com/150',
      is_premium: false,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    
    return { success: true, user: mockUser };
  };

  const register = async (userData) => {
    // Mock registration for testing
    const mockUser = {
      id: 2,
      email: userData.email,
      username: userData.username,
      full_name: userData.full_name,
      profile_picture: 'https://via.placeholder.com/150',
      is_premium: false,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    
    return { success: true, user: mockUser };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};