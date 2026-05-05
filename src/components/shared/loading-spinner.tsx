import { Spinner } from "react-bootstrap";
import styles from "./loading-spinner.module.css";

type LoadingSpinnerProps = {
  label?: string;
  size?: "sm";
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  className?: string;
};

export default function LoadingSpinner({ label = "Loading", size, variant = "primary", className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`${styles.wrapper} ${className}`} role="status" aria-live="polite">
      <Spinner animation="border" size={size} variant={variant} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
