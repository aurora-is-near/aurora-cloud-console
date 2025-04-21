export const getCsvSafeValue = (value?: unknown) => {
  if (typeof value === "string") {
    return value.replace(/"/g, '""')
  }

  return value
}

export const getCsv = (csvData: Record<string, unknown>[]) => {
  return [
    Object.keys(csvData[0]).join(","),
    ...csvData.map((row) => {
      return Object.values(row).map((value) => {
        if (Array.isArray(value)) {
          return `"[${value.map(getCsvSafeValue).join(", ")}]"`
        }

        return `"${getCsvSafeValue(value)}"`
      })
    }),
  ].join("\n")
}
