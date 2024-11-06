import { Request, Response } from 'express';
import { pool } from '../config/connectDB';

export const logProductConsumption = async (req: Request, res: Response) => {
  const { users_id, products_id, date, quantity, meal } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO eat_products (users_id, products_id, date, quantity, meal)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [users_id, products_id, date, quantity, meal]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error logging product consumption:', error);
    res.status(500).json({ message: 'Error logging product consumption' });
  }
};
