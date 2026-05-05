import type { ReactNode } from "react";
import styles from "./product-row.module.css";
import type { Product } from "../../services/types";

type ProductRowProps = {
  product: Product;
  gridClassName: string;
  extraCell?: ReactNode;
  onClick?: (product: Product) => void;
};

export default function ProductRow({ product, gridClassName, extraCell, onClick }: ProductRowProps) {
  const sales = Math.round(product.rating * 45 + product.stock * 0.5);
  const revenue = (product.price * sales).toLocaleString("en-US", { maximumFractionDigits: 2 });
  const reviews = Math.round(product.stock * 14 + product.rating * 10);

  return (
    <div
      className={`px-2 py-2 border-top-custom ${gridClassName}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick ? () => onClick(product) : undefined}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="d-flex align-items-center gap-2">
        <img src={product.thumbnail} alt={product.title} className={`${styles.productImage} bg-surface-muted-custom`} />
        <div className={styles.productInfo}>
          <div className={`${styles.productTitle} text-primary-custom`}>{product.title}</div>
          <div className={`${styles.productMeta} text-secondary-custom`}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</div>
        </div>
      </div>

      <div className={`small fw-semibold text-primary-custom ${styles.productTitle}`}>${revenue}</div>
      <div className="small fw-semibold text-secondary-custom">{sales.toLocaleString()}</div>
      <div className="small fw-semibold text-secondary-custom">{reviews.toLocaleString()}</div>
      {extraCell ? <div className="small fw-semibold text-secondary-custom">{extraCell}</div> : null}

      <div className="form-check form-switch m-0">
        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked={product.stock > 0}
          aria-label={`Toggle active for ${product.title}`}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    </div>
  );
}
