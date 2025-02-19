import React from "react"
import { paramCase } from "change-case"

import { clsx } from "../clsx"
import { Typography } from "../Typography"
import type { ClassnameProps } from "../clsx"

import { Badge } from "./Badge"
import { Icon } from "./Icon"
import type { State } from "./types"

type Props = ClassnameProps &
  React.PropsWithChildren<{
    id?: string
    title: string
    description?: string
    state?: State
    testID?: string
  }>

export const Item = ({
  id,
  title,
  description,
  state = "upcoming",
  children,
  className,
  testID,
}: Props) => {
  const titleId = id ? paramCase(`${id}-title`) : undefined

  return (
    <li
      id={id}
      className={clsx(
        "flex items-center gap-4 px-5 border-b border-slate-200 last:border-transparent",
        children ? "py-4" : "py-5",
        state === "upcoming" ? "bg-slate-50" : "bg-white",
        className,
      )}
      aria-labelledby={titleId}
      aria-current={
        ["current", "pending", "failed"].includes(state) ? "step" : undefined
      }
      data-testid={testID}
    >
      <Icon state={state} />
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Typography
            id={titleId}
            size={2}
            variant="paragraph"
            className={
              state === "upcoming" ? "text-slate-500" : "text-slate-900"
            }
          >
            {title}
          </Typography>
          <Badge state={state} />
        </div>
        {!!description && (
          <Typography variant="paragraph" size={4} className="text-slate-500">
            {description}
          </Typography>
        )}
      </div>
      {children ? <div className="ml-auto">{children}</div> : null}
    </li>
  )
}
