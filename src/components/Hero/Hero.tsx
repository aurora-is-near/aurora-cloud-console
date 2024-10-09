import { ReactNode } from "react"
import HeroTitle from "@/components/Hero/HeroTitle"
import HeroContent from "@/components/Hero/HeroContent"
import { LinkButton } from "@/components/LinkButton"

export interface HeroButtonProps {
  text?: string
  element?: ReactNode
  path?: string
  icon?: ReactNode
}

interface HeroProps {
  title: string
  description: string
  button?: HeroButtonProps
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
      <div className="flex flex-col gap-5 md:max-w-[50%]">
        <HeroTitle>
          <div className="flex flex-row items-center gap-5">
            {titlePrefix}
            {title}
          </div>
        </HeroTitle>
        <HeroContent>{description}</HeroContent>
        {button?.element && button.element}
        {button?.text && !button.element && (
          <div className="flex">
            <LinkButton
              size="lg"
              href={button.path ?? ""}
              disabled={!button.path}
            >
              <div className="flex flex-row gap-2">
                {button.icon}
                {button.text}
              </div>
            </LinkButton>
          </div>
        )}
      </div>
      <div className="hidden md:flex">{image}</div>
    </div>
  )
}

export default Hero
