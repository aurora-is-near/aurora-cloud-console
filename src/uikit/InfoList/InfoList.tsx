"use client"

import type { PropsWithChildren } from "react"

type Props = PropsWithChildren<{ className?: string }>

export const InfoList = ({ children, className }: Props) => (
  <div className={className}>
    <table className="table-fixed w-full">
      <tbody>{children}</tbody>
    </table>
  </div>
)
