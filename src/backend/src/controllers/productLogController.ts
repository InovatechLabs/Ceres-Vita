import { Request, Response } from "express";
import { pool } from "../config/connectDB";

// Log the product consumed by a user
export const logProduct = async (req: Request, res: Response) => {
  const { users_id, products_id, date, quantity } = req.body;

  try {
    await pool.query(
      "INSERT INTO eat_products (users_id, products_id, date, quantity) VALUES ($1, $2, $3, $4)",
      [users_id, products_id, date, quantity]
    );
    return res.status(200).json({ message: "Product logged successfully!" });
  } catch (error) {
    console.error("Error logging product:", error);
    return res.status(500).json({ message: "Error logging product", error });
  }
};
