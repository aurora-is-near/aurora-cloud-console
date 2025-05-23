import { MarketplaceSubmitAppRequestButton } from "@/app/marketplace/MarketplaceSubmitAppRequestButton"

type MarketplaceRequestAppSectionProps = {
  className?: string
}

export const MarketplaceRequestAppSection = ({
  className,
}: MarketplaceRequestAppSectionProps) => {
  return (
    <section className={className}>
      <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg tracking-[-0.5px]">
        Request an app
      </h3>
      <p className="text-slate-500 dark:text-slate-300 text-sm mt-3">
        Can't find what you're looking for? Let us know.
      </p>
      <MarketplaceSubmitAppRequestButton />
    </section>
  )
}
