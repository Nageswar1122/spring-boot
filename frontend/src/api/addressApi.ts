import axios from "axios";

const API_URL = "http://localhost:8081/api/address";

export const updateAddressApi = (userId: number, data: any) => {
  return axios.put(`${API_URL}?userId=${userId}`, data);
};
