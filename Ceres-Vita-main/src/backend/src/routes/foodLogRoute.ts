// src/routes/foodLogRoute.ts
import { Router } from 'express';
import { logFood, getFoodLog, } from '../controllers/foodLogController';
import {calculateNutrients} from '../controllers/calculateCons';

const router = Router();

router.post('/log-food', logFood); // Endpoint to log food
router.get('/get-food-log/:userId/:date', getFoodLog); // Endpoint to fetch food log for a user on a specific date
router.get('/calculate-nutrients/:userId', calculateNutrients);

export default router;