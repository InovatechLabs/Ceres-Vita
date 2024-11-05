import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import BMICalculator from "./BMICalculator";
import TMBCalculator from "./TMBCalculator";
import WaterIntakeCalculator from "./WaterIntakeCalculator";
import { useContext, useEffect, useState } from "react";
import './styles/Measures.css'
import Footer from '../../components/contact/Contact'
import { AuthContext } from "../../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Measures() {

    const [userInfo, setUserInfo] = useState<{ username: string, email: string } | null>(null);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

  const handleLogout = () => {
    if (authContext?.logout) {
      authContext.logout();
      navigate("/home");
    }
  };

  const handleFoodClick = () => {
    navigate('/food-register');
  }

  const handleProfileClick = () => {
    navigate('/user-page');
  }
  const handleHomeClick = () => {
    navigate('/home');
  }

    const fetchUserInfo = async () => {
        const storedUserId = sessionStorage.getItem("id");
        if (storedUserId) {
          const userId = parseInt(storedUserId, 10);
          try {
            const response = await fetch("http://localhost:3030/api/user/verify-profile", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ userId })
            });
    
            if (!response.ok) {
              console.log("Erro ao buscar dados do usuário");
            }
    
            const data = await response.json();
    
            console.log(data);
            setUserInfo(data.userinfo);
    
          } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
          }
        }
      };
    
      useEffect(() => {
        fetchUserInfo();
      }, []);


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
          <li onClick={handleProfileClick}>Meu Perfil</li>
          <li onClick={handleFoodClick}>Registro de Ingestão</li>
          <li onClick={handleLogout}>Sair</li>
        </ul>
      </nav>

        <section className="welcome-div">
            <h1>Olá, {userInfo !== null ? userInfo.username + "!" : ""} Que bom que você está aqui. Utilize nossas calculadoras para entender melhor suas necessidades nutricionais e de saúde. Seu bem-estar começa com boas informações!</h1>
        </section>


        
      <div className="imc-div">
        <BMICalculator />
        <div className="imc-svg">
            <img src="https://cdn.icon-icons.com/icons2/2183/PNG/512/weight_fat_body_overweight_unhealthy_obesity_diet_health_belly_icon_133507.png" id="svg"/>
        </div>
      </div>
      <div className="tmb-div">
        <TMBCalculator />
        <div className="imc-svg">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/metabolism-boosting-illustration-download-in-svg-png-gif-file-formats--apple-logo-balanced-diet-metabolic-various-themes-set-045-pack-business-illustrations-6503391.png?f=webp"  id="svg2"/>
        </div>
      </div>
      <div className="waterintake-div">
        <WaterIntakeCalculator />
        <div className="imc-svg">
          <img src="https://www.svgart.org/wp-content/uploads/2022/06/water-bottels-01-01.png" id="svg2"/>
        </div>
      </div>
      <Footer />
        </>
    )
}

export default Measures;