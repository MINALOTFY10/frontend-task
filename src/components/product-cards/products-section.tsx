import { Col, Row } from "react-bootstrap";
import { useProductsList } from "../../hooks/use-products-list";
import ProductListCard from "./product-list-card";
import ConversionRateCard from "./conversion-rate-card";
import Card from "react-bootstrap/Card";

export interface ConversionStep {
  label: string;
  value: number;
  percent: number;
}

export default function ProductsSection() {
  const { products, total } = useProductsList(100);

  return (
    <Card className="border-0 rounded-4 h-100">
      <Card.Body className="p-0">
        <Row className="g-3 pb-3 px-4">
          <div className="fw-bold fs-4 pt-4">Product List</div>
          <Col lg={8} xl={9} className="my-2">
            <ProductListCard products={products} total={total} />
          </Col>
          <Col lg={4} xl={3} className="my-2">
            <ConversionRateCard total={total} products={products} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
