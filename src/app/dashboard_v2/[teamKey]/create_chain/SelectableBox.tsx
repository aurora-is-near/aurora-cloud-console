import React, { ReactNode } from "react"

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
  const baseClasses = "rounded-lg p-6 transition-colors duration-200"
  const enabledClasses = selected
    ? "border-2 border-green-600 bg-green-50"
    : "border border-slate-300 bg-white"

  const disabledClasses =
    "border border-slate-300 bg-slate-50 cursor-not-allowed"

  const textClasses = disabled ? "text-slate-500" : ""

  return (
    <div
      className={`${baseClasses} ${
        disabled ? disabledClasses : enabledClasses
      } ${className} ${textClasses}`}
      onClick={disabled ? undefined : onClick}
      onKeyDown={
        disabled
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                onClick()
              }
            }
      }
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
    >
      {children}
    </div>
  )
}

export default SelectableBox
