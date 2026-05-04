import { useMemo, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { LuSearch, LuChevronLeft, LuChevronRight, LuRefreshCw } from "react-icons/lu";
import tableStyles from "./product-table.module.css";
import TrendBadge from "../shared/trend-badge";
import ProductRowBase from "./product-row-base";
import usePagination from "../../hooks/use-pagination";
import type { Product } from "../../services/types";

const PAGE_SIZE = 6;
const DEFAULT_HEADERS = ["Product Name", "Revenue", "Sales", "Reviews", "Active"];
const CATEGORY_HEADERS = ["Product Name", "Revenue", "Sales", "Reviews", "Category", "Active"];

type ProductListVariant = "default" | "products-page";

type ProductListCardProps = {
  products: Product[];
  total: number;
  pageSize?: number;
  variant?: ProductListVariant;
};

export default function ProductListCard({ products, total, pageSize = PAGE_SIZE, variant = "default" }: ProductListCardProps) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
  }, [products, query]);

  const { page, totalPages, paged, setPage, nextPage, prevPage } = usePagination(filtered, pageSize);

  const paginationItems = useMemo<(number | "ellipsis")[]>(() => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, index) => index + 1);

    if (page <= 3) return [1, 2, 3, "ellipsis", totalPages];
    if (page >= totalPages - 2) return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
  }, [page, totalPages]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => setQuery("");

  const useCategoryVariant = variant === "products-page";
  const headers = useCategoryVariant ? CATEGORY_HEADERS : DEFAULT_HEADERS;
  const gridClassName = useCategoryVariant ? tableStyles.listGridWide : tableStyles.listGrid;
  const getExtraCell = useCategoryVariant ? (product: Product) => product.category : undefined;

  return (
    <Card className="rounded-4 h-100 pt-1 border">
      <Card.Body className={`px-4 ${variant === "products-page" ? "p-4 " : "p-2"}`}>
        {variant !== "products-page" && (
          <Stack direction="horizontal" className="justify-content-between align-items-start mb-2">
            <div>
              <div className="d-flex align-items-center mt-1 ms-2 gap-2 small text-secondary-custom">
                <span>
                  <strong className="text-primary-custom fs-5">{total.toLocaleString()}</strong>
                  <span className="ms-1 text-muted-custom fw-bold">Item</span>
                </span>
                <TrendBadge value={8.33} positive={true} className="mt-auto" />
              </div>
            </div>

            <Stack direction="horizontal" gap={2} className="align-items-center">
              <button className="btn btn-link p-0 small text-secondary-custom text-decoration-none" type="button">
                See More
              </button>

              <button className="btn btn-light btn-sm" type="button" aria-label="Refresh">
                <LuRefreshCw size={15} />
              </button>
            </Stack>
          </Stack>
        )}
        <div className="input-group input-group-sm mb-3 rounded-3 overflow-hidden border">
          <span className="input-group-text bg-body-tertiary border-0 text-muted">
            <LuSearch size={14} />
          </span>
          <input
            type="text"
            className="form-control bg-body-tertiary border-0"
            placeholder="Search..."
            value={query}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
          <button className="btn btn-light border-0" type="button" aria-label="Clear search" onClick={handleClearSearch}>
            <LuRefreshCw size={14} />
          </button>
        </div>

        <div style={{ overflowX: "auto", fontSize: "0.95rem" }}>
          <div className={`${gridClassName} px-2 py-2 small text-muted fw-semibold`}>
            {headers.map((header) => (
              <div key={header}>{header}</div>
            ))}
          </div>

          {paged.map((product) => (
            <ProductRowBase
              key={product.id}
              product={product}
              gridClassName={gridClassName}
              extraCell={getExtraCell ? getExtraCell(product) : undefined}
            />
          ))}
        </div>

        <Stack direction="horizontal" className="justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <div className="small text-secondary-custom">
            Page {page} of {totalPages}
          </div>
          <Stack direction="horizontal" gap={2} className="align-items-center flex-wrap">
            <button className="btn border-0" type="button" onClick={prevPage} disabled={page === 1} aria-label="Previous page">
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
                    onClick={() => setPage(pageNumber)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </Stack>
            <button className="btn border-0" type="button" onClick={nextPage} disabled={page === totalPages} aria-label="Next page">
              <LuChevronRight size={16} />
            </button>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}
