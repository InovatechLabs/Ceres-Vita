import { Request, Response } from "express";

// registrar novo usuario
export const register = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// logar um usuario
export const login = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};