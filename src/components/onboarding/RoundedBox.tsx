import React from "react"

interface RoundedBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  selected?: boolean
  disabled?: boolean
}

const RoundedBox: React.FC<RoundedBoxProps> = ({
  children,
  disabled = false,
  className,
  ...props
}) => {
  const baseClasses = "rounded-lg border border-slate-300 bg-white p-4"

  const disabledClasses = disabled ? "opacity-50" : ""

  return (
    <div
      className={`${baseClasses} ${disabledClasses} ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default RoundedBox
