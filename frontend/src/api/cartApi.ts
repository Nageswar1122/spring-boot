import axios from "axios";

const API_URL = "http://localhost:8081/api/cart"; // backend URL with port 8081

// ✅ Get cart summary
export const getCartSummary = (userId: number) => {
  return axios.get(`${API_URL}/${userId}/summary`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ✅ Add product to cart
export const addToCartApi = (userId: number, productId: number, quantity: number) => {
  return axios.post(`${API_URL}/${userId}/add/${productId}?quantity=${quantity}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ✅ Update product quantity
export const updateCartQuantityApi = (userId: number, productId: number, quantity: number) => {
  return axios.put(`${API_URL}/update/${userId}/${productId}?quantity=${quantity}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// ✅ Clear cart
export const clearCartApi = (userId: number) => {
  return axios.delete(`${API_URL}/${userId}/clear`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
