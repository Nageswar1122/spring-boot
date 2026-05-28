import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addProductApi } from "@/admin/api/productApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    stock: "",
    category: "",
    brand: "",
    image: "",
    images: "",
    features: "",
    sellerId: "",
    rating: "",
    reviewCount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const payload = {
      ...form,

      price: Number(form.price),
      originalPrice: Number(form.originalPrice || form.price),
      stock: Number(form.stock),
      rating: Number(form.rating || 0),
      reviewCount: Number(form.reviewCount || 0),

      // ✅ SAFE conversion (string OR array)
      images: Array.isArray(form.images)
        ? form.images
        : form.images
        ? form.images.split(",").map(i => i.trim())
        : [],

      features: Array.isArray(form.features)
        ? form.features
        : form.features
        ? form.features.split(",").map(f => f.trim())
        : [],

      // ✅ REQUIRED by backend
      sellerId: form.sellerId || "ADMIN",
    };

    await addProductApi(payload);

    alert("Product added successfully");
    navigate("/admin/products");

  } catch (err: any) {
    alert(err?.response?.data || "Failed to add product");
  }
};

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Add Product</h1>

      <Input name="name" placeholder="Product Name" onChange={handleChange} />
      <Input name="description" placeholder="Description" onChange={handleChange} />

      <Input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <Input
        name="originalPrice"
        type="number"
        placeholder="Original Price"
        onChange={handleChange}
      />

      <Input name="stock" type="number" placeholder="Stock" onChange={handleChange} />
      <Input name="category" placeholder="Category" onChange={handleChange} />
      <Input name="brand" placeholder="Brand" onChange={handleChange} />

      <Input name="image" placeholder="Main Image URL" onChange={handleChange} />
      <Input
        name="images"
        placeholder="Extra Images (comma separated)"
        onChange={handleChange}
      />

      <Input
        name="features"
        placeholder="Features (comma separated)"
        onChange={handleChange}
      />

      <Input name="sellerId" placeholder="Seller ID" onChange={handleChange} />

      <Input name="rating" type="number" placeholder="Rating" onChange={handleChange} />
      <Input
        name="reviewCount"
        type="number"
        placeholder="Review Count"
        onChange={handleChange}
      />

      <div className="flex gap-2">
        <Button type="submit">Save Product</Button>
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddProduct;
