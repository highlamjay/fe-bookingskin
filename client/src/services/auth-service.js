import axios from "axios";

export const axiosJWT = axios.create();

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

export const fetchDetailUser = async (id, access_token) => {
  try {
    const response = await axiosJWT.get(`${API_KEY}/auth/fetch-detail/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch detail user", error);
    throw error;
  }
};


export const fetchAllUser = async (page = 1, limit = 6, sortBy = 'createdAt', sortOrder = 'desc') => {
  try {
    const response = await axiosJWT.get(`${API_KEY}/auth/fetch-all`,
      {
        params: {
            page,
            limit,
            sortBy,
            sortOrder
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all users", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
      const response = await axios.post(
          `${API_KEY}/auth/log-out`, 
          {}, 
          {
              headers: {
                  Authorization: `Bearer ${access_token}`,
              }
          }
      );
      return response.data;
  } catch (error) {
      console.error("Failed to log out user", error);
      throw error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_KEY}/auth/refresh-token`);
    return response.data;
  } catch (error) {
    console.error("Failed to log out account", error); 
    throw error;
  }
};