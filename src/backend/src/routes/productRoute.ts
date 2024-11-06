import express from 'express';
import { logProduct } from '../controllers/productController';
import { logProductConsumption } from '../controllers/eatProductsController';

const router = express.Router();

router.post('/products', logProduct);
router.post('/eat-products', logProductConsumption);

export default router;
