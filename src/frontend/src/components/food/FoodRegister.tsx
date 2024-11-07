import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './styles/FoodRegister.css';
import axios from 'axios';
import Food, { FoodLog, NutrientTotals, SelectedFood } from '../../types/Food';
import FoodLogTable from './foodLogTable/FoodLogTable';
import GlobalStyles from './styles/GlobalStyles';
import { useNavigate } from "react-router-dom";
import { NutritionalData, NutrientsTableProps } from '../../types/Calculate';
import { AuthContext } from '../contexts/AuthContext';

const FoodRegister: React.FC = () => {

  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    if (authContext?.logout) {
      authContext.logout();
      navigate("/home");
    }
  };

  const handleProfileClick = () => {
    navigate('/user-page')
  }
    const userId = sessionStorage.getItem('id');

    const [currentDate, setCurrentDate] = useState<string>('');
    const [originalDate, setOriginalDate] = useState<string>('');
    const [foodName, setFoodName] = useState('');
    const [foodData, setFoodData] = useState<Food[]>([]);
    const [selectedFoods, setSelectedFoods] = useState<{ foodId: number, quantity: number }[]>([]);
    const [foodLog, setFoodLog] = useState<FoodLog[]>([]);
    const [showFoodLog, setShowFoodLog] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<string>('');
    const [showHistory, setShowHistory] = useState(false);
    const [isTableVisible, setIsTableVisible] = useState(false);

    const [nutrientLimits, setNutrientLimits] = useState<Record<string, number>>({
      energy: Number(localStorage.getItem("energyLimit")) || 0,
      protein: Number(localStorage.getItem("proteinLimit")) || 0,
      carbohydrate: Number(localStorage.getItem("carbohydrateLimit")) || 0,
      total_lipids: Number(localStorage.getItem("total_lipidsLimit")) || 0,
      dietary_fiber: Number(localStorage.getItem("dietary_fiberLimit")) || 0,
    });

    const [exceededLimits, setExceededLimits] = useState<Record<string, boolean>>({
      energy: false,
      protein: false,
      carbohydrate: false,
      total_lipids: false,
      dietary_fiber: false,
    });


    const [checkedNutrients, setCheckedNutrients] = useState<Record<string, boolean>>({
      energy: true,  
      protein: true,
      carbohydrate: true,
      total_lipids: true,
    });
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, nutrient: keyof typeof nutrientLimits) => {
      const isChecked = e.target.checked;
      setCheckedNutrients((prevChecked) => ({
        ...prevChecked,
        [nutrient]: isChecked,
      }));
  
      if (!isChecked) {
        // Se desmarcar, zerar o limite.
        setNutrientLimits((prevLimits) => ({
          ...prevLimits,
          [nutrient]: 0, // Zera o limite ao desmarcar
        }));
      }
    };
  
    const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>, nutrient: keyof typeof nutrientLimits) => {
      const newLimit = parseInt(e.target.value, 10) || 0;
      setNutrientLimits((prevLimits) => ({
        ...prevLimits,
        [nutrient]: newLimit,
      }));
  
      // Atualiza o estado da checkbox dependendo do valor do limite.
      if (newLimit > 0) {
        setCheckedNutrients((prevChecked) => ({
          ...prevChecked,
          [nutrient]: true, // Marca a checkbox se o limite for maior que 0
        }));
      } else {
        setCheckedNutrients((prevChecked) => ({
          ...prevChecked,
          [nutrient]: false, // Desmarca a checkbox se o limite for 0
        }));
      }
    };

    useEffect(() => {
      const savedLimits = localStorage.getItem('nutrientLimits');
      if (savedLimits) {
        setNutrientLimits(JSON.parse(savedLimits));
      }
    }, []);
    
  
  const [showLimitsConfig, setShowLimitsConfig] = useState(false);

  
    const toggleTableVisibility = () => {
        setIsTableVisible((prev) => !prev);
      };

      const translations = {
        energy: "Calorias",
        protein: "Proteína",
        carbohydrate: "Carboidrato",
        total_lipids: "Gorduras",
        dietary_fiber: "Fibra Dietética",
      };

      const getTranslation = (term: string) => {
        return translations[term as keyof typeof translations] || term; // Se não encontrar a tradução, retorna o termo original
      };


      const handleSaveLimits = () => {
        const updatedLimits = {
          energy: Number((document.getElementById('energy') as HTMLInputElement)?.value) || 0,
          protein: Number((document.getElementById('protein') as HTMLInputElement)?.value) || 0,
          carbohydrate: Number((document.getElementById('carbohydrate') as HTMLInputElement)?.value) || 0,
          total_lipids: Number((document.getElementById('total_lipids') as HTMLInputElement)?.value) || 0,
          dietary_fiber: Number((document.getElementById('dietary_fiber') as HTMLInputElement)?.value) || 0,
        };
      
        // Salvar no localStorage
        localStorage.setItem('nutrientLimits', JSON.stringify(updatedLimits));
      
        // Atualizar o estado
        setNutrientLimits(updatedLimits);
      
        setShowLimitsConfig(false);
      };

      const handleCloseModal = () => {
        setShowLimitsConfig(false); 
      };

    const [nutritionalData, setNutritionalData] = useState<NutritionalData | null>(null);

    const formatNumber = (num: number) => {
        return num !== null ? num.toFixed(2) : 0; 
      };

      const fetchData = async (dateInput: string | undefined) => {
        try {
          const response = await fetch(
            `http://localhost:3030/api/food/calculate-nutrients/${userId}/${dateInput ? dateInput : ""}`
          );
          const data = await response.json();
          setNutritionalData(data);
          checkNutrientLimits(data);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
          setNutritionalData(null);
        }
      };
      
      const checkNutrientLimits = (data: any) => {
        const limitsExceeded: Record<string, boolean> = {
          energy: data.total_energy_from_foods > nutrientLimits.energy,
          protein: data.total_protein_from_foods > nutrientLimits.protein,
          carbohydrate: data.total_carbohydrate_from_foods > nutrientLimits.carbohydrate,
          total_lipids: data.total_lipids_from_foods > nutrientLimits.total_lipids,
          dietary_fiber: data.total_dietary_fiber_from_foods > nutrientLimits.dietary_fiber,
        };
      
        setExceededLimits(limitsExceeded);
      };


    // Definição da função handleCalculateClick
    const handleCalculateClick = () => {
      // Se a tabela estiver visível, apenas a oculta
      if (isTableVisible) {
          setIsTableVisible(false);
          return; // Sai da função sem mostrar o prompt
      }
  

      // Se a tabela não estiver visível, mostra o prompt
      const dateInput = prompt("Insira a data no formato YYYY-MM-DD para cálculo específico, ou deixe vazio para calcular todos os dados:");

      if (dateInput === null) {
        return; // Não faz nada se o usuário cancelar
    }
  
      // Chama fetchData com o input do usuário
      fetchData(dateInput || undefined);
      setIsTableVisible(true); // Mostra a tabela após buscar dados
  };

    const navigate = useNavigate(); // Hook de navegação

    const handleRegisterClick = () => {
        navigate('/home'); // Redireciona para a rota /home
    };

    const mealOptions = ['Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar', 'Ceia'];


    const handleFetchTodayLog = async () => {
        try {
            const response = await axios.get<FoodLog[]>(`http://localhost:3030/api/food/get-food-log/${userId}/${originalDate}`);
            setFoodLog(response.data);
            setShowFoodLog(true);
        } catch (error) {
            console.error("Erro ao buscar o log de alimentos de hoje:", error);
            setFoodLog([]);
        }
    };

    const handleFetchFoodLog = async () => {
        try {
            const response = await axios.get<FoodLog[]>(`http://localhost:3030/api/food/get-food-log/${userId}`);
            const sortedData = response.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setFoodLog(sortedData);
            setShowFoodLog(true);
            setShowHistory(true);
        } catch (error) {
            console.error("Erro ao buscar o histórico completo de alimentos:", error);
            setFoodLog([]);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/api/food/search-food/${foodName}`);
            if (Array.isArray(response.data)) {
                setFoodData(response.data);
            } else {
                console.error("Resposta não é um array:", response.data);
                setFoodData([]);
            }
        } catch (error) {
            console.error("Erro ao buscar alimentos:", error);
            setFoodData([]);
        }
    };

    

    const handleSelectFood = (foodId: number, quantity: number, selected: boolean) => {
      setSelectedFoods((prevSelectedFoods) => {
        const newUpdatedFoods = selected
          ? prevSelectedFoods.some((food) => food.foodId === foodId)
            ? prevSelectedFoods.map((food) =>
                food.foodId === foodId ? { ...food, quantity } : food
              )
            : [...prevSelectedFoods, { foodId, quantity }]
          : prevSelectedFoods.filter((food) => food.foodId !== foodId);
  
        const nutrientTotals: NutrientTotals = newUpdatedFoods.reduce(
          (totals: NutrientTotals, food: SelectedFood) => {
            const foodDataItem = foodData.find((f) => f.id === food.foodId);
            const factor = food.quantity / 100;
            if (foodDataItem) {
              totals.energy += (foodDataItem.energy ?? 0) * factor;
              totals.protein += (foodDataItem.protein ?? 0) * factor;
              totals.total_lipids += (foodDataItem.total_lipids ?? 0) * factor;
              totals.carbohydrate += (foodDataItem.carbohydrate ?? 0) * factor;
              totals.dietary_fiber += (foodDataItem.dietary_fiber ?? 0) * factor;
            }
            return totals;
          },
          { energy: 0, protein: 0, total_lipids: 0, carbohydrate: 0, dietary_fiber: 0 }
        );
  
        // Verifique se algum nutriente excede os limites e emita alerta
        const exceededNutrients = Object.keys(nutrientTotals).filter((nutrient) => {
          // Só aplica o limite se o valor for maior que 0 (checkbox marcada)
          if (nutrient in nutrientLimits && nutrientLimits[nutrient] > 0) {
            const limit = nutrientLimits[nutrient];
            return nutrientTotals[nutrient as keyof NutrientTotals] > limit;
          }
          return false;
        });
  
        if (exceededNutrients.length > 0) {
          const translatedNutrients = exceededNutrients.map(getTranslation);
          alert(`Limites excedidos para: ${translatedNutrients.join(", ")}`);
        }
  
        return newUpdatedFoods;
      });
    };


    const isFoodSelected = (foodId: number) => {
        return selectedFoods.some(food => food.foodId === foodId);
    };

    const getFoodQuantity = (foodId: number) => {
        const food = selectedFoods.find(food => food.foodId === foodId);
        return food ? food.quantity : 100; // Valor padrão
    };

    const handleSubmit = async () => {
        const today = new Date();
        const selectedDate = new Date(originalDate);

        if (selectedDate > today) {
            alert('Não é possível registrar alimentos para datas futuras!');
            return;
        }

        try {
            for (const food of selectedFoods) {
                const quantityDivided = food.quantity / 100;
                await axios.post('http://localhost:3030/api/food/log-food', {
                    foodId: food.foodId,
                    userId,
                    date: currentDate,
                    quantity: quantityDivided || 1,
                    meal: selectedMeal
                });
            }
            alert('Alimentos registrados com sucesso!');
            setSelectedFoods([]);
            setFoodData([]);
            handleFetchTodayLog();
        } catch (error) {
            console.error("Erro ao registrar alimentos:", error);
            alert('Erro ao registrar os alimentos.');
        }

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            (checkbox as HTMLInputElement).checked = false;
        });
    };

    const handleCloseHistory = () => {
        setShowHistory(false);
        setShowFoodLog(false);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setCurrentDate(selectedDate);

        // Formato para o backend (YYYY-MM-DD)
        const formattedOriginalDate = new Date(selectedDate).toISOString().split('T')[0];
        setOriginalDate(formattedOriginalDate);
    };

    useEffect(() => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${year}-${month}-${day}`;
        setCurrentDate(formattedDate);
        setOriginalDate(formattedDate);
    }, []);

    return (
        <>
            <GlobalStyles />
            <div className='topGreenContainer'></div>
            <nav>
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="checkbtn">
                    <FontAwesomeIcon icon={faBars} className='fas fa-bars' />
                </label>
                <label className="logo">Ceres Vita</label>
                <ul>
                    <li onClick={handleRegisterClick}>Home</li>
                    <li onClick={handleProfileClick}>Meu Perfil</li>
                    <li onClick={handleLogout}>Sair</li>
                </ul>
            </nav>
            <div className="main-registerfood">
                <div className="card-registerfood">
                    <h1 id='card-title'>Registro de Ingestão</h1>
                    <label htmlFor="food-search" id='food-search-label'>Busque o alimento ou produto consumido:</label>
                    <input
                        type="text"
                        id="food-search"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                    />
                    <div className="food-buttons">
                        <button className="food-button" onClick={handleSearch}>Alimento</button>
                        <button className="food-product">Produto</button>
                        <button onClick={() => setShowLimitsConfig(true)}>Configurar Limites de Nutrientes</button>

      {/* Overlay escuro, visível quando o modal estiver aberto */}
      
                    </div>
                    {showLimitsConfig && (
            <div
                className="overlay visible"
                onClick={handleCloseModal} // Fecha o modal e o overlay ao clicar fora
            ></div>
        )}
                    {showLimitsConfig && (
                      
                      
                      <div className="modal">
                      <h3>Configurar limites de nutrientes diários</h3>
                      <div className='span-div'>
                      <span>Limitar calorias</span>
                      <input
      type="checkbox"
      checked={checkedNutrients.energy}
      onChange={(e) => handleCheckboxChange(e, 'energy')}
      id="checkbox-energy"
    />   
    </div>            
    <input
      type="number"
      id="energy"
      value={nutrientLimits.energy > 0 ? nutrientLimits.energy : ""}
      onChange={(e) => handleLimitChange(e, 'energy')}
      disabled={!checkedNutrients.energy} // Desabilita se a checkbox não estiver marcada
    />
    
    <div className='span-div'>
    <span>Limitar proteínas</span>
    <input
      type="checkbox"
      checked={checkedNutrients.protein}
      onChange={(e) => handleCheckboxChange(e, 'protein')}
      id="checkbox-protein"
    />
    </div>
    <input
      type="number"
      id="protein"
      value={nutrientLimits.protein > 0 ? nutrientLimits.protein : ""}
      onChange={(e) => handleLimitChange(e, 'protein')}
      disabled={!checkedNutrients.protein}
    />
   
   <div className='span-div'>
   <span>Limitar carboidratos</span>
   <input
      type="checkbox"
      checked={checkedNutrients.carbohydrate}
      onChange={(e) => handleCheckboxChange(e, 'carbohydrate')}
      id="checkbox-carbohydrate"
    />
    </div>
    <input
      type="number"
      id="carbohydrate"
      value={nutrientLimits.carbohydrate > 0 ? nutrientLimits.carbohydrate : ""}
      onChange={(e) => handleLimitChange(e, 'carbohydrate')}
      disabled={!checkedNutrients.carbohydrate}
    />
   
   <div className='span-div'>
   <span>Limitar gorduras</span>
   <input
      type="checkbox"
      checked={checkedNutrients.total_lipids}
      onChange={(e) => handleCheckboxChange(e, 'total_lipids')}
      id="checkbox-total_lipids"
    />
    </div> 
    <input
      type="number"
      id="total_lipids"
      value={nutrientLimits.total_lipids > 0 ? nutrientLimits.total_lipids : ""}
      onChange={(e) => handleLimitChange(e, 'total_lipids')}
      disabled={!checkedNutrients.total_lipids}
    />
    
  
              
                      <div className='buttons-save-nutrient'>
                        <button id="handlesave" onClick={handleSaveLimits}>Salvar</button>
                        <button id="handlesave" onClick={handleCloseModal}>Fechar</button>
                      </div>
                    </div>
)}

                    <div className="info-group">
                        <label htmlFor="meal-select">Selecione o tipo de refeição:</label>
                        <select
                            id="meal-select"
                            value={selectedMeal}
                            onChange={(e) => setSelectedMeal(e.target.value)}
                        >
                            <option value="" disabled>Selecione uma refeição</option>
                            {mealOptions.map(meal => (
                                <option key={meal} value={meal}>{meal}</option>
                            ))}
                        </select>
                    </div>

                    <div className="food-infos">
                        <div className="info-group">
                            <label htmlFor='date-eaten' id='date-eaten-label'>Data de Consumo:</label>
                            <input
                                type='date'
                                id='date-eaten'
                                value={currentDate}
                                onChange={handleDateChange}
                                max={new Date().toISOString().split('T')[0]} // Impede datas futuras
                            />
                        </div>
                    </div>
                    {foodData.length > 0 && (
                        <div className="table-scroll-container">
                            <div className="table-header-scroll">
                                <div className="scrollable-table">
                                    <table className="food-table">
                                        <thead>
                                            <tr className="table-header">
                                                <th>Selecionar</th>
                                                <th>Quantidade (g)</th>
                                                <th>Nome</th>
                                                <th>Calorias</th>
                                                <th>Carboidratos (g)</th>
                                                <th>Proteínas (g)</th>
                                                <th>Lipídios</th>
                                                <th>Fibra Dietética (g)</th>
                                                <th>Açúcares Totais</th>
                                                <th>Açúcares Adicionados</th>
                                                <th>Sódio (mg)</th>
                                                <th>Potássio</th>
                                                <th>Cálcio (mg)</th>
                                                <th>Ferro</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {foodData.map(food => (
                                                <tr key={food.id}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            onChange={(e) => {
                                                                const quantity = getFoodQuantity(food.id);
                                                                handleSelectFood(food.id, quantity, e.target.checked);
                                                            }}
                                                            checked={isFoodSelected(food.id)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className='quantityinput'
                                                            value={getFoodQuantity(food.id)}
                                                            onChange={(e) => {
                                                                const quantity = Number(e.target.value);
                                                                handleSelectFood(food.id, quantity, true);
                                                            }}
                                                            min="1"
                                                            disabled={!isFoodSelected(food.id)}
                                                        />
                                                    </td>
                                                    <td>{food.description}</td>
                                                    <td>{food.energy !== null ? food.energy : 'N/A'}</td>
                                                    <td>{food.carbohydrate !== null ? food.carbohydrate : 'N/A'}</td>
                                                    <td>{food.protein !== null ? food.protein : 'N/A'}</td>
                                                    <td>{food.total_lipids !== null ? food.total_lipids : 'N/A'}</td>
                                                    <td>{food.dietary_fiber !== null ? food.dietary_fiber : 'N/A'}</td>
                                                    <td>{food.total_sugars !== null ? food.total_sugars : 'N/A'}</td>
                                                    <td>{food.added_sugars !== null ? food.added_sugars : 'N/A'}</td>
                                                    <td>{food.sodium !== null ? food.sodium : 'N/A'}</td>
                                                    <td>{food.potassium !== null ? food.potassium : 'N/A'}</td>
                                                    <td>{food.calcium !== null ? food.calcium : 'N/A'}</td>
                                                    <td>{food.iron !== null ? food.iron : 'N/A'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='button-save'>
                        <button onClick={handleSubmit}>Salvar</button>
                    </div>

                    {showFoodLog && !showHistory && (
                        <div className='foodLogTable'>
                            <FoodLogTable foodLog={foodLog} />
                        </div>
                    )}

                    <div className='buttons-export-graph'>
                        <button onClick={handleFetchFoodLog}>Gerar Histórico de Consumo</button>
                        <button>Gerar Gráfico de Consumo</button>
                    </div>

                    <button onClick={handleCalculateClick} id='show-calculate'>
        {isTableVisible ? 'Ocultar Tabela' : 'mostrar cálculo total de nutrientes'}
      </button>

                    {showHistory && (
                        <>
                            <div className='button-save' style={{ textAlign: 'right' }}>
                                <button onClick={handleCloseHistory}>Fechar</button>
                            </div>
                            <div className='foodLogTable'>
                                <FoodLogTable foodLog={foodLog} />
                            </div>
                        </>
                    )}

                    
                    <div>
      {nutritionalData && isTableVisible ? (
         <table>
         <thead>
           <tr>
             <th>Nutriente</th>
             <th>Quantidade</th>
             <th>Unidade</th>
           </tr>
         </thead>
         <tbody>
         <tr>
         <td>Calorias totais dos alimentos</td>
         <td
    style={{
      color: exceededLimits.energy ? "red" : "white", // Alerta vermelho se exceder o limite
    }}
  >
    {formatNumber(nutritionalData.total_energy_from_foods ?? 0)}
  </td>
  <td>kcal</td>
</tr>
<tr>
  <td>Proteína total dos alimentos</td>
  <td
    style={{
      color: exceededLimits.protein ? "red" : "white", // Alerta vermelho se exceder o limite
    }}
  >
    {formatNumber(nutritionalData.total_protein_from_foods ?? 0)}
  </td>
  <td>g</td>
</tr>
<tr>
  <td>Lípidos totais dos alimentos</td>
  <td
    style={{
      color: exceededLimits.total_lipids ? "red" : "white", // Alerta vermelho se exceder o limite
    }}
  >
    {formatNumber(nutritionalData.total_lipids_from_foods ?? 0)}
  </td>
  <td>g</td>
</tr>
<tr>
  <td>Carboidratos totais dos alimentos</td>
  <td
    style={{
      color: exceededLimits.carbohydrate ? "red" : "white", // Alerta vermelho se exceder o limite
    }}
  >
    {formatNumber(nutritionalData.total_carbohydrate_from_foods ?? 0)}
  </td>
  <td>g</td>
</tr>
<tr>
  <td>Fibra alimentar total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_dietary_fiber_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Colesterol total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_cholesterol_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Ácidos graxos saturados totais dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_saturated_fatty_acids_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácidos graxos monoinsaturados totais dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_monounsaturated_fatty_acids_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácidos graxos poli-insaturados totais dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_polyunsaturated_fatty_acids_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácido linoleico total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_linoleic_acid_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácido linolênico total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_linolenic_acid_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácidos graxos trans totais dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_trans_fatty_acids_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Açúcares totais dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_sugars_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Açúcares adicionados totais dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_added_sugars_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Cálcio total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_calcium_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Magnésio total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_magnesium_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Manganês total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_manganese_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Fósforo total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_phosphorus_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Ferro total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_iron_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Sódio total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_sodium_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Sódio adicionado total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_added_sodium_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Potássio total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_potassium_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Cobre total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_copper_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Zinco total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_zinc_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Selênio total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_selenium_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Retinol total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_retinol_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Vitamina A (RAE) total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_vitamin_A_RAE_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Tiamina total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_thiamin_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Riboflavina total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_riboflavin_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Niacina total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_niacin_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Equivalente de niacina total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_niacin_equivalent_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Piridoxina total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_pyridoxine_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Cobalamina total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_cobalamin_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Ácido fólico total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_folate_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Vitamina D total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_vitamin_D_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Vitamina E total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_vitamin_E_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Vitamina C total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_vitamin_C_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Energia total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_energy_from_products ?? 0)}</td>
  <td>kcal</td>
</tr>
<tr>
  <td>Proteína total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_protein_from_products ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Lípidos totais dos produtos</td>
  <td>{formatNumber(nutritionalData.total_lipids_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Carboidratos totais dos produtos</td>
  <td>{formatNumber(nutritionalData.total_carbohydrate_from_products ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Fibra alimentar total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_dietary_fiber_from_products ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Colesterol total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_cholesterol_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Ácidos graxos saturados totais dos produtos</td>
  <td>{formatNumber(nutritionalData.total_saturated_fatty_acids_from_products ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácidos graxos monoinsaturados totais dos produtos</td>
  <td>{formatNumber(nutritionalData.total_monounsaturated_fatty_acids_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácidos graxos poli-insaturados totais dos produtos</td>
  <td>{formatNumber(nutritionalData.total_polyunsaturated_fatty_acids_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácido linoleico total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_linoleic_acid_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácido linolênico total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_linolenic_acid_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Ácidos graxos trans totais dos produtos</td>
  <td>{formatNumber(nutritionalData.total_trans_fatty_acids_from_products ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Açúcares totais dos produtos</td>
  <td>{formatNumber(nutritionalData.total_sugars_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Açúcares adicionados totais dos produtos</td>
  <td>{formatNumber(nutritionalData.total_added_sugars_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Cálcio total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_calcium_from_products ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Magnésio total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_magnesium_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Manganês total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_manganese_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Fósforo total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_phosphorus_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Ferro total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_iron_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Sódio total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_sodium_from_products ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Sódio adicionado total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_added_sodium_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Potássio total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_potassium_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Cobre total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_copper_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Zinco total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_zinc_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Selênio total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_selenium_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Retinol total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_retinol_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Vitamina A (RAE) total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_vitamin_A_RAE_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Tiamina total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_thiamin_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Riboflavina total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_riboflavin_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Niacina total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_niacin_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Equivalente de niacina total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_niacin_equivalent_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Piridoxina total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_pyridoxine_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Cobalamina total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_cobalamin_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Ácido fólico total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_folate_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Vitamina D total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_vitamin_D_from_foods ?? 0)}</td>
  <td>mcg</td>
</tr>
<tr>
  <td>Vitamina E total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_vitamin_E_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
<tr>
  <td>Vitamina C total dos produtos</td>
  <td>{formatNumber(nutritionalData.total_vitamin_C_from_foods ?? 0)}</td>
  <td>mg</td>
</tr>
         </tbody>
       </table>
      ) : (
        <p></p>
      )}
      
    </div>
                </div>
                
            </div>
        </>
    );
};

export default FoodRegister;
