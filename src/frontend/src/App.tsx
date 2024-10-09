import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Componente da página inicial
import Register from './components/register/Register';
import Login from './components/login/Login';
import UserPage from './components/userpage/UserPage'
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';

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
                {/* Rota sem bloqueio */}
                <Route
          path="/user-page"
          element={
              <UserPage />
          }
        />
      </Routes>
      
    </Router>
  );
}

export default App;