import { ReactNode } from "react"

const Button = ({
  children,
  loading,
  disabled,
  ...rest
}: {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  [rest: string]: any
}) => {
  const label = loading ? (
    <span className="opacity-0">{children}</span>
  ) : (
    children
  )
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
      className="relative flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:opacity-80"
      disabled={disabled || loading}
      {...rest}
    >
      {label}
      {loading && spinner}
    </button>
  )
}

export default Button
