import { scrollToSection } from "../../utils/smoothscroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, width } from "@fortawesome/free-solid-svg-icons/faBars";
import BMICalculator from "./BMICalculator";
import TMBCalculator from "./TMBCalculator";
import WaterIntakeCalculator from "./WaterIntakeCalculator";
import { useEffect, useState } from "react";
import './styles/Measures.css'

function Measures() {

    const [userInfo, setUserInfo] = useState<{ username: string, email: string } | null>(null);

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
          <li>Home</li>
          <li onClick={() => scrollToSection('ourGoal')}>Sumário</li>
          <li>IMC</li>
          <li onClick={() => scrollToSection('receipts')}>TMB</li>
          <li onClick={() => scrollToSection('contact')}>Ingestão de Água</li>
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
      </div>
        </>
    )
}

export default Measures;