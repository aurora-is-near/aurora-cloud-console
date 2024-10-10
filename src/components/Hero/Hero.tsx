import { ReactNode } from "react"
import HeroTitle from "./HeroTitle"
import HeroContent from "./HeroContent"

interface HeroProps {
  title: string
  description: string
  actions?: ReactNode
  titlePrefix?: ReactNode
  image?: ReactNode
}

const Hero = ({
  title,
  titlePrefix,
  description,
  actions,
  image,
}: HeroProps) => {
  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <div className="flex flex-col gap-5 md:max-w-[50%]">
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
