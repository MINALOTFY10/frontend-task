import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Card, Stack } from "react-bootstrap";
import { LuSearch, LuChevronRight, LuRefreshCw } from "react-icons/lu";
import tableStyles from "./product-table.module.css";
import TrendBadge from "../shared/trend-badge";
import ProductRow from "./product-row";
import usePagination from "../../hooks/use-pagination";
import type { Product } from "../../services/types";
import PaginationControls from "../shared/pagination-controls";

const PAGE_SIZE = 6;
const DEFAULT_HEADERS = ["Product Name", "Revenue", "Sales", "Reviews", "Active"];
const CATEGORY_HEADERS = ["Product Name", "Revenue", "Sales", "Reviews", "Category", "Active"];

type ProductListVariant = "default" | "products-page";

type ProductListCardProps = {
  products: Product[];
  pageSize?: number;
  variant?: ProductListVariant;
};

export default function ProductListCard({ products, pageSize = PAGE_SIZE, variant = "default" }: ProductListCardProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
  }, [products, query]);

  const { page, totalPages, paged, paginationItems, setPage, nextPage, prevPage } = usePagination(filtered, pageSize);

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
                  <strong className="text-primary-custom fs-5">{filtered.length.toLocaleString()}</strong>
                  <span className="ms-1 text-muted-custom fw-bold">Item</span>
                </span>
                <TrendBadge value={8.33} positive={true} className="mt-auto" />
              </div>
            </div>

            <Stack direction="horizontal" gap={2} className="align-items-center  text-secondary-custom">
              <button className="btn btn-link p-0 small text-decoration-none text-secondary-custom fw-semibold fs-12" type="button" onClick={() => navigate("/products")}>
                See More
                <LuChevronRight size={14} className="ms-1" />
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

        <div className="fs-7" style={{ overflowX: "auto" }}>
          <div className={`${gridClassName} px-2 py-2 small text-muted fw-semibold`}>
            {headers.map((header) => (
              <div key={header}>{header}</div>
            ))}
          </div>

          {paged.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              gridClassName={gridClassName}
              extraCell={getExtraCell ? getExtraCell(product) : undefined}
              onClick={(selected) => navigate(`/products/${selected.id}`)}
            />
          ))}
        </div>

        <PaginationControls
          page={page}
          totalPages={totalPages}
          paginationItems={paginationItems}
          onPageChange={setPage}
          onPrev={prevPage}
          onNext={nextPage}
          summary={`Page ${page} of ${totalPages}`}
          className="mt-3"
        />
      </Card.Body>
    </Card>
  );
}
