interface NutritionalData {
    total_energy_from_foods: number | null;
    total_protein_from_foods: number | null;
    total_lipids_from_foods: number | null;
    total_carbohydrate_from_foods: number | null;
    total_dietary_fiber_from_foods: number | null;
    total_cholesterol_from_foods: number | null;
    total_saturated_fatty_acids_from_foods: number | null;
    total_monounsaturated_fatty_acids_from_foods: number | null;
    total_polyunsaturated_fatty_acids_from_foods: number | null;
    total_linoleic_acid_from_foods: number | null;
    total_linolenic_acid_from_foods: number | null;
    total_trans_fatty_acids_from_foods: number | null;
    total_sugars_from_foods: number | null;
    total_added_sugars_from_foods: number | null;
    total_calcium_from_foods: number | null;
    total_magnesium_from_foods: number | null;
    total_manganese_from_foods: number | null;
    total_phosphorus_from_foods: number | null;
    total_iron_from_foods: number | null;
    total_sodium_from_foods: number | null;
    total_added_sodium_from_foods: number | null;
    total_potassium_from_foods: number | null;
    total_copper_from_foods: number | null;
    total_zinc_from_foods: number | null;
    total_selenium_from_foods: number | null;
    total_retinol_from_foods: number | null;
    total_vitamin_A_RAE_from_foods: number | null;
    total_thiamin_from_foods: number | null;
    total_riboflavin_from_foods: number | null;
    total_niacin_from_foods: number | null;
    total_niacin_equivalent_from_foods: number | null;
    total_pyridoxine_from_foods: number | null;
    total_cobalamin_from_foods: number | null;
    total_folate_from_foods: number | null;
    total_vitamin_D_from_foods: number | null;
    total_vitamin_E_from_foods: number | null;
    total_vitamin_C_from_foods: number | null;
    total_energy_from_products: number | null;
    total_protein_from_products: number | null;
    total_carbohydrate_from_products: number | null;
    total_sugar_from_products: number | null;
    total_dietary_fiber_from_products: number | null;
    total_fat_from_products: number | null;
    total_saturated_fatty_acids_from_products: number | null;
    total_trans_fatty_acids_from_products: number | null;
    total_calcium_from_products: number | null;
    total_sodium_from_products: number | null;
}

interface NutrientsTableProps {
    data: NutritionalData;
  }

export type {NutrientsTableProps, NutritionalData}