import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const createProduct = async (data) => {
    try {
      const response = await axios.post(
        `${API_KEY}/product/create`, data
      );
      return response.data;
    } catch (error) {
      console.error("Failed to create product", error);
      throw error;
    }
}