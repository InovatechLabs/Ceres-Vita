import React, { useContext, useState } from "react";
import { dietsData } from "./receiptsData";
import './Receipts.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Receipts: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [slideDirection, setSlideDirection] = useState('');
  const [isSliding, setIsSliding] = useState(false);

  const handleSlide = (direction: any) => {
    // Definindo a direção da animação
    setSlideDirection(direction);
    setIsSliding(true);

    // Aguarde a animação para chamar a mudança de conteúdo
    setTimeout(() => {
      if (direction === 'left') {
        handlePrevious();
      } else {
        handleNext();
      }
      setIsSliding(false);
    }, 400); // Duração da animação em milissegundos (deve coincidir com o CSS)
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dietsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dietsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const authContext = useContext(AuthContext)

  const handleLogout = () => {
    if (authContext?.logout) {
        authContext.logout();
        navigate("/home");
    }
  };


  const navigate = useNavigate();

  const handleCalcularClick = () => {
    navigate('/calcular')
  }

  const handleFoodClick = () => {
    navigate('/food-register');
}

const handleProfileClick = () => {
    navigate('/user-page');
}
const handleHomeClick = () => {
    navigate('/home');
}

  const currentDiet = dietsData[currentIndex];

  return (
    <>
    <div className='topGreenContainer'></div>
      <nav>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <FontAwesomeIcon icon={faBars} className='fas fa-bars' />
        </label>
        <label className="logo">Ceres Vita</label>
        <ul>
          <li onClick={handleHomeClick}>Home</li>
          <li onClick={handleCalcularClick}>Métricas</li>
          <li onClick={handleFoodClick}>Registro de Ingestão</li>
          <li onClick={handleProfileClick}>Meu Perfil</li>
          <li onClick={handleLogout}>Sair</li>
        </ul>
      </nav>
     
      <div className="receipts-container">
      <button onClick={() => handleSlide('left')} className="nav-button left">
        &#9664;
      </button>
      
      <div className="receipts-content">
        {/* Animação no Texto */}
        <div
          className={`receipts-text ${isSliding ? (slideDirection === 'left' ? 'slide-out-left' : 'slide-out-right') : ''} ${!isSliding && slideDirection ? (slideDirection === 'left' ? 'slide-in-left' : 'slide-in-right') : ''}`}
        >
          <h2 className="receipts-title1">{currentDiet.title}</h2>
          {currentDiet.description.map((paragraph, index) => (
            <p key={index} className="receipts-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Animação na Imagem */}
        <div
          className={`receipts-image-container ${isSliding ? (slideDirection === 'left' ? 'slide-out-left' : 'slide-out-right') : ''} ${!isSliding && slideDirection ? (slideDirection === 'left' ? 'slide-in-left' : 'slide-in-right') : ''}`}
        >
          <img src={currentDiet.image} alt={currentDiet.title} className="receipts-image" />
        </div>
      </div>
  
      <button onClick={() => handleSlide('right')} className="nav-button right">
        &#9654;
      </button>
    </div>
    </>
  );
};

export default Receipts;