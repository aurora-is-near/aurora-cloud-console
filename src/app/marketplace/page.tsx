import Image from "next/image"
import { Heading } from "@/uikit/Typography/Heading"
import { BaseContainer } from "@/components/BaseContainer"
import { Paragraph } from "@/uikit/Typography/Paragraph"
import { MarketplaceCards } from "@/app/marketplace/MarketPlaceCards"
import { MarketplaceMainSidebarMenu } from "./MarketplaceMainSidebarMenu"
import { MarketplaceGetStartedBanner } from "./MarketplaceGetStartedBanner"

const Page = async () => {
  return (
    <>
      <div className="w-full md:h-[340px] relative bg-slate-100 flex flex-row items-center">
        <BaseContainer size="lg">
          <div className="md:max-w-md lg:max-w-lg py-10">
            <Heading size={1}>Explore Aurora Cloud Integrations</Heading>
            <Paragraph size={1} className="text-slate-500 mt-4">
              Aurora Cloud chains come ready to use with built-in integrations
              for a seamless start. You can also enhance your Virtual Chain with
              a variety of additional tools and services.
            </Paragraph>
          </div>
          <Image
            src="/static/v2/images/marketplace/main-banner.png"
            alt=""
            width={3024}
            height={684}
            className="absolute top-0 left-0 w-full h-full object-cover hidden md:block"
            priority
          />
        </BaseContainer>
      </div>
      <BaseContainer size="lg">
        <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden pt-14">
          <MarketplaceMainSidebarMenu />
          <div className="w-full lg:pl-16 space-y-14">
            <MarketplaceCards
              showSingleRow
              title="Popular"
              query={{ popular: true, first: 3 }}
              seeAllLink="/marketplace/featured/popular"
            />
            <MarketplaceCards
              showSingleRow
              title="Built by Aurora"
              query={{ builtByAurora: true, first: 3 }}
              seeAllLink="/marketplace/featured/built-by-aurora"
            />
            <MarketplaceCards
              showSingleRow
              title="New & noteworthy"
              query={{ new: true, first: 3 }}
              seeAllLink="/marketplace/featured/new"
            />
            <MarketplaceCards
              showSingleRow
              title="Essentials"
              query={{ essential: true, first: 3 }}
              seeAllLink="/marketplace/featured/essentials"
            />
          </div>
        </div>
        <MarketplaceGetStartedBanner className="mt-28 hidden lg:block" />
      </BaseContainer>
    </>
  )
}

export default Page
