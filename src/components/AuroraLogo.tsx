import Link from "next/link"
import AuroraLogoIcon from "../../public/static/icons/aurora-cloud-logo.svg"

type AuroraLogoProps = {
  href?: string
}

const AuroraLogo = ({ href = "/" }: AuroraLogoProps) => (
  <Link href={href} className="flex h-15 shrink-0 items-center justify-center">
    <AuroraLogoIcon className="h-[26px]" />
  </Link>
)

export default AuroraLogo
