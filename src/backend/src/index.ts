import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.route";
import { connectDB } from "./config/connectDB";
import foodLogRouter from './routes/foodLogRoute';
import productsRouter from './routes/productsRoute';
import productLogRouter from './routes/productLogRoute';

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all requests
app.use(morgan("dev")); // Log all requests to the console

// Get the PORT from the environment variables
// Add PORT=3030 to the .env file if not already present
const PORT = process.env.PORT || 3030;

// Basic route
app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "Welcome to Ceres Vita",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// User routes
app.use("/api/user", userRouter);

// Food log routes
app.use('/api/food', foodLogRouter); // Ensure this comes before the unknown route handler
console.log("Food routes registered");

// Register the products routes
app.use("/api/products", productsRouter);

// Product log routes
app.use('/api/product', productLogRouter);

// Unknown route handler
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB(); // Connect to the database
});
