import Image from "next/image"
import { BaseContainer } from "@/components/BaseContainer"
import { Paragraph } from "@/uikit/Typography/Paragraph"
import { MarketplaceCards } from "@/app/marketplace/MarketPlaceCards"
import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceCollectionsDocument,
  MarketplaceCollectionsQuery,
} from "@/cms/generated/graphql"
import { MarketplaceMainSidebarMenu } from "./MarketplaceMainSidebarMenu"
import { MarketplaceGetStartedBanner } from "./MarketplaceGetStartedBanner"
import { MarketplaceRequestAppSection } from "./MarketplaceRequestAppSection"

const Page = async () => {
  const graphqlClient = createGraphqlClient()

  const { allMarketplaceCollections } =
    await graphqlClient.request<MarketplaceCollectionsQuery>(
      MarketplaceCollectionsDocument,
    )

  const featuredCollections = allMarketplaceCollections
    .filter((collection) => collection.featured)
    .slice(0, 2)
    .sort((a) => (a.builtByAurora ? -1 : 1))

  return (
    <>
      <div className="w-full max-h-[575px] relative bg-slate-800 flex flex-row items-center aspect-[2.63]">
        <BaseContainer
          size="lg"
          className="z-10 flex items-center justify-center"
        >
          <div className="max-w-xs md:max-w-md lg:max-w-lg py-10 text-center">
            <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl tracking-tight md:leading-[3.25rem] text-slate-50">
              Supercharge
              <br />
              Your Virtual Chain
            </h1>
            <Paragraph size={1} className="text-slate-300 text-lg mt-4 md:mt-6">
              Aurora Cloud chains come ready to use with built-in integrations
              for a seamless start. You can also enhance your Virtual Chain with
              a variety of additional tools and services.
            </Paragraph>
          </div>
        </BaseContainer>
        <Image
          src="/static/images/marketplace/hero-banner.jpg"
          alt=""
          width={3024}
          height={1150}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          priority
        />
      </div>
      <BaseContainer size="lg">
        <div className="w-full h-full flex flex-row bg-slate-50 dark:bg-slate-900 overflow-hidden pt-10 md:pt-14">
          <MarketplaceMainSidebarMenu />
          <div className="w-full lg:pl-16 space-y-12 md:space-y-14">
            {featuredCollections.map((collection) => (
              <MarketplaceCards
                numberOfAppsToShow={3}
                key={collection.id}
                showSingleRow
                title={collection.title}
                apps={collection.apps}
                seeAllLink={`/marketplace/collections/${collection.slug}`}
              />
            ))}
            <MarketplaceCards
              title="All apps"
              apps={allMarketplaceCollections.flatMap(
                (collection) => collection.apps,
              )}
            />
          </div>
        </div>
        <MarketplaceRequestAppSection className="lg:hidden bg-slate-100 dark:bg-slate-800 rounded-[10px] p-6 mt-12" />
        <MarketplaceGetStartedBanner className="mt-12 md:mt-28" />
      </BaseContainer>
    </>
  )
}

export default Page
