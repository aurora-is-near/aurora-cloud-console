import Heading from "@/components/Heading"
import { ReactNode } from "react"

type HeadingRowProps = {
  title: string
  children: ReactNode
}

export const HeadingRow = ({ title, children }: HeadingRowProps) => (
  <div className="flex justify-between items-center mb-7">
    <Heading tag="h2">{title}</Heading>
    <div className="flex items-center gap-3">{children}</div>
  </div>
)
