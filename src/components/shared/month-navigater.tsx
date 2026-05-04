import { Stack } from "react-bootstrap";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function MonthNavigater() {
  return (
    <Stack direction="horizontal" className="justify-content-between align-items-center rounded-3 px-2 py-1 mb-3">
      <button className="btn p-0 border-0">
        <LuChevronLeft size={15} />
      </button>
      <span className="fw-medium small">January 2025</span>
      <button className="btn p-0 border-0">
        <LuChevronRight size={15} />
      </button>
    </Stack>
  );
}
