import Image from "next/image"
import clsx from "clsx"
import { Heading } from "@/uikit/Typography/Heading"
import { LinkButton } from "@/components/LinkButton"
import { SIGNUP_ROUTE } from "@/constants/routes"

type MarketplaceGetStartedBannerProps = {
  className?: string
}

export const MarketplaceGetStartedBanner = ({
  className,
}: MarketplaceGetStartedBannerProps) => {
  return (
    <div
      className={clsx(
        "w-full relative flex flex-row items-center rounded-3xl overflow-hidden max-h-[550px] sm:max-h-[400px]",
        className,
      )}
    >
      <div className="md:max-w-md lg:max-w-lg z-10 absolute top-0 left-0 right-0 h-full w-full">
        <div className="w-full p-[10%] sm:p-12 md:p-0 md:pl-16 ld:pl-24 flex flex-col md:justify-center items-center md:items-start h-full text-center md:text-left">
          <Heading size={2} className="text-slate-50">
            Deploy instantly with Aurora Cloud
          </Heading>
          <p className="text-slate-300 mt-2 xl:mt-4 text-sm xl:text-base w-[90%] md:w-full">
            Start with Aurora Cloud now and launch your virtual chain instantly,
            with 1,000 free transactions ready to go.
          </p>
          <LinkButton
            href={SIGNUP_ROUTE}
            className="mt-7 md:mt-3 xl:mt-5"
            size="lg"
          >
            Get Started
          </LinkButton>
        </div>
      </div>
      <Image
        src="/static/v2/images/marketplace/get-started-banner.png"
        alt=""
        width={2488}
        height={676}
        className="w-full h-auto object-cover hidden md:block md:aspect-[2] lg:aspect-[3.68]"
      />
      <Image
        src="/static/v2/images/marketplace/get-started-banner-mobile.png"
        alt=""
        width={764}
        height={1156}
        className="w-full h-auto object-cover md:hidden"
      />
    </div>
  )
}
