import { useEffect, useState } from "react";
import { fetchCategories } from "@/api/categoryApi";

import { Category } from "@/types";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => (
        <div key={cat.categoryid} className="border p-4 rounded text-center">
          <div className="text-3xl">{cat.icon}</div>
          <h3 className="font-medium">{cat.name}</h3>
          <p className="text-sm text-muted-foreground">
            {cat.productCount} products
          </p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
