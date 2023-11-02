import { ComponentType } from "react"

type TableButtonProps = {
  srOnlyText?: string
  onClick?: () => void
  Icon: ComponentType<{ className?: string }>
}

const TableButton = ({
  srOnlyText = "Remove",
  onClick,
  Icon,
}: TableButtonProps) => (
  <button
    type="button"
    className="text-gray-900 hover:text-red-500"
    onClick={onClick}
  >
    <span className="sr-only">{srOnlyText}</span>
    <Icon className="w-5 h-5" />
  </button>
)

export default TableButton
