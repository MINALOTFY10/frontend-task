import { useEffect, useState } from "react";
import { getCarts } from "../services/auth-service";

export const DAY_LABELS = ["12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27"];
export const TIME_LABELS = ["6pm", "4pm", "2pm", "12pm", "10am", "8am"];

const ROWS = 6;
const COLS = 16;

const emptyGrid = (): number[][] => Array.from({ length: ROWS }, () => new Array(COLS).fill(0));

export function useOrdersByTime() {
  const [data, setData] = useState<number[][]>(emptyGrid);

  useEffect(() => {
    getCarts(80, 0)
      .then(({ carts }) => {
        const grid = emptyGrid();

        carts.forEach((cart) => {
          const cell = cart.id % (ROWS * COLS);
          const row = Math.floor(cell / COLS);
          const col = cell % COLS;
          grid[row][col] += cart.totalQuantity;
        });

        setData(grid);
      })
      .catch((err: Error) => new Error(`Failed to fetch Orders heatmap stats: ${err.message}`));
  }, []);

  return {
    data,
    dayLabels: DAY_LABELS,
    timeLabels: TIME_LABELS,
    maxValue: Math.max(0, ...data.flat()),
  };
}
