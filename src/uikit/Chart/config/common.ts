import type { Theme } from "../theme"

export const getCommonChartOptions = (theme: Theme) => ({
  responsive: true,
  maintainAspectRatio: false,
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
})
