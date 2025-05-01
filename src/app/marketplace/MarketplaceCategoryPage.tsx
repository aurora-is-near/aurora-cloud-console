import { BaseContainer } from "@/components/BaseContainer"
import { Paragraph } from "@/uikit/Typography/Paragraph"
import { MarketplaceMainSidebarMenu } from "@/app/marketplace/MarketplaceMainSidebarMenu"
import { MarketplaceGetStartedBanner } from "@/app/marketplace/MarketplaceGetStartedBanner"
import {
  MarketplaceAppsQueryVariables,
  MarketplaceAppsSearchQueryVariables,
} from "@/cms/generated/graphql"
import { MarketplaceCards } from "@/app/marketplace/MarketPlaceCards"
import { Heading } from "@/uikit/Typography/Heading"

type MarketplaceCategoryPageProps<TIsSearchQuery extends boolean = false> = {
  title?: string
  description?: string
  query: TIsSearchQuery extends true
    ? MarketplaceAppsSearchQueryVariables
    : MarketplaceAppsQueryVariables
  isSearchQuery?: TIsSearchQuery
}

export const MarketplaceCategoryPage = async <
  TIsSearchQuery extends boolean = false,
>({
  title,
  description,
  query,
  isSearchQuery,
}: MarketplaceCategoryPageProps<TIsSearchQuery>) => {
  return (
    <BaseContainer size="lg">
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden pt-14">
        <MarketplaceMainSidebarMenu hasBackButton />
        <div className="w-full lg:pl-16">
          <Heading size={1}>{title}</Heading>
          {!!description && (
            <Paragraph size={1} className="text-slate-500 mt-4">
              {description}
            </Paragraph>
          )}
          <MarketplaceCards
            showNumberOfApps
            query={query}
            isSearchQuery={isSearchQuery}
            className="mt-8"
          />
        </div>
      </div>
      <MarketplaceGetStartedBanner className="mt-28 hidden lg:block" />
    </BaseContainer>
  )
}
