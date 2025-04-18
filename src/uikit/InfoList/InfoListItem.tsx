import { clsx } from "../clsx"
import { Label } from "../Label"
import { Typography } from "../Typography"

type ListItemProps = {
  label: string
  labelTooltip?: string
  children: React.ReactNode
  Action?: React.FC<{ term: string; description?: string }>
  className?: string
}

export const InfoListItem = ({
  label,
  labelTooltip,
  children,
  className,
  Action,
}: ListItemProps) => (
  <tr
    className={clsx(
      "border-b border-slate-200 last:border-transparent",
      className,
    )}
  >
    <td className="py-4">
      <Label tooltip={labelTooltip} className="flex-none mr-10 min-w-[180px]">
        {label}
      </Label>
    </td>
    <td className="py-4">
      <div className="col-span-3 flex flex-row items-center justify-between gap-x-2.5">
        {typeof children === "string" ? (
          <Typography variant="paragraph" size={4} className="text-slate-600">
            {children}
          </Typography>
        ) : (
          children
        )}
        {Action && (
          <Action
            term={label}
            description={typeof children === "string" ? children : undefined}
          />
        )}
      </div>
    </td>
  </tr>
)
