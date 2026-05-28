import api from "./axios";

export const adminLoginApi = async (email: string) => {
  const res = await api.post("/admins/login", null, {
    params: { email },
  });
  return res.data;
};
