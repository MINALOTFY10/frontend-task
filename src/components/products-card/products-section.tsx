import { Col, Row, Card } from "react-bootstrap";
import { useProductsList } from "../../hooks/use-products-list";
import ProductListCard from "./product-list-card";
import ConversionRateCard from "./conversion-rate-card";
import LoadingErrorState from "../shared/loading-error-state";

export interface ConversionStep {
  label: string;
  value: number;
  percent: number;
}

export default function ProductsSection() {
  const { products, total, loading, error } = useProductsList(100);

  return (
    <Card className="border-0 rounded-4 h-100">
      <Card.Body className="p-0">
        <Row className="g-3 pb-3 px-4">
          <div className="fw-bold fs-4 pt-4">Product List</div>
          {(loading || error) ? (
            <Col xs={12} className="my-2">
              <div className="rounded-4 border bg-card-custom p-4" style={{ minHeight: 220 }}>
                <LoadingErrorState loading={loading} error={error} errorLabel="Unable to load product list" />
              </div>
            </Col>
          ) : (
            <>
              <Col lg={8} xl={9} className="my-2">
                <ProductListCard products={products} />
              </Col>
              <Col lg={4} xl={3} className="my-2">
                <ConversionRateCard total={total} products={products} />
              </Col>
            </>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
