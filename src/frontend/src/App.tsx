import Home from './components/Home'; // Importa a página inicial
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/home" element={<Home />} />
			<Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
