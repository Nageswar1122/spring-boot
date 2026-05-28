import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "../pages/Products";

interface Props {
  onAdd: (product: Product) => void;
  onUpdate: (product: Product) => void;
  editingProduct: Product | null;
  onClose: () => void;
}

const ProductForm: React.FC<Props> = ({
  onAdd,
  onUpdate,
  editingProduct,
  onClose,
}) => {
  const [form, setForm] = useState<Product>({
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    brand: "",
    image: "",
  });

  useEffect(() => {
    if (editingProduct) setForm(editingProduct);
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingProduct) {
      onUpdate(form);
    } else {
      onAdd({ ...form, id: Date.now().toString() });
    }
    onClose();
  };

  return (
    <div className="border rounded p-4 space-y-3 bg-background">
      <h2 className="text-lg font-semibold">
        {editingProduct ? "Update Product" : "Add Product"}
      </h2>

      <Input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
      <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <Input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
      <Input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
      <Input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <Input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} />
      <Input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

      <div className="flex gap-2">
        <Button onClick={handleSubmit}>
          {editingProduct ? "Update" : "Add"}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
