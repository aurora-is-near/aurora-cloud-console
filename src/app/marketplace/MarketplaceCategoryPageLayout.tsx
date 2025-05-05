import { PropsWithChildren } from "react"
import { BaseContainer } from "@/components/BaseContainer"
import { MarketplaceMainSidebarMenu } from "@/app/marketplace/MarketplaceMainSidebarMenu"
import { MarketplaceGetStartedBanner } from "@/app/marketplace/MarketplaceGetStartedBanner"

export const MarketplaceCategoryPageLayout = ({
  children,
}: PropsWithChildren) => {
  return (
    <BaseContainer size="lg">
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden pt-10">
        <MarketplaceMainSidebarMenu hasBackButton />
        {children}
      </div>
      <MarketplaceGetStartedBanner className="mt-12 md:mt-28" />
    </BaseContainer>
  )
}
