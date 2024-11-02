import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AuthenticatedRouteProps {
  children: React.ReactElement;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to={location.state?.from?.pathname || '/home'} replace />
  );
};

export default AuthenticatedRoute;