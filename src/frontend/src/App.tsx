import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FoodRegister from './components/food/FoodRegister';
import UserPage from './userpage/UserPage';
import { AuthProvider } from './components/contexts/AuthContext';
import { ProfileProvider } from './components/contexts/ProfileContext'; // Importe o ProfileProvider
import Measures from './calculate/measures/Measures';
import CustomDiets from './components/diets/CustomDiets';
import Receipts from './components/receipts/Receipts';

function App() {
  return (
    <AuthProvider>
      <ProfileProvider> {/* Envolva com ProfileProvider para compartilhar o contexto */}
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/register"
              element={
                <AuthenticatedRoute>
                  <Register />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthenticatedRoute>
                  <Login />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/food-register"
              element={
                <ProtectedRoute>
                  <FoodRegister />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-page"
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calcular"
              element={
                <ProtectedRoute>
                  <Measures />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dietas"
              element={
                <ProtectedRoute>
                  <CustomDiets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receitas"
              element={
                <ProtectedRoute>
                  <Receipts />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;