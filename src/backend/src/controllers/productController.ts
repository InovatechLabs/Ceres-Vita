import { Request, Response } from "express";
import { pool } from "../config/connectDB"; // Correct import of pool

// Add a new product
export const addProduct = async (req: Request, res: Response) => {
  const { users_id, description, serving_size, serving_unit, quantity_serving, quantity_unit, energy, protein, carbohydrate, sugar, dietary_fiber, total_fat, saturated_fat, trans_fat, calcium, sodium } = req.body;

  try {
    await pool.query(
      `INSERT INTO products (users_id, description, serving_size, serving_unit, quantity_serving, quantity_unit, energy, protein, carbohydrate, sugar, dietary_fiber, total_fat, saturated_fat, trans_fat, calcium, sodium) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [users_id, description, serving_size, serving_unit, quantity_serving, quantity_unit, energy, protein, carbohydrate, sugar, dietary_fiber, total_fat, saturated_fat, trans_fat, calcium, sodium]
    );
    return res.status(200).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Error adding product", error });
  }
};