import clsx from "clsx"

type SpinnerProps = {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => (
  <div
    className={clsx(
      "absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2",
      className,
    )}
  >
    <div
      className="w-4 h-4 border-2 border-current rounded-full animate-spin"
      style={{ borderRightColor: "transparent" }}
    />
  </div>
)
