import Image from "next/image"
import { Heading } from "@/uikit/Typography/Heading"
import { BaseContainer } from "@/components/BaseContainer"
import { Paragraph } from "@/uikit/Typography/Paragraph"
import { MarketplaceCards } from "@/app/marketplace/MarketPlaceCards"
import { getMarketplaceApps } from "@/utils/marketplace/get-marketplace-apps"
import { MarketplaceCollectionCard } from "@/app/marketplace/MarketPlaceCollectionCard"
import { MarketplaceMainSidebarMenu } from "./MarketplaceMainSidebarMenu"
import { MarketplaceGetStartedBanner } from "./MarketplaceGetStartedBanner"

const Page = async () => {
  const [popularApps, auroraApps, newApps, essentialApps] = await Promise.all([
    getMarketplaceApps({ popular: true, first: 3 }),
    getMarketplaceApps({ builtByAurora: true, first: 3 }),
    getMarketplaceApps({ new: true, first: 3 }),
    getMarketplaceApps({ essential: true, first: 3 }),
  ])

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
            <div>
              <h2 className="text-slate-900 text-2xl font-bold tracking-[-1px] mb-5">
                Collections
              </h2>
              <div className="grid lg:grid-cols-2 gap-x-8 gap-y-5">
                <MarketplaceCollectionCard
                  variant="green"
                  title="Built by Aurora"
                  seeAllLink="/marketplace/featured/built-by-aurora"
                  iconSrc="/static/v2/images/icons/marketplace/collection-built-by-aurora.svg"
                />
                <MarketplaceCollectionCard
                  variant="orange"
                  title="Essentials"
                  seeAllLink="/marketplace/featured/essentials"
                  iconSrc="/static/v2/images/icons/marketplace/collection-essentials.svg"
                />
              </div>
            </div>
            <MarketplaceCards
              showSingleRow
              title="Popular"
              apps={popularApps}
              seeAllLink="/marketplace/featured/popular"
            />
            <MarketplaceCards
              showSingleRow
              title="Built by Aurora"
              apps={auroraApps}
              seeAllLink="/marketplace/featured/built-by-aurora"
            />
            <MarketplaceCards
              showSingleRow
              title="New & noteworthy"
              apps={newApps}
              seeAllLink="/marketplace/featured/new"
            />
            <MarketplaceCards
              showSingleRow
              title="Essentials"
              apps={essentialApps}
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
