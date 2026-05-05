import { Card, Stack } from "react-bootstrap";
import TrendBadge from "../../shared/trend-badge";

const DATE_RANGE = "From Jan 01, 2026 – April 30, 2026";

interface StatCardProps {
  label: string;
  value: number;
  trend: { value: number; positive: boolean };
}

export default function StatCard({ label, value, trend }: StatCardProps) {
  const [whole, decimal] = value.toFixed(2).split(".");

  return (
    <Card className="border-0 h-100 rounded-4">
      <Card.Body className="p-3">
        <Stack direction="horizontal" className="justify-content-between align-items-center mb-0">
          <span className="text-secondary small fw-semibold">{label}</span>
          <TrendBadge value={trend.value} positive={trend.positive} />
        </Stack>

        <div className="mb-4">
          <span className="fs-4 fw-bold">${Number(whole).toLocaleString()}</span>
          <span className="fs-5 fw-bold text-muted-custom">
            .{decimal}
          </span>
        </div>

        <p className="fw-semibold mb-0 text-secondary-custom fs-11">
          {DATE_RANGE}
        </p>
      </Card.Body>
    </Card>
  );
}
