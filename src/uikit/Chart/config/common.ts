import { TooltipItem } from "chart.js"
import type { Theme } from "../theme"

export const getCommonChartOptions = (theme: Theme) => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "nearest" as const,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: theme.colors.tick,
        font: {
          size: theme.labelSize,
          family: "var(--font-circular), system-ui, sans-serif",
          weight: "medium",
        },
      },
    },
    y: { display: false },
  },
  plugins: {
    tooltip: {
      enabled: true,
      displayColors: false,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      cornerRadius: 4,
      callbacks: {
        label: (context: TooltipItem<"line">) => {
          const value = context.parsed.y

          return `${context.dataset.label}\n${value} transactions`
        },
      },
    },
  },
})
