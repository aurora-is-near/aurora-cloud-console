import { notFound } from "next/navigation"
import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppDocument,
  MarketplaceAppQuery,
  MarketplaceAppsMetaDocument,
  MarketplaceAppsMetaQuery,
} from "@/cms/generated/graphql"
import { DashboardPage } from "@/components/DashboardPage"
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
    <main>
      <BaseContainer className="relative flex flex-col">
        <div className="mb-14">
          <Heading tag="h1" size="lg" className="mb-3">
            {marketplaceApp.title}
          </Heading>
          <Paragraph size={1} className="text-slate-500 max-w-md">
            Access to onchain data by enabling users to query, visualize, and
            share insights across various blockchains.
          </Paragraph>
        </div>
        <div className="flex flex-col flex-1 space-y-4 sm:space-y-5 mb-16">
          {marketplaceApp.content.map((contentItem) => (
            <Card
              key={contentItem.id}
              className="flex flex-col gap-4 sm:gap-5 mb-6"
            >
              <HtmlContent className="text-slate-600" html={contentItem.body} />
            </Card>
          ))}
        </div>
      </BaseContainer>
    </main>
  )
}

export default Page
