import { notFound } from "next/navigation"
import Image from "next/image"
import clsx from "clsx"
import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppDocument,
  MarketplaceAppQuery,
  MarketplaceAppsMetaDocument,
  MarketplaceAppsMetaQuery,
} from "@/cms/generated/graphql"
import { Paragraph } from "@/uikit/Typography/Paragraph"
import { BaseContainer } from "@/components/BaseContainer"
import Heading from "@/components/Heading"
import { Card } from "@/uikit"
import { HtmlContent } from "@/components/HtmlContent"

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

  return (
    <div>
      <BaseContainer className="relative flex flex-col pt-10">
        <div className="flex flex-col sm:flex-row mb-8 sm:mb-14">
          <div className="w-[60px] h-[60px] sm:w-[108px] sm:h-[108px] mb-6 sm:mb-0 sm:mr-10">
            {!!marketplaceApp.logo?.url && (
              <Image
                src={marketplaceApp.logo.url}
                alt={marketplaceApp.logo.alt ?? ""}
                width={marketplaceApp.logo.width}
                height={marketplaceApp.logo.height}
                className="object-contain"
              />
            )}
          </div>
          <div>
            <Heading tag="h1" size="lg" className="mb-3">
              {marketplaceApp.title}
            </Heading>
            <Paragraph size={1} className="text-slate-500 max-w-md">
              Access to onchain data by enabling users to query, visualize, and
              share insights across various blockchains.
            </Paragraph>
          </div>
        </div>
        <div className="flex flex-col flex-1 space-y-4 sm:space-y-5 sm:mb-16">
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
                    objectFit="contain"
                  />
                </div>
              )}
              <div className="">
                {!!contentItem.title && (
                  <Heading tag="h2" size="sm" className="text-slate-900 mb-2.5">
                    {contentItem.title}
                  </Heading>
                )}
                <HtmlContent
                  className="text-slate-600"
                  html={contentItem.body}
                />
              </div>
            </Card>
          ))}
        </div>
      </BaseContainer>
    </div>
  )
}

export default Page
