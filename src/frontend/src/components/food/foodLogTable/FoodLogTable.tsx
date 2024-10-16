import React from 'react';
import { FoodLog } from '../../../types/Food';

interface FoodLogTableProps {
    foodLog: FoodLog[];
}

const FoodLogTable: React.FC<FoodLogTableProps> = ({ foodLog }) => {
    return (
        <div>
            <h2>Registro de Alimentos Consumidos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Alimento</th>
                        <th>Quantidade (g)</th>
                        <th>Data</th>
                        <th>Refeição</th> 
                    </tr>
                </thead>
                <tbody>
                    {foodLog.map((logItem, index) => (
                        <tr key={index}>
                            <td>{logItem.food_name}</td>
                            <td>{logItem.quantity * 100}g</td>
                            <td>{new Date(logItem.date).toLocaleDateString('pt-BR')}</td>
                            <td>{logItem.meal}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FoodLogTable;
