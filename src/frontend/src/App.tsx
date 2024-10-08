import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Componente da página inicial
import Register from './components/register/Register';
import Login from './components/login/Login';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FoodRegister from './components/food/FoodRegister';

function App() {
  const isAuthenticated = !!sessionStorage.getItem('token'); // Verifica se o usuário está autenticado

  if(isAuthenticated) {
      console.log('Tá logado')
  } else {
    console.log("nao tá logado")
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={ <Home /> }
        />
        {/* Rota bloqueada para usuários autenticados */}
        <Route
          path="/register"
          element={
            <AuthenticatedRoute isAuthenticated={isAuthenticated}>
              <Register />
            </AuthenticatedRoute>
          }
        />

        {/* Rota bloqueada para usuários autenticados */}
        <Route
          path="/login"
          element={
            <AuthenticatedRoute isAuthenticated={isAuthenticated}>
              <Login />
            </AuthenticatedRoute>
          }
        />
         <Route
          path="/food-register"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FoodRegister />
            </ProtectedRoute>
          }
        />
         <Route
          path="*"
          element={
            <Home />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
