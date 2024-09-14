import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthenticatedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactElement;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  const location = useLocation(); // Para pegar a rota atual

  // Se o usuário não estiver autenticado, renderiza os filhos (acesso permitido)
  // Se o usuário estiver autenticado, redireciona para a rota anterior ou uma rota default
  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to={location.state?.from?.pathname || '/home'} state={{ from: location }} replace />
  );
};

export default AuthenticatedRoute;