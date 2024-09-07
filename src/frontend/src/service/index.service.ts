import axios from "axios";

const apiUrl = "http://localhost:4000/api/";

interface User {
  username: string;
  email: string;
  password: string;
}

interface ApiResponse {
  message: string;
  // Adicione outros campos se necessário
}

// register the user service
export const registerUser = async (user: User): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${apiUrl}user/register`, user);
    return response.data;
  } catch (error) {
    // Aqui você pode definir uma resposta padrão ou lançar um erro
    throw new Error("Failed to register user");
  }
};

// login the user service
export const loginUser = async (user: User): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${apiUrl}user/login`, user);
    return response.data;
  } catch (error) {
    // Aqui você pode definir uma resposta padrão ou lançar um erro
    throw new Error("Failed to login user");
  }
};