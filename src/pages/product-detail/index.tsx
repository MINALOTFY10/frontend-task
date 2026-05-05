import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { LuArrowLeft } from "react-icons/lu";
import { useProductDetail } from "../../hooks/use-product-detail";
import LoadingSpinner from "../../components/shared/loading-spinner";
import ProductHero from "../../components/product-details/product-hero";
import ProductReviews from "../../components/product-details/product-reviews";

export default function ProductDetail() {
  const { id } = useParams();
  const parsedId = id ? Number(id) : null;
  const productId = parsedId !== null && Number.isFinite(parsedId) ? parsedId : null;
  const { product, loading, error } = useProductDetail(productId);

  const backLink = (
    <Link
      to="/products"
      className="fs-9"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 16px", borderRadius: 999,
        background: "var(--color-bg-surface-muted)", color: "var(--color-text-secondary)",
        textDecoration: "none", fontWeight: 600, border: "1px solid transparent",
        width: "fit-content", transition: "color 0.18s",
      }}
    >
      <LuArrowLeft size={15} /> All Products
    </Link>
  );

  if (loading) return (
    <Card className="border-0 rounded-4">
      <Card.Body className="p-4"><LoadingSpinner label="Loading product details..." /></Card.Body>
    </Card>
  );

  if (error || !product) return (
    <Card className="border-0 rounded-4">
      <Card.Body className="p-4 d-flex flex-column gap-3">
        <div className="fw-semibold">Unable to load product</div>
        <div className="small text-secondary-custom">{error ?? "Product not found."}</div>
        {backLink}
      </Card.Body>
    </Card>
  );

  return (
    <div className="p-3 d-flex flex-column gap-4">
      {backLink}
      <ProductHero product={product} />
      <ProductReviews reviews={product.reviews} />
    </div>
  );
}