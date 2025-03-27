import { ReactNode } from "react"
import ContactModal from "@/components/ContactModal"
import { TeamProvider } from "@/providers/TeamProvider"

const Layout = ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  return (
    <TeamProvider teamKey={teamKey}>
      {children}
      <ContactModal teamKey={teamKey} />
    </TeamProvider>
  )
}

export default Layout
