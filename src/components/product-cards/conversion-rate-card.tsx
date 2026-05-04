import { Card, Stack } from "react-bootstrap";
import MonthNavigater from "../shared/month-navigater";
import { FaCalendarAlt } from "react-icons/fa";

export default function ConversionRateCard({ total = 0, products = [] }: { total?: number; products?: any[] }) {
  const conversion = (() => {
    const base = total || products.length;
    const views = Math.max(0, Math.round(base * 210));
    const addToCart = Math.max(0, Math.round(views * 0.42));
    const checkout = Math.max(0, Math.round(addToCart * 0.62));
    const purchases = Math.max(0, Math.round(checkout * 0.78));
    return [
      { label: "Product Views", value: views, percent: 100 },
      { label: "Add to Cart", value: addToCart, percent: views ? Math.round((addToCart / views) * 100) : 0 },
      { label: "Checkout Initiated", value: checkout, percent: views ? Math.round((checkout / views) * 100) : 0 },
      { label: "Completed Purchases", value: purchases, percent: views ? Math.round((purchases / views) * 100) : 0 },
    ];
  })();

  return (
    <Card className="rounded-4 h-100 border">
      <Card.Body className="py-3 px-3 d-flex flex-column">
        <Stack direction="horizontal" className="justify-content-between align-items-center mb-4">
          <div className="text-primary-custom fw-bold" style={{ fontSize: "0.95rem" }}>
            Conversion Rate
          </div>
          <div className="d-flex align-items-center gap-2 w-auto border-0 text-secondary-custom small">
            <span className="fw-semibold" style={{ fontSize: "0.7rem" }}>
              Last Year
            </span>
            <FaCalendarAlt size={11} />
          </div>
        </Stack>

        <MonthNavigater />

        <div>
          {conversion.map((item) => (
            <div key={item.label} className="d-flex align-items-center justify-content-between py-2 border-top-custom">
              <div>
                <div className="fw-semibold small text-primary-custom">{item.label}</div>
                <div className="text-muted-custom" style={{ fontSize: "0.72rem" }}>
                  {item.percent}%
                </div>
              </div>
              <div className="text-primary-custom fw-semibold" style={{ fontSize: "0.8rem" }}>
                {item.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-link p-0 text-secondary fw-semibold text-decoration-none mt-3 small mt-auto" type="button" style={{ fontSize: "0.8rem" }}>
          Learn More →
        </button>
      </Card.Body>
    </Card>
  );
}
