import { Col } from "react-bootstrap";
import StatCard from "./stat-card/stat-card";
import OfferBanner from "./offer-banner/offer-banner";
import { usePreformanceStats } from "../../hooks/use-preformance-stats";

export default function PreformanceCards() {
  const { stats } = usePreformanceStats();

  return (
    <>
      <Col xs={12} sm={6} xl={3}>
        <OfferBanner />
      </Col>
      {stats && (
        <>
          <Col xs={12} sm={6} xl={3}>
            <StatCard label="Gross Revenue" value={stats.grossRevenue} trend={{ value: 8.33, positive: true }} />
          </Col>
          <Col xs={12} sm={6} xl={3}>
            <StatCard label="Avg. Order Value" value={stats.avgOrderValue} trend={{ value: 8.33, positive: false }} />
          </Col>
          <Col xs={12} sm={6} xl={3}>
            <StatCard label="Total Orders" value={stats.totalOrders} trend={{ value: 8.33, positive: true }} />
          </Col>
        </>
      )}
    </>
  );
}
