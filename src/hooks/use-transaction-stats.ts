import { useState, useEffect } from "react"
import { MONTHS } from "../utils/chart-utils"
import { getCarts } from "../services/auth-service"

interface ChartDataPoint {
  month: string
  total: number
  success: number
}

interface UseTransactionStatsReturn {
  data: ChartDataPoint[]
  loading: boolean
}

export function useTransactionStats(): UseTransactionStatsReturn {
  const [data, setData] = useState<ChartDataPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCarts(60, 0)
      .then(({ carts }) => {
        const perMonth = Math.ceil(carts.length / 12)

        const chartData = MONTHS.map((month, i) => {
          const slice = carts.slice(i * perMonth, (i + 1) * perMonth)
          return {
            month,
            total: slice.reduce((sum, c) => sum + Math.round(c.totalQuantity), 0),
            success: slice.reduce((sum, c) => sum + Math.round(c.totalProducts), 0),
          }
        })

        setData(chartData)
      })
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}