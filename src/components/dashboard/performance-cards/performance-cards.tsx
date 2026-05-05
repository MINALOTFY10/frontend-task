import { Col } from "react-bootstrap";
import StatCard from "./stat-card";
import OfferBanner from "./offer-banner/offer-banner";
import { usePerformanceStats } from "../../../hooks/use-performance-stats";
import LoadingErrorState from "../../shared/loading-error-state";

export default function PerformanceCards() {
  const { stats, loading, error } = usePerformanceStats();

  return (
    <>
      <Col xs={12} sm={6} xl={3}>
        <OfferBanner />
      </Col>
      {(loading || error) && (
        <Col xs={12} sm={6} xl={9}>
          <div className="rounded-4 h-100 border bg-card-custom p-4">
            <LoadingErrorState loading={loading} error={error} errorLabel="Unable to load performance stats" />
          </div>
        </Col>
      )}
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
