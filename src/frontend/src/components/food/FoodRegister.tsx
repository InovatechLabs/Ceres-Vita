import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './styles/FoodRegister.css';
import axios from 'axios';
import Food  from '../../types/Food';

const FoodRegister: React.FC = () => {
        const userId = sessionStorage.getItem('id');
        

        const [currentDate, setCurrentDate] = useState<string>('');
        const [foodName, setFoodName] = useState('');
        const [foodData, setFoodData] = useState<Food[]>([]);
        const [foods, setFoods] = useState([]);
        const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);

        const handleSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/api/food/search-food/${foodName}`);
                console.log(response.data); 
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

      
        useEffect(() => {
            const date = new Date();
            // Obtém o dia, mês e ano
            const day = String(date.getDate()).padStart(2, '0'); 
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const year = date.getFullYear();
        
            // Formata a data como 'DD/MM/YYYY'
            const formattedDate = `${day}/${month}/${year}`;
            setCurrentDate(formattedDate);
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
                  onChange={(e) => setFoodName(e.target.value)} 
                />
                <div className="food-buttons">
                  <button className="food-button" onClick={handleSearch}>Alimento</button>
                  <button className="food-product">Produto</button>
                </div>
                
              
                {foodData.length > 0 && (
  <div className="table-scroll-container"> 
  <div className="table-header-scroll">
    <div className="scrollable-table">
  <table>
  <thead>
    <tr className="table-header">
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
      <th>Magnésio</th>
      <th>Vitamina C</th>
      <th>Vitamina A</th>
      <th>Vitamina D</th>
      <th>Vitamina E</th>
      <th>Tiamina</th>
      <th>Riboflavina</th>
      <th>Niacina</th>
      <th>Folato</th>
      <th>Piridoxina</th>
      <th>Colesterol</th>
    </tr>
  </thead>
  <tbody>
    {foodData.map(food => (
      <tr key={food.id}>
        <td>
        <input
          type="checkbox"
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
        <td>{food.magnesium !== null ? food.magnesium : 'N/A'}</td>
        <td>{food.vitamin_c !== null ? food.vitamin_c : 'N/A'}</td>
        <td>{food.vitamin_a_rae !== null ? food.vitamin_a_rae : 'N/A'}</td>
        <td>{food.vitamin_d !== null ? food.vitamin_d : 'N/A'}</td>
        <td>{food.vitamin_e !== null ? food.vitamin_e : 'N/A'}</td>
        <td>{food.thiamin !== null ? food.thiamin : 'N/A'}</td>
        <td>{food.riboflavin !== null ? food.riboflavin : 'N/A'}</td>
        <td>{food.niacin !== null ? food.niacin : 'N/A'}</td>
        <td>{food.folate !== null ? food.folate : 'N/A'}</td>
        <td>{food.pyridoxine !== null ? food.pyridoxine : 'N/A'}</td>
        <td>{food.cholesterol !== null ? food.cholesterol : 'N/A'}</td>
        
      </tr>
    ))}
  </tbody>
</table>
</div>
</div>
</div>
                )}
        
                <div className="food-infos">
                  <div className="info-group">
                    <label htmlFor='date-eaten' id='date-eaten-label'>Data de Consumo:</label>
                    <input type='text' id='date-eaten' value={currentDate} />
                  </div>
                  <div className="info-group">
                    <label htmlFor='quantity' id='quantity-label'>Quantidade (padrão: 100g):</label>
                    <input type='text' id='quantity' /> 
                  </div>
                </div>
        
                <div className='button-save'>
                  <button >Salvar</button>
                </div>
              </div>
            </div>
    
            </>
          );
        };
        
        export default FoodRegister;

        