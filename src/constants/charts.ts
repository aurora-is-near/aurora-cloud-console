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

export const CHART_DATE_OPTIONS = [
  {
    label: "All time",
    value: undefined,
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
