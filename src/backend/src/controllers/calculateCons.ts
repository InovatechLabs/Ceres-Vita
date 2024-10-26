import { Request, Response } from "express";
import { pool } from "../config/connectDB"; 

// Controller to calculate the total nutrients for a user on a specific date
export const calculateNutrients = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { date } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
        SUM(f.energy * ef.quantity) AS total_energy_from_foods,
        SUM(f.protein * ef.quantity) AS total_protein_from_foods,
        SUM(f.total_lipids * ef.quantity) AS total_lipids_from_foods,
        SUM(f.carbohydrate * ef.quantity) AS total_carbohydrate_from_foods,
        SUM(f.dietary_fiber * ef.quantity) AS total_dietary_fiber_from_foods,
        SUM(f.cholesterol * ef.quantity) AS total_cholesterol_from_foods,
        SUM(f.saturated_fatty_acids * ef.quantity) AS total_saturated_fatty_acids_from_foods,
        SUM(f.monounsaturated_fatty_acids * ef.quantity) AS total_monounsaturated_fatty_acids_from_foods,
        SUM(f.polyunsaturated_fatty_acids * ef.quantity) AS total_polyunsaturated_fatty_acids_from_foods,
        SUM(f.linoleic_acid * ef.quantity) AS total_linoleic_acid_from_foods,
        SUM(f.linolenic_acid * ef.quantity) AS total_linolenic_acid_from_foods,
        SUM(f.trans_fatty_acids * ef.quantity) AS total_trans_fatty_acids_from_foods,
        SUM(f.total_sugars * ef.quantity) AS total_sugars_from_foods,
        SUM(f.added_sugars * ef.quantity) AS total_added_sugars_from_foods,
        SUM(f.calcium * ef.quantity) AS total_calcium_from_foods,
        SUM(f.magnesium * ef.quantity) AS total_magnesium_from_foods,
        SUM(f.manganese * ef.quantity) AS total_manganese_from_foods,
        SUM(f.phosphorus * ef.quantity) AS total_phosphorus_from_foods,
        SUM(f.iron * ef.quantity) AS total_iron_from_foods,
        SUM(f.sodium * ef.quantity) AS total_sodium_from_foods,
        SUM(f.added_sodium * ef.quantity) AS total_added_sodium_from_foods,
        SUM(f.potassium * ef.quantity) AS total_potassium_from_foods,
        SUM(f.copper * ef.quantity) AS total_copper_from_foods,
        SUM(f.zinc * ef.quantity) AS total_zinc_from_foods,
        SUM(f.selenium * ef.quantity) AS total_selenium_from_foods,
        SUM(f.retinol * ef.quantity) AS total_retinol_from_foods,
        SUM(f.vitamin_A_RAE * ef.quantity) AS total_vitamin_A_RAE_from_foods,
        SUM(f.thiamin * ef.quantity) AS total_thiamin_from_foods,
        SUM(f.riboflavin * ef.quantity) AS total_riboflavin_from_foods,
        SUM(f.niacin * ef.quantity) AS total_niacin_from_foods,
        SUM(f.niacin_equivalent * ef.quantity) AS total_niacin_equivalent_from_foods,
        SUM(f.pyridoxine * ef.quantity) AS total_pyridoxine_from_foods,
        SUM(f.cobalamin * ef.quantity) AS total_cobalamin_from_foods,
        SUM(f.folate * ef.quantity) AS total_folate_from_foods,
        SUM(f.vitamin_D * ef.quantity) AS total_vitamin_D_from_foods,
        SUM(f.vitamin_E * ef.quantity) AS total_vitamin_E_from_foods,
        SUM(f.vitamin_C * ef.quantity) AS total_vitamin_C_from_foods,
        
        SUM(p.energy * ep.quantity) AS total_energy_from_products,
        SUM(p.protein * ep.quantity) AS total_protein_from_products,
        SUM(p.carbohydrate * ep.quantity) AS total_carbohydrate_from_products,
        SUM(p.sugar * ep.quantity) AS total_sugar_from_products,
        SUM(p.dietary_fiber * ep.quantity) AS total_dietary_fiber_from_products,
        SUM(p.total_fat * ep.quantity) AS total_fat_from_products,
        SUM(p.saturated_fat * ep.quantity) AS total_saturated_fatty_acids_from_products,
        SUM(p.trans_fat * ep.quantity) AS total_trans_fatty_acids_from_products,
        SUM(p.calcium * ep.quantity) AS total_calcium_from_products,
        SUM(p.sodium * ep.quantity) AS total_sodium_from_products
      FROM eat_foods ef
      JOIN foods f ON ef.foods_id = f.id
      LEFT JOIN eat_products ep ON ef.users_id = ep.users_id AND ef.date = ep.date
      LEFT JOIN products p ON ep.products_id = p.id
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
