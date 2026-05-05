import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../services/auth-service";
import type { Product } from "../services/types";

export function useProductsByCategory(categorySlug: string, limit = 100) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = categorySlug && categorySlug !== "all"
      ? getProductsByCategory(categorySlug, limit, 0)
      : getProducts(limit, 0);

    data
      .then(({ products: items, total: totalCount }) => {
        setProducts(items);
        setTotal(totalCount);
      })
      .catch((err: Error) => new Error(`Failed to fetch Products: ${err.message}`));
  }, [categorySlug, limit]);

  return { products, total };
}
