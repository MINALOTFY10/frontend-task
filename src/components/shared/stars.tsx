import { LuStar } from "react-icons/lu";

export default function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="d-flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const isFilled = i <= Math.round(rating);

        return (
          <LuStar
            key={i}
            size={size}
            style={{
              color: isFilled ? "#f59e0b" : "var(--color-border)",
              fill: isFilled ? "#f59e0b" : "var(--color-border)",
            }}
          />
        );
      })}
    </div>
  );
}
