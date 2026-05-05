import { Stack } from "react-bootstrap";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export type PaginationControlsProps = {
  page: number;
  totalPages: number;
  paginationItems: (number | "ellipsis")[];
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
  summary: string;
  className?: string;
};

export default function PaginationControls({ page, totalPages, paginationItems, onPageChange, onPrev, onNext, summary, className }: PaginationControlsProps) {
  return (
    <Stack direction="horizontal" className={`justify-content-between align-items-center flex-wrap gap-2 ${className ?? ""}`.trim()}>
      <div className="small text-secondary-custom">{summary}</div>
      <Stack direction="horizontal" gap={2} className="align-items-center flex-wrap">
        <button className="btn border-0" type="button" onClick={onPrev} disabled={page === 1} aria-label="Previous page">
          <LuChevronLeft size={16} />
        </button>
        <Stack direction="horizontal" gap={1} className="flex-wrap">
          {paginationItems.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <button key={`ellipsis-${index}`} className="btn btn-sm btn-light" type="button" disabled aria-hidden>
                  ...
                </button>
              );
            }

            const pageNumber = item;
            const isActive = pageNumber === page;
            return (
              <button
                key={pageNumber}
                className={`btn btn-sm ${isActive ? "btn-primary" : "btn-light"}`}
                type="button"
                onClick={() => onPageChange(pageNumber)}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
        </Stack>
        <button className="btn border-0" type="button" onClick={onNext} disabled={page === totalPages} aria-label="Next page">
          <LuChevronRight size={16} />
        </button>
      </Stack>
    </Stack>
  );
}
