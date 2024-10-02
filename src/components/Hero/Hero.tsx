import { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/Button"
import HeroTitle from "@/components/Hero/HeroTitle"
import HeroContent from "@/components/Hero/HeroContent"

export interface HeroButtonProps {
  text: string
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
      <div className="flex flex-col gap-5 max-w-[50%]">
        <HeroTitle>
          <div className="flex flex-row items-center gap-5">
            {titlePrefix}
            {title}
          </div>
        </HeroTitle>
        <HeroContent>{description}</HeroContent>
        {button && (
          <Link href={button.path ?? ""}>
            <div className="flex justify-items-start">
              <Button disabled={!button.path} size="lg">
                <div className="flex flex-row gap-2">
                  {button.icon}
                  {button.text}
                </div>
              </Button>
            </div>
          </Link>
        )}
      </div>
      <div className="flex">{image}</div>
    </div>
  )
}

export default Hero
