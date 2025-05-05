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
            items: allMarketplaceCollections.map(({ title, slug }) => ({
              name: title,
              href: `/marketplace/collections/${slug}`,
            })),
          },
          {
            heading: "Categories",
            items: allMarketplaceAppCategories.map(({ title, slug }) => ({
              name: title,
              href: `/marketplace/categories/${slug}`,
            })),
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
