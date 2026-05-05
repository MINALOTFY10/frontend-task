import { useEffect, useState } from "react";
import { getProductById } from "../services/auth-service";
import type { Product } from "../services/types";

export function useProductDetail(productId: number | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId === null || !Number.isFinite(productId)) {
      setProduct(null);
      setError("Invalid product id");
      return;
    }

    setLoading(true);
    setError(null);

    getProductById(productId)
      .then((data) => {
        setProduct(data);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
}
