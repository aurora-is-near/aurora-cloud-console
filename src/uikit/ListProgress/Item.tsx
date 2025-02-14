import React from "react"

import { clsx } from "../clsx"
import { Typography } from "../Typography"
import type { ClassnameProps } from "../clsx"

import { Badge } from "./Badge"
import { Icon } from "./Icon"
import type { State } from "./types"

type Props = ClassnameProps &
  React.PropsWithChildren<{
    title: string
    description?: string
    state?: State
  }>

export const Item = ({
  title,
  description,
  state = "upcoming",
  children,
  className,
}: Props) => (
  <li
    className={clsx(
      "flex items-center gap-4 px-5 border-b border-slate-200 last:border-transparent",
      children ? "py-4" : "py-5",
      state === "upcoming" ? "bg-slate-50" : "bg-white",
      className,
    )}
  >
    <Icon state={state} />
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <Typography
          size={2}
          variant="paragraph"
          className={state === "upcoming" ? "text-slate-500" : "text-slate-900"}
        >
          {title}
        </Typography>
        <Badge state={state} />
      </div>
      {description ? (
        <Typography variant="paragraph" size={4} className="text-slate-500">
          {description}
        </Typography>
      ) : null}
    </div>
    {children ? <div className="ml-auto">{children}</div> : null}
  </li>
)
