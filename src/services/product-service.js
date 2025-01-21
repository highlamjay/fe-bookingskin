import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const createProduct = async (data, access_token) => {
    try {
        const response = await axios.post(
            `${API_KEY}/product/create`,
            data, // Gửi dữ liệu sản phẩm như bình thường
            {
                headers: {
                    Authorization: `Bearer ${access_token}`, // Gửi token trong headers
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Failed to create product", error.response?.data || error.message); // Log chi tiết lỗi
        throw error;
    }
};

