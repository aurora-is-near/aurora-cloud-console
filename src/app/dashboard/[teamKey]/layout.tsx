import { ReactNode } from "react"
import ContactModal from "@/components/ContactModal"

const Layout = ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  return (
    <>
      {children}
      <ContactModal teamKey={teamKey} />
    </>
  )
}

export default Layout
