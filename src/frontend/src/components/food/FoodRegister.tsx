import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './styles/FoodRegister.css';
import axios from 'axios';
import Food, { FoodLog } from '../../types/Food';
import FoodLogTable from './foodLogTable/FoodLogTable';
import GlobalStyles from './styles/GlobalStyles';

const FoodRegister: React.FC = () => {
    const userId = sessionStorage.getItem('id');

    const [currentDate, setCurrentDate] = useState<string>('');
    const [originalDate, setOriginalDate] = useState<string>('');
    const [foodName, setFoodName] = useState('');
    const [foodData, setFoodData] = useState<Food[]>([]);
    const [selectedFoods, setSelectedFoods] = useState<{ foodId: number, quantity: number }[]>([]);
    const [foodLog, setFoodLog] = useState<FoodLog[]>([]);
    const [showFoodLog, setShowFoodLog] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<string>('');

    const mealOptions = ['Café da manhã', 'Lanche da manhã', 'Almoço', 'Lanche da tarde', 'Jantar', 'Ceia'];

    // Função para calcular a soma dos nutrientes e outros dados
    const calculateTotal = (field: keyof Food) => {
        return foodLog.reduce((acc, logItem) => {
            const food = foodData.find(f => f.id === logItem.foodId);
            if (food && food[field] !== null) {
                const quantityFactor = logItem.quantity / 100; // Ajuste da quantidade proporcional ao registro
                return acc + (food[field] as number) * quantityFactor;
            }
            return acc;
        }, 0);
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
            console.error("Error fetching food data:", error);
            setFoodData([]);
        }
    };

    const handleSelectFood = (foodId: number, quantity: number) => {
        setSelectedFoods(prevSelectedFoods => {
            const existingFood = prevSelectedFoods.find(food => food.foodId === foodId);
            if (existingFood) {
                return prevSelectedFoods.map(food => 
                    food.foodId === foodId ? { ...food, quantity } : food
                );
            } else {
                return [...prevSelectedFoods, { foodId, quantity }];
            }
        });
    };

    const handleSubmit = async () => {
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
            setSelectedFoods([]); // Limpa os alimentos selecionados após o registro
            setFoodData([]); // Limpa a tabela de busca após salvar

            // Exibe automaticamente o registro de alimentos após o registro
            handleFetchFoodLog();

        } catch (error) {
            console.error("Erro ao registrar alimentos:", error);
            alert('Erro ao registrar os alimentos.');
        }

        // Desmarcar os checkboxes após o registro
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            (checkbox as HTMLInputElement).checked = false;
        });
    };

    const handleFetchFoodLog = async () => {
        try {
            const response = await axios.get<FoodLog[]>(`http://localhost:3030/api/food/get-food-log/${userId}${originalDate ? `/${originalDate}` : ''}`);
            setFoodLog(response.data);
            setShowFoodLog(true);
        } catch (error) {
            console.error("Erro ao buscar o log de alimentos:", error);
            setFoodLog([]);
        }
    };

    useEffect(() => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        const originalDate = `${year}-${month}-${day}`;
        setCurrentDate(formattedDate);
        setOriginalDate(originalDate);
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
                    <li>Home</li>
                    <li>Missão</li>
                    <li>Planos</li>
                    <li>Receitas</li>
                    <li>Contatos</li>
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
                        onChange={(e) => setFoodName(e.target.value)}  // Corrigido onChange
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
                                type='text' 
                                id='date-eaten' 
                                value={currentDate} 
                                readOnly  
                            />
                        </div>
                        <div className="info-group">
                            
                        </div>
                    </div>

                    
                    {foodData.length > 0 && (
                        <div className="table-scroll-container">
                            <div className="table-header-scroll">
                                <div className="scrollable-table">
                                    <table className="food-table"> {/* Classe adicional para controlar a largura */}
                                        <thead>
                                            <tr className="table-header">
                                                <th>Selecionar</th>
                                                <th>Quantidade</th>
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
                onChange={(e) => handleSelectFood(food.id, e.target.checked ? 100 : 0)}
                className='select-g'
            />
        </td>
        <td>
            <input
                type="number"
                defaultValue={100}
                onChange={(e) => handleSelectFood(food.id, Number(e.target.value))}
                min="1"
                className='select-g'
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

                    {/* Exibe o log de alimentos automaticamente */}
                    {showFoodLog && (
                        <div className='foodLogTable'>
                            <FoodLogTable foodLog={foodLog} />
                        </div>
                    )}

                    {/* Botão para salvar o registro */}
                    <div className='button-save'>
                        <button onClick={handleSubmit}>Salvar</button>
                    </div>

                    {/* Tabela de Soma Total */}
                    {showFoodLog && (
                        <div className="summary-table-container"> 
                            <h2>Soma Total dos Nutrientes</h2>
                            <table className="food-table"> {/* Usando a mesma classe de estilo */}
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
                </div>
            </div>
        </>
    );
};

export default FoodRegister;
