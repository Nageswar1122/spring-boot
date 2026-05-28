import axios from "axios";

export const fetchCategories = async () => {
  const res = await axios.get("http://localhost:8081/api/categories");
  return res.data;
};
