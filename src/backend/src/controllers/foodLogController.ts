import { Request, Response } from "express";
import { pool } from "../config/connectDB"; // Correct import of pool

// Log the food consumed by a user
export const logFood = async (req: Request, res: Response) => {
  const { foodId, userId, quantity, date, meal } = req.body; // Incluindo o campo 'quantity' corretamente

  try {
    // Adiciona o 'quantity' na query de inserção
    await pool.query(
      "INSERT INTO eat_foods (foods_id, users_id, date, quantity, meal) VALUES ($1, $2, $3, $4, $5)",
      [foodId, userId, date, quantity, meal] // Inclui o valor de 'quantity'
    );
    return res.status(200).json({ message: "Food logged successfully!" });
  } catch (error) {
    console.error("Error logging food:", error);
    return res.status(500).json({ message: "Error logging food", error });
  }
};

// Get the food log for a user based on the date
export const getFoodLog = async (req: Request, res: Response) => {
  const { userId, date } = req.params;

  try {
    let result;

    if (date) {
      // Inclui o campo 'meal' e 'quantity' na consulta SQL
      result = await pool.query(
        `SELECT eat_foods.id AS eat_id, 
                eat_foods.foods_id, 
                foods.description AS food_name, 
                eat_foods.users_id AS user_id, 
                eat_foods.date, 
                eat_foods.quantity, 
                eat_foods.meal  
         FROM eat_foods 
         JOIN foods ON eat_foods.foods_id = foods.id 
         WHERE eat_foods.users_id = $1 AND eat_foods.date = $2`,
        [userId, date]
      );
    } else {
      // Inclui o campo 'meal' e 'quantity' na consulta SQL quando a data não está presente
      result = await pool.query(
        `SELECT eat_foods.id AS eat_id, 
                eat_foods.foods_id, 
                foods.description AS food_name, 
                eat_foods.users_id AS user_id, 
                eat_foods.date, 
                eat_foods.quantity, 
                eat_foods.meal  
         FROM eat_foods 
         JOIN foods ON eat_foods.foods_id = foods.id 
         WHERE eat_foods.users_id = $1`,
        [userId]
      );
    }

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    } else {
      console.log(result.rows);
      return res.status(404).json({ message: "No food logs found for this user." });
    }
  } catch (error) {
    console.error("Error fetching food log:", error);
    return res.status(500).json({ message: "Error fetching food log", error });
  }
};

// Search for a food by name
export const searchFood = async (req: Request, res: Response) => {
  let { name } = req.params; 
  name = name.replace(" ","%");

  try {
    const result = await pool.query(
      "SELECT * FROM foods WHERE description ILIKE $1", 
      [`%${name}%`] 
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ message: "No foods found." });
    }
  } catch (error) {
    console.error("Error searching for food:", error);
    return res.status(500).json({ message: "Error searching for food", error });
  }
};

type FoodPeriod = 'breakfast' | 'morningSnack' | 'lunch' | 'afternoonSnack' | 'dinner';

type Food = {
  id: number;
  description: string;
  carbohydrate: number;
  protein: number;
  total_lipids: number;
  // adicione outros campos relevantes do seu banco
};

type FoodResult = {
  [key in FoodPeriod]: Food[];
};

// Implementação da função
export const getFoodsByDiet = async (req: Request, res: Response) => {
  const { dietType, query } = req.query;

  // Verificar se os parâmetros estão presentes
  if (!query || !dietType) {
    return res.status(400).json({ message: "Por favor, forneça a dieta e a consulta válidas." });
  }

  // Objeto para armazenar os alimentos filtrados por período
  const result: FoodResult = {
    breakfast: [],
    morningSnack: [],
    lunch: [],
    afternoonSnack: [],
    dinner: []
  };
  
  const queries = [
    { period: 'breakfast', query: `SELECT * FROM foods WHERE ${query} ORDER BY RANDOM() LIMIT 3` },
    { period: 'morningSnack', query: `SELECT * FROM foods WHERE ${query} ORDER BY RANDOM() LIMIT 3` },
    { period: 'lunch', query: `SELECT * FROM foods WHERE ${query} ORDER BY RANDOM() LIMIT 3` },
    { period: 'afternoonSnack', query: `SELECT * FROM foods WHERE ${query} ORDER BY RANDOM() LIMIT 3` },
    { period: 'dinner', query: `SELECT * FROM foods WHERE ${query} ORDER BY RANDOM() LIMIT 3` }
];

  try {
    for (const { period, query } of queries) {
      const response = await pool.query(query);  // Executando a consulta com o filtro adequado
      result[period as FoodPeriod] = response.rows; // Armazenando o resultado da consulta
    }

    return res.status(200).json(result);  // Retorna o resultado
  } catch (error) {
    console.error("Erro ao buscar alimentos:", error);
    return res.status(500).json({ message: "Erro ao buscar alimentos", error });
  }
};