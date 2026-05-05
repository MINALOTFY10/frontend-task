import { useState, useEffect } from "react";
import { LuTruck, LuShield, LuRotateCcw, LuMinus, LuPlus } from "react-icons/lu";
import type { Product } from "../../services/types";
import styles from "./product-hero.module.css";
import Stars from "../shared/stars";

export default function ProductHero({ product }: { product: Product }) {
  const gallery =
    product.images?.length > 0 ? product.images
    : product.thumbnail ? [product.thumbnail]
    : [];

  const [active, setActive] = useState(gallery[0] ?? product.thumbnail);

  useEffect(() => {
    setActive(gallery[0] ?? product.thumbnail);
  }, [product.id]);

  const originalPrice = product.price / (1 - product.discountPercentage / 100);
  const reviewsCount = product.reviews?.length ?? 0;

  const description = [
    { icon: <LuTruck size={14} />, label: "Shipping", value: product.shippingInformation },
    { icon: <LuShield size={14} />, label: "Warranty", value: product.warrantyInformation },
    { icon: <LuRotateCcw size={14} />, label: "Returns", value: product.returnPolicy },
  ].filter((m) => m.value);

  return (
    <div className="row g-4 align-items-start">
      <div className="col-12 col-lg-6">
        <div className="bg-card-custom border-custom p-3 rounded-4">
          <div className="position-relative overflow-hidden rounded-4">
            <img src={active} alt={product.title} className={`${styles.mainImg} d-block`} />
            {gallery.length > 1 && (
              <span className={`${styles.badge} position-absolute bottom-0 end-0 mb-2 me-2 px-2 py-1 rounded-pill text-white fs-12`}>
                {gallery.indexOf(active) + 1} / {gallery.length}
              </span>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="d-flex gap-2 mt-3 overflow-auto">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.thumbBtn} ${img === active ? styles.thumbActive : ""} bg-surface-muted-custom rounded-3 p-1 border-0 flex-shrink-0`}
                  onClick={() => setActive(img)}
                >
                  <img src={img} alt={`view ${i + 1}`} className={`${styles.thumbImg} rounded-2 d-block`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="d-flex flex-column gap-4">
          <h1 className={`${styles.title} fw-bold mb-0 text-primary-custom`}>{product.title}</h1>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Stars rating={product.rating} />
            <span className={`${styles.ratingNum} fs-8 fw-bold`}>{product.rating.toFixed(1)}</span>
            {reviewsCount > 0 && <span className="fs-9 text-muted-custom">({reviewsCount})</span>}
            <>
              <span className="fs-9 text-muted-custom">·</span>
              <span className="fs-9 text-secondary-custom text-capitalize">{product.category}</span>
            </>
          </div>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span className={`${styles.price} fw-bold text-primary-custom`}>${product.price}</span>
            {product.discountPercentage > 0 && originalPrice && (
              <span className={`${styles.originalPrice} fw-medium text-decoration-line-through`}>${originalPrice.toFixed(2)}</span>
            )}
            {product.discountPercentage > 0 && (
              <span className={`${styles.saveBadge} fs-10 px-3 py-1 rounded-pill fw-bold`}>Save {Math.round(product.discountPercentage)}%</span>
            )}
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className={`${styles.qtyWrap} d-inline-flex align-items-center rounded-pill border-custom bg-card-custom overflow-hidden`}>
              <button type="button" className={`${styles.qtyBtn} d-flex align-items-center justify-content-center border-0 bg-transparent primary-custom`}>
                <LuMinus size={13} />
              </button>
              <span className={`${styles.qtyVal} d-flex align-items-center justify-content-center fw-semibold text-center primary-custom`}>1</span>
              <button type="button" className={`${styles.qtyBtn} d-flex align-items-center justify-content-center border-0 bg-transparent primary-custom`}>
                <LuPlus size={13} />
              </button>
            </div>

            <button type="button" className={`${styles.cartBtn} bg-primary-custom text-white flex-grow-1 rounded-pill border-0 fw-semibold`}>
              Add to cart
            </button>
          </div>

          <div className="border-custom rounded-3 overflow-hidden bg-card-custom">
            <div className="w-100 d-flex align-items-center justify-content-between px-3 py-3 border-0 bg-transparent fw-semibold text-primary-custom fs-8">
              <span>Product details</span>
            </div>

            <div className="px-3 pb-3 border-top-custom">
              <p className="fs-8 mt-3 mb-0 text-secondary-custom">{product.description}</p>

              {description.length > 0 && (
                <div className="d-flex flex-column gap-2 mt-3">
                  {description.map(({ icon, label, value }) => (
                    <div key={label} className="d-flex align-items-start gap-2">
                      <span className="mt-1 flex-shrink-0 text-muted-custom">{icon}</span>
                      <span className="fs-9">
                        <strong>{label}:</strong> {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {product.sku && (
                <p className="fs-10 mt-3 mb-0">
                  SKU <code className="fw-bold ms-1">{product.sku}</code>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
