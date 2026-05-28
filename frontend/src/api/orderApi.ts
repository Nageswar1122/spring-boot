import axios from "axios";

const API_URL = "http://localhost:8081/api/orders"; // backend URL

// ✅ Get orders of a user
export const getOrdersByUser = (userId: number, token: string) => {
  return axios.get(`${API_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Cancel an order
export const cancelOrderApi = (orderId: number, userId: number, token: string) => {
  return axios.post(
    `${API_URL}/${orderId}/cancel`,
    null,
    {
      params: { userId },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
