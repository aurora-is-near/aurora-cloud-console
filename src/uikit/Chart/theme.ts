export type Theme = {
  barSize: number
  labelSize: number
  colors: {
    bg: string
    tick: string
    main: string
    inactive: string
    areaActive: [string, string]
    areaInactive: [string, string]
    font: string
    tooltip: {
      title: string
      label: string
      bg: string
    }
  }
}

const mainColor = "#17A615"
const transparentRGBA = "rgba(255, 255, 255, 0)"

export const defaultTheme: Theme = {
  barSize: 14,
  labelSize: 12,
  colors: {
    bg: "#FFF",
    tick: "#64748B",
    main: mainColor,
    inactive: "#CBD5E1",
    areaActive: [mainColor, transparentRGBA],
    areaInactive: ["rgba(148, 163, 184, 0.102)", transparentRGBA],
    font: "#0F172A",
    tooltip: {
      title: "#E2E8F0",
      label: "#FFFFFF",
      bg: "rgba(51, 65, 85, 0.95)",
    },
  },
}
