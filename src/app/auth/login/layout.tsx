import AuthLayoutWrapper from "@/components/v2/AuthLayourWrapper"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
}

export default Layout
