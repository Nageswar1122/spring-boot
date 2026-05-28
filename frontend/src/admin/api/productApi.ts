const ADMIN_BASE_URL = "http://localhost:8081/api/admin/products";
const PUBLIC_BASE_URL = "http://localhost:8081/api/products";

// ================= ADMIN =================

// ADD PRODUCT
export const addProductApi = async (product: any) => {
  const res = await fetch(ADMIN_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

// UPDATE PRODUCT
export const updateProductApi = async (id: number, product: any) => {
  const res = await fetch(`${ADMIN_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

// ✅ DELETE PRODUCT (FIX)
export const deleteProductApi = async (id: number) => {
  const res = await fetch(`${ADMIN_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete product");
  return true;
};

// ================= USER / SHARED =================

// GET ALL PRODUCTS
export const getAllProductsApi = async () => {
  const res = await fetch(PUBLIC_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// GET PRODUCT BY ID
export const getProductByIdApi = async (id: string) => {
  const res = await fetch(`${PUBLIC_BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};
