import { useState, useEffect } from "react";
import { getProducts } from "../services/auth-service";

interface KpiStats {
  grossRevenue: number;
  avgOrderValue: number;
  totalOrders: number;
}

export function usePreformanceStats() {
  const [stats, setStats] = useState<KpiStats | null>(null);

  useEffect(() => {
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
      .catch((err: Error) => new Error(`Failed to fetch Preformance stats: ${err.message}`));
  }, []);

  return { stats };
}
