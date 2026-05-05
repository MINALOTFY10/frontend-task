import { Button } from "react-bootstrap";
import styles from "./offer-banner.module.css";
import offerImg from "../../../../assets/offer-image.png";

export default function OfferBanner() {
  return (
    <div className="d-flex flex-column justify-content-between p-3 h-100 bg-primary-custom rounded-4 position-relative overflow-hidden" style={{ minHeight: "130px" }}>
      <img src={offerImg} alt="Offer" className={styles.image_banner} />
      <p className="fw-semibold text-white mb-2 fs-8">
        Sharpen your Skill with Professional Online
      </p>
      <Button
        size="sm"
        className={`${styles.banner_button} fw-semibold border-0 w-auto align-self-start rounded-3 fs-12`}
      >
        Upgrade Now
      </Button>
    </div>
  );
}