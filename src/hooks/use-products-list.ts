import { useEffect, useState } from "react";
import { getProducts } from "../services/auth-service";
import type { Product } from "../services/types";

export function useProductsList(limit = 60) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProducts(limit, 0)
      .then(({ products: items, total: totalCount }) => {
        setProducts(items);
        setTotal(totalCount);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [limit]);

  return { products, total, loading, error };
}
