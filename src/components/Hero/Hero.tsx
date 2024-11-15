import clsx from "clsx"
import { ReactNode } from "react"
import HeroTitle from "./HeroTitle"
import HeroContent from "./HeroContent"

interface HeroProps {
  title: string
  description: string
  actions?: ReactNode
  titlePrefix?: ReactNode
  image?: ReactNode
  hasDivider?: boolean
}

const Hero = ({
  title,
  titlePrefix,
  description,
  actions,
  image,
  hasDivider = false,
}: HeroProps) => {
  return (
    <div
      className={clsx(
        "flex flex-row gap-6 justify-between items-center pt-3 pb-5",
        hasDivider ? "border-b border-slate-200 mb-7" : "",
      )}
    >
      <div className="flex flex-col gap-5 pt-9 max-w-[485px] min-h-[240px]">
        <HeroTitle>
          <div className="flex flex-row items-center gap-5">
            {titlePrefix}
            {title}
          </div>
        </HeroTitle>
        <HeroContent>{description}</HeroContent>
        {actions && <div className="flex">{actions}</div>}
      </div>
      <div className="hidden md:flex">{image}</div>
    </div>
  )
}

export default Hero
