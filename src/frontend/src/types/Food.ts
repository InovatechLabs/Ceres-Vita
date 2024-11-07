export default interface Food {
  id: number;
  code: number;
  description: string;
  category: string;
  preparation_code: string;
  preparation_description: string;
  energy: number | null;
  protein: number | null;
  total_lipids: number | null;
  carbohydrate: number | null;
  dietary_fiber: number | null;
  cholesterol: number | null;
  saturated_fatty_acids: number | null;
  monounsaturated_fatty_acids: number | null;
  polyunsaturated_fatty_acids: number | null;
  linoleic_acid: number | null;
  linolenic_acid: number | null;
  trans_fatty_acids: number | null;
  total_sugars: number | null;
  added_sugars: number | null;
  calcium: number | null;
  magnesium: number | null;
  manganese: number | null;
  phosphorus: number | null;
  iron: number | null;
  sodium: number | null;
  added_sodium: number | null;
  potassium: number | null;
  copper: number | null;
  zinc: number | null;
  selenium: number | null;
  retinol: number | null;
  vitamin_a_rae: number | null;
  thiamin: number | null;
  riboflavin: number | null;
  niacin: number | null;
  niacin_equivalent: number | null;
  pyridoxine: number | null;
  cobalamin: number | null;
  folate: number | null;
  vitamin_d: number | null;
  vitamin_e: number | null;
  vitamin_c: number | null;
}

export interface NutrientTotals {
  energy: number;
  protein: number;
  totalLipids: number;
  carbohydrate: number;
  dietaryFiber: number;
  
}

export interface SelectedFood {
  foodId: number;
  quantity: number;
}

export interface FoodLog {
  foods_id: number;
  meal: ReactNode;
  food_name: string;
  foodId: number;
  quantity: number;
  date: string; 
}