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
  }
}

const transparentRGBA = "rgba(255, 255, 255, 0)"

export const defaultTheme: Theme = {
  barSize: 14,
  labelSize: 12,
  colors: {
    bg: "#FFF",
    tick: "#64748B",
    main: "#17A615",
    inactive: "#CBD5E1",
    areaActive: ["rgba(23, 166, 21, 0.102)", transparentRGBA],
    areaInactive: ["rgba(148, 163, 184, 0.102)", transparentRGBA],
    font: "#0F172A",
  },
}
