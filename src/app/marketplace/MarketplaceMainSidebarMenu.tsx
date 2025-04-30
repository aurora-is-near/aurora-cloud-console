import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppCategoriesDocument,
  MarketplaceAppCategoriesQuery,
} from "@/cms/generated/graphql"
import { LinkButton } from "@/components/LinkButton"
import { SidebarMenu } from "@/components/menu/SidebarMenu"
import { MenuItem } from "@/types/menu"
import { MarketplaceSubmitAppRequestButton } from "./MarketplaceSubmitAppRequestButton"

type MarketplaceMainSidebarMenuProps = {
  hasBackButton?: boolean
  className?: string
}

export const MarketplaceMainSidebarMenu = async ({
  hasBackButton,
  className,
}: MarketplaceMainSidebarMenuProps) => {
  const graphqlClient = createGraphqlClient()

  const { allMarketplaceAppCategories } =
    await graphqlClient.request<MarketplaceAppCategoriesQuery>(
      MarketplaceAppCategoriesDocument,
    )

  return (
    <div className={clsx("flex flex-col", className)}>
      {hasBackButton && (
        <div className="mb-6 pb-6 border-b border-slate-200 hidden lg:block">
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
                href: `/marketplace/featured/popular`,
              },
              {
                name: "Built by Aurora",
                href: `/marketplace/featured/built-by-aurora`,
              },
              {
                name: "Essentials",
                href: `/marketplace/featured/essentials`,
              },
              {
                name: "New & noteworthy",
                href: `/marketplace/featured/new`,
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
      <section>
        <h3 className="font-bold text-slate-900 text-lg mt-6 pt-6 border-t border-slate-200">
          Request an app
        </h3>
        <p className="text-slate-500 text-sm mt-3">
          Can't find what you're looking for? Let us know.
        </p>
        <MarketplaceSubmitAppRequestButton />
      </section>
    </div>
  )
}
