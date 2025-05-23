import { notFound } from "next/navigation"
import Image from "next/image"
import clsx from "clsx"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"
import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppDocument,
  MarketplaceAppQuery,
  MarketplaceAppsMetaDocument,
  MarketplaceAppsMetaQuery,
  MarketplaceCollectionDocument,
  MarketplaceCollectionQuery,
} from "@/cms/generated/graphql"
import { Paragraph } from "@/uikit/Typography/Paragraph"
import { BaseContainer } from "@/components/BaseContainer"
import { Card } from "@/uikit"
import { HtmlContent } from "@/components/HtmlContent"
import { MarketplaceCards } from "@/app/marketplace/MarketPlaceCards"
import { RequestIntegrationButton } from "@/app/marketplace/apps/[slug]/RequestIntegrationButton"
import { getMarketplaceApps } from "@/utils/marketplace/get-marketplace-apps"
import { Heading } from "@/uikit/Typography/Heading"
import { getAuroraCollection } from "@/utils/marketplace/get-aurora-collection"
import { MarketPlacePills } from "../../MarketPlacePills"
import { BackButton } from "./BackButton"
import { Seal } from "./Seal"

export async function generateStaticParams() {
  const graphqlClient = createGraphqlClient()

  const { allMarketplaceApps } =
    await graphqlClient.request<MarketplaceAppsMetaQuery>(
      MarketplaceAppsMetaDocument,
    )

  return allMarketplaceApps.map((post) => ({
    slug: post.slug,
  }))
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const graphqlClient = createGraphqlClient()

  const { marketplaceApp } = await graphqlClient.request<MarketplaceAppQuery>(
    MarketplaceAppDocument,
    { slug },
  )

  if (!marketplaceApp) {
    notFound()
  }

  const isFree = /free/i.test(marketplaceApp.pricing ?? "")
  const firstCategory = marketplaceApp.categories[0]
  const auroraCollection = getAuroraCollection(marketplaceApp)

  const [relatedCollection, firstCategoryApps] = await Promise.all([
    auroraCollection
      ? await graphqlClient.request<MarketplaceCollectionQuery>(
          MarketplaceCollectionDocument,
          { slug: auroraCollection.slug },
        )
      : null,
    firstCategory
      ? getMarketplaceApps({
          first: 3,
          excludedAppId: marketplaceApp.id,
          categoryId: firstCategory.id,
        })
      : null,
  ])

  const relatedApps = auroraCollection
    ? (relatedCollection?.marketplaceCollection?.apps ?? [])
    : firstCategoryApps

  return (
    <BaseContainer size="lg">
      <div className="w-full h-full flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 overflow-hidden pt-10 md:gap-x-16">
        <div className="mb-8 md:mb-16 md:order-2">
          {/* Header */}
          <div className="flex flex-col sm:flex-row mb-8 md:mb-14">
            <div className="w-[60px] min-w-[60px] sm:w-[108px] sm:min-w-[108px] aspect-square mb-6 sm:mb-0 sm:mr-10">
              {marketplaceApp.logo?.url ? (
                <Image
                  src={marketplaceApp.logo.url}
                  alt={marketplaceApp.logo.alt ?? ""}
                  width={marketplaceApp.logo.width}
                  height={marketplaceApp.logo.height}
                  className="object-contain rounded-2xl"
                />
              ) : (
                <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-full w-full" />
              )}
            </div>
            <div className="flex-1 relative">
              <div className="flex flex-row justify-between">
                <Heading
                  as="h1"
                  size={2}
                  className="mb-3 text-slate-900 dark:text-slate-50"
                >
                  {marketplaceApp.title}
                </Heading>
              </div>
              <Paragraph
                size={1}
                className="text-slate-500 dark:text-slate-300 max-w-md"
              >
                {marketplaceApp.description}
              </Paragraph>
              <RequestIntegrationButton />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex flex-col flex-1 space-y-4 sm:space-y-5">
            {marketplaceApp.content.map((contentItem) => (
              <Card
                key={contentItem.id}
                className={clsx(
                  "grid gap-y-5 gap-x-12",
                  contentItem.image && "md:grid-cols-2",
                )}
              >
                {contentItem.image && (
                  <div className="relative w-full md:order-2">
                    <Image
                      src={contentItem.image.url}
                      alt={contentItem.image.alt ?? ""}
                      width={contentItem.image.width}
                      height={contentItem.image.height}
                      className="object-contain"
                    />
                  </div>
                )}
                <div>
                  {!!contentItem.title && (
                    <Heading
                      as="h2"
                      size={3}
                      className="text-slate-900 dark:text-slate-50 mb-2.5"
                    >
                      {contentItem.title}
                    </Heading>
                  )}
                  <HtmlContent
                    className="text-slate-600 dark:text-slate-300"
                    html={contentItem.body}
                  />
                </div>
              </Card>
            ))}
          </div>

          {!!relatedApps?.length && (
            <MarketplaceCards
              showSingleRow
              className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-700"
              title={auroraCollection?.title ?? firstCategory.title}
              apps={relatedApps}
              seeAllLink={
                auroraCollection
                  ? `/marketplace/collections/${auroraCollection.slug}`
                  : `/marketplace/categories/${firstCategory.slug}`
              }
            />
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-52 md:min-w-52 divide-y space-y-6 divide-slate-200 dark:divide-slate-700 md:order-1 mb-8 md:mb-0">
          <BackButton />
          {!!marketplaceApp.pricing && (
            <section>
              <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg mt-6">
                Pricing
              </h3>
              <div className="mt-4 flex flex-row items-center gap-1.5">
                <Seal
                  variant={isFree ? "check" : "question"}
                  className="w-5 h-5 text-slate-500 dark:text-slate-300"
                />
                <p
                  className={clsx(
                    "font-medium text-sm tracking-tight",
                    isFree
                      ? "text-green-800 dark:text-green-500"
                      : "text-slate-500 dark:text-slate-300",
                  )}
                >
                  {marketplaceApp.pricing}
                </p>
              </div>
            </section>
          )}
          {!!marketplaceApp.links.length && (
            <section>
              <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg mt-6">
                Learn more
              </h3>
              <ul className="space-y-3 mt-4">
                {marketplaceApp.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline text-cyan-700 dark:text-cyan-500 font-medium flex flex-row items-center gap-1"
                    >
                      {link.text}
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {marketplaceApp.categories.length > 0 && (
            <section>
              <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg mt-6">
                Categories
              </h3>
              <MarketPlacePills
                categories={marketplaceApp.categories}
                className="mt-4"
              />
            </section>
          )}
        </aside>
      </div>
    </BaseContainer>
  )
}

export default Page
