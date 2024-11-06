import { Request, Response } from "express";
import { pool } from "../config/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

const JWT_SECRET = "oI*avJDbf&*28DLxa023k*¨jk(2dA!2lVo4*6VXs2z1"; 

// register a new user
export const register = async (req: Request, res: Response) => {
  try {
    // get the user data from the request body
    const { username, email, password } = req.body;

    // check if user data is provided
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all user details",
      });
    }

    // check if user already exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // execute SQL query to insert user into the database
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
    `;
    await pool.query(query, [username, email, hashedPassword]);

    return res.status(200).json({
      message: "Cadastro realizado com sucesso",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// login a user
export const login = async (req: Request, res: Response): Promise<Response> => {
  const attemptLogin = async (retryCount: number = 0): Promise<Response> => {
    try {
      // get the user data from the request body
      const { email, password } = req.body;

      // check if user data is provided
      if (!email || !password) {
        return res.status(400).json({
          message: "Por favor, forneça todas informações necessárias!",
        });
      }

      // check if user exists
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if (user.rows.length === 0) {
        return res.status(400).json({
          message: "Este usuário não existe",
        });
      }

      // compare the password
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) {
        if (retryCount >= 3) {
          return res.status(400).json({
            message: "Too many invalid attempts",
          });
        }
        // Retry login if password is invalid
        return attemptLogin(retryCount + 1); // Recursive call with an incremented retryCount
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
          username: user.rows[0].username,
          email: user.rows[0].email,
        },
        JWT_SECRET, // Chave secreta
        { expiresIn: "1h" } // Expiração do token
      );

      // Responding with the token and user data
      return res.status(200).json({
        message: "Login bem-sucedido",
        token, 
        user: {
          id: user.rows[0].id,
          username: user.rows[0].username,
          email: user.rows[0].email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  return attemptLogin(); // Start the login attempt
};
