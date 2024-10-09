import { Router } from "express";
import { logProduct } from "../controllers/productLogController";

const router = Router();

// Route for logging products
router.post("/log-product", logProduct);

export default router;