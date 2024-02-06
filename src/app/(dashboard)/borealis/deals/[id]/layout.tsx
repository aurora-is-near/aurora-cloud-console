import { UserRateLimitsModal } from "@/app/(dashboard)/borealis/deals/[id]/UserRateLimitsModal"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    {children}
    <UserRateLimitsModal />
  </>
)

export default Layout
