import { Button } from "react-bootstrap";
import styles from "./offer-banner.module.css";
import offerImg from "../../../assets/offer-image.png";

export default function OfferBanner() {
  return (
    <div className={`${styles.banner} d-flex flex-column justify-content-between p-3 h-100`}>
      <img src={offerImg} alt="Offer" className={styles.image_banner} />
      <p className="fw-semibold text-white mb-2" style={{ fontSize: "0.9rem", maxWidth: "130px", lineHeight: "1.4" }}>
        Sharpen your Skill with Professional Online
      </p>
      <Button
        size="sm"
        className="fw-semibold border-0 w-auto align-self-start rounded-3"
        style={{ background: "#000", color: "var(--color-bg-card)", fontSize: "0.70rem" }}
      >
        Upgrade Now
      </Button>
    </div>
  );
}
