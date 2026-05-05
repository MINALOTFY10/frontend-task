import { LuMessageSquare, LuStar } from "react-icons/lu";
import type { Product } from "../../services/types";
import styles from "./product-reviews.module.css";
import Stars from "../shared/stars";

const formatDate = (v: string) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function ProductReviews({ reviews }: { reviews: Product["reviews"] }) {
  const isEmpty = !reviews || reviews.length === 0;
  const avg = isEmpty ? 0 : reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className={styles.wrap}>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 px-4 py-3">
        <div className="d-flex align-items-center gap-2">
          <LuMessageSquare size={19} strokeWidth={2} />
          <h2 className="m-0 fw-bold fs-5">Customer Reviews</h2>
        </div>

        {!isEmpty && (
          <div className="d-flex align-items-center gap-3">
            <span className={styles.avgNum}>{avg.toFixed(1)}</span>
            <div className="d-flex flex-column gap-1">
              <Stars rating={Math.round(avg)} size={15} />
              <span className="fs-11 text-muted-custom">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="border-top-custom" />

      <div className={`${styles.writeBanner} bg-primary-custom text-white fw-semibold px-4 py-3`}>Write a Review</div>

      <div className="d-flex align-items-center gap-2 px-4 py-3 border-bottom fs-8 text-secondary-custom border-custom">
        <LuStar size={17} className="text-muted-custom" />
        <span>
          Please <span className={`${styles.loginLink} primary-custom fw-semibold`}>log in</span> to write a review.
        </span>
      </div>

      {isEmpty ?
        <p className="fs-8 fst-italic text-muted-custom m-0 px-4 py-3">No reviews yet — be the first.</p>
      : <div className="d-flex flex-column gap-3 px-4 pt-3 pb-4">
          {reviews.map((review, i) => (
            <div key={i} className={`${styles.card} border-custom d-flex flex-column gap-2 p-3`}>
              <div className="d-flex align-items-start justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className={`${styles.avatar} d-flex align-items-center justify-content-center text-white fw-bold`}>
                    {review.reviewerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="fs-8 fw-semibold text-primary-custom">{review.reviewerName}</div>
                    <div className={`${styles.date} fs-11 text-muted-custom`}>{formatDate(review.date)}</div>
                  </div>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className={`${styles.comment} fs-8 text-secondary-custom m-0`}>{review.comment}</p>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
