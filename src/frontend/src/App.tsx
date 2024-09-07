import Home from './components/Home'; // Importa a página inicial
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Teste from './components/Teste';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
			<Route path="/gab" element={<Teste />} />
      </Routes>
    </Router>
  );
}

export default App;
