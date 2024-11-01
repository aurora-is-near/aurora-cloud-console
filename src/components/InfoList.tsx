import clsx from "clsx"
import Link from "next/link"
import CopyButton from "@/components/CopyButton"
import { InfoTooltip } from "@/components/InfoTooltip"

export type InfoListProps = {
  className?: string
  items: {
    term: string
    tooltip?: string
    description: string
    showCopyButton?: boolean
  }[]
}

export const InfoList = ({ items, className }: InfoListProps) => (
  <dl className={clsx("divide-y divide-slate-200 flex-1", className)}>
    {items.map(({ term, tooltip, description, showCopyButton }, index) => {
      const isFirst = index === 0
      const isLast = index === items.length - 1
      const isLink = description.startsWith("http")

      return (
        <div
          key={term}
          className={clsx("grid grid-cols-5 items-center", {
            "pb-2.5": isFirst,
            "py-2 sm:py-2.5": !isFirst && !isLast,
            "pt-2.5": isLast,
          })}
        >
          <div className="col-span-2 flex items-center gap-x-1">
            <dt className="text-sm font-medium text-slate-900">{term}</dt>
            {tooltip && <InfoTooltip text={tooltip} />}
          </div>
          <div className="col-span-3 flex flex-row items-center justify-between gap-x-2.5">
            <dd className="text-sm leading-5 text-slate-900 flex-shrink-1 whitespace-nowrap text-ellipsis overflow-hidden">
              {isLink ? (
                <Link target="_blank" href={description}>
                  {description}
                </Link>
              ) : (
                description
              )}
            </dd>
            {showCopyButton ? (
              <CopyButton hasBorder value={description} size="sm" />
            ) : (
              <div className="h-10" />
            )}
          </div>
        </div>
      )
    })}
  </dl>
)
