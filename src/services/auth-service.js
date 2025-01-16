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
}

export const registerUser = async (data) => {
    try {
      const response = await axios.post(
        `${API_KEY}/auth/register`, data
      );
      return response.data;
    } catch (error) {
      console.error("Failed to register user", error);
      throw error;
    }
};

export const forgotPassword = async (email, data) => {
  try {
    const response = await axios.post(
      `${API_KEY}/auth/forgot-password?email=${email}`, data
    );
    return response.data;
  } catch (error) {
    console.error("Failed to forgot password user", error);
    throw error;
  }
};