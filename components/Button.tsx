import { ReactNode } from "react"
import clsx from "clsx"

const Button = ({
  style = "primary",
  children,
  loading,
  disabled,
  fullWidth,
  ...rest
}: {
  style?: "primary" | "secondary"
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  [rest: string]: any
}) => {
  const spinner = (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <div
        className="w-4 h-4 border-2 border-current rounded-full animate-spin"
        style={{ borderRightColor: "transparent" }}
      />
    </div>
  )

  return (
    <button
      className={clsx(
        "relative justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-80",
        {
          "bg-green-500 text-gray-900 hover:bg-green-400 focus-visible:outline-green-500":
            style === "primary",
          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-600":
            style === "secondary",
          "w-full": fullWidth,
        }
      )}
      disabled={disabled || loading}
      {...rest}
    >
      <span
        className={clsx("flex items-center justify-center gap-2", {
          "opacity-0": loading,
        })}
      >
        {children}
      </span>
      {loading && spinner}
    </button>
  )
}

export default Button
