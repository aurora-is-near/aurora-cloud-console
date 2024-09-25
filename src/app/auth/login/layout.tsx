import Image from "next/image"
import { FullScreenPage } from "@/components/FullScreenPage"
import AuroraLogo from "@/components/v2/AuroraLogo"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <FullScreenPage>{children}</FullScreenPage>
}

export default Layout

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen w-full"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "#111827",
        backgroundImage: "url('/static/v2/images/authBg.svg')",
      }}
    >
      <Image
        width="100"
        height="100"
        src="/static/v2/images/authBg.svg"
        alt="Aurora"
      />
      <div className="absolute top-10">
        <AuroraLogo />
      </div>
      {children}
    </div>
  )
}

export default Layout
