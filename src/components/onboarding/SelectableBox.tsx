import clsx from "clsx"
import { ReactNode } from "react"

interface SelectableBoxProps {
  selected: boolean
  onClick: () => void
  children: ReactNode
  className?: string
  disabled?: boolean
}

const SelectableBox: React.FC<SelectableBoxProps> = ({
  selected,
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  const enabledClasses = selected
    ? "ring-2 ring-green-600 bg-green-50"
    : "ring-1 ring-slate-300 bg-white"

  const disabledClasses =
    "border border-slate-300 bg-slate-50 cursor-not-allowed"

  const textClasses = disabled ? "text-slate-500" : ""

  return (
    <button
      className={clsx(
        "inline-flex flex-col justify-start align-top text-left rounded-lg transition-colors duration-200",
        disabled ? disabledClasses : enabledClasses,
        textClasses,
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
