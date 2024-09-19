import React from "react"
import Header from "@/components/v2/dashboard/Header"
import LeftMenu from "@/components/v2/dashboard/LeftMenu/LeftMenu"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Header />
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden">
        <LeftMenu />
        <div className="flex justify-center w-full h-full overflow-x-hidden overflow-y-auto">
          <div className="w-full max-w-[980px] py-10">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
