"use client"

import { ReactNode, useEffect } from "react"
import { setUser } from "@/mixpanel"

const Layout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    void setUser()
  }, [])

  return children
}

export default Layout
