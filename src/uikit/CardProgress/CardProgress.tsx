import { clsx } from "../clsx"

import { Card } from "../Card"
import { Typography } from "../Typography"

type Props = {
  index: number
  title: string
  text: string
  isActive?: boolean
}

export const CardProgress = ({ index, title, text, isActive }: Props) => {
  return (
    <Card className="flex flex-col items-center gap-2 relative overflow-hidden">
      <div
        className={clsx("absolute top-0 left-0 w-full h-2 bg-slate-200", {
          "bg-green-500": isActive,
        })}
      />

      <div
        className={clsx(
          "flex items-center justify-center bg-slate-400 rounded-full w-7 h-7",
          {
            "bg-slate-900": isActive,
          },
        )}
      >
        <Typography variant="label" size={3} className="text-white">
          {index}
        </Typography>
      </div>

      <Typography
        variant="label"
        size={2}
        className={clsx("text-center text-slate-500", {
          "text-slate-900": isActive,
        })}
      >
        {title}
      </Typography>
      <Typography
        variant="paragraph"
        size={4}
        className="text-center text-slate-500"
      >
        {text}
      </Typography>
    </Card>
  )
}
