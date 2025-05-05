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
      "flex shrink-0 items-center justify-center w-[186px] sm:w-[202px]",
      className,
    )}
  >
    <AuroraLogoIcon />
  </Link>
)

export default AuroraLogo
