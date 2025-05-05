import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { createGraphqlClient } from "@/cms/client"
import {
  MarketplaceAppCategoriesDocument,
  MarketplaceAppCategoriesQuery,
  MarketplaceCollectionsDocument,
  MarketplaceCollectionsQuery,
} from "@/cms/generated/graphql"
import { LinkButton } from "@/components/LinkButton"
import { SidebarMenu } from "@/components/menu/SidebarMenu"
import { MarketplaceRequestAppSection } from "@/app/marketplace/MarketplaceRequestAppSection"

type MarketplaceMainSidebarMenuProps = {
  hasBackButton?: boolean
  className?: string
}

const sortByTitle = (a: { title: string }, b: { title: string }) =>
  a.title.localeCompare(b.title)

export const MarketplaceMainSidebarMenu = async ({
  hasBackButton,
  className,
}: MarketplaceMainSidebarMenuProps) => {
  const graphqlClient = createGraphqlClient()

  const [{ allMarketplaceAppCategories }, { allMarketplaceCollections }] =
    await Promise.all([
      graphqlClient.request<MarketplaceAppCategoriesQuery>(
        MarketplaceAppCategoriesDocument,
      ),
      graphqlClient.request<MarketplaceCollectionsQuery>(
        MarketplaceCollectionsDocument,
      ),
    ])

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
            items: allMarketplaceCollections
              .sort(sortByTitle)
              .map(({ title, slug }) => ({
                name: title,
                href: `/marketplace/collections/${slug}`,
              })),
          },
          {
            heading: "Categories",
            items: allMarketplaceAppCategories
              .sort(sortByTitle)
              .map(({ title, slug }) => ({
                name: title,
                href: `/marketplace/categories/${slug}`,
              })),
          },
        ]}
      />
      <MarketplaceRequestAppSection className="hidden lg:block mt-6 pt-6 border-t border-slate-200" />
    </div>
  )
}
