import { ReactNode } from "react"
import { setUser } from "@/mixpanel"

const Layout = ({ children }: { children: ReactNode }) => {
  void setUser()

  return children
}

export default Layout
