import { Badge } from "react-bootstrap";
import { PiArrowBendLeftUpBold, PiArrowBendRightDownBold } from "react-icons/pi";
import styles from "./trend-badge.module.css";

type TrendBadgeProps = {
  value: number;
  positive: boolean;
  className?: string;
};

export default function TrendBadge({ value, positive, className = "" }: TrendBadgeProps) {
  return (
    <Badge pill className={`fw-medium ${positive ? styles.badgePositive : styles.badgeNegative} ${className}`}>
      {positive ?
        <PiArrowBendLeftUpBold />
      : <PiArrowBendRightDownBold />}
      {value}%
    </Badge>
  );
}
