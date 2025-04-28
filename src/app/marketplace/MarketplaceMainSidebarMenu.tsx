import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppCategoriesDocument,
  MarketplaceAppCategoriesQuery,
} from "@/cms/generated/graphql"
import { LinkButton } from "@/components/LinkButton"
import { SidebarMenu } from "@/components/menu/SidebarMenu"
import { MenuItem } from "@/types/menu"

type MarketplaceMainSidebarMenuProps = {
  hasBackButton?: boolean
}

export const MarketplaceMainSidebarMenu = async ({
  hasBackButton,
}: MarketplaceMainSidebarMenuProps) => {
  const graphqlClient = createGraphqlClient()

  const { allMarketplaceAppCategories } =
    await graphqlClient.request<MarketplaceAppCategoriesQuery>(
      MarketplaceAppCategoriesDocument,
    )

  return (
    <div className="flex flex-col">
      {hasBackButton && (
        <div className="mb-6 pb-6 border-b border-slate-200">
          <LinkButton href="/marketplace" variant="border">
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </LinkButton>
        </div>
      )}
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
    </div>
  )
}
