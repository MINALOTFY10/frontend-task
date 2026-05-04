import { Row, Col } from "react-bootstrap"
import PreformanceCards from "../../components/prefomrance-cards/preformance-cards"
import TransactionChart from "../../components/chart-cards/transaction-chart"
import SaleChart from "../../components/chart-cards/sale-chart"

export default function Dashboard() {
  return (
    <div>
      <Row className="g-3 mb-3">
        <PreformanceCards />
      </Row>
      <Row className="g-3 mb-3">
        <Col xs={12} xl={5}>
          <TransactionChart />
        </Col>
        <Col xs={12} xl={5}>
          <SaleChart />
        </Col>
      </Row>
    </div>
  )
}