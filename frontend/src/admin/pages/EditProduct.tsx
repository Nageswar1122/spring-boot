import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByIdApi } from "@/admin/api/productApi";
import { updateProductApi } from "@/admin/api/productApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getProductByIdApi(id).then(setForm);
    }
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await updateProductApi(Number(id), {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
    navigate("/admin/products");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <Input name="name" value={form.name} onChange={handleChange} />
      <Input name="description" value={form.description} onChange={handleChange} />
      <Input name="price" type="number" value={form.price} onChange={handleChange} />
      <Input name="stock" type="number" value={form.stock} onChange={handleChange} />
      <Input name="category" value={form.category} onChange={handleChange} />
      <Input name="brand" value={form.brand} onChange={handleChange} />
      <Input name="image" value={form.image} onChange={handleChange} />

      <Button onClick={handleSubmit}>Update Product</Button>
    </div>
  );
};

export default EditProduct;
