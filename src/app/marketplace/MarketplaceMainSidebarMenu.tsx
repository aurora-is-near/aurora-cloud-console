import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppCategoriesDocument,
  MarketplaceAppCategoriesQuery,
} from "@/cms/generated/graphql"
import { SidebarMenu } from "@/components/menu/SidebarMenu"
import { MenuItem } from "@/types/menu"

export const MarketplaceMainSidebarMenu = async () => {
  const graphqlClient = createGraphqlClient()

  const { allMarketplaceAppCategories } =
    await graphqlClient.request<MarketplaceAppCategoriesQuery>(
      MarketplaceAppCategoriesDocument,
    )

  return (
    <SidebarMenu
      variant="compact"
      sections={[
        {
          heading: "Featured",
          items: [
            {
              name: "Popular",
              href: `/marketplace/popular`,
            },
            {
              name: "Built by Aurora",
              href: `/marketplace/built-by-aurora`,
            },
            {
              name: "Essentials",
              href: `/marketplace/essentials`,
            },
            {
              name: "New & noteworthy",
              href: `/marketplace/new`,
            },
          ],
        },
        {
          heading: "Categories",
          items: allMarketplaceAppCategories
            .map((category) => {
              if (!category.title || !category.slug) {
                return null
              }

              return {
                name: category.title,
                href: `/marketplace/categories/${category.slug}`,
              }
            })
            .filter((item): item is MenuItem => !!item),
        },
      ]}
    />
  )
}
