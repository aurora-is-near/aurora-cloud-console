import Link from "next/link"
import { Aurora, AuroraCloud } from "../../public/static/v2/images"

type AuroraLogoProps = {
  href?: string
}

const AuroraLogo = ({ href = "/" }: AuroraLogoProps) => (
  <Link href={href} className="flex h-15 shrink-0 items-center justify-center">
    <div className="mr-2 pr-2 py-0.5 border-r border-slate-500">
      <Aurora className="w-[100px] h-[16px]" />
    </div>
    <div className="flex items-center justify-center">
      <AuroraCloud className="w-[100px] h-[23px]" />
    </div>
  </Link>
)

export default AuroraLogo
