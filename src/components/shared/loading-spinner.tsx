import { Spinner } from "react-bootstrap";
import styles from "./loading-spinner.module.css";

type LoadingSpinnerProps = {
  size?: "sm";
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  className?: string;
};

export default function LoadingSpinner({ size, variant = "primary", className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`${styles.wrapper} ${className}`} role="status" aria-live="polite">
      <Spinner animation="border" size={size} variant={variant} />
    </div>
  );
}
