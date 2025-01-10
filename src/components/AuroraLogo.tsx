import Link from "next/link"
import clsx from "clsx"
import AuroraLogoIcon from "../../public/static/icons/aurora-cloud-logo.svg"

type AuroraLogoProps = {
  href?: string
  className?: string
}

const AuroraLogo = ({ href = "/", className }: AuroraLogoProps) => (
  <Link
    href={href}
    className={clsx(
      "flex shrink-0 items-center justify-center h-[40px]",
      className,
    )}
  >
    <AuroraLogoIcon />
  </Link>
)

export default AuroraLogo
