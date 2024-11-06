import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.route";
import foodLogRouter from './routes/foodLogRoute';
import productRouter from './routes/productRoute';  // Import the new product route
import { connectDB } from "./config/connectDB";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3030;

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

// Register all routes
app.use("/api/user", userRouter);
app.use("/api/food", foodLogRouter);
app.use("/api", productRouter);  // Use the product router here

// Handle unknown routes
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});
