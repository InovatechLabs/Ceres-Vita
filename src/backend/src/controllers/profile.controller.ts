import { Request, Response } from "express";
import { pool } from "../config/connectDB"; // ajuste para o caminho correto do seu pool de conexão

export const saveProfile = async (req: Request, res: Response) => {
  const { birth_date, weight, height, sex, userId } = req.body;

  if (!birth_date || !weight || !height || !sex || !userId) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const query = `
      INSERT INTO profiles (users_id, birth_date, weight, height, sex)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [userId, birth_date, weight, height, sex];
    
    const result = await pool.query(query, values);
    
    // Verifique se o perfil foi salvo e retorne um sucesso
    if (result && result.rowCount && result.rowCount > 0) {
      return res.status(201).json({ message: "Perfil salvo com sucesso", profile: result.rows[0] });
    } else {
      return res.status(500).json({ message: "Erro ao salvar o perfil" });
    }
  } catch (error) {
    console.error("Erro ao salvar perfil:", error);
    return res.status(500).json({ message: "Erro no servidor ao salvar perfil" });
  }
};

export const deleteProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "O ID do usuário é obrigatório" });
  }

  try {
    const query = `
      DELETE FROM profiles WHERE users_id = $1
    `;
    const values = [userId];
    
    const result = await pool.query(query, values);
    
   
    if (result.rowCount && result.rowCount !== null && result.rowCount > 0) {
      return res.status(200).json({ message: "Perfil excluído com sucesso" });
    } else {
      return res.status(404).json({ message: "Perfil não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao excluir perfil:", error);
    return res.status(500).json({ message: "Erro no servidor ao excluir perfil" });
  }
};

export const verifyProfile = async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "Forneça seu ID." });
    }  
    try {
       
        const query = `
            SELECT username, email FROM users WHERE id = $1
        `;

        const result = await pool.query(query, [userId]);
        console.log(result.rows[0])

        if (result && result.rowCount && result.rowCount > 0) {
            return res.status(200).json({ message: "Dados encontrados", userinfo: result.rows[0] });
            
        } else {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao consultar dados:", error);
        return res.status(500).json({ message: "Erro ao consultar dados" });
    }
};

export const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.params; // Pega o userId da rota

  if (!userId) {
      return res.status(400).json({ message: "Forneça seu ID." });
  }

  try {
      const query = `
          SELECT birth_date, weight, height, sex FROM profiles WHERE users_id = $1
      `;

      const result = await pool.query(query, [userId]);

      if (result && result.rowCount && result.rowCount > 0) {
          return res.status(200).json({ message: "Perfil encontrado", profile: result.rows[0] });
      } else {
          return res.status(404).json({ message: "Perfil não encontrado" });
      }
  } catch (error) {
      console.error("Erro ao consultar perfil:", error);
      return res.status(500).json({ message: "Erro ao consultar perfil" });
  }
};