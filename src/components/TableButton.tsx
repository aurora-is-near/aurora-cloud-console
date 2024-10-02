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
        disabled
          ? "text-slate-300 cursor-not-allowed"
          : "text-slate-900 hover:text-red-500",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="sr-only">{srOnlyText}</span>
      <Icon className="w-5 h-5" />
    </Component>
  )
}

export default TableButton
