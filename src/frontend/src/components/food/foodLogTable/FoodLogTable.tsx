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
                        <th>Refeição</th> {/* Nova coluna para Refeição */}
                    </tr>
                </thead>
                <tbody>
                    {foodLog.map((logItem, index) => (
                        <tr key={index}>
                            <td>{logItem.food_name}</td>
                            <td>{logItem.quantity}g</td>
                            <td>{new Date(logItem.date).toLocaleDateString('pt-BR')}</td>
                            <td>{logItem.meal}</td> {/* Exibe o tipo de refeição */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FoodLogTable;
