import Image from "next/image"
import clsx from "clsx"
import { Heading } from "@/uikit/Typography/Heading"
import { BaseContainer } from "@/components/BaseContainer"
import { LinkButton } from "@/components/LinkButton"
import { SIGNUP_ROUTE } from "@/constants/routes"

type MarketplaceGetStartedBannerProps = {
  className?: string
}

export const MarketplaceGetStartedBanner = async ({
  className,
}: MarketplaceGetStartedBannerProps) => {
  return (
    <div
      className={clsx(
        "w-full xl:aspect-[3.68] relative flex flex-row items-center",
        className,
      )}
    >
      <BaseContainer size="lg" className="h-full">
        <div className="max-w-lg z-10 absolute top-0 left-0 h-full">
          <div className="pl-24 flex flex-col justify-center h-full">
            <Heading size={2} className="text-slate-50">
              Deploy instantly with Aurora Cloud
            </Heading>
            <p className="text-slate-300 mt-2 xl:mt-4 text-sm xl:text-base">
              Start with Aurora Cloud now and launch your virtual chain
              instantly, with 1,000 free transactions ready to go.
            </p>
            <LinkButton href={SIGNUP_ROUTE} className="mt-3 xl:mt-5">
              Get Started
            </LinkButton>
          </div>
        </div>
        <Image
          src="/static/v2/images/marketplace/get-started-banner.png"
          alt=""
          width={2488}
          height={676}
          className="w-full h-auto object-cover"
        />
      </BaseContainer>
    </div>
  )
}
