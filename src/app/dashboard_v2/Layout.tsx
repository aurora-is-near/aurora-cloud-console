import React from "react"
import Header from "@/components/v2/dashboard/Header"
import LeftMenu from "@/components/v2/dashboard/LeftMenu/LeftMenu"
import { Team } from "@/types/types"

interface LayoutProps {
  team: Team
  children: React.ReactNode
}

const Layout = ({ team, children }: LayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden">
        <LeftMenu team={team} />
        <div className=" flex justify-center w-full h-full overflow-x-hidden overflow-y-auto">
          <div className="w-full max-w-[980px] py-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
