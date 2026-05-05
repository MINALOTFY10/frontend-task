import { Card, Stack } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import type { ReactNode } from "react";

interface ChartCardWrapperProps {
  title: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}

export default function ChartCardWrapper({ title, children, action }: ChartCardWrapperProps) {
  const defaultAction = (
    <>
      <span className="fw-semibold">Last Year</span>
      <FaCalendarAlt className="mt-1" size={11} />
    </>
  );

  return (
    <Card
      className="border-0 rounded-4 h-100"
      style={{ height: "var(--chart-card-height, auto)" }}
    >
      <Card.Body>
        <Stack direction="horizontal" className="justify-content-between align-items-center mb-1 pb-2">
          <div className="fw-bold text-primary-custom">
            {title}
          </div>
          <div
            className="d-flex align-items-center gap-2 w-auto border-0 text-secondary-custom fs-10"
          >
            {action ?? defaultAction}
          </div>
        </Stack>
        <div style={{ width: "100%", height: "220px" }}>{children}</div>
      </Card.Body>
    </Card>
  );
}