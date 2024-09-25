import AuroraLogo from "@/components/v2/AuroraLogo"

const AuthLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
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
      <div className="absolute top-10">
        <AuroraLogo />
      </div>
      {children}
    </div>
  )
}

export default AuthLayoutWrapper
