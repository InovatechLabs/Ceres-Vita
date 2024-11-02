import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './styles/FoodRegister.css';
import axios from 'axios';
import Food, { FoodLog } from '../../types/Food';
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

    const toggleTableVisibility = () => {
        setIsTableVisible((prev) => !prev);
      };

    const [nutritionalData, setNutritionalData] = useState<NutritionalData | null>(null);

    const formatNumber = (num: number) => {
        return num !== null ? num.toFixed(2) : 0; 
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3030/api/food/calculate-nutrients/1/2024-10-25'); 
                const data: NutritionalData = await response.json();
                setNutritionalData(data);
                console.log(data)
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setNutritionalData(null); // ou lidar com erro de outra forma
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate(); // Hook de navegação

    const handleRegisterClick = () => {
        navigate('/home'); // Redireciona para a rota /home
    };

    const mealOptions = ['Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar', 'Ceia'];

    const calculateTotal = (field: keyof Food) => {
        return selectedFoods.reduce((acc, selectedFood) => {
            const food = foodData.find(f => f.id === selectedFood.foodId);
            if (food && food[field] !== null) {
                const quantityFactor = selectedFood.quantity / 100;
                return acc + (food[field] as number) * quantityFactor;
            }
            return acc;
        }, 0);
    };

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
        setSelectedFoods(prevSelectedFoods => {
            if (selected) {
                const existingFood = prevSelectedFoods.find(food => food.foodId === foodId);
                if (existingFood) {
                    // Atualiza a quantidade
                    return prevSelectedFoods.map(food => food.foodId === foodId ? { ...food, quantity } : food);
                } else {
                    // Adiciona novo alimento com quantidade
                    return [...prevSelectedFoods, { foodId, quantity }];
                }
            } else {
                // Remove o alimento da lista de selecionados
                return prevSelectedFoods.filter(food => food.foodId !== foodId);
            }
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
                    </div>

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

                    <button onClick={toggleTableVisibility} id='show-calculate'>
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

                    {showFoodLog && (
                        <div className="summary-table-container">
                            <h2>Soma Total dos Nutrientes</h2>
                            <table className="food-table">
                                <thead>
                                    <tr>
                                        <th>Calorias</th>
                                        <th>Carboidratos (g)</th>
                                        <th>Proteínas (g)</th>
                                        <th>Lipídios (g)</th>
                                        <th>Fibra Dietética (g)</th>
                                        <th>Açúcares Totais (g)</th>
                                        <th>Sódio (mg)</th>
                                        <th>Potássio (mg)</th>
                                        <th>Cálcio (mg)</th>
                                        <th>Ferro (mg)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{calculateTotal('energy')}</td>
                                        <td>{calculateTotal('carbohydrate')}</td>
                                        <td>{calculateTotal('protein')}</td>
                                        <td>{calculateTotal('total_lipids')}</td>
                                        <td>{calculateTotal('dietary_fiber')}</td>
                                        <td>{calculateTotal('total_sugars')}</td>
                                        <td>{calculateTotal('sodium')}</td>
                                        <td>{calculateTotal('potassium')}</td>
                                        <td>{calculateTotal('calcium')}</td>
                                        <td>{calculateTotal('iron')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
  <td>{formatNumber(nutritionalData.total_energy_from_foods ?? 0)}</td>
  <td>kcal</td>
</tr>
<tr>
  <td>Proteína total dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_protein_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Lípidos totais dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_lipids_from_foods ?? 0)}</td>
  <td>g</td>
</tr>
<tr>
  <td>Carboidratos totais dos alimentos</td>
  <td>{formatNumber(nutritionalData.total_carbohydrate_from_foods ?? 0)}</td>
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
