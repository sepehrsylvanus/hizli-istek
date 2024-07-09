import React, { createContext, useState, useContext, useEffect } from "react";
import { getToken } from "../lib/serverUtils";

// Create a Context for the authentication state
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
    };
    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
