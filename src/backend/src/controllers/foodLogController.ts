import { Request, Response } from "express";
import { pool } from "../config/connectDB"; // Correct import of pool

// Log the food consumed by a user
export const logFood = async (req: Request, res: Response) => {
  const { foodId, userId, quantity, date } = req.body; // Now includes date

  try {
    // Use pool.query for making the SQL query
    await pool.query(
      "INSERT INTO eat_foods (foods_id, users_id, date, quantity) VALUES ($1, $2, $3, $4)",
      [foodId, userId, date, quantity] // Now using the provided date
    );
    return res.status(200).json({ message: "Food logged successfully!" });
  } catch (error) {
    console.error("Error logging food:", error);
    return res.status(500).json({ message: "Error logging food", error });
  }
};

// Get the food log for a user based on the date
export const getFoodLog = async (req: Request, res: Response) => {
  const { userId } = req.params; // Assume userId is passed as a URL parameter
  const { date } = req.query; // Date can be passed as a query parameter

  try {
    // SQL query to fetch the logged food data based on userId and date
    const result = await pool.query(
      "SELECT f.name, ufl.quantity FROM eat_foods ufl JOIN foods f ON ufl.foods_id = f.id WHERE ufl.users_id = $1 AND ufl.date::date = $2",
      [userId, date]
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ message: "No food logs found for this date." });
    }
  } catch (error) {
    console.error("Error fetching food log:", error);
    return res.status(500).json({ message: "Error fetching food log", error });
  }
};

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

export const eatFoodsRegister = async (req:Request, res:Response) => {

  const { foods_id, users_id, date, quantity } = req.body;
  
  // Define quantidade padrão como 100g se não informada
  const finalQuantity = quantity || 100;

  const query = `
    INSERT INTO eat_foods (foods_id, users_id, date, quantity)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [foods_id, users_id, date, finalQuantity];

  pool.query(query, values)
    .then(() => res.status(201).json({ message: 'Alimento consumido registrado com sucesso' }))
    .catch(error => {
      console.error('Erro ao salvar o alimento consumido:', error);
      res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
    });
};
