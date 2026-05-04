import { useEffect, useMemo, useState } from "react";

export interface PaginationResult<T> {
  page: number;
  totalPages: number;
  paged: T[];
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

  const nextPage = () => setPage((current) => Math.min(totalPages, current + 1));
  const prevPage = () => setPage((current) => Math.max(1, current - 1));

  return { page, totalPages, paged, setPage, nextPage, prevPage };
}
