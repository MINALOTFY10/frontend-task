import { Row } from "react-bootstrap";
import PreformanceCards from "../../components/prefomrance-cards/preformance-cards";

export default function Dashboard() {
  return (
    <div>
      <Row className="g-3 mb-3">
        <PreformanceCards />
      </Row>
    </div>
  );
}
