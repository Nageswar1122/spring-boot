import api from "./axios";

/* =======================
   SIGNUP
   ======================= */
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/signup", {
    name,
    email,
    password,
  });
  return response.data;
};

/* =======================
   LOGIN
   ======================= */
export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data; // expects { token }
};
