import axios from "axios";
import { User } from "../types";

const API_URL = "http://localhost:8081/api/profile";

export const getUserProfile = (userId: string) => {
  return axios.get<User>(`${API_URL}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateUserProfile = (userId: string, data: any) => {
  return axios.put<User>(`${API_URL}?userId=${userId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
};
