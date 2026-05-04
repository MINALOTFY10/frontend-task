import { Row, Col } from "react-bootstrap";
import PreformanceCards from "../../components/prefomrance-cards/preformance-cards";
import TransactionChart from "../../components/chart-cards/transaction-chart";
import SaleChart from "../../components/chart-cards/sale-chart";
import Schedule from "../../components/schedule-card/schedule-card";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <div className="p-3">
      {/* Top Performance Cards */}
      <Row className="g-3 mb-3">
        <PreformanceCards />
      </Row>

      <div className={styles.dashboardRow}>
        <div className={styles.leftColumn}>
          <Row className="g-3">
            <Col md={6}>
              <TransactionChart />
            </Col>
            <Col md={6}>
              <SaleChart />
            </Col>
            <Col md={6}>
              <SaleChart />
            </Col>
            <Col md={6}>
              <TransactionChart />
            </Col>
          </Row>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.scheduleWrap}>
            <Schedule />
          </div>
        </div>
      </div>
    </div>
  );
}
