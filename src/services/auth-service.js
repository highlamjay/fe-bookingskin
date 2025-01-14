import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const loginUser = async (data) => {
    try {
      const response = await axios.post(
        `${API_KEY}/auth/login`, data
      );
      return response.data;
    } catch (error) {
      console.error("Failed to login user", error);
      throw error;
    }
};