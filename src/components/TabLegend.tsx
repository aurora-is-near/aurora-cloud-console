import { ChartColor } from "@/types/types"
import { getChartColor } from "@/utils/charts"

export type TabLegendProps = {
  legend: string[]
  colors?: ChartColor[]
}

const TabLegend = ({ legend, colors }: TabLegendProps) => {
  return (
    <div className="flex items-center w-full px-5 space-x-6 rounded-b-sm bg-gray-50 h-9">
      {legend.map((text, i) => (
        <div key={text} className="flex items-center space-x-2">
          <div
            className="h-2.5 w-2.5 rounded-sm"
            style={{
              backgroundColor: getChartColor(i, colors),
            }}
          />
          <span className="text-xs font-medium leading-3 text-gray-900">
            {text}
          </span>
        </div>
      ))}
    </div>
  )
}

export default TabLegend
