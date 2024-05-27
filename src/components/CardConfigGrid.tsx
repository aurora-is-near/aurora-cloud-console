import { CardConfigRow } from "@/components/CardConfigRow"
import { PropsWithChildren } from "react"

export const CardConfigGrid = ({ children }: PropsWithChildren) => {
  return <div className="grid grid-cols-3">{children}</div>
}

CardConfigGrid.Row = CardConfigRow
