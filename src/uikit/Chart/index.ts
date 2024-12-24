import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Filler,
} from "chart.js"

import { BarChart } from "./components/BarChart"
import { LineDatesChart } from "./components/LineDatesChart"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
)

export const Chart = {
  Bar: BarChart,
  LineDates: LineDatesChart,
}
