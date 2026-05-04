import { Row, Col } from "react-bootstrap";
import PreformanceCards from "../../components/prefomrance-cards/preformance-cards";
import StoreCardsRow from "../../components/store-cards/store-cards-row";
import TransactionChart from "../../components/chart-cards/transaction-chart";
import SaleChart from "../../components/chart-cards/sale-chart/sale-chart";
import ProductStatisticsChart from "../../components/chart-cards/product-statistics-chart";
import OrdersByTimeHeatmap from "../../components/chart-cards/orders-by-time-heatmap/orders-by-time-heatmap";
import Schedule from "../../components/schedule-card/schedule-card";
import ProductsSection from "../../components/product-card/products-section";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <div className="p-3 d-flex flex-column gap-3">
      <Row className="g-3">
        <PreformanceCards />
      </Row>
      <div className={styles.dashboardRow}>
        <div>
          <Row className="g-3">
            <Col md={6}>
              <TransactionChart />
            </Col>
            <Col md={6}>
              <SaleChart />
            </Col>
            <Col md={6}>
              <OrdersByTimeHeatmap />
            </Col>
            <Col md={6}>
              <ProductStatisticsChart />
            </Col>
          </Row>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.scheduleWrap}>
            <Schedule />
          </div>
        </div>
      </div>
      <Row className="g-3">
        <StoreCardsRow />
      </Row>
      <ProductsSection />
    </div>
  );
}
