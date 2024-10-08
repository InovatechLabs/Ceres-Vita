import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './styles/FoodRegister.css';
import axios from 'axios';
import Food  from '../../types/Food';

const FoodRegister: React.FC = () => {

        const [currentDate, setCurrentDate] = useState<string>('');
        const [foodName, setFoodName] = useState('');
        const [foodData, setFoodData] = useState<any[]>([]);

        const handleSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/api/food/search-food/${foodName}`);
                console.log(response.data); 
                if (Array.isArray(response.data)) {
                  setFoodData(response.data);
                } else {
                  // Trate o caso em que a resposta não é um array
                  console.error("Resposta não é um array:", response.data);
                  setFoodData([]); // Ou outra lógica que você quiser aplicar
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
  <table>
    <thead>
      <tr className="table-header">
        <th>Nome</th>
        <th>Calorias</th>
        <th>Proteínas</th>
        <th>Umidade</th>
        <th>Carboidratos</th>
        <th>Lipídios</th>
        <th>Colesterol</th>
        <th>Fibra Dietética</th>
        <th>Vitamina C</th>
        <th>Sódio</th>
        <th>Potássio</th>
        <th>Cálcio</th>
        <th>Ferro</th>
        <th>Magnésio</th>
        
      </tr>
    </thead>
    <tbody>
      {foodData.map(food => (
        <tr key={food.id}>
          <td>{food.description}</td> 
          <td>{food.energy}</td>
          <td>{food.protein}</td>
          <td>{food.moisture}</td>
          <td>{food.carbohydrate}</td>
          <td>{food.lipids}</td>
          <td>{food.cholesterol !== null ? food.cholesterol : 'N/A'}</td>
          <td>{food.dietary_fiber !== null ? food.dietary_fiber : 'N/A'}</td>
          <td>{food.vitamin_c !== null ? food.vitamin_c : 'N/A'}</td>
          <td>{food.sodium !== null ? food.sodium : 'N/A'}</td>
          <td>{food.potassium}</td>
          <td>{food.calcium}</td>
          <td>{food.iron}</td>
          <td>{food.magnesium}</td>
          {/* Adicione mais colunas conforme necessário */}
        </tr>
      ))}
    </tbody>
  </table>
                )}
        
                <div className="food-infos">
                  <div className="info-group">
                    <label htmlFor='date-eaten' id='date-eaten-label'>Data de Consumo:</label>
                    <input type='text' id='date-eaten' value={currentDate} />
                  </div>
                  <div className="info-group">
                    <label htmlFor='quantity' id='quantity-label'>Quantidade (gramas):</label>
                    <input type='text' id='quantity' />
                  </div>
                </div>
        
                <div className='button-save'>
                  <button>Salvar</button>
                </div>
              </div>
            </div>
            </>
          );
        };
        
        export default FoodRegister;

        