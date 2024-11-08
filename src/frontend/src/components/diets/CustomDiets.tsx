import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
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
    energy: 0,
    protein: 0,
    carbohydrate: 0,
    total_lipids: 0,
    dietary_fiber: 0
  });

  const periodTranslation: { [key: string]: string } = {
    breakfast: "Café da Manhã",
    morningSnack: "Lanche da Manhã",
    lunch: "Almoço",
    afternoonSnack: "Lanche da Tarde",
    dinner: "Jantar"
  };

  const [saveToLocalStorage, setSaveToLocalStorage] = useState<boolean>(false);

  const saveMacronutrientsToLocalStorage = () => {
    const macronutrients = {
      energy: totalNutrients.energy,
      protein: totalNutrients.protein,
      carbohydrate: totalNutrients.carbohydrate,
      total_lipids: totalNutrients.total_lipids,
      dietary_fiber: totalNutrients.dietary_fiber
    };
    if (saveToLocalStorage) {
      localStorage.setItem("macronutrients", JSON.stringify(macronutrients));
      console.log("Macronutrientes salvos no localStorage:", macronutrients);
    } else {
      localStorage.removeItem("macronutrients");
      console.log("Macronutrientes removidos do localStorage");
    }
  };

  useEffect(() => {
   
    saveMacronutrientsToLocalStorage();
  }, [saveToLocalStorage, totalNutrients]);

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
          query = `protein BETWEEN 8 AND 18 AND energy BETWEEN 60 AND 125 AND carbohydrate BETWEEN 3 AND 8`; 
          break;
        case "cetogenica":
          query = `carbohydrate BETWEEN 3 AND 10 AND total_lipids BETWEEN 15 AND 25 AND energy BETWEEN 110 AND 220`; 
          break;
        case "bulking":
          query = `energy BETWEEN 130 AND 270 AND carbohydrate BETWEEN 10 AND 20`; 
          break;
        case "vegetariana":
          query = `energy BETWEEN 80 AND 230 AND category IN ('Hortaliças folhosas, frutosas e outras', 'Frutas', 'Cereais e leguminosas')`; 
          break;
        case "proteica":
          query = `protein BETWEEN 8 AND 18 AND carbohydrate BETWEEN 6 AND 12`; 
          break;
        case "fibra":
          query = `dietary_fiber BETWEEN 7 AND 16 AND energy BETWEEN 80 AND 180`; 
          break;
        case "baixaGordura":
          query = `total_lipids BETWEEN 1 AND 5 AND energy BETWEEN 80 AND 210`; 
          break;
        default:
          setError("Por favor, selecione uma dieta.");
          return;
      }
    } else if (tmbValue <= 2500) {
      switch (selectedDiet) {
        case "lowCarb":
          query = `protein BETWEEN 8 AND 20 AND energy BETWEEN 80 AND 160 AND carbohydrate BETWEEN 5 AND 11`; 
          break;
        case "cetogenica":
          query = `carbohydrate BETWEEN 3 AND 9 AND total_lipids BETWEEN 10 AND 30 AND energy BETWEEN 90 AND 240`; 
          break;
        case "bulking":
          query = `energy BETWEEN 170 AND 390 AND carbohydrate BETWEEN 14 AND 30`; 
          break;
        case "vegetariana":
          query = `energy BETWEEN 70 AND 600 AND category IN ('Hortaliças folhosas, frutosas e outras', 'Frutas', 'Cereais e leguminosas')`; 
          break;
        case "proteica":
          query = `protein BETWEEN 8 AND 25 AND carbohydrate BETWEEN 5 AND 11`; 
          break;
        case "fibra":
          query = `dietary_fiber BETWEEN 8 AND 18 AND energy BETWEEN 70 AND 240`; 
          break;
        case "baixaGordura":
          query = `total_lipids BETWEEN 2 AND 5 AND energy BETWEEN 60 AND 220`; 
          break;
        default:
          setError("Por favor, selecione uma dieta.");
          return;
      }
    } else if (tmbValue <= 3500) {
      switch (selectedDiet) {
        case "lowCarb":
          query = `protein BETWEEN 10 AND 25 AND energy BETWEEN 100 AND 200 AND carbohydrate BETWEEN 4 AND 14`; 
          break;
        case "cetogenica":
          query = `carbohydrate BETWEEN 4 AND 10 AND total_lipids BETWEEN 9 AND 26`;
          break;
        case "bulking":
          query = `energy BETWEEN 210 AND 450 AND carbohydrate BETWEEN 15 AND 30`; 
          break;
        case "vegetariana":
          query = `energy BETWEEN 80 AND 210 AND category IN ('Hortaliças folhosas, frutosas e outras', 'Frutas', 'Cereais e leguminosas')`;
          break;
        case "proteica":
          query = `protein BETWEEN 11 AND 27 AND carbohydrate BETWEEN 6 AND 11 AND total_lipids BETWEEN 4 AND 10`; 
          break;
        case "fibra":
          query = `dietary_fiber BETWEEN 7 AND 20 AND energy BETWEEN 100 AND 200`; 
          break;
        case "baixaGordura":
          query = `total_lipids BETWEEN 6 AND 14 AND energy BETWEEN 200 AND 300`; 
          break;
        default:
          setError("Por favor, selecione uma dieta.");
          return;
      }
    } else if (tmbValue <= 5000) {
      switch (selectedDiet) {
        case "lowCarb":
          query = `protein BETWEEN 10 AND 30 AND energy BETWEEN 120 AND 250 AND carbohydrate BETWEEN 4 AND 11`;
          break;
        case "cetogenica":
          query = `carbohydrate BETWEEN 2 AND 9 AND total_lipids BETWEEN 15 AND 35`; 
          break;
        case "bulking":
          query = `energy BETWEEN 300 AND 600 AND carbohydrate BETWEEN 20 AND 45`;
          break;
        case "vegetariana":
          query = `energy BETWEEN 150 AND 700 AND category IN ('Hortaliças folhosas, frutosas e outras', 'Frutas', 'Cereais e leguminosas')`;
          break;
        case "proteica":
          query = `protein BETWEEN 12 AND 40 AND carbohydrate BETWEEN 4 AND 11`; 
          break;
        case "fibra":
          query = `dietary_fiber BETWEEN 6 AND 50 AND energy BETWEEN 110 AND 340`; 
          break;
        case "baixaGordura":
          query = `total_lipids BETWEEN 3 AND 10 AND energy BETWEEN 210 AND 440`; 
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
        energy: roundToTwoDecimalPlaces(totalCalories),
        protein: roundToTwoDecimalPlaces(totalProtein),
        carbohydrate: roundToTwoDecimalPlaces(totalCarbohydrate),
        total_lipids: roundToTwoDecimalPlaces(totalLipids),
        dietary_fiber: roundToTwoDecimalPlaces(totalFiber),
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
      <strong>Calorias Totais:</strong> {totalNutrients.energy} kcal
    </div>
    <div className="nutrient">
      <strong>Proteínas Totais:</strong> {totalNutrients.protein} g
    </div>
    <div className="nutrient">
      <strong>Carboidratos Totais:</strong> {totalNutrients.carbohydrate} g
    </div>
    <div className="nutrient">
      <strong>Gorduras Totais:</strong> {totalNutrients.total_lipids !== null ? totalNutrients.total_lipids : "0"} g
    </div>
    <div className="nutrient">
      <strong>Fibras Totais:</strong> {totalNutrients.dietary_fiber} g
    </div>

    {/* Checkbox para salvar no localStorage */}
    <div className="save-checkbox">
      <label>
        <input
          type="checkbox"
          checked={saveToLocalStorage}
          onChange={(e) => setSaveToLocalStorage(e.target.checked)}
        />
        Salvar macronutrientes em alerta?
      </label>
    </div>
  </div>
)}
      </section>
      <Footer />
      </>
    );
  };
  
  export default CustomDiets;