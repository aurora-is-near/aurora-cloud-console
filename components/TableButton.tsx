import clsx from "clsx"
import { ComponentType } from "react"

type TableButtonProps = {
  srOnlyText?: string
  onClick?: () => void
  Icon: ComponentType<{ className?: string }>
  disabled?: boolean
}

const TableButton = ({
  srOnlyText = "Remove",
  onClick,
  Icon,
  disabled,
}: TableButtonProps) => (
  <button
    type="button"
    className={clsx(
      disabled
        ? "text-gray-300 cursor-not-allowed"
        : "text-gray-900 hover:text-red-500",
    )}
    onClick={onClick}
    disabled={disabled}
  >
    <span className="sr-only">{srOnlyText}</span>
    <Icon className="w-5 h-5" />
  </button>
)

export default TableButton
