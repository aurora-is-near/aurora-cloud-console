import { TeamForm } from "@/app/admin/teams/TeamForm"
import Card from "@/components/Card"
import Heading from "@/components/Heading"
import { ReactNode } from "react"

type AdminPageProps = {
  title: string
  children: ReactNode
  actions?: ReactNode
}

export const AdminPage = ({ actions, children, title }: AdminPageProps) => (
  <div className="space-y-6">
    <header className="flex space-y-3 md:space-y-0 md:flex-row flex-col md:items-center md:justify-between lg:flex-col lg:space-y-3 xl:flex-row xl:space-y-0 lg:items-start xl:items-center xl:justify-between">
      <div className="flex space-x-3.5">
        <Heading tag="h2">{title}</Heading>
      </div>
      <div className="flex items-start sm:flex-row flex-col-reverse gap-3">
        {actions}
      </div>
    </header>

    {children}
  </div>
)
