import { useState, useEffect } from "react";
import { getProducts } from "../services/auth-service";

interface KpiStats {
  grossRevenue: number;
  avgOrderValue: number;
  totalOrders: number;
}

export function usePreformanceStats() {
  const [stats, setStats] = useState<KpiStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProducts(100, 0)
      .then((data) => {
        const prices = data.products.map((p) => p.price);
        const revenue = prices.reduce((sum, p) => sum + p, 0);
        setStats({
          grossRevenue: revenue,
          avgOrderValue: revenue / 100,
          totalOrders: data.total,
        });
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading, error };
}
