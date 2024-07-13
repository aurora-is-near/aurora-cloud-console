import { PropsWithChildren } from "react"
import { CardConfigRow } from "@/components/CardConfigRow"

export const CardConfigGrid = ({ children }: PropsWithChildren) => {
  return <div className="grid grid-cols-3">{children}</div>
}

CardConfigGrid.Row = CardConfigRow
