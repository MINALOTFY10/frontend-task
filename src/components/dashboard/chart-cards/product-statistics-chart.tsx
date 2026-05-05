import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, type TooltipContentProps, YAxis } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useSaleStats } from "../../../hooks/use-sale-stats";
import ChartCardWrapper from "./chart-card-wrapper";
import LoadingErrorState from "../../shared/loading-error-state";

function ProductTooltip({ payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!payload?.length) return null;

  return (
    <div className="bg-white rounded-3 p-3 fs-tooltip">
      <p className="fw-semibold mb-2 text-secondary-custom">{label}, 2026</p>
      <div className="d-flex align-items-center gap-2">
        <div className="rounded-1 bg-primary-custom" style={{ width: 15, height: 15 }} />
        <p className="fw-normal mb-0">
          Products: <strong className="ms-2">{(payload[0].value as number).toLocaleString()}</strong>
        </p>
      </div>
    </div>
  );
}

export default function ProductStatisticsChart() {
  const { data, loading, error } = useSaleStats();

  return (
    <ChartCardWrapper title="Product Statics">
      {loading || error ? (
        <LoadingErrorState loading={loading} error={error} errorLabel="Unable to load product stats" />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="8%" margin={{ left: 0, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: "var(--font-size-chart-axis)", fill: "var(--color-text-primary)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: "var(--font-size-chart-axis)", fill: "var(--color-text-primary)" }} axisLine={false} tickLine={false} width={42} />
            <Tooltip content={(props) => <ProductTooltip {...props} />} />
            <Bar
              dataKey="sales"
              radius={[6, 6, 6, 6]}
              shape={({ x = 0, y = 0, width = 0, height = 0 }) => {
                return <rect x={x} y={y} width={width} height={height} rx={4} ry={4} fill="var(--color-primary)" />;
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCardWrapper>
  );
}
