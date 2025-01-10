import type { Chart } from "chart.js"
import { format } from "date-fns"

import { defaultTheme } from "./theme"
import type { Label } from "./types"

type Props = {
  xIndex: number
  yValue: number
  pointRadius?: number
}

export const showTodayLine = ({ xIndex, yValue, pointRadius = 5 }: Props) => ({
  id: "verticalLinePlugin",
  afterDraw: (chart: Chart) => {
    const { ctx } = chart
    const xScale = chart.scales.x
    const yScale = chart.scales.y

    if (xIndex === -1) {
      return
    }

    const todayXPos = xScale.getPixelForValue(xIndex)
    const todayYPos = yScale.getPixelForValue(yValue)

    // Draw vertical line
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(todayXPos, yScale.getPixelForValue(yScale.min))
    ctx.lineTo(todayXPos, todayYPos + pointRadius)
    ctx.lineWidth = 1
    ctx.strokeStyle = defaultTheme.colors.inactive
    ctx.stroke()
    ctx.restore()

    // Draw date label
    ctx.save()
    ctx.font = "12px sans-serif"
    ctx.fillStyle = defaultTheme.colors.font
    ctx.textAlign = "center"

    const label = format(new Date(), "MMM d")
    const labelY = yScale.getPixelForValue(yScale.min) + 20 // Position below the line

    ctx.fillText(label, todayXPos, labelY)
    ctx.restore()
  },
})

export const minimizeLabels =
  (labels: Label[]) => (_value: string | number, index: number) => {
    if (index === 0 || index === labels.length - 1) {
      return labels[index]
    }

    return undefined
  }

type CommonPlugins = "minimizeLabels"
export type BarChartPlugins = CommonPlugins
export type LineChartPlugins = CommonPlugins | "showTodayLine"
