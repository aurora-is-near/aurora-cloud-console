import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Title,
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
