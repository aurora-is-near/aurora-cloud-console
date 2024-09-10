import Image from "next/image"
import Link from "next/link"

type AuroraLogoProps = {
  href?: string
}

const AuroraLogo = ({ href = "/" }: AuroraLogoProps) => (
  <Link href={href} className="flex h-15 shrink-0 items-center justify-center">
    <div
      className="mr-2 pr-2 py-0.5"
      style={{ borderRight: "1px solid #64748B" }}
    >
      <Image
        width={100}
        height={15}
        src="/static/v2/images/Aurora.svg"
        alt="Aurora"
      />
    </div>
    <Image
      width={100}
      height={15}
      src="/static/v2/images/AuroraCloud.svg"
      alt="AuroraCloud"
    />
  </Link>
)

export default AuroraLogo
