import { Request, Response } from 'express';
import { pool } from '../config/connectDB';

export const logProduct = async (req: Request, res: Response) => {
  const {
    users_id,
    description,
    serving_size,
    serving_unit,
    quantity_serving,
    quantity_unit,
    energy,
    protein,
    carbohydrate,
    sugar,
    dietary_fiber,
    total_fat,
    saturated_fat,
    trans_fat,
    calcium,
    sodium,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products (
        users_id,
        description,
        serving_size,
        serving_unit,
        quantity_serving,
        quantity_unit,
        energy,
        protein,
        carbohydrate,
        sugar,
        dietary_fiber,
        total_fat,
        saturated_fat,
        trans_fat,
        calcium,
        sodium
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        users_id,
        description,
        serving_size,
        serving_unit,
        quantity_serving,
        quantity_unit,
        energy,
        protein,
        carbohydrate,
        sugar,
        dietary_fiber,
        total_fat,
        saturated_fat,
        trans_fat,
        calcium,
        sodium,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error logging product:', error);
    res.status(500).json({ message: 'Error logging product', error });
  }
};
