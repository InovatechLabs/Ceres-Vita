import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));
  
    const setAuthenticated = (authStatus: boolean) => {
      setIsAuthenticated(authStatus);
      if (!authStatus) sessionStorage.removeItem('token');
    };
  
    const logout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id') // Remove o token e o id ao fazer logout
    };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, logout 
         }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};