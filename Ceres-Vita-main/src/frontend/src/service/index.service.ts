import axios from "axios";

const apiUrl = "http://localhost:3030/api/";

interface User {
  username: string;
  email: string;
  password: string;
}

interface ApiResponse {
  message: string;
  token: string;
  user: {
    id: string;   
    username: string;
  };
}

interface UserLogin {
  email: string;
  password: string;
}

// register the user service
export const registerUser = async (user: User): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${apiUrl}user/register`, user);
    return response.data;
  } catch (error) {

    throw new Error("Failed to register user");
  }
};

// login the user service
export const loginUser = async (user: UserLogin): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(`${apiUrl}user/login`, user);
    return response.data;
  } catch (error) {
   
    throw new Error("Failed to login user");
  }
};