import { Stack } from "react-bootstrap";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, type TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useSaleStats } from "../../hooks/use-sale-stats";
import ChartCard from "./chart-card";

function SaleTooltip({ payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!payload?.length) return null;
  return (
    <div className="bg-white rounded-3 p-3" style={{ fontSize: "0.85rem" }}>
      <p className="fw-semibold mb-2 text-secondary-custom">
        {label}, 2026
      </p>
      <div className="d-flex align-items-center gap-2">
        <div className="rounded-1 bg-primary-custom" style={{ width: 15, height: 15 }} />
        <p className="fw-normal mb-0">
          Sales: <strong className="ms-2">${(payload[0].value as number).toLocaleString()}</strong>
        </p>
      </div>
    </div>
  );
}

export default function SaleChart() {
  const { data } = useSaleStats();

  return (
    <ChartCard
      title={
        <Stack direction="horizontal" gap={2}>
          <span>Sale Performance</span>
        </Stack>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="0.5%">
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-text-primary)" }} axisLine={false} tickLine={false} />
          <Tooltip content={(props) => <SaleTooltip {...props} />} />
          <Bar
            dataKey="sales"
            shape={({ x = 0, y = 0, width = 0, height = 0 }) => (
              <g>
                <rect x={x} y={y} width={width} height={height} fill="var(--color-primary-light)" />
                <rect x={x} y={y} width={width} height={3} fill="var(--color-primary)" />
              </g>
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
