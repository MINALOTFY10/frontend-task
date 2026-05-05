import { Row, Col } from "react-bootstrap";
import DashboardHeader from "../../components/dashboard/header/dashboard-header";
import PreformanceCards from "../../components/dashboard/performance-cards/performance-cards";
import StoreCardsRow from "../../components/dashboard/store-cards/store-cards-row";
import TransactionChart from "../../components/dashboard/chart-cards/transaction-chart";
import SaleChart from "../../components/dashboard/chart-cards/sale-chart";
import ProductStatisticsChart from "../../components/dashboard/chart-cards/product-statistics-chart";
import OrdersByTimeHeatmap from "../../components/dashboard/chart-cards/orders-by-time-heatmap";
import Schedule from "../../components/dashboard/schedule-card/schedule-card";
import ProductsSection from "../../components/products-card/products-section";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  return (
    <div className="p-0 d-flex flex-column gap-3">
      <DashboardHeader notificationCount={2} />
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
