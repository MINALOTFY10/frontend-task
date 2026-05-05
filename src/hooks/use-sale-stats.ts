import { useState, useEffect } from "react";
import { getCarts } from "../services/auth-service";
import { MONTHS } from "../utils/chart-utils";
interface ChartDataPoint {
  month: string;
  sales: number;
}

export function useSaleStats() {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCarts(80, 0)
      .then(({ carts }) => {
        const perMonth = Math.ceil(carts.length / 12);

        setData(
          MONTHS.map((month, i) => {
            const slice = carts.slice(i * perMonth, (i + 1) * perMonth);
            return {
              month,
              sales: slice.reduce((sum, c) => sum + Math.round(c.total), 0),
            };
          }),
        );
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
