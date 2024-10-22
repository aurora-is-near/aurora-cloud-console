import { PlusIcon } from "@heroicons/react/24/outline"

type AddButtonProps = {
  text: string
  onClick: () => void
  hideIcon?: boolean
}

export const AddButton = ({ text, onClick, hideIcon }: AddButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-slate-50 border border-slate-200 rounded-[10px] flex items-center px-3 py-3.5 text-slate-900"
  >
    <div className="flex flex-row items-center gap-2">
      {hideIcon ? <div className="h-5" /> : <PlusIcon className="w-5 h-5" />}
      <span className="leading-none text-sm font-medium">{text}</span>
    </div>
  </button>
)
