import { Typography } from "@/uikit"

type Props = {
  children: string
}

export const NotAvailableBadge = ({ children }: Props) => (
  <div className="flex items-center justify-center py-3 px-4 rounded-md bg-slate-200">
    <Typography variant="label" size={2} className="text-slate-500">
      {children}
    </Typography>
  </div>
)
