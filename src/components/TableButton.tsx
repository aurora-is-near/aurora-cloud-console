import clsx from "clsx"
import { ComponentType } from "react"

type TableButtonProps = {
  srOnlyText?: string
  onClick?: () => void
  Icon: ComponentType<{ className?: string }>
  disabled?: boolean
  href?: string
}

const TableButton = ({
  srOnlyText = "Remove",
  onClick,
  Icon,
  disabled,
  href,
}: TableButtonProps) => {
  const Component = href ? "a" : "button"

  return (
    <Component
      type={href ? undefined : "button"}
      href={href}
      className={clsx(
        "border p-2.5 rounded-lg",
        disabled
          ? "text-slate-500 bg-slate-200 cursor-not-allowed border-transparent"
          : "text-slate-900 hover:border-slate-600 border-slate-400",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="sr-only">{srOnlyText}</span>
      <Icon className="w-4 h-4" />
    </Component>
  )
}

export default TableButton
