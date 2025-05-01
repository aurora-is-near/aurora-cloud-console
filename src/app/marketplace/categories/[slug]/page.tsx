import { notFound } from "next/navigation"
import {
  MarketplaceAppCategoriesDocument,
  MarketplaceAppCategoriesQuery,
  MarketplaceAppCategoryDocument,
  MarketplaceAppCategoryQuery,
} from "@/cms/generated/graphql"
import { createGraphqlClient } from "@/cms/client"
import { getMarketplaceApps } from "@/utils/marketplace/get-marketplace-apps"
import { MarketplaceCategoryPage } from "../../MarketplaceCategoryPage"

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

  const apps = await getMarketplaceApps({
    categoryId: marketplaceAppCategory.id,
  })

  return (
    <MarketplaceCategoryPage
      title={marketplaceAppCategory.title}
      description={marketplaceAppCategory.description}
      apps={apps}
    />
  )
}

export default Page
