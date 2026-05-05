import ReactECharts from "echarts-for-react";
import ChartCardWrapper from "./chart-card-wrapper";
import { useOrdersByTime } from "../../../hooks/use-orders-by-time";
import { FaCalendarAlt } from "react-icons/fa";
import LoadingErrorState from "../../shared/loading-error-state";

const COLOR_SCALE = ["#fff", "#dbe9ff", "#b3d2ff", "#7fb6ff", "var(--color-primary)"];

const AXIS_STYLE = {
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: { color: "var(--color-text-primary)", fontSize: "var(--font-size-chart-axis)" },
  splitArea: { show: false },
};

export default function OrdersByTimeHeatmap() {
  const { data, dayLabels, timeLabels, maxValue, loading, error } = useOrdersByTime();

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
    <ChartCardWrapper
      title="Orders By Time"
      action={
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-1 text-secondary-custom">
            <span>0</span>
            <div className="d-flex align-items-center gap-1">
              {COLOR_SCALE.map((color) => (
                <span key={color} className="rounded-1" style={{ background: color, width: "10px", height: "10px" }} />
              ))}
            </div>
            <span>{maxValue}</span>
          </div>
          <div className={`d-inline-flex align-items-center gap-2 px-2 py-1 rounded-pill text-secondary-custom`}>
            <span>April 2026</span>
            <FaCalendarAlt size={11} />
          </div>
        </div>
      }
    >
      {loading || error ?
        <LoadingErrorState loading={loading} error={error} errorLabel="Unable to load orders heatmap" />
      : <div style={{ height: "100%" }}>
          <ReactECharts option={option} style={{ height: "100%" }} opts={{ renderer: "svg" }} />
        </div>
      }
    </ChartCardWrapper>
  );
}
