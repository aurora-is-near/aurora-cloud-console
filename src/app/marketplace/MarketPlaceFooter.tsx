import Link from "next/link"
import Image from "next/image"
import { BaseContainer } from "@/components/BaseContainer"
import { MarketplaceFooterItem } from "@/app/marketplace/MarketPlaceFooterItem"

type MarketplaceFooterProps = {
  className?: string
}

export const MarketplaceFooter = ({ className }: MarketplaceFooterProps) => {
  const year = new Date().getFullYear()

  return (
    <footer className={className}>
      <BaseContainer
        size="lg"
        className="flex flex-col items-center md:items-start md:grid md:grid-cols-6 gap-4 space-y-6 md:space-y-0"
      >
        <div>
          <Image
            width="122"
            height="70"
            src="/static/v2/images/aurora-cloud-logo.svg"
            alt="Aurora Cloud logo"
          />
        </div>
        <div className="md:col-span-2 xl:ml-16">
          <h4 className="uppercase font-bold tracking-[2px] text-slate-900 mb-6 text-center md:text-left">
            Get Help
          </h4>
          <ul className="grid gap-y-4">
            <MarketplaceFooterItem
              href="https://discord.com/invite/auroralabs"
              iconSrc="/static/v2/images/icons/marketplace/discord.svg"
            >
              <span className="hidden md:inline">Developer chat on </span>
              Discord
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="https://t.me/auroraisnear"
              iconSrc="/static/v2/images/icons/marketplace/telegram.svg"
            >
              <span className="hidden md:inline">Aurora Cloud chat on</span>
              Telegram
            </MarketplaceFooterItem>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="uppercase font-bold tracking-[2px] text-slate-900 mb-6 text-center md:text-left">
            Resources
          </h4>
          <ul className="gap-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
            <MarketplaceFooterItem
              href="https://aurora-labs.gitbook.io/aurora-cloud-documentation"
              iconSrc="/static/v2/images/icons/marketplace/file.svg"
            >
              Documentation
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="/dashboard"
              iconSrc="/static/v2/images/icons/marketplace/bookmarks.svg"
            >
              Developer Portal
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="https://aurora.dev/ecosystem"
              iconSrc="/static/v2/images/icons/marketplace/planet.svg"
            >
              Ecosystem
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="https://aurora.dev/blog"
              iconSrc="/static/v2/images/icons/marketplace/pen.svg"
            >
              Blog
            </MarketplaceFooterItem>
            <MarketplaceFooterItem
              href="https://aurora.dev"
              iconSrc="/static/v2/images/icons/marketplace/aurora.svg"
            >
              Aurora.dev
            </MarketplaceFooterItem>
          </ul>
        </div>
      </BaseContainer>
      <div className="border-t border-slate-200 py-8 mt-8">
        <BaseContainer
          size="lg"
          className="flex flex-col sm:flex-row sm:items-center justify-between"
        >
          <div className="flex items-center space-x-5 text-sm font-medium leading-none text-slate-500">
            <Link
              className="underline hover:no-underline"
              href="https://auroracloud.dev/terms"
            >
              Terms
            </Link>
            <Link
              className="underline hover:no-underline"
              href="https://auroracloud.dev/privacy"
            >
              Privacy
            </Link>
          </div>
          <div className="text-sm font-medium leading-none text-slate-500 mt-4 sm:mt-0">
            &copy; {year} Aurora Labs. All Rights Reserved.
          </div>
        </BaseContainer>
      </div>
    </footer>
  )
}
