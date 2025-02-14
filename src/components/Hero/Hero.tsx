import clsx from "clsx"
import type { ReactNode, PropsWithChildren } from "react"

import HeroTitle from "./HeroTitle"
import HeroContent from "./HeroContent"

interface HeroProps extends PropsWithChildren {
  title: ReactNode
  description: ReactNode
  image?: ReactNode
  hasDivider?: boolean
}

const Hero = ({
  title,
  description,
  image,
  children,
  hasDivider = false,
}: HeroProps) => (
  <div
    className={clsx(
      "pt-3 pb-12",
      hasDivider ? "border-b border-slate-200 mb-7" : "",
    )}
  >
    <div className="flex flex-row gap-6 justify-between items-center">
      <div className="flex flex-col gap-5 pt-9 max-w-[485px] min-h-[240px]">
        <HeroTitle>
          <div className="flex flex-row items-center gap-5">{title}</div>
        </HeroTitle>
        <HeroContent>{description}</HeroContent>
      </div>
      <div className="hidden md:flex self-start">{image}</div>
    </div>
    <div className="md:max-w-[66%]">{children}</div>
  </div>
)

export default Hero
