import Link from "next/link"
import AuroraLogoIcon from "../../public/static/icons/aurora-cloud-logo.svg"

type AuroraLogoProps = {
  href?: string
}

const AuroraLogo = ({ href = "/" }: AuroraLogoProps) => (
  <Link
    href={href}
    className="flex shrink-0 items-center justify-center h-[40px]"
  >
    <AuroraLogoIcon />
  </Link>
)

export default AuroraLogo
