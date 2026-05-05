import { useEffect, useMemo, useState } from "react";

export interface PaginationResult<T> {
  page: number;
  totalPages: number;
  paged: T[];
  paginationItems: (number | "ellipsis")[];
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export default function usePagination<T>(items: T[], pageSize: number): PaginationResult<T> {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(items.length / pageSize)), [items.length, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const paginationItems = useMemo<(number | "ellipsis")[]>(() => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, index) => index + 1);

    if (page <= 3) return [1, 2, 3, "ellipsis", totalPages];
    if (page >= totalPages - 2) return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
  }, [page, totalPages]);

  const nextPage = () => setPage((current) => Math.min(totalPages, current + 1));
  const prevPage = () => setPage((current) => Math.max(1, current - 1));

  return { page, totalPages, paged, paginationItems, setPage, nextPage, prevPage };
}
