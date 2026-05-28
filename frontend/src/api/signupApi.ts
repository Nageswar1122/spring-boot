import api from "./axios";

export const signupUser = async (data) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};
