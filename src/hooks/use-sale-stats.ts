import { useState, useEffect } from "react";
import { get } from "../services/api-client";
import { MONTHS } from "../utils/chart-utils";

interface Cart {
  id: number;
  total: number;
  discountedTotal: number;
}

interface CartsResponse {
  carts: Cart[];
}

interface ChartDataPoint {
  month: string;
  sales: number;
}

interface useSaleStatsReturn {
  data: ChartDataPoint[];
  performance: number;
}

export function useSaleStats(): useSaleStatsReturn {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [performance, setPerformance] = useState(0);

  useEffect(() => {
    get<CartsResponse>("/carts?limit=0").then(({ carts }) => {
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

      const gross = carts.reduce((sum, c) => sum + c.total, 0);
      const discounted = carts.reduce((sum, c) => sum + c.discountedTotal, 0);
      setPerformance(parseFloat(((discounted / gross) * 100).toFixed(2)));
    });
  }, []);

  return { data, performance };
}
