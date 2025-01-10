import clsx from "clsx"
import { ReactNode } from "react"

interface SelectableBoxProps {
  selected: boolean
  children: ReactNode
  className?: string
  disabled?: boolean
  onClick: () => void
}

const SelectableBox: React.FC<SelectableBoxProps> = ({
  selected,
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      className={clsx(
        "inline-flex flex-col justify-start align-top text-left rounded-lg transition-colors duration-200",
        selected
          ? "ring-2 ring-green-600 bg-green-50 shadow-3xl"
          : "ring-1 ring-slate-300 bg-white",
        disabled
          ? "border-slate-300 bg-slate-50 cursor-not-allowed text-slate-500"
          : "transition-shadow transition-border-color hover:transition-shadow hover:transition-border-color hover:shadow-3xl hover:border-slate-300",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  )
}

export default SelectableBox
