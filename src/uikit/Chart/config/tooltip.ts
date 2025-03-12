import type { TooltipItem, TooltipOptions } from "chart.js"

import type { Theme } from "../theme"
import type { DeepPartial } from "../../types"

export const getTooltipConfig = <T extends "line" | "bar">(
  theme: Theme,
): DeepPartial<TooltipOptions<T>> => ({
  enabled: true,
  intersect: false,
  displayColors: false,
  mode: "nearest",
  caretSize: 0,
  cornerRadius: 8,
  titleMarginBottom: 3,
  padding: {
    top: 12,
    bottom: 12,
    right: 18,
    left: 18,
  },
  caretPadding: 10,
  backgroundColor: theme.colors.tooltip.bg,
  titleColor: theme.colors.tooltip.title,
  titleFont: {
    size: 12,
    weight: "bold",
  },
  bodyFont: {
    size: 14,
  },
  filter: (item: TooltipItem<T>) => {
    // do not show tooltip for projection area
    return item.datasetIndex === 0
  },
  callbacks: {
    label: (item: TooltipItem<T>) => item.formattedValue,
    labelTextColor: () => theme.colors.tooltip.label,
    title: (items: TooltipItem<T>[]) => {
      if (!items?.length) {
        return
      }

      return (items[0].dataset as unknown as { label: string }).label
    },
  },
})
