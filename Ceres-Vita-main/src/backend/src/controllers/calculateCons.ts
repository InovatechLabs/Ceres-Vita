import { Request, Response } from "express";
import { pool } from "../config/connectDB"; 

// Controller to calculate the total nutrients for a user on a specific date
export const calculateNutrients = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { date } = req.query;

  try {
    const result = await pool.query(
      `SELECT 
        SUM(f.moisture * ef.quantity) AS total_moisture,
        SUM(f.energy * ef.quantity) AS total_energy,
        SUM(f.protein * ef.quantity) AS total_protein,
        SUM(f.lipids * ef.quantity) AS total_lipids,
        SUM(f.cholesterol * ef.quantity) AS total_cholesterol,
        SUM(f.carbohydrate * ef.quantity) AS total_carbohydrate,
        SUM(f.dietary_fiber * ef.quantity) AS total_dietary_fiber,
        SUM(f.ash * ef.quantity) AS total_ash,
        SUM(f.calcium * ef.quantity) AS total_calcium,
        SUM(f.magnesium * ef.quantity) AS total_magnesium,
        SUM(f.manganese * ef.quantity) AS total_manganese,
        SUM(f.phosphorus * ef.quantity) AS total_phosphorus,
        SUM(f.iron * ef.quantity) AS total_iron,
        SUM(f.sodium * ef.quantity) AS total_sodium,
        SUM(f.potassium * ef.quantity) AS total_potassium,
        SUM(f.copper * ef.quantity) AS total_copper,
        SUM(f.zinc * ef.quantity) AS total_zinc,
        SUM(f.retinol * ef.quantity) AS total_retinol,
        SUM(f.re * ef.quantity) AS total_re,
        SUM(f.era * ef.quantity) AS total_era,
        SUM(f.thiamin * ef.quantity) AS total_thiamin,
        SUM(f.riboflavin * ef.quantity) AS total_riboflavin,
        SUM(f.pyridoxine * ef.quantity) AS total_pyridoxine,
        SUM(f.niacin * ef.quantity) AS total_niacin,
        SUM(f.vitamin_c * ef.quantity) AS total_vitamin_c
      FROM eat_foods ef
      JOIN foods f ON ef.foods_id = f.id
      WHERE ef.users_id = $1
      AND ef.date = $2
      GROUP BY ef.users_id, ef.date`,
      [userId, date]
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      return res.status(404).json({ message: "No food logs found for this date." });
    }
  } catch (error) {
    console.error("Error calculating nutrients:", error);
    return res.status(500).json({ message: "Error calculating nutrients", error });
  }
};
