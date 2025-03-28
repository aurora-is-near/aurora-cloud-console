import clsx from "clsx"

type SpinnerProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  fullScreen?: boolean
}

export const Spinner = ({
  className,
  size = "sm",
  fullScreen,
}: SpinnerProps) => (
  <div
    className={clsx(
      fullScreen && "w-full h-full flex items-center justify-center",
      className,
    )}
  >
    <div
      className={clsx(
        "border-slate-500 border-current rounded-full animate-spin",
        {
          "w-4 h-4 border-2": size === "sm",
          "w-10 h-10 border-4": size === "md",
          "w-14 h-14 border-4": size === "lg",
        },
      )}
      style={{ borderRightColor: "transparent" }}
    />
  </div>
)
