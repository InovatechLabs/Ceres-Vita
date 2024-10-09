import { Router } from "express";
import { addProduct } from "../controllers/productController"; // Correct import

const router = Router();

// Route to add a product
router.post("/add-product", addProduct);

export default router;


/*  -route to log in the products /api/products/add-product
    -JSON should be similar to how it was in the foods route
    -check the table products to see the structure or the SQL Create*/