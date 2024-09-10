import AuroraLogo from "@/components/v2/AuroraLogo"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="bg-slate-800 relative flex flex-col items-center justify-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/static/v2/images/authBg.svg')" }}
    >
      <div className="absolute top-10">
        <AuroraLogo />
      </div>
      {children}
    </div>
  )
}

export default Layout
