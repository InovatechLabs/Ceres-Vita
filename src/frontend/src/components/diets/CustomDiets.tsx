import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './styles/CustomDiets.css';
import Footer from '../../components/contact/Contact';

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
    const [selectedDiet, setSelectedDiet] = useState<string>("");
    const [foodsByPeriod, setFoodsByPeriod] = useState<FoodsByPeriod | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [totalNutrients, setTotalNutrients] = useState<{ calories: number; protein: number; carbohydrate: number; lipids: number; fiber: number }>({
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
        dinner: "Jantar",
      };
  
    const handleDietChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDiet(event.target.value);
    };
  
    const fetchFoodsByDiet = async () => {
      let query = "";
      const dietType = selectedDiet;
  
      switch (selectedDiet) {
        case "lowCarb":
          query = "carbohydrate<=8";
          break;
        case "cetogenica":
          query = "carbohydrate<=5 AND total_lipids>=15";
          break;
        case "bulking":
          query = "energy>=300";
          break;
        case "vegetariana":
          query = "category IN ('Hortaliças folhosas, frutosas e outras', 'Frutas', 'Cereais e leguminosas')";
          break;
        case "proteica":
          query = "protein>=20";
          break;
        case "fibra":
          query = "dietary_fiber>=10";
          break;
        case "baixaGordura":
          query = "total_lipids<=5";
          break;
        default:
          setError("Por favor, selecione uma dieta.");
          return;
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
  
        // Iterar sobre os alimentos de cada período e somar os macronutrientes
        for (const foods of Object.values(data)) {
          foods.forEach((food: Food) => {
            totalCalories += food.energy; // Soma as calorias
            totalProtein += food.protein; // Soma as proteínas
            totalCarbohydrate += food.carbohydrate; // Soma os carboidratos
            totalLipids += food.total_lipids; // Soma as gorduras
            if (food.dietary_fiber) {
              totalFiber += food.dietary_fiber; // Soma as fibras, se disponível
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
          <li>Home</li>
          <li >Missão</li>
          <li>Planos</li>
          <li >Receitas</li>
          <li>Contatos</li>
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