export const CHART_COLOURS = [
  "green",
  "cyan",
  "orange",
  "purple",
  "rose",
] as const

export const CHART_COLOUR_HEXES: {
  [x in (typeof CHART_COLOURS)[number]]: string
} = {
  green: "#4ade80",
  cyan: "#22d3ee",
  orange: "#fb923c",
  purple: "#c084fc",
  rose: "#fb7185",
}

export const CHART_DATE_OPTION_VALUES = ["1 WEEK", "1 MONTH", "3 MONTH"]

export const CHART_DATE_OPTIONS: {
  label: string
  value: (typeof CHART_DATE_OPTION_VALUES)[number] | null
}[] = [
  {
    label: "All time",
    value: null,
  },
  {
    label: "1w",
    value: "1 WEEK",
  },
  {
    label: "1m",
    value: "1 MONTH",
  },
  {
    label: "3m",
    value: "3 MONTH",
  },
]
