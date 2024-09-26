import AuroraLogo from "@/components/AuroraLogo"

const AuthLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-center bg-cover bg-[#111827] bg-[url('/static/v2/images/authBg.svg')]">
      <div className="absolute top-10">
        <AuroraLogo />
      </div>
      {children}
    </div>
  )
}

export default AuthLayoutWrapper
