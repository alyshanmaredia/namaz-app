'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from "jwt-decode";
// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate a login or fetch user logic (this could come from localStorage, API, etc.)
  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      setUser(jwtDecode(token));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (jwt) => {
    let token = jwt.token;
    localStorage.setItem('user',token);
    var userObject = jwtDecode(token);
    setUser(userObject);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
