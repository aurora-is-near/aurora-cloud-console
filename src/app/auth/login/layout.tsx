import AuroraLogo from "@/components/v2/AuroraLogo"
// import { AuthBg } from "../../../../public/static/v2/images"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen w-full"
      style={{
        backgroundColor: "#111827",
      }}
    >
      {/* <AuthBg className="absolute top-0 translate-x-1/2 w-full h-full" /> */}
      <div className="absolute top-10 z-10">
        <AuroraLogo />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default Layout
