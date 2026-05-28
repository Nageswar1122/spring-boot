import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllProductsApi,
  deleteProductApi,
} from "@/admin/api/productApi";

import { Button } from "@/components/ui/button";

/* ===== SIMPLE SEARCH HELPER ===== */
const searchProducts = (products: any[], query: string) => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
  );
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ===== LOAD PRODUCTS ===== */
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProductsApi();
      setProducts(data);
      setFiltered(data);
    } catch {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ===== SEARCH ===== */
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(products);
    } else {
      setFiltered(searchProducts(products, search));
    }
  }, [search, products]);

  /* ===== DELETE ===== */
  const handleDelete = async (id: number) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      await deleteProductApi(id);
      await loadProducts(); // refresh list
    } catch {
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return <p className="text-muted-foreground">Loading products...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => navigate("/admin/products/add")}>
          Add Product
        </Button>
      </div>

      {/* Search */}
      <input
        placeholder="Search products..."
        className="border p-2 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <p className="text-muted-foreground">No products found</p>
        )}

        {filtered.map((p) => (
          <div key={p.id} className="border p-4 rounded space-y-2">
            <img
              src={p.image || "https://via.placeholder.com/300"}
              alt={p.name}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="font-bold">{p.name}</h2>
            <p className="text-sm text-muted-foreground">{p.category}</p>
            <p className="font-semibold">${p.price}</p>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/admin/products/edit/${p.id}`)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
