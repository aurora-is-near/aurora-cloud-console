export const ChartSpinner = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div
      className="w-12 h-12 border-2 border-gray-500 rounded-full animate-spin"
      style={{ borderRightColor: "transparent" }}
    />
  </div>
)
