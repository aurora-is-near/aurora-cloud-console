import { ReactNode } from "react"
import HeroTitle from "@/components/v2/Hero/HeroTitle"
import HeroContent from "@/components/v2/Hero/HeroContent"
import AuroraButton from "@/components/v2/AuroraButton"

interface HeroButtonProps {
  text: string
  path?: string
  icon?: ReactNode
}

interface HeroProps {
  title: string
  description: string
  button: HeroButtonProps
  titlePrefix?: ReactNode
  image?: ReactNode
}

const Hero = ({
  title,
  titlePrefix,
  description,
  button,
  image,
}: HeroProps) => {
  return (
    <div className="flex flex-row gap-2 justify-between items-center">
      <div className="flex flex-col gap-5 max-w-[50%]">
        <HeroTitle>
          <div className="flex flex-row items-center gap-5">
            {titlePrefix}
            {title}
          </div>
        </HeroTitle>
        <HeroContent>{description}</HeroContent>
        <div className="flex justify-items-start">
          <AuroraButton
            disabled={!button.path}
            path={button.path}
            icon={button.icon}
          >
            {button.text}
          </AuroraButton>
        </div>
      </div>
      <div className="flex">{image}</div>
    </div>
  )
}

export default Hero
