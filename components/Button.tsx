import { ReactNode } from "react"
import clsx from "clsx"

const Button = ({
  children,
  loading,
  disabled,
  fullWidth,
  ...rest
}: {
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
        "relative justify-center rounded-lg bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:opacity-80",
        {
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
