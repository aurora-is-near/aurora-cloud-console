import { ReactNode } from "react"

type ViewListItemDetailsRowProps = {
  label: string
  children: ReactNode
}

export const ViewListItemDetailsRow = ({
  label,
  children,
}: ViewListItemDetailsRowProps) => (
  <div className="flex w-full font-medium text-sm">
    <span className="flex-1 text-slate-500">{label}</span>
    <span className="slate-900">{children}</span>
  </div>
)
