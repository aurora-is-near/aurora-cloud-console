import Image from "next/image"
import AuroraLogo from "@/components/AuroraLogo"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full bg-slate-900">
      <div className="absolute left-0 bottom-0 w-full h-1/3">
        <Image
          className="object-cover object-[0_20%]"
          src="/static/v2/images/authBg.svg"
          layout="fill"
          objectFit="cover"
          sizes="100vw"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent" />
      </div>
      <div className="absolute top-10">
        <AuroraLogo />
      </div>
      <div className="flex flex-col items-center justify-center h-screen z-10">
        {children}
      </div>
    </div>
  )
}

export default Layout
