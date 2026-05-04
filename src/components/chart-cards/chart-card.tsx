import { Card, Stack } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: ReactNode;
  children: ReactNode;
}

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card className="border-0 rounded-4 h-100">
      <Card.Body>
        <Stack direction="horizontal" className="justify-content-between align-items-center mb-1 pb-2">
          <span className="fw-semibold" style={{ color: "var(--color-text-primary)" }}>
            {title}
          </span>
          <div className="w-auto border-0 bg-light text-secondary" style={{ fontSize: "0.75rem" }}>
            <span className="fw-semibold">Last Year</span>
            <FaCalendarAlt className="ms-2" size={11} />
          </div>
        </Stack>
        <div style={{ width: "100%", height: "220px" }}>{children}</div>
      </Card.Body>
    </Card>
  );
}
