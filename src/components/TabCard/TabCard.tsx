import { ReactNode } from "react"
import Link from "next/link"
import Card from "@/components/Card"

type TabCardProps = {
  children: ReactNode
  attribution?: {
    icon?: ReactNode
    text: string
    link?: string
  }
}

export const TabCard = ({ children, attribution }: TabCardProps) => (
  <Card className="w-full">
    {children}
    {attribution && (
      <div className="pt-5 mt-5 flex flex-row items-center gap-x-3 border-t">
        {attribution.icon}
        <span className="text-sm text-slate-600">
          {attribution.link ? (
            <Link href={attribution.link}>{attribution.text}</Link>
          ) : (
            attribution.text
          )}
        </span>
      </div>
    )}
  </Card>
)
