import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import './styles/CustomDiets.css';
import Footer from '../../components/contact/Contact';
import { useProfile } from "../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface Food {
  id: number;
  description: string;
  energy: number;
  protein: number;
  carbohydrate: number;
  total_lipids: number;
  dietary_fiber?: number;
}

interface FoodsByPeriod {
  "Café da Manhã": Food[];
  "Lanche da Manhã": Food[];
  Almoço: Food[];
  "Lanche da Tarde": Food[];
  Jantar: Food[];
}

const CustomDiets: React.FC = () => {
  const { tmb, activityLevel } = useProfile();
  const [selectedDiet, setSelectedDiet] = useState<string>("");
  const [foodsByPeriod, setFoodsByPeriod] = useState<FoodsByPeriod | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [totalNutrients, setTotalNutrients] = useState({
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    lipids: 0,
    fiber: 0
  });

  const periodTranslation: { [key: string]: string } = {
    breakfast: "Café da Manhã",
    morningSnack: "Lanche da Manhã",
    lunch: "Almoço",
    afternoonSnack: "Lanche da Tarde",
    dinner: "Jantar"
  };

  const authContext = useContext(AuthContext)

  const handleLogout = () => {
    if (authContext?.logout) {
        authContext.logout();
        navigate("/home");
    }
  };

  const handleDietChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiet(event.target.value);
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



  const fetchFoodsByDiet = async () => {
    let query = "";
    const dietType = selectedDiet;
    console.log(tmb);
    if(activityLevel) {

    }
   
    // Define a consulta com base na dieta selecionada
    const tmbValue = tmb != null ? tmb : 0;  // Define tmb como 0 se for null ou undefined

    if (tmbValue <= 1850) {
      // Caso o TMB seja até 1850, ajustes com valores menores
      switch (selectedDiet) {
        case "lowCarb":
          query = `protein BETWEEN 8 AND 15 AND energy BETWEEN 70 AND 135 AND carbohydrate BETWEEN 4 AND 10`; // Limita carboidratos entre 5g e 15g
          break;
        case "cetogenica":
          query = `carbohydrate BETWEEN 5 AND 15 AND total_lipids BETWEEN 10 AND 20`; // Limita carboidratos entre 5g e 15g, lipídios entre 10g e 20g
          break;
        case "bulking":
          query = `energy BETWEEN 150 AND 300 AND carbohydrate BETWEEN 10 AND 20`; // Para bulking, calorias entre 150 e 300 e carboidratos entre 10g e 20g
          break;
        case "vegetariana":
          query = `energy BETWEEN 150 AND 350 AND category IN ('Hortaliças folhosas, frutosas e outras', 'Frutas', 'Cereais e leguminosas')`; // Energia entre 150 e 350 calorias, apenas alimentos vegetarianos
          break;
        case "proteica":
          query = `protein BETWEEN 12 AND 20 AND carbohydrate BETWEEN 10 AND 15`; // Proteína entre 12g e 20g, carboidratos entre 10g e 15g
          break;
        case "fibra":
          query = `dietary_fiber BETWEEN 10 AND 20 AND energy BETWEEN 100 AND 200`; // Fibras entre 10g e 20g, energia entre 100 e 200 calorias
          break;
        case "baixaGordura":
          query = `total_lipids BETWEEN 5 AND 10 AND energy BETWEEN 100 AND 200`; // Lipídios entre 5g e 10g, energia entre 100 e 200 calorias
          break;
        default:
          setError("Por favor, selecione uma dieta.");
          return;
      }
    } else if (tmbValue <= 2500) {
      switch (selectedDiet) {
        case "lowCarb":
          query = `protein BETWEEN 8 AND 20 AND energy BETWEEN 80 AND 140 AND carbohydrate BETWEEN 3 AND 10`; // Limita carboidratos entre 10g e 25g
          break;
        case "cetogenica":
          query = `carbohydrate BETWEEN 10 AND 25 AND total_lipids BETWEEN 15 AND 30`; // Limita carboidratos entre 10g e 30g, lipídios entre 40g e 60g
          break;
        case "bulking":
          query = `energy BETWEEN 250 AND 450 AND carbohydrate BETWEEN 20 AND 40`; // Para bulking, calorias entre 250 e 450 e carboidratos entre 30g e 50g
          break;
        case "vegetariana":
          query = `energy BETWEEN 100 AND 600 AND category IN ('Hortaliças folhosas, frutosas e outras', 'Frutas', 'Cereais e leguminosas')`; // Energia entre 400 e 600 calorias, apenas alimentos vegetarianos
          break;
        case "proteica":
          query = `protein BETWEEN 16 AND 30 AND carbohydrate BETWEEN 15 AND 30`; // Proteína entre 40g e 60g, carboidratos entre 20g e 40g
          break;
        case "fibra":
          query = `dietary_fiber BETWEEN 20 AND 40 AND energy BETWEEN 200 AND 400`; // Fibras entre 20g e 40g, energia entre 200 e 400 calorias
          break;
        case "baixaGordura":
          query = `total_lipids BETWEEN 10 AND 25 AND energy BETWEEN 200 AND 350`; // Lipídios entre 10g e 25g, energia entre 200 e 350 calorias
          break;
        default:
          setError("Por favor, selecione uma dieta.");
          return;
      }
    } else if (tmbValue <= 3500) {
      switch (selectedDiet) {
        case "lowCarb":
          query = `protein BETWEEN 10 AND 25 AND energy BETWEEN 100 AND 200 AND carbohydrate BETWEEN 4 AND 14`; // Limita carboidratos entre 20g e 40g
          break;
        case "cetogenica":
          query = `carbohydrate BETWEEN 20 AND 40 AND total_lipids BETWEEN 30 AND 50`; // Limita carboidratos entre 20g e 40g, lipídios entre 30g e 50g
          break;
        case "bulking":
          query = `energy BETWEEN 150 AND 400 AND carbohydrate BETWEEN 20 AND 40`; // Para bulking, calorias entre 350 e 600 e carboidratos entre 30g e 50g
          break;
        case "vegetariana":
          query = `energy BETWEEN 80 AND 210 AND category IN ('Hortaliças folhosas, frutosas e outras', 'Frutas', 'Cereais e leguminosas')`; // Energia entre 200 e 800 calorias, apenas alimentos vegetarianos
          break;
        case "proteica":
          query = `protein BETWEEN 12 AND 30 AND carbohydrate BETWEEN 8 AND 18`; // Proteína entre 40g e 60g, carboidratos entre 20g e 40g
          break;
        case "fibra":
          query = `dietary_fiber BETWEEN 8 AND 20 AND energy BETWEEN 100 AND 200`; // Fibras entre 25g e 45g, energia entre 250 e 450 calorias
          break;
        case "baixaGordura":
          query = `total_lipids BETWEEN 6 AND 14 AND energy BETWEEN 200 AND 300`; // Lipídios entre 15g e 30g, energia entre 300 e 500 calorias
          break;
        default:
          setError("Por favor, selecione uma dieta.");
          return;
      }
    } else if (tmbValue <= 5000) {
      switch (selectedDiet) {
        case "lowCarb":
          query = `protein BETWEEN 20 AND 30 AND energy BETWEEN 100 AND 200 AND carbohydrate BETWEEN 5 AND 20`; // Limita carboidratos entre 30g e 50g
          break;
        case "cetogenica":
          query = `carbohydrate BETWEEN 30 AND 50 AND total_lipids BETWEEN 40 AND 60`; // Limita carboidratos entre 30g e 50g, lipídios entre 40g e 60g
          break;
        case "bulking":
          query = `energy BETWEEN 300 AND 600 AND carbohydrate BETWEEN 24 AND 45`; // Para bulking, calorias entre 500 e 800 e carboidratos entre 40g e 60g
          break;
        case "vegetariana":
          query = `energy BETWEEN 300 AND 1000 AND category IN ('Hortaliças folhosas, frutosas e outras', 'Frutas', 'Cereais e leguminosas')`; // Energia entre 300 e 1000 calorias, apenas alimentos vegetarianos
          break;
        case "proteica":
          query = `protein BETWEEN 20 AND 40 AND carbohydrate BETWEEN 21 AND 29`; // Proteína entre 50g e 80g, carboidratos entre 30g e 50g
          break;
        case "fibra":
          query = `dietary_fiber BETWEEN 5 AND 60 AND energy BETWEEN 300 AND 700`; // Fibras entre 30g e 60g, energia entre 300 e 600 calorias
          break;
        case "baixaGordura":
          query = `total_lipids BETWEEN 12 AND 23 AND energy BETWEEN 400 AND 700`; // Lipídios entre 20g e 40g, energia entre 400 e 700 calorias
          break;
        default:
          setError("Por favor, selecione uma dieta.");
          return;
      }
    } 

    try {
      const response = await fetch(`http://localhost:3030/api/food/diet/?query=${encodeURIComponent(query)}&dietType=${encodeURIComponent(dietType)}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar alimentos para a dieta selecionada.");
      }
      const data: FoodsByPeriod = await response.json();
      console.log(data);
      setFoodsByPeriod(data);

      // Calcular o total dos macronutrientes
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbohydrate = 0;
      let totalLipids = 0;
      let totalFiber = 0;

      for (const foods of Object.values(data)) {
        foods.forEach((food: Food) => {
          totalCalories += food.energy;
          totalProtein += food.protein;
          totalCarbohydrate += food.carbohydrate;
          totalLipids += food.total_lipids;
          if (food.dietary_fiber) {
            totalFiber += food.dietary_fiber;
          }
        });
      }

      const roundToTwoDecimalPlaces = (value: number) => Math.round(value * 100) / 100;

      setTotalNutrients({
        calories: roundToTwoDecimalPlaces(totalCalories),
        protein: roundToTwoDecimalPlaces(totalProtein),
        carbohydrate: roundToTwoDecimalPlaces(totalCarbohydrate),
        lipids: roundToTwoDecimalPlaces(totalLipids),
        fiber: roundToTwoDecimalPlaces(totalFiber),
      });

      setError(null);
    } catch (error) {
      console.error("Erro ao gerar a dieta:", error);
      setError("Erro ao buscar alimentos para a dieta selecionada.");
    }
  };

  
  
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
      <section className="generate-section">
        <div className="card-generate">
        <h1>Escolha sua dieta personalizada</h1>

        <select id="dietSelect" value={selectedDiet} onChange={handleDietChange}>
          <option  id="option" value="">Selecione uma dieta</option>
          <option value="lowCarb">Dieta Low Carb</option>
          <option value="cetogenica">Dieta Cetogênica</option>
          <option value="bulking">Dieta Bulking (alta caloria)</option>
          <option value="vegetariana">Dieta Vegetariana</option>
          <option value="proteica">Dieta Alta em Proteínas</option>
          <option value="fibra">Dieta Rica em Fibras</option>
          <option value="baixaGordura">Dieta Baixa em Gordura</option>
        </select>
        <div className="svg-generate">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/diet-plan-illustration-download-in-svg-png-gif-file-formats--apple-logo-delicious-food-eat-healthy-pack-drink-illustrations-5769916.png" id="svg3" />
        </div>
        <p id="obs">OBS: As dietas são geradas a partir do seu TMB calculado na página de métricas. Caso você não tenha definido seu nível de atividade, clique <a  id="link" onClick={handleCalcularClick}>aqui</a>.</p>
        </div>
        <button onClick={fetchFoodsByDiet} id="generate-btn">Gerar dieta</button>
  
        {error && <p style={{ color: "red" }}>{error}</p>}
  
        {foodsByPeriod && (
  <div className="foods-container">
    <h2>Alimentos sugeridos por período:</h2>
    {Object.entries(foodsByPeriod).map(([period, foods]) => (
      <div key={period} className="period-card">
        <h3 className="period-title">{periodTranslation[period] || period}</h3>
        <div className="foods-list">
          {Array.isArray(foods) && foods.length > 0 ? (
            foods.slice(0, 3).map((food: Food) => (
                <div className="food-card" key={food.id}>
                <p className="food-description">{food.description}</p>
                <div className="macronutrients">
                  <div className="macronutrient">
                    <strong>Calorias:</strong> {food.energy} kcal
                  </div>
                  <div className="macronutrient">
                    <strong>Proteínas:</strong> {food.protein}g
                  </div>
                  <div className="macronutrient">
                    <strong>Carboidratos:</strong> {food.carbohydrate}g
                  </div>
                  <div className="macronutrient">
                    <strong>Gorduras:</strong> {food.total_lipids}g
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-food-message">Nenhum alimento encontrado para este período.</p>
          )}
        </div>
      </div>
    ))}
  </div>
)}
        {foodsByPeriod && (
  <div className="total-nutrients">
    <h2>Totais de Macronutrientes</h2>
    <div className="nutrient">
      <strong>Calorias Totais:</strong> {totalNutrients.calories} kcal
    </div>
    <div className="nutrient">
      <strong>Proteínas Totais:</strong> {totalNutrients.protein} g
    </div>
    <div className="nutrient">
      <strong>Carboidratos Totais:</strong> {totalNutrients.carbohydrate} g
    </div>
    <div className="nutrient">
      <strong>Gorduras Totais:</strong> {totalNutrients.lipids !== null ? totalNutrients.lipids : "0"} g
    </div>
    <div className="nutrient">
      <strong>Fibras Totais:</strong> {totalNutrients.fiber} g
    </div>
  </div>
)}
      </section>
      <Footer />
      </>
    );
  };
  
  export default CustomDiets;