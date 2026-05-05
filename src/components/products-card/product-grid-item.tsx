import { LuHeart, LuPlus } from "react-icons/lu";
import type { Product } from "../../services/types";
import styles from "./product-grid-item.module.css";

type ProductGridItemProps = {
  product: Product;
  onSelect: (productId: number) => void;
};

const formatPrice = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function ProductGridItem({ product, onSelect }: ProductGridItemProps) {
  const hasDiscount = product.discountPercentage > 0;
  const originalPrice = hasDiscount ? product.price / (1 - product.discountPercentage / 100) : null;

  return (
    <div
      className={`${styles.productCard} bg-card-custom border-custom d-flex flex-column gap-2 p-3`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(product.id);
        }
      }}
    >
      <button
        className={`${styles.favoriteButton} position-absolute rounded-pill d-inline-flex align-items-center justify-content-center border-custom bg-card-custom icon-muted-custom`}
        type="button"
        aria-label={`Toggle favourite for ${product.title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <LuHeart size={12} />
      </button>

      <div className={`${styles.imageWrap} bg-surface-muted-custom d-flex align-items-center justify-content-center rounded-3`}>
        <img src={product.thumbnail} alt={product.title} className={styles.productImage} />
      </div>

      <div className="d-flex align-items-center gap-2 flex-wrap">
        <span className={`${styles.currentPrice} fw-bold text-primary-custom`}>${formatPrice(product.price)}</span>
        {hasDiscount && <span className={`${styles.originalPrice} text-muted-custom fs-9`}>${formatPrice(originalPrice ?? product.price)}</span>}
        {hasDiscount && (
          <span className={`${styles.discountBadge} fs-13 fw-semibold py-1 px-1 rounded-2 positive-bg-custom positive-custom`}>
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className={`${styles.title} fs-9 text-secondary-custom`}>{product.title}</div>

      <button
        className={`${styles.addButton} position-absolute rounded-pill border-0 d-inline-flex align-items-center justify-content-center text-white bg-primary-custom`}
        type="button"
        aria-label={`Add ${product.title} to cart`}
        onClick={(event) => event.stopPropagation()}
      >
        <LuPlus size={14} />
      </button>
    </div>
  );
}