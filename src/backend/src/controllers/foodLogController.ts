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

  console.log("UserID:", userId);
  console.log("Date:", date);

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
