import { useEffect, useState } from "react";
import { getProductCategories } from "../services/auth-service";
import type { ProductCategory } from "../services/types";

export function useProductCategories() {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProductCategories()
      .then((items) => setCategories(items))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}