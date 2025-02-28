import { ReactNode } from "react"
import { setUser } from "@/mixpanel"
import ContactModal from "@/components/ContactModal"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  void setUser()

  return (
    <>
      {children}
      <ContactModal teamKey={teamKey} />
    </>
  )
}

export default Layout
