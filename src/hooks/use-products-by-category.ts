import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../services/auth-service";
import type { Product } from "../services/types";

export function useProductsByCategory(categorySlug: string, limit = 100) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const data = categorySlug && categorySlug !== "all" ? getProductsByCategory(categorySlug, limit, 0) : getProducts(limit, 0);

    data
      .then(({ products: items }) => {
        setProducts(items);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [categorySlug, limit]);

  return { products, loading, error };
}
