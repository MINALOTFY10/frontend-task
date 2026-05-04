import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, type TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useTransactionStats } from "../../hooks/use-transaction-stats";
import ChartCard from "./chart-card";

function TransactionTooltip({ payload, label }: TooltipContentProps<ValueType, NameType>) {
  return (
    <div className="bg-white rounded-3 p-3" style={{ fontSize: "0.85rem" }}>
      <p className="fw-semibold mb-3 text-secondary-custom">
        {label}, 2026
      </p>
      {payload.map((entry) => (
        <div key={entry.id} className="d-flex align-items-center gap-2 mb-2">
          <div className="rounded-1" style={{ background: entry.color, width: 15, height: 15 }} />
          <p className="fw-semibold mb-0">
            {entry.name}: <strong className="ms-2">{entry.value as number}</strong>
          </p>
        </div>
      ))}
    </div>
  );
}

export default function TransactionChart() {
  const { data } = useTransactionStats();

  return (
    <ChartCard title="Transaction Activity">
     
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-text-primary)" }} padding={{ left: 15, right: 30 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-text-primary)" }} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={(props) => <TransactionTooltip {...props} />} />
            <Line type="monotone" dataKey="total" name="Total Transactions" stroke="var(--color-primary)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="success" name="Success Transactions" stroke="#000" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
   
    </ChartCard>
  );
}
