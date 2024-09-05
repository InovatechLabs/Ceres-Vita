import Home from './components/Home'; // Importa a página inicial
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* definir rota para a página inicial */}
        {/* adicionar outras rotas conforme for criando mais paginas */}
      </Routes>
    </Router>
  );
}

export default App;
