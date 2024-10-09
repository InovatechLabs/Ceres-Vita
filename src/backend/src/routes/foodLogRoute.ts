// src/routes/foodLogRoute.ts
import { Router } from 'express';
import { logFood, getFoodLog} from '../controllers/foodLogController';
import {calculateNutrients} from '../controllers/calculateCons';

const router = Router();

router.post('/log-food', logFood); // Endpoint to log food
router.get('/get-food-log/:userId/:date', getFoodLog); // Endpoint to fetch food log for a user on a specific date
router.get('/calculate-nutrients/:userId', calculateNutrients);

export default router;

/* tutorial for the routes:
    -database should be named users_auth + used by postgres
    -the route to log-in foods is POST /api/foods/log-food
    -example of the json format:
    {
    "foodId": 76,
    "userId": 1,
    "date": "2024-10-09",
    "quantity": 1
    }
    -the route to check the sum is /api/food/calculate-nutrients:id?date=xxxx-xx-xx
    -this way it opens the sum of everything the user logged in the eat_foods of that given date*/