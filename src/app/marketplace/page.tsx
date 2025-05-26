import Image from "next/image"
import clsx from "clsx"
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
      <div className="w-full md:h-[340px] relative bg-slate-100 dark:bg-slate-800 flex flex-row items-center">
        <BaseContainer size="lg">
          <div className="md:max-w-md lg:max-w-lg py-10">
            <h1 className="font-bold text-4xl md:text-5xl tracking-tight md:leading-[3.25rem] text-slate-900 dark:text-slate-50">
              Explore Aurora Cloud Integrations
            </h1>
            <Paragraph
              size={1}
              className="text-slate-500 bg:text-slate-400 dark:text-slate-300 mt-4"
            >
              Aurora Cloud chains come ready to use with built-in integrations
              for a seamless start. You can also enhance your Virtual Chain with
              a variety of additional tools and services.
            </Paragraph>
          </div>
          <Image
            src="/static/image/marketplace/main-banner.png"
            alt=""
            width={3024}
            height={684}
            className="absolute top-0 left-0 w-full h-full object-cover hidden md:block"
            priority
          />
        </BaseContainer>
      </div>
      <BaseContainer size="lg">
        <div className="w-full h-full flex flex-row bg-slate-50 dark:bg-slate-900 overflow-hidden pt-10 md:pt-14">
          <MarketplaceMainSidebarMenu />
          <div className="w-full lg:pl-16 space-y-12 md:space-y-14">
            <div>
              <h2 className="text-slate-900 dark:text-slate-50 text-2xl font-bold tracking-[-1px] mb-5">
                Collections
              </h2>
              <div
                className={clsx(
                  "grid gap-x-8 gap-y-5",
                  featuredCollections.length > 1 && "lg:grid-cols-2",
                )}
              >
                {featuredCollections.map((collection) => (
                  <MarketplaceCollectionCard
                    colorScheme={collection.builtByAurora ? "green" : "orange"}
                    key={collection.id}
                    title={collection.title}
                    href={`/marketplace/collections/${collection.slug}`}
                    iconSrc={
                      collection.builtByAurora
                        ? "/static/image/icons/marketplace/collection-aurora.svg"
                        : "/static/image/icons/marketplace/collection-default.svg"
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
        <MarketplaceRequestAppSection className="lg:hidden bg-slate-100 rounded-[10px] p-6 mt-12" />
        <MarketplaceGetStartedBanner className="mt-12 md:mt-28" />
      </BaseContainer>
    </>
  )
}

export default Page
