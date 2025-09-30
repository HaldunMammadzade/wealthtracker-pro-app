'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const storedUser = localStorage.getItem('wealthtracker_user');
      const token = localStorage.getItem('wealthtracker_token');
      
      if (storedUser && token) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - replace with real API call
      const mockUsers = JSON.parse(localStorage.getItem('wealthtracker_users') || '[]');
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        const token = `mock_token_${Date.now()}`;
        
        localStorage.setItem('wealthtracker_user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('wealthtracker_token', token);
        
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = JSON.parse(localStorage.getItem('wealthtracker_users') || '[]');
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        profileImage: null
      };
      
      mockUsers.push(newUser);
      localStorage.setItem('wealthtracker_users', JSON.stringify(mockUsers));
      
      // Auto login after registration
      const { password: _, ...userWithoutPassword } = newUser;
      const token = `mock_token_${Date.now()}`;
      
      localStorage.setItem('wealthtracker_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('wealthtracker_token', token);
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('wealthtracker_user');
    localStorage.removeItem('wealthtracker_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('wealthtracker_user', JSON.stringify(updatedUser));
      
      // Update in users array
      const mockUsers = JSON.parse(localStorage.getItem('wealthtracker_users') || '[]');
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
        localStorage.setItem('wealthtracker_users', JSON.stringify(mockUsers));
      }
      
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  };

  const resetPassword = async (email) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = JSON.parse(localStorage.getItem('wealthtracker_users') || '[]');
      const userExists = mockUsers.some(u => u.email === email);
      
      if (userExists) {
        return { success: true, message: 'Password reset link sent to your email' };
      } else {
        return { success: false, error: 'No account found with this email' };
      }
    } catch (error) {
      return { success: false, error: 'Password reset failed' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}