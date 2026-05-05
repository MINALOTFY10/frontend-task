import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import usePagination from "../../hooks/use-pagination";
import type { Product } from "../../services/types";
import PaginationControls from "../shared/pagination-controls";
import ProductGridItem from "./product-grid-item";

type ProductGridCardProps = {
  products: Product[];
  pageSize?: number;
  searchQuery: string;
};

export default function ProductGridCard({ products,  pageSize = 10, searchQuery }: ProductGridCardProps) {
  const navigate = useNavigate();

  const filtered = () => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => p.title.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
  };

  const { page, totalPages, paged, paginationItems, setPage, nextPage, prevPage } = usePagination(filtered(), pageSize);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, setPage]);

  return (
    <Card className="border-0 rounded-4 h-100" style={{ background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
      <Card.Body className="p-3">
        <Row className="g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
          {paged.map((product) => (
            <Col key={product.id}>
              <ProductGridItem product={product} onSelect={(productId) => navigate(`/products/${productId}`)} />
            </Col>
          ))}
        </Row>

        <PaginationControls
          page={page}
          totalPages={totalPages}
          paginationItems={paginationItems}
          onPageChange={setPage}
          onPrev={prevPage}
          onNext={nextPage}
          summary={`Page ${page} of ${totalPages} (${filtered().length.toLocaleString()} items)`}
          className="mt-3"
        />
      </Card.Body>
    </Card>
  );
}
