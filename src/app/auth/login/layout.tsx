import AuthLayoutWrapper from "@/components/AuthLayoutWrapper"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
}

export default Layout
