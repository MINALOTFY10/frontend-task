import { useEffect, useState } from "react";
import { getProducts } from "../services/auth-service";
import type { Product } from "../services/types";

export function useProductsList(limit = 60) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts(limit, 0)
      .then(({ products: items, total: totalCount }) => {
        setProducts(items);
        setTotal(totalCount);
      })
      .catch((err: Error) => new Error(`Failed to fetch Products: ${err.message}`));
  }, [limit]);

  return { products, total };
}
