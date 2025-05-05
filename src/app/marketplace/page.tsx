import Image from "next/image"
import { Heading } from "@/uikit/Typography/Heading"
import { BaseContainer } from "@/components/BaseContainer"
import { Paragraph } from "@/uikit/Typography/Paragraph"
import { MarketplaceCards } from "@/app/marketplace/MarketPlaceCards"
import { MarketplaceCollectionCard } from "@/app/marketplace/MarketPlaceCollectionCard"
import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceCollectionsDocument,
  MarketplaceCollectionsQuery,
} from "@/cms/generated/graphql"
import { MarketplaceMainSidebarMenu } from "./MarketplaceMainSidebarMenu"
import { MarketplaceGetStartedBanner } from "./MarketplaceGetStartedBanner"

const Page = async () => {
  const graphqlClient = createGraphqlClient()

  const { allMarketplaceCollections } =
    await graphqlClient.request<MarketplaceCollectionsQuery>(
      MarketplaceCollectionsDocument,
    )

  const featuredCollections = allMarketplaceCollections
    .filter((collection) => collection.featured)
    .slice(0, 2)
    .sort((a) => (a.theme === "aurora" ? -1 : 1))

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
                {featuredCollections.map((collection) => (
                  <MarketplaceCollectionCard
                    colorScheme={
                      collection.theme === "aurora" ? "green" : "orange"
                    }
                    key={collection.id}
                    title={collection.title}
                    seeAllLink={`/marketplace/collections/${collection.slug}`}
                    iconSrc={
                      collection.theme === "aurora"
                        ? "/static/v2/images/icons/marketplace/collection-aurora.svg"
                        : "/static/v2/images/icons/marketplace/collection-default.svg"
                    }
                  />
                ))}
              </div>
            </div>
            {allMarketplaceCollections.map((collection) => (
              <MarketplaceCards
                key={collection.id}
                showSingleRow
                title={collection.title}
                apps={collection.apps}
                seeAllLink={`/marketplace/collections/${collection.slug}`}
              />
            ))}
          </div>
        </div>
        <MarketplaceGetStartedBanner className="mt-28 hidden lg:block" />
      </BaseContainer>
    </>
  )
}

export default Page
