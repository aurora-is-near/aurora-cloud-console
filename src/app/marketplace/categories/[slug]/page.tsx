import { notFound } from "next/navigation"
import { Heading } from "@/uikit/Typography/Heading"
import { BaseContainer } from "@/components/BaseContainer"
import { Paragraph } from "@/uikit/Typography/Paragraph"
import { MarketplaceMainSidebarMenu } from "@/app/marketplace/MarketplaceMainSidebarMenu"
import { MarketplaceGetStartedBanner } from "@/app/marketplace/MarketplaceGetStartedBanner"
import {
  MarketplaceAppCategoriesDocument,
  MarketplaceAppCategoriesQuery,
  MarketplaceAppCategoryDocument,
  MarketplaceAppCategoryQuery,
} from "@/cms/generated/graphql"
import { createGraphqlClient } from "@/cms/client"

export async function generateStaticParams() {
  const graphqlClient = createGraphqlClient()

  const { allMarketplaceAppCategories } =
    await graphqlClient.request<MarketplaceAppCategoriesQuery>(
      MarketplaceAppCategoriesDocument,
    )

  return allMarketplaceAppCategories.map((item) => ({
    slug: item.slug,
  }))
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const graphqlClient = createGraphqlClient()
  const { slug } = await params

  const { marketplaceAppCategory } =
    await graphqlClient.request<MarketplaceAppCategoryQuery>(
      MarketplaceAppCategoryDocument,
      { slug },
    )

  if (!marketplaceAppCategory) {
    notFound()
  }

  return (
    <BaseContainer size="lg">
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden pt-14">
        <MarketplaceMainSidebarMenu />
        <div className="w-full lg:pl-16">
          <div className="md:max-w-md lg:max-w-lg">
            <Heading size={1}>{marketplaceAppCategory.title}</Heading>
            {marketplaceAppCategory.description && (
              <Paragraph size={1} className="text-slate-500 mt-4">
                {marketplaceAppCategory.description}
              </Paragraph>
            )}
          </div>
        </div>
      </div>
      <MarketplaceGetStartedBanner className="mt-28 hidden lg:block" />
    </BaseContainer>
  )
}

export default Page
