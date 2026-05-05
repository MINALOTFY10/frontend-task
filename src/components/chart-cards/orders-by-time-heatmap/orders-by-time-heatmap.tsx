import ReactECharts from "echarts-for-react";
import ChartCard from "../chart-card";
import { useOrdersByTime } from "../../../hooks/use-orders-by-time";
import { FaCalendarAlt } from "react-icons/fa";
import styles from "./orders-by-time-heatmap.module.css";

const COLOR_SCALE = ["#fff", "#dbe9ff", "#b3d2ff", "#7fb6ff", "var(--color-primary)"];

const AXIS_STYLE = {
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: { color: "var(--color-text-primary)", fontSize: "var(--font-size-chart-axis)" },
  splitArea: { show: false },
};

export default function OrdersByTimeHeatmap() {
  const { data, dayLabels, timeLabels, maxValue } = useOrdersByTime();

  const option = {
    grid: { top: 6, right: 12, bottom: 30, left: 34 },
    xAxis: { type: "category", data: dayLabels, ...AXIS_STYLE },
    yAxis: { type: "category", data: timeLabels, ...AXIS_STYLE },
    visualMap: { min: 0, max: maxValue, show: false, inRange: { color: COLOR_SCALE } },
    tooltip: {
      backgroundColor: "#fff",
      borderWidth: 0,
      textStyle: { color: "var(--color-text-primary)" },
      formatter: ({ value: [x, y, v] }: { value: [number, number, number] }) => `${timeLabels[y]} on ${dayLabels[x]}: ${v} orders`,
    },
    series: [
      {
        type: "heatmap",
        data: data.flatMap((row, y) => row.map((value, x) => [x, y, value])),
        itemStyle: { borderRadius: 10, borderColor: "var(--color-bg-card)", borderWidth: 7 },
      },
    ],
  };

  return (
    <ChartCard
      title="Orders By Time"
      action={
        <div className={styles.headerAction}>
          <div className={styles.legend}>
            <span>0</span>
            <div className={styles.legendScale}>
              {COLOR_SCALE.map((color) => (
                <span key={color} className={styles.legendSwatch} style={{ background: color }} />
              ))}
            </div>
            <span>{maxValue}</span>
          </div>
          <div className={styles.monthPill}>
            <span>April 2026</span>
            <FaCalendarAlt size={11} />
          </div>
        </div>
      }
    >
      <div className={styles.heatmap}>
        <ReactECharts option={option} style={{ width: "100%", height: "100%" }} opts={{ renderer: "svg" }} />
      </div>
    </ChartCard>
  );
}
