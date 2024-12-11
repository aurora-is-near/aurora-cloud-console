import { Bar } from "react-chartjs-2"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title)

type Theme = {
  showGrid: boolean
  barSize: number
  labelSize: number
  colors: {
    grid: string
    tick: string
    bar: string
  }
}

type Props = {
  theme?: Theme
  showZeroValues?: boolean
  data: { x: string; y: number }[]
}

const defaultTheme = {
  showGrid: false,
  barSize: 14,
  labelSize: 12,
  colors: {
    grid: "#E2E8F0",
    tick: "#64748B",
    bar: "#17A615",
  },
}

export const BarChart = ({
  data,
  showZeroValues = false,
  theme = defaultTheme,
}: Props) => {
  const labels = data.map(({ x }) => x)

  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: theme.showGrid,
              color: theme.colors.grid,
              tickColor: theme.colors.tick,
            },
            ticks: {
              color: theme.colors.tick,
              font: {
                family: "var(--font-circular), system-ui, sans-serif",
                weight: "medium",
                size: theme.labelSize,
              },
              callback(_value, index) {
                if (
                  index === 0 ||
                  index === labels.length - 1 ||
                  index === Math.floor(labels.length / 2)
                ) {
                  return labels[index]
                }

                return undefined
              },
            },
          },
          y: { display: false },
        },
      }}
      data={{
        labels: data.map(({ x }) => x),
        datasets: [
          {
            barThickness: theme.barSize,
            // @ts-expect-error wrong library typings
            backgroundColor(context) {
              const values = context.dataset.data

              return values.map((value) =>
                value === 0 ? theme.colors.grid : theme.colors.bar,
              )
            },
            data: data.map(({ y }) => {
              if (y === 0 && showZeroValues) {
                return 0
              }

              return y
            }),
          },
        ],
      }}
    />
  )
}
