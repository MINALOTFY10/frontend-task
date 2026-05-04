import { useEffect, useState } from "react";
import { getProductCategories } from "../services/auth-service";
import type { ProductCategory } from "../services/types";

export function useProductCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    getProductCategories()
      .then((items) => setCategories(items))
      .catch((err: Error) => new Error(`Failed to fetch Categories: ${err.message}`));
  }, []);

  return categories;
}
